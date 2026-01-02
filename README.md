# 🔥 HeatBox - Pre-Launch Website

## 📋 Overview

This is the complete pre-launch website for **HeatBox** - a self-heating lunch box for India. The website is designed to:

- Explain the product clearly and build trust
- Collect early access user data via a waitlist form
- Communicate that this is a prototype in development (NOT for sale yet)
- Provide transparency about safety, pricing, and launch timeline

---

## 🗂️ Project Structure

```
HeatBox/
├── index.html          # Main HTML structure
├── styles.css          # Complete design system & styles
├── script.js           # JavaScript with Firebase integration
├── logo.png            # HeatBox logo
├── README.md           # This file
└── FIREBASE_SETUP.md   # Firebase configuration guide
```

---

## 🚀 Quick Start

### Option 1: Open Locally (No Server Required)

1. Simply double-click `index.html` to open in your browser
2. The website will work, but Firebase features won't function until configured

### Option 2: Run with Local Server (Recommended)

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server -p 8000

# Using PHP (if installed)
php -S localhost:8000
```

Then open: `http://localhost:8000`

---

## 🔧 Firebase Setup (REQUIRED for Waitlist Form)

The waitlist form requires Firebase Firestore to store submissions. Follow these steps:

### Step 1: Create Firebase Project (FREE)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `heatbox-waitlist` (or your choice)
4. Disable Google Analytics (optional, not needed)
5. Click **"Create project"**

### Step 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location: `asia-south1` (Mumbai) or closest to you
5. Click **"Enable"**

### Step 3: Configure Security Rules

1. In Firestore, click **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{document} {
      // Allow anyone to create (submit form)
      allow create: if true;
      
      // Only authenticated users can read/update/delete
      allow read, update, delete: if false;
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll to **"Your apps"** section
3. Click **"Web"** icon (`</>`)
4. Register app name: `HeatBox Website`
5. Copy the `firebaseConfig` object

### Step 5: Update script.js

1. Open `script.js`
2. Find the `firebaseConfig` object (lines 6-13)
3. Replace with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

4. Save the file

### Step 6: Test the Form

1. Open the website
2. Scroll to "Join the Waitlist" section
3. Fill out the form and submit
4. Check Firebase Console > Firestore Database
5. You should see a new entry in the `waitlist` collection

---

## 📊 Viewing Waitlist Data

### In Firebase Console:

1. Go to **Firestore Database**
2. Click on **"waitlist"** collection
3. View all submissions with timestamps

### Export to CSV:

Firebase doesn't have built-in CSV export, but you can:

1. Use [Firestore Export Tool](https://github.com/dalenguyen/firestore-backup-restore)
2. Or use this simple script in Firebase Console:

```javascript
// Go to Firestore > Open browser console > Run this:
db.collection('waitlist').get().then(snapshot => {
    const data = snapshot.docs.map(doc => doc.data());
    console.table(data);
    // Copy and paste into Excel/Google Sheets
});
```

---

## 🎨 Design Features

### Modern Aesthetics
- Dark mode with glassmorphism effects
- Orange/red gradient accent colors matching the logo
- Smooth animations and micro-interactions
- Premium, trust-focused design

### Responsive Design
- Mobile-first approach
- Works perfectly on all screen sizes
- Touch-friendly interactive elements

### Performance
- Lightweight (no heavy frameworks)
- Fast loading times
- Optimized animations
- Lazy loading ready

---

## 📱 Website Sections

1. **Hero Section** - Logo, headline, CTA, trust badge
2. **Problem Section** - 4 key problems HeatBox solves
3. **How It Works** - 3-step explanation with visuals
4. **Comparison Table** - HeatBox vs Normal Lunch Box
5. **Safety Section** - 4 safety features + documentation note
6. **Target Audience** - 4 user personas
7. **Pricing Section** - Expected price ranges (transparent)
8. **Waitlist Form** - Data collection with Firebase
9. **FAQ Section** - 5 common questions
10. **Footer** - Contact, disclaimer, founders section

---

## 🔒 Security & Privacy

### Form Validation
- Email format validation
- Phone number validation (optional field)
- Required field checks
- XSS protection via Firebase

### Firebase Security
- Write-only access for form submissions
- No public read access to protect user data
- Server-side timestamps
- Rate limiting (configure in Firebase)

### Data Collected
- Name
- Email
- City
- Intended use
- Price comfort range
- Phone (optional)
- Timestamp

---

## 🎯 SEO Best Practices

✅ Proper title tags and meta descriptions  
✅ Semantic HTML5 structure  
✅ Single H1 per page with hierarchy  
✅ Descriptive alt text ready for images  
✅ Fast page load times  
✅ Mobile-responsive  
✅ Clean URL structure  

---

## 🚀 Deployment Options

### Option 1: Netlify (Recommended - FREE)

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop the `HeatBox` folder
3. Your site is live instantly!
4. Free SSL certificate included
5. Custom domain support

### Option 2: Vercel (FREE)

1. Go to [Vercel](https://vercel.com/)
2. Import the project
3. Deploy with one click
4. Free SSL and custom domain

### Option 3: Firebase Hosting (FREE)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 4: GitHub Pages (FREE)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch
5. Your site is live at `username.github.io/heatbox`

---

## 📧 Contact Email Setup

Update the contact email in:
- `index.html` (line 589): Change `hello@heatbox.in`
- `script.js` (line 234): Change `hello@heatbox.in`

---

## 🎨 Customization Guide

### Change Colors

Edit `styles.css` (lines 6-15):

```css
--color-primary: #FF6B35;        /* Main orange */
--color-secondary: #F7931E;      /* Secondary orange */
--color-accent: #FFB84D;         /* Light accent */
```

### Update Pricing

Edit `index.html` (lines 367-385):
- Change `₹299 – ₹499` for HeatBox
- Change `₹5 – ₹10` for cartridges

### Add Founders Section

Edit `index.html` (lines 577-580):
Replace placeholder with actual founder information

---

## 📈 Analytics Setup (Optional)

### Google Analytics

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

The script.js already tracks:
- Scroll depth (25%, 50%, 75%, 100%)
- CTA button clicks
- Waitlist signups

---

## 🐛 Troubleshooting

### Form Not Submitting

1. Check browser console for errors
2. Verify Firebase config is correct
3. Check Firestore security rules
4. Ensure internet connection is active

### Logo Not Showing

1. Verify `logo.png` is in the same folder as `index.html`
2. Check file name is exactly `logo.png` (case-sensitive)
3. Clear browser cache

### Styles Not Loading

1. Verify `styles.css` is in the same folder
2. Check for typos in file name
3. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## 📝 Next Steps

1. ✅ Configure Firebase (see FIREBASE_SETUP.md)
2. ✅ Test the waitlist form
3. ✅ Update contact email
4. ✅ Add founder information
5. ✅ Deploy to hosting platform
6. ✅ Set up custom domain (optional)
7. ✅ Add Google Analytics (optional)
8. ✅ Share with potential users!

---

## 🤝 Support

For questions or issues:
- Email: hello@heatbox.in (update with your email)
- Check Firebase Console for form submissions
- Review browser console for JavaScript errors

---

## 📄 License

This website is proprietary to HeatBox. All rights reserved.

---

**Built with ❤️ for HeatBox - Making hot food accessible anywhere.**
