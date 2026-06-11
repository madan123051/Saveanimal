# SaveAnimal NGO Dashboard

🐾 A comprehensive NGO management system with unified login portal for three user roles: **Volunteers**, **Admins**, and **Visitors**.

## Features

### 🎯 Unified Login Portal
- Single authentication system for all user types
- Demo data included for testing
- Role-based access control

### 👤 Volunteer Dashboard
- Personal profile management
- Track volunteer hours
- View and participate in activities
- Skills showcase
- Personal statistics

### 👨‍💼 Admin Dashboard
- Manage all volunteers
- Create and manage activities
- View comprehensive reports
- Track volunteer performance
- Real-time statistics

### 👁️ Visitor Dashboard
- Read-only access
- View organization information
- Browse events and activities
- About section

## Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **DaisyUI** - Beautiful UI components
- **Tailwind CSS** - Responsive design
- **Lucide React** - Beautiful icons

## Project Structure

```
dashboard/
├── app.tsx                    # Main app component
├── types.ts                   # TypeScript types
├── styles.css                 # Custom CSS
├── components/
│   ├── LoginPage.tsx          # Login form with role selection
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── Header.tsx             # Top header bar
│   ├── AdminDashboard.tsx     # Admin view
│   ├── VolunteerDashboard.tsx # Volunteer view
│   ├── VisitorHome.tsx        # Visitor view
│   └── StatCard.tsx           # Reusable stat cards
├── index.html                 # HTML entry point
└── tasklet.config.json        # App configuration
```

## Demo Accounts

### Volunteers
- **Rahul Kumar** (V001) - 45 hours, 5 activities
- **Priya Singh** (V002) - 32 hours, 3 activities
- **Amit Patel** (V003) - 68 hours, 8 activities

### Admin
- Full access to all management features

### Visitor
- Limited, read-only access to public information

## Key Features

✅ **Beautiful UI Design**
- Modern gradient backgrounds
- Smooth animations
- Color-coded status badges
- Professional typography
- Responsive layout

✅ **Smart Sidebar**
- Auto-closes when scrolling
- Smooth transitions
- Role-specific navigation items
- Active state indication

✅ **Mobile Responsive**
- Works on all devices
- Touch-friendly interface
- Adaptive layouts
- Mobile-optimized navigation

✅ **Real-time Data**
- Instant statistics updates
- Live activity tracking
- Volunteer management
- Performance monitoring

## Installation & Setup

1. Clone the repository
2. Navigate to dashboard directory
3. Install dependencies: `npm install`
4. Start development server: `npm start`
5. Build for production: `npm run build`

## Usage

1. Open the app in your browser
2. Select a role: **Volunteer**, **Admin**, or **Visitor**
3. If volunteer, select from the dropdown list
4. Click "Login to Dashboard"
5. Explore the features for your role

## Customization

### Change Colors
Edit `styles.css` and update DaisyUI color classes:
- Primary actions: `btn-primary`
- Success states: `btn-success`
- Alerts: `btn-warning`, `btn-error`

### Update Demo Data
Edit `app.tsx` and modify the `initializeDemoData()` function with your actual data.

### Add New Features
1. Create new component in `components/` folder
2. Import it in `app.tsx`
3. Add to conditional rendering based on user role
4. Style with DaisyUI and Tailwind classes

## Production Roadmap

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real authentication system
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Photo/document uploads
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Analytics dashboard

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT - Feel free to use this for your NGO!

## Support

For issues or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for SaveAnimal NGO**
