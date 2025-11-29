import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { predictStudent, default as api } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const schema = yup.object({
  age: yup.number().required().min(1).max(120),
  attendance: yup.number().required().min(0).max(100),
  grades: yup.number().required().min(0).max(100),
  parent_support: yup.number().oneOf([0,1]).required(),
}).required();

export default function PredictForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { age: '', attendance: '', grades: '', parent_support: 1 }
  });

  // dynamic model-driven form
  const [modelFeatures, setModelFeatures] = useState([]);
  const [medians, setMedians] = useState({});
  const [values, setValues] = useState({});
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchFeatures = async () => {
      try {
        const res = await api.get('/model/features');
        if (mounted && res && res.data && res.data.features) {
          setModelFeatures(res.data.features || []);
          setMedians(res.data.medians || {});
          // initialize values with medians
          const init = {};
          (res.data.features || []).forEach(f => {
            init[f] = res.data.medians && res.data.medians[f] != null ? res.data.medians[f] : '';
          });
          setValues(init);
        }
      } catch (err) {
        // fail silently and keep legacy form
        console.debug('Model features endpoint not available', err);
      } finally {
        if (mounted) setLoadingFeatures(false);
      }
    }
    fetchFeatures();
    return () => { mounted = false }
  }, [])

  const onDynamicChange = (key, v) => {
    setValues(prev => ({ ...prev, [key]: v }));
  }

  const onDynamicSubmit = async (e) => {
    e.preventDefault();
    try {
      // build extra payload using modelFeatures order
      const extra = {};
      modelFeatures.forEach(f => {
        const raw = values[f];
        const num = raw === '' || raw === null || raw === undefined ? medians[f] || 0 : Number(raw);
        extra[f] = Number.isNaN(num) ? (medians[f] || 0) : num;
      });
      const res = await predictStudent({ extra });
      toast.success(res.dropout_prediction ? '⚠️ At Risk of Dropout' : '✅ Likely to Continue');
      console.debug('Prediction response', res);
    } catch (err) {
      console.error(err);
      toast.error('Prediction failed');
    }
  }

  const onSubmit = async (data) => {
    try {
      const res = await predictStudent({
        age: Number(data.age),
        attendance: Number(data.attendance),
        grades: Number(data.grades),
        parent_support: Number(data.parent_support)
      });
      toast.success(res.dropout_prediction ? '⚠️ At Risk of Dropout' : '✅ Likely to Continue');
    } catch (err) {
      console.error(err);
      toast.error('Prediction failed');
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-3xl font-bold mb-4">Predict Student Outcome</h2>

      {loadingFeatures ? (
        <p className="text-sm text-gray-300">Loading model fields...</p>
      ) : modelFeatures && modelFeatures.length > 0 ? (
        <form onSubmit={onDynamicSubmit} className="space-y-4">
          {modelFeatures.map((f) => (
            <div key={f}>
              <label className="block text-sm text-gray-200 mb-1">{f.replaceAll('_', ' ')}</label>
              <input
                type="number"
                step="any"
                value={values[f] ?? ''}
                onChange={(e) => onDynamicChange(f, e.target.value)}
                placeholder={medians[f] != null ? String(medians[f]) : ''}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl placeholder:text-gray-300"
              />
            </div>
          ))}

          <div className="pt-2">
            <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-2xl shadow-lg">
              Predict Dropout
            </motion.button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('age')} placeholder="Age" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl placeholder:text-gray-300" />
          {errors.age && <p className="text-red-400">{errors.age.message}</p>}

          <input {...register('attendance')} placeholder="Attendance (%)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl placeholder:text-gray-300" />
          {errors.attendance && <p className="text-red-400">{errors.attendance.message}</p>}

          <input {...register('grades')} placeholder="Grades (%)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl placeholder:text-gray-300" />
          {errors.grades && <p className="text-red-400">{errors.grades.message}</p>}

          <select {...register('parent_support')} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl">
            <option value={1}>Parent Support: Yes</option>
            <option value={0}>Parent Support: No</option>
          </select>

          <div className="pt-2">
            <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-2xl shadow-lg">
              {isSubmitting ? 'Predicting...' : 'Predict Dropout'}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}
