import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../store/useAuth'
import toast from 'react-hot-toast'

export default function AuthSuccess(){
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuth((s) => s.login)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    let token = params.get('token')
    // Some providers may return token in hash fragment; handle that too
    if (!token && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''))
      token = hashParams.get('token')
    }
    if (!token) {
      toast.error('Missing token')
      navigate('/login')
      return
    }
    // Exchange token for user info
    const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${BACKEND}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(async (res) => {
      if (!res.ok) {
        toast.error('Failed to validate token')
        navigate('/login')
        return
      }
      const json = await res.json()
      const user = json.user
      // store user in zustand and redirect
      login(user, user.role || 'user')
      toast.success('Login successful')
      navigate('/')
    }).catch((err) => {
      console.error(err)
      toast.error('Login failed')
      navigate('/login')
    })
  }, [])

  return null
}
