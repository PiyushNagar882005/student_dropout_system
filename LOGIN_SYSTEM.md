# Login System Documentation

## Overview
The Student Dropout System now has a complete authentication system with role-based access control (RBAC). Users can log in as either a **Student** or **Admin**, with different features and navigation for each role.

## Demo Credentials

### Student Login
- **Email:** `student@example.com`
- **Password:** `student123`
- **Role:** User
- **Access:** Full student dashboard, prediction tools, analytics, counselor connect, etc.

### Admin Login
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** Admin
- **Access:** Admin Dashboard with user management, system health monitoring, analytics

## Authentication Flow

1. **Landing Page:** Users start at `/login` page
2. **Role Selection:** Toggle between "Student" and "Admin" modes
3. **Credentials Entry:** Enter email and password
4. **Validation:** System validates against demo credentials
5. **Redirect:** 
   - Students → Home Page (`/`)
   - Admins → Admin Dashboard (`/admin-dashboard`)
6. **Session:** User session stored in localStorage with Zustand persistence

## Features

### For Students
- Access full student dashboard
- View predictions and at-risk students
- Counselor connect services
- Analytics and reports
- Contact support
- Logout from header dropdown

### For Admin
- **System Statistics:**
  - Total Users: 2,543
  - Active Users: 2,108
  - At-Risk Students: 342
  - Predicted Dropouts: 89
  - System Uptime: 99.98%

- **User Management:**
  - View all registered users
  - Deactivate/Activate users
  - Delete users from system
  - View user join dates and departments

- **System Controls:**
  - System health monitoring
  - API call tracking
  - Uptime monitoring

## Components Created

### 1. `useAuth.js` (Store)
- Zustand store for auth state management
- Persists user data to localStorage
- Methods: `login()`, `logout()`, `isAdmin()`, `isUser()`

### 2. `Login.jsx` (Page)
- Student/Admin role toggle
- Email & password form with validation
- Demo credentials display
- Show/hide password toggle
- Loading states during login

### 3. `ProtectedRoute.jsx` (Component)
- Wrapper for protecting routes
- Redirects unauthenticated users to login
- Enforces role-based route access

### 4. `AdminDashboard.jsx` (Page)
- System statistics cards
- User management table
- Deactivate/delete functionality
- System health metrics

### 5. Updated `App.jsx`
- Authentication state checking
- Role-based routing
- Redirect logic for login/authenticated states
- Separate route trees for students and admins

### 6. Updated `Header.jsx`
- User profile dropdown
- User info display (name, email, role)
- Logout button with toast notification

### 7. Updated `Sidebar.jsx`
- Role-based navigation (different links for admin vs student)
- Admin uses orange branding, students use blue
- Different sidebar icons for admin (AD) vs student (SD)

## Testing the System

1. **Fresh Start:**
   - Close the app and reopen
   - You'll be redirected to login page

2. **Student Flow:**
   - Login with `student@example.com` / `student123`
   - Access student features
   - Click profile dropdown in header
   - Click Logout

3. **Admin Flow:**
   - Login with `admin@example.com` / `admin123`
   - View Admin Dashboard
   - Try user management features (activate/deactivate)
   - Logout from profile dropdown

## Security Notes (Demo Only)

⚠️ **This is a demo implementation with hardcoded credentials for development.**

In production, you would need to:
- Connect to a real backend authentication API
- Implement JWT token-based authentication
- Hash passwords on the server side
- Use HTTPS for all communications
- Implement refresh token rotation
- Add CSRF protection
- Implement rate limiting on login attempts

## File Structure
```
frontend/
├── src/
│   ├── store/
│   │   └── useAuth.js (NEW)
│   ├── pages/
│   │   ├── Login.jsx (NEW)
│   │   └── AdminDashboard.jsx (NEW)
│   ├── components/
│   │   ├── ProtectedRoute.jsx (NEW)
│   │   ├── Header.jsx (UPDATED)
│   │   └── Sidebar.jsx (UPDATED)
│   └── App.jsx (UPDATED)
```
