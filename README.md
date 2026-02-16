# Student Event Verification System

A lightweight web-based system for managing student registration and check-in for department events.

## 🎯 Features

- **Student Registration**: Students scan a QR code to register with their name and index number
- **Check-In Verification**: Students scan another QR code at the event to verify their registration
- **Admin Dashboard**: Real-time view of all registrations with check-in status
- **Offline-Capable**: Works with browser localStorage (no backend required for basic use)

## 📋 System Flow

1. **Before the Event**:
   - Students scan QR Code #1 (Registration)
   - They fill out a form with name and index number
   - Data is saved to the system

2. **At the Event Location**:
   - Students scan QR Code #2 (Check-In)
   - They enter their index number
   - System displays their details for admin verification
   - Admin confirms and checks them in

3. **Admin Monitoring**:
   - Admin can view all registrations
   - Filter by checked-in/pending status
   - Search by name or index number
   - View real-time statistics

## 🚀 Quick Start

### Option 1: Simple Deployment (Recommended for small events)

1. **Copy the code** from `event-system.jsx`

2. **Create an HTML file** with the React app:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration System</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        // Paste the event-system.jsx code here
    </script>
</body>
</html>
```

3. **Host the file** on:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Or any web server

### Option 2: React Development Setup

```bash
# Create a new React app
npx create-react-app event-system
cd event-system

# Install dependencies
npm install lucide-react

# Replace src/App.js with event-system.jsx content

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Creating QR Codes

You need to generate 3 QR codes pointing to different pages:

### QR Code #1: Registration
**URL Format**: `https://your-domain.com/?page=register`
- Students scan this to register
- Place this QR code on posters, emails, social media

### QR Code #2: Check-In
**URL Format**: `https://your-domain.com/?page=checkin`
- Students scan this at the event entrance
- Place this QR code at the event venue entrance

### QR Code #3: Admin Dashboard (Optional)
**URL Format**: `https://your-domain.com/?page=admin`
- For organizers to monitor registrations
- Keep this private, share only with event staff

### Free QR Code Generators:
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)
- [GoQR.me](https://goqr.me/)

**Pro Tip**: Test all QR codes before printing to ensure they work correctly!

## 🔧 URL Parameter Setup

To make the system automatically show the right page when QR codes are scanned, update the App component:

```javascript
const App = () => {
  // Get page from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  
  const [currentView, setCurrentView] = useState(pageParam || 'menu');
  
  // Rest of the code...
};
```

This way:
- `?page=register` shows the registration form
- `?page=checkin` shows the check-in verification
- `?page=admin` shows the admin dashboard
- No parameter shows the menu

## 💾 Data Storage

### Current Implementation (localStorage)
- ✅ No backend needed
- ✅ Works offline
- ✅ Instant setup
- ⚠️ Data stored in browser only
- ⚠️ Admin must use same device
- ⚠️ Data lost if browser cache cleared

### Upgrading to Backend (For larger events)

If you need:
- Multiple admins accessing same data
- Data backup and persistence
- Access from different devices

Consider adding a backend with:
- **Firebase** (easiest, free tier available)
- **Supabase** (PostgreSQL, free tier available)
- **Custom API** (Node.js/Express + MongoDB/PostgreSQL)

## 📊 System Components

### 1. Registration Form
- Clean, mobile-friendly interface
- Validates name and index number
- Shows success confirmation
- Saves data to localStorage

### 2. Check-In Verification
- Index number lookup
- Displays student details
- Check-in confirmation
- Shows if student already checked in

### 3. Admin Dashboard
- Total registrations counter
- Checked-in vs pending statistics
- Search functionality
- Filter by status
- Refresh button for real-time updates
- Clear all data option

## 🎨 Customization

### Change Colors
The system uses Tailwind CSS. You can customize colors by changing the class names:

```javascript
// Change blue to your school colors
"bg-blue-600" → "bg-purple-600"
"text-blue-600" → "text-purple-600"
```

### Add Your School Logo
Add to the top of each component:
```javascript
<img src="your-logo.png" alt="School Logo" className="w-16 h-16 mx-auto mb-4" />
```

### Customize Messages
Edit the text strings throughout the code to match your event details.

## 📱 Mobile Optimization

The system is fully responsive and works on:
- Smartphones
- Tablets
- Desktops
- QR code scanners

Test on multiple devices before the event!

## 🔒 Security Considerations

1. **Admin Access**: Consider adding password protection for the admin dashboard
2. **Data Privacy**: Don't collect more information than necessary
3. **HTTPS**: Always use HTTPS in production
4. **Data Retention**: Delete registration data after the event

## 🐛 Troubleshooting

### QR Code doesn't work
- Ensure the URL is correct
- Test the URL in a browser first
- Check if the page parameter is set correctly

### Data not showing
- Check browser console for errors
- Verify localStorage is enabled
- Try refreshing the page
- Clear cache and try again

### Students can't register
- Check internet connection (if using external hosting)
- Verify the form fields are not disabled
- Test on different browsers

## 📈 Event Day Checklist

- [ ] Test all QR codes
- [ ] Verify system is accessible
- [ ] Print backup QR codes
- [ ] Have admin device charged and ready
- [ ] Test check-in flow end-to-end
- [ ] Brief volunteers on how to use check-in
- [ ] Have backup plan (paper list) ready

## 🆘 Support & Backup Plan

**Backup Plan**: If the system fails, have a printed list ready:
1. Print the admin dashboard before the event
2. Keep a pen and paper for manual check-ins
3. Enter data into system later if needed

## 📄 License

Free to use for educational and non-commercial purposes.

## 🤝 Contributing

Feel free to customize and improve this system for your department's needs!

---

**Need Help?** Test the system thoroughly before your event day. Good luck with your Fun & Games session! 🎉
# ITSU-verification-system
