# Student Event Verification System

A lightweight, mobile-first web system for managing student registration and verification for events. Redesigned for speed and simplicity.

## 🎯 Features

- **Instant Registration**: Students Scan → Register → Get a Unique Number (#1–350+).
- **Unique Number Assignment**: Every student gets a specific number for the event.
- **Fast Entry Verification**: Fast lookup by number to see student details.
- **Dynamic Capacity**: Adjustable event limits.
- **Offline-Capable**: Works with browser `localStorage` (no backend required).
- **Data Export**: Export all registration data to CSV for reporting.

## 📋 System Flow

1. **Registration (Student Side)**:
   - Students visit the landing page and click **"Register for Event"**.
   - They enter their **Name** and **Index Number**.
   - The system assigns them a **Unique Event Number** (e.g., #42).
   - **Recommendation**: Tell students to screenshot their success page.

2. **Verification (Entrance Side)**:
   - Student shows their assigned number at the entrance.
   - Verification is done via the administrative dashboard.
   - Admin verifies the student's name and index number for confirmation.

## 🚀 Deployment

## 1. Deploy (1 Minute)
Upload `index.html` to **GitHub Pages** or **Netlify Drop**.

## 2. Create ONE QR Code
You only need one QR code for this system. Point it to your live URL:
- **URL**: `https://your-site.com/index.html`

## 🔧 Customization

### Change Capacity
The system supports dynamic capacity adjustment. You can change the maximum number of spots directly for your event.

### Reset Database
The system allows for a complete database reset to wipe test registrations and start fresh with a counter back to #1.

## 📊 Technical Stack
- **HTML5**: Semantic UI structure
- **CSS3**: Custom design system with variables & animations
- **JavaScript (ES6+)**: View switching & storage logic
- **Lucide Icons**: SVG iconography
- **Tailwind CSS**: (Used only for concept layout, now native CSS)

---

**Tip**: Always perform a database reset after testing and before your actual event starts! 🎉
