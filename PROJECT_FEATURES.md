# Student Dropout Prediction System - Complete Features

## Project Overview
A comprehensive web application for predicting and preventing student dropouts with multiple interactive pages and counselor support system.

## 🎯 Features Implemented

### 1. **Home/Welcome Page** (`/`)
- Beautiful landing page with gradient background
- Animated blobs and UI elements
- **Navigation Menu (Three Dots ☰)**
  - Dashboard
  - Students at Risk
  - Counselor Connect
  - Contact Us
- Quick statistics display
- Smooth animations and transitions

### 2. **Dashboard** (`/dashboard`)
- Real-time analytics and statistics
  - Total Students Tracked
  - At Risk Students Count
  - Predicted Dropouts
  - Success Rate
- Multiple charts:
  - **Pie Chart**: Student Distribution (Safe, At Risk, Critical)
  - **Line Chart**: Trends showing At Risk Students vs Interventions
  - **Bar Chart**: Dropout Rate by Department
- Responsive grid layout
- Color-coded status indicators

### 3. **Students at Risk** (`/at-risk`)
- Comprehensive risk analysis with visualizations
  - **Doughnut Chart**: Risk Distribution by Level
  - **Radar Chart**: Risk Factors Impact Analysis
  - **Bar Chart**: High Risk Students by Department
- At-Risk Students Table with:
  - Student name, semester, attendance, grades
  - Risk level badges (Safe, Medium, High, Critical)
  - Risk scores (0-10) with visual progress bars
  - View Details button
- Student detail modal with:
  - Complete information
  - Recommended actions
  - Risk assessment

### 4. **Counselor Connect** (`/counselor`)
- Professional counselor directory with:
  - Profile cards with specialization
  - Experience level
  - Availability times
  - Star ratings
  - Online/Offline status
- Real-time chat interface
  - Message history
  - Timestamp tracking
  - Auto-responses from counselors
- Session scheduling
- Counselor specializations:
  - Academic Counseling
  - Mental Health
  - Career Development
  - Financial Counseling

### 5. **Contact Us** (`/contact`)
- Comprehensive contact form with:
  - Name, email, phone
  - Category selection
  - Subject line
  - Message textarea
  - Form validation with error messages
- Contact information cards:
  - Phone numbers
  - Email addresses
  - Physical address
  - Office hours
  - Response time expectations
- Quick links section
- Office hours display

### 6. **Additional Pages**
- **Predict** (`/predict`): Individual student dropout prediction form
- **Analytics** (`/analytics`): Historical analytics view

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI Framework
- **React Router 7.9.4** - Routing and navigation
- **Tailwind CSS 4.1** - Styling
- **Framer Motion** - Smooth animations
- **Chart.js + React-ChartJS-2** - Data visualization
- **React Hook Form + Yup** - Form management & validation
- **React Hot Toast** - Notifications
- **Zustand** - State management (theme)
- **Axios** - HTTP client
- **Heroicons** - UI icons

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pandas** - Data processing
- **Scikit-learn** - ML predictions
- **Joblib** - Model loading

---

## 🎨 Design Features

### Navigation
- **Three-Dot Menu (⋮)** on home page opens dropdown with all options
- **Header Navigation** - Top navigation bar with:
  - Logo/Home button
  - Dark/Light mode toggle
  - Three-dot menu for quick access

### Colors & Themes
- **Gradients**:
  - Purple/Indigo for main theme
  - Red/Orange for at-risk indicators
  - Cyan/Blue for counselor connect
  - Green for contact/success
  
- **Dark Mode Support** - Toggle between light and dark themes

### Animations
- Page transitions with fade and slide effects
- Button hover and tap animations
- Card lift-on-hover effects
- Animated blob backgrounds
- Staggered element animations
- Smooth dropdown menu transitions

---

## 📂 Project Structure

```
frontend/src/
├── pages/
│   ├── Home.jsx          # Landing page with menu
│   ├── Dashboard.jsx     # Analytics dashboard
│   ├── AtRisk.jsx        # At-risk students analysis
│   ├── CounselorConnect.jsx  # Counselor chat interface
│   └── Contact.jsx       # Contact form & info
├── components/
│   ├── Header.jsx        # Navigation header
│   ├── PredictForm.jsx   # Prediction form
│   └── Analytics.jsx     # Analytics chart
├── services/
│   └── api.js            # API calls
├── store/
│   └── useTheme.js       # Theme management
├── App.jsx               # Main app with routing
├── index.css             # Global styles & animations
└── main.jsx              # Entry point
```

---

## 🚀 How to Use

### Starting the Application
```powershell
# Backend
cd backend/app
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend
cd frontend
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Navigation Flow
1. Open home page (/)
2. Click the three-dot menu (⋮) button
3. Select from available options:
   - Dashboard
   - Students at Risk
   - Counselor Connect
   - Contact Us

---

## 📊 Chart Types Implemented

1. **Pie Chart** - Student distribution by risk level
2. **Line Chart** - Trends over time
3. **Bar Chart** - Department-wise statistics
4. **Doughnut Chart** - Risk distribution
5. **Radar Chart** - Risk factors comparison

---

## 🔐 Form Validation

- **Contact Form**: Name, email, phone, subject, category, message
- **Prediction Form**: Age, attendance, grades, parent support
- **Error Handling**: Real-time validation with user-friendly messages

---

## ✨ Key Highlights

✅ Fully responsive design (mobile, tablet, desktop)
✅ Smooth animations and transitions
✅ Dark/Light mode toggle
✅ Real-time data visualization
✅ Professional UI with gradients
✅ Interactive charts with Chart.js
✅ Form validation and error handling
✅ Toast notifications for user feedback
✅ Modular component structure
✅ Clean and maintainable code

---

## 🎓 Prediction Features

- **Student At-Risk Page**: Identifies students at high risk of dropout
- **Risk Scoring**: 0-10 scale risk assessment
- **Intervention Tracking**: Shows counseling interventions
- **Risk Factors**: Analyzes attendance, grades, engagement, etc.

---

## 📞 Support Contacts

The application includes a comprehensive contact system with:
- Live chat with counselors
- Session scheduling
- Contact form submissions
- Office hours display
- Multiple contact methods (phone, email, in-person)

---

## 🔄 Future Enhancements

- Real database integration
- User authentication
- Email notifications
- SMS alerts
- Parent portal
- Student progress tracking
- Intervention recommendation engine
- Admin dashboard
- Report generation

---

**Status**: ✅ Full Functional Project Complete
**Last Updated**: November 2025
