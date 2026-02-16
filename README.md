# Student Event Verification System

A lightweight, mobile-first web system for managing student registration and verification for events. Redesigned for speed and simplicity.

## 🎯 Features

- **Instant Registration**: Students Scan → Register → Get a Unique Number (#1–350+).
- **Unique Number Assignment**: Every student gets a specific number for the event.
- **Fast Entry Verification**: Admin looks up numbers at the entrance to see student details.
- **Dynamic Capacity**: Admin can change the maximum number of spots directly from the dashboard.
- **Hidden Admin Access**: Discreet entry point for organizers (no visible buttons).
- **Data Privacy**: PIN/Passcode protected access to student records.
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
   - Admin accesses the dashboard (via the secret trigger).
   - Admin clicks **"Verify Number"** and types the student's number.
   - System displays the student's name and index number for confirmation.

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Upload `event-system.html` to a GitHub repository.
2. Settings → Pages → Source: "main branch".
3. Your site is live!

## 🔒 Admin Access

To maintain a clean look for students, the Admin entrance is hidden:
- **How to Enter**: Click the large **`#` logo icon** (the gradient square) at the top of the landing page.
- **Default Passcode**: `vader`
- **Security**: You can change the passcode in the code by editing the `ADMIN_PIN` variable.

## 🔧 Customization

### Change Capacity
Go to the Admin Dashboard. The **"Total Capacity"** card at the top is editable. Type a new number to instantly change the event limit.

### Reset Database
In the Admin Dashboard, use the **"Reset Database"** button to wipe all tests/previous registrations and reset the counter back to #1.

## 📊 Technical Stack
- **React 18**: UI Logic
- **Tailwind CSS**: Modern Styling
- **QRious**: QR Code helper (if needed)
- **Lucide**: Iconography
- **Babel**: In-browser transpilation for easy single-file deployment.

---

**Tip**: Always perform a "Reset Database" after testing and before your actual event starts! 🎉
