# 🎯 Navigation Guide - Visual Walkthrough

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      HOME PAGE (/)                               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Logo (SD)          Student Dropout        ☀️/🌙  ☰       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│              Welcome to Student Dropout System                   │
│           Early Intervention for Student Success                 │
│                                                                   │
│                      [Click ☰ Button ↓]                         │
│                                                                   │
│         1000+ Students    95% Accuracy    24/7 Support          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Click Three-Dot (☰)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
    Dashboard          Students at Risk      Counselor
    /dashboard         /at-risk               /counselor
    
        ↓                     ↓
    Contact Us            (back)
    /contact              (home)


DASHBOARD (/dashboard)
├── Header: Logo | Title | Theme | Menu
├── Metrics Cards
│   ├── Total Students: 1,245 (+12%)
│   ├── At Risk: 147 (-8%)
│   ├── Predicted Dropouts: 89 (+5%)
│   └── Success Rate: 92.8% (+3%)
├── Charts Section
│   ├── Pie Chart: Student Distribution
│   ├── Line Chart: Trends
│   └── Bar Chart: Department Rates
└── Navigation: Click logo to return, ☰ for menu


STUDENTS AT RISK (/at-risk)
├── Header: Logo | Title | Theme | Menu
├── Quick Stats
│   ├── High Risk Students: 58
│   ├── Critical Cases: 13
│   └── Interventions Needed: 71
├── Charts Section
│   ├── Doughnut Chart: Risk Distribution
│   ├── Radar Chart: Risk Factors
│   └── Bar Chart: Department Risks
├── Students Table
│   ├── Name | Semester | Attendance | Grades | Risk | Score
│   ├── John Doe | 4th | 45% | 38% | High | 8.5
│   ├── [View Details Button]
│   └── ... (5 students total)
└── Student Detail Modal
    ├── Full Info
    ├── Recommended Actions
    └── [Close Button]


COUNSELOR CONNECT (/counselor)
├── Header: Logo | Title | Theme | Menu
├── Counselor Cards (4 Available)
│   ├── Dr. Sarah Johnson
│   │   ├── Academic Counseling
│   │   ├── 8 years experience
│   │   ├── ⭐ 4.8 rating
│   │   └── [Connect Button]
│   ├── Mr. Robert Wilson (Mental Health)
│   ├── Ms. Emma Davis (Career Dev)
│   └── Dr. Michael Brown (Financial)
├── Feature Info Cards
│   ├── 🔒 Confidential
│   ├── ⏰ 24/7 Support
│   └── 👥 Expert Team
└── When Counselor Selected: Chat Interface
    ├── Counselor Header + Status
    ├── Message History
    ├── [Schedule Session Button]
    └── [Message Input + Send]


CONTACT US (/contact)
├── Header: Logo | Title | Theme | Menu
├── Contact Info Cards
│   ├── 📞 Phone: +1 (555) 123-4567
│   ├── 📧 Email: support@studentdropout.com
│   └── 📍 Address: 123 Education Street
├── Contact Form (Left)
│   ├── Name (required)
│   ├── Email (required, email format)
│   ├── Phone (required, 10+ chars)
│   ├── Category (dropdown)
│   ├── Subject (required)
│   ├── Message (required, 10+ chars)
│   └── [Submit Button]
├── Side Info (Right)
│   ├── Quick Links
│   ├── Office Hours
│   └── Response Times
└── Success Message: "Thank you for your message!"
```

---

## 🎬 Complete User Flow

### Scenario 1: Student Explores Dashboard
```
1. User enters app at http://localhost:5173
2. Sees beautiful Home page with welcome
3. Clicks ☰ (three-dot menu)
4. Menu dropdown appears with options
5. Clicks "Dashboard"
6. Page smoothly animates to Dashboard
7. Sees cards with student stats
8. Observes 3 charts with data
9. Analyzes department dropout rates
10. Clicks logo to go back
```

### Scenario 2: Student Checks At-Risk List
```
1. User on any page (except home)
2. Clicks ☰ menu button
3. Selects "Students at Risk"
4. Page loads with risk visualization
5. Views risk distribution donut chart
6. Analyzes risk factors on radar chart
7. Scrolls to student table
8. Sees 5 at-risk students
9. Clicks "View Details" on John Doe
10. Modal pops up with recommendations
11. Reviews suggested actions
12. Clicks close or clicks outside modal
13. Returns to table view
```

### Scenario 3: Student Contacts Counselor
```
1. User on any page
2. Clicks ☰ menu
3. Selects "Counselor Connect"
4. Page shows 4 counselor cards
5. Reads about each counselor
6. Checks ratings and specialization
7. Clicks [Connect] button
8. Chat interface opens
9. Clicks "Schedule Session"
10. System confirms session scheduled
11. Starts typing message
12. Sees auto-response from counselor
13. Continues conversation
14. Clicks back to see other counselors
```

### Scenario 4: Student Submits Contact Form
```
1. User on any page
2. Clicks ☰ menu
3. Selects "Contact Us"
4. Page shows contact information
5. Scrolls to contact form
6. Fills in all fields:
   - Name: John Smith
   - Email: john@email.com
   - Phone: 5551234567
   - Category: Academic Support
   - Subject: Need help with attendance
   - Message: I'm falling behind in my classes...
7. Clicks [Send Message]
8. Form validates all fields
9. Shows "Sending..." state
10. Success message appears
11. Form resets
12. Can submit another message
```

---

## 🎨 UI Elements Reference

### Buttons
```
[Standard Button]     - Gray, hover effect
[Primary Button]      - Gradient, hover effect
[Danger Button]       - Red gradient
[Success Button]      - Green gradient
[Menu Button] (☰)     - Three-dot icon
[Close Button] (✕)    - X icon
```

### Cards
```
┌─────────────────────┐
│ Title               │
│ Content             │
│ [Action Button] →   │
└─────────────────────┘
```

### Form Inputs
```
[Text Input]
[Email Input] (validated)
[Phone Input]
[Select Dropdown]
[Textarea]
[Error Message Below]
```

### Notifications
```
✅ Success Message - Green
❌ Error Message   - Red
ℹ️ Info Message    - Blue
```

---

## 📱 Responsive Behavior

### Desktop (1920px+)
```
┌─────────────────────────────────┐
│ Header with all elements visible │
├─────────────────────────────────┤
│ 4 stat cards in row             │
│ 2 charts side by side           │
│ 1 full-width chart              │
│ Wide form layout                │
└─────────────────────────────────┘
```

### Tablet (768-1024px)
```
┌──────────────────────────────┐
│ Header (menu collapses)      │
├──────────────────────────────┤
│ 2 stat cards per row         │
│ 1 chart per row              │
│ 2 column form layout         │
└──────────────────────────────┘
```

### Mobile (320-767px)
```
┌──────────────┐
│ Header       │
│ (☰ visible)  │
├──────────────┤
│ 1 stat card  │
│ 1 chart      │
│ Full-width   │
│ form         │
│ Stack layout │
└──────────────┘
```

---

## 🎯 Click Destinations

| Element | Click | Goes To |
|---------|-------|---------|
| Logo/SD | Click | Dashboard |
| Title "Student Dropout" | Click | Dashboard |
| ☰ Menu | Click | Opens dropdown |
| Dashboard (menu) | Click | /dashboard |
| Students at Risk (menu) | Click | /at-risk |
| Counselor Connect (menu) | Click | /counselor |
| Contact Us (menu) | Click | /contact |
| Counselor Card | Click | Expands to chat |
| [View Details] Button | Click | Shows modal |
| [Schedule Session] | Click | Schedules session |
| Modal [Close] | Click | Closes modal |
| Click outside modal | Click | Closes modal |
| [Submit Form] | Click | Validates + submits |
| ☀️/🌙 Button | Click | Toggles dark mode |

---

## 🔄 Data Flow

```
User Input
    ↓
Form Validation
    ↓
Success / Error Display
    ↓
Navigation
    ↓
New Page Renders
    ↓
Charts Load
    ↓
Animations Play
```

---

## 📊 Chart Types & Pages

| Chart Type | Page | Shows |
|-----------|------|-------|
| Pie | Dashboard | Student distribution |
| Line | Dashboard | Trend over weeks |
| Bar (vertical) | Dashboard | Department rates |
| Doughnut | At-Risk | Risk level distribution |
| Radar | At-Risk | Factor impact |
| Bar (horizontal) | At-Risk | Department risks |

---

## 🔐 Validation Rules

### Contact Form
- **Name**: Min 2 characters, required
- **Email**: Valid email format, required
- **Phone**: Min 10 characters, required
- **Subject**: Not empty, required
- **Category**: One selected, required
- **Message**: Min 10 characters, required

### Shows Errors
- Below each field
- In red text
- Disappears when fixed

---

## 🎨 Color Coding

### Student Status
```
🟢 Green  = Safe/Healthy
🟡 Yellow = Medium risk
🟠 Orange = High risk
🔴 Red    = Critical risk
```

### Metric Cards
```
Blue/Cyan    = Students count
Red/Orange   = Risk indicators
Green        = Success metrics
Yellow       = Warnings/Medium
```

---

## ⌚ Loading States

```
[Send Message] → "Sending..." → ✅ Sent
[Submit Form]  → "Submitting..." → ✅ Submitted
[Schedule]     → "Scheduling..." → ✅ Scheduled
[Connect]      → Chat loads → Ready to chat
```

---

## 🎭 Animation Triggers

```
Page Load → Fade in + slide animations
Button Hover → Scale up effect
Button Click → Scale down feedback
Menu Open → Dropdown slide down
Card Hover → Lift up effect
Modal Appear → Scale in + fade
```

---

## 📞 Support Quick Links

From Contact page:
- FAQ
- Documentation
- Bug Report
- Feature Request
- Feedback

---

## 🏆 Features Checklist for User

- ✅ Click home → See welcome page
- ✅ Click ☰ → See navigation menu
- ✅ Click menu items → Navigate pages
- ✅ See charts → Analyze data
- ✅ View table → See at-risk students
- ✅ Click details → See student info
- ✅ Chat with counselors → Get help
- ✅ Fill form → Submit contact
- ✅ Toggle theme → Use dark/light
- ✅ All responsive → Works on mobile

---

**All features are working and ready to use! 🚀**
