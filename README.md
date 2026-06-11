# SaveAnimal Nepal

A modern, responsive NGO-style website for animal rescue support in Nepal.

## 🌟 What's New

### 💻 NGO Management Dashboard
A complete role-based dashboard system for managing volunteers, activities, and operations.
- **Unified Login Portal** - Single authentication for Volunteers, Admins, and Visitors
- **Volunteer Dashboard** - Track hours, manage profile, view activities
- **Admin Dashboard** - Comprehensive management and reporting
- **Visitor Dashboard** - Public-facing event and organization information

📁 Located in: `/dashboard/`

## Features
- Home page with hero CTA, rescue stories, and live stats.
- Report Animal helpline form with image upload support.
- Donation page with one-time/monthly options and payment methods.
- Volunteer signup with role selection.
- About, stories/blog-style section, and contact with Nepal map.
- English/Nepali language toggle.
- Live quick-help chatbot.
- Demo admin dashboard to review incoming reports, volunteers, and donations.
- **NEW: Complete NGO Management Dashboard with role-based access** ✨

## Project Structure

```
saveanimal/
├── dashboard/                  # NGO Management Dashboard (React + TypeScript)
│   ├── app.tsx
│   ├── components/
│   ├── styles.css
│   ├── types.ts
│   └── README.md
├── public/                    # Static assets
├── server.js                  # Server configuration
├── package.json
└── README.md
```

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## Dashboard Usage

To use the NGO Management Dashboard:
1. Navigate to `/dashboard/` directory
2. Install dashboard dependencies: `npm install`
3. Build the dashboard: `npm run build`
4. Access the dashboard through your application

See [dashboard/README.md](./dashboard/README.md) for detailed dashboard documentation.

## Demo Accounts

### Volunteers
- Rahul Kumar (V001)
- Priya Singh (V002)
- Amit Patel (V003)

### Admin
- Full access dashboard

### Visitor
- Public event viewing

## Technologies Used

### Main Application
- Node.js
- Express
- EJS Templates
- HTML5/CSS3

### Dashboard
- React 19
- TypeScript
- DaisyUI
- Tailwind CSS
- Lucide React Icons

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT - Open for the community

---

**Made with ❤️ for SaveAnimal Nepal**