# 🔥 Firebase Setup Guide for HeatBox

This guide will walk you through setting up Firebase Firestore to collect waitlist submissions from your HeatBox website.

---

## Why Firebase?

✅ **100% FREE** for your use case (generous free tier)  
✅ **No credit card required**  
✅ **Real-time database** with automatic backups  
✅ **Scalable** - handles thousands of submissions  
✅ **Secure** - industry-standard security  
✅ **Easy export** - get your data anytime  

---

## Step-by-Step Setup

### 1️⃣ Create Firebase Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account (create one if needed)
3. It's completely free - no payment info required

---

### 2️⃣ Create New Project

1. Click **"Add project"** or **"Create a project"**
2. **Project name**: Enter `heatbox-waitlist` (or any name you prefer)
3. Click **"Continue"**
4. **Google Analytics**: Toggle OFF (not needed for waitlist)
5. Click **"Create project"**
6. Wait 30-60 seconds for project creation
7. Click **"Continue"** when ready

---

### 3️⃣ Set Up Firestore Database

1. In the left sidebar, click **"Build"** > **"Firestore Database"**
2. Click **"Create database"** button
3. **Secure rules**: Select **"Start in production mode"**
4. Click **"Next"**
5. **Location**: Choose **"asia-south1 (Mumbai)"** for India, or closest to your target audience
6. Click **"Enable"**
7. Wait for database creation (30-60 seconds)

---

### 4️⃣ Configure Security Rules

**IMPORTANT**: This step allows form submissions while protecting user data.

1. In Firestore Database, click the **"Rules"** tab at the top
2. You'll see default rules - **DELETE ALL** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Waitlist collection rules
    match /waitlist/{document} {
      // Allow anyone to create new entries (submit form)
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'city', 'intendedUse', 'priceComfort'])
                    && request.resource.data.name is string
                    && request.resource.data.email is string
                    && request.resource.data.email.matches('.*@.*[.].*')
                    && request.resource.data.city is string
                    && request.resource.data.intendedUse is string
                    && request.resource.data.priceComfort is string;
      
      // Prevent public reading of submissions (privacy)
      allow read, update, delete: if false;
    }
  }
}
```

3. Click **"Publish"** button
4. Confirm by clicking **"Publish"** again in the dialog

**What these rules do:**
- ✅ Allow anyone to submit the form (create entries)
- ✅ Validate that required fields are present
- ✅ Validate email format
- ❌ Prevent public access to read submissions (only you can see them in Firebase Console)
- ❌ Prevent editing or deleting submissions

---

### 5️⃣ Get Your Firebase Configuration

1. Click the **gear icon** ⚙️ next to "Project Overview" in the left sidebar
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`  (it looks like `</>`)
5. **App nickname**: Enter `HeatBox Website`
6. **Firebase Hosting**: Leave UNCHECKED (we'll use other hosting)
7. Click **"Register app"**
8. You'll see a code snippet - **COPY** the `firebaseConfig` object

It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "heatbox-waitlist.firebaseapp.com",
  projectId: "heatbox-waitlist",
  storageBucket: "heatbox-waitlist.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

9. Click **"Continue to console"**

---

### 6️⃣ Update Your Website Code

1. Open `script.js` in a text editor (Notepad, VS Code, etc.)
2. Find lines 6-13 (the `firebaseConfig` section)
3. **Replace** the placeholder config with YOUR actual config from step 5
4. **Save** the file

**Before:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // ... etc
};
```

**After (with your real values):**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "heatbox-waitlist.firebaseapp.com",
    projectId: "heatbox-waitlist",
    storageBucket: "heatbox-waitlist.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789"
};
```

---

### 7️⃣ Test Your Form

1. Open `index.html` in a web browser
   - **IMPORTANT**: Use a local server OR deploy to hosting
   - Double-clicking the file might cause CORS issues with Firebase
   
2. **Quick local server options:**
   ```bash
   # Python (if installed)
   python -m http.server 8000
   
   # Node.js (if installed)
   npx http-server -p 8000
   ```
   Then open: `http://localhost:8000`

3. Scroll to the **"Join the Waitlist"** section
4. Fill out the form with test data:
   - Name: `Test User`
   - Email: `test@example.com`
   - City: `Mumbai`
   - Intended Use: Select any option
   - Price Comfort: Select any option
   - Phone: Leave blank or enter test number

5. Click **"Join the Waitlist"**
6. You should see: **"🎉 Success! You're on the waitlist..."**

---

### 8️⃣ Verify Data in Firebase

1. Go back to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **"Firestore Database"** in left sidebar
4. You should see a **"waitlist"** collection
5. Click on it to see your test submission
6. You'll see all the form data + timestamp

**Data structure:**
```
waitlist (collection)
  └── [auto-generated-id] (document)
      ├── name: "Test User"
      ├── email: "test@example.com"
      ├── city: "Mumbai"
      ├── intendedUse: "student"
      ├── priceComfort: "300-500"
      ├── phone: "+91 XXXXX XXXXX"
      ├── timestamp: [server timestamp]
      └── submittedAt: "2026-01-02T10:52:56.000Z"
```

---

## 📊 Viewing & Exporting Data

### View in Firebase Console

1. Go to **Firestore Database**
2. Click **"waitlist"** collection
3. Browse all submissions
4. Click any document to see full details
5. Filter by date, search by email, etc.

---

### Export to CSV/Excel

Firebase doesn't have a built-in CSV export button, but here are 3 easy methods:

#### Method 1: Manual Copy-Paste (Small datasets)

1. In Firestore, click on each document
2. Copy the data
3. Paste into Excel/Google Sheets

#### Method 2: Browser Console Script (Recommended)

1. Open Firebase Console > Firestore Database
2. Press `F12` to open browser console
3. Paste this code and press Enter:

```javascript
// Get all waitlist entries
firebase.firestore().collection('waitlist').get().then(snapshot => {
    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toISOString() || 'N/A'
    }));
    
    // Display as table
    console.table(data);
    
    // Convert to CSV
    const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'heatbox-waitlist.csv';
    a.click();
});
```

This will download a CSV file with all your waitlist data!

#### Method 3: Use Firebase Admin SDK (Advanced)

For large datasets or automated exports, use the Firebase Admin SDK with Node.js.

---

## 🔒 Security Best Practices

### ✅ What's Protected

- User submissions are write-only (can't be read publicly)
- Only you can view data in Firebase Console
- Email validation prevents invalid entries
- Rate limiting can be added if needed

### ✅ Recommended Additional Security

1. **Enable App Check** (prevents API abuse):
   - Go to Firebase Console > Build > App Check
   - Register your domain
   - Enforce App Check

2. **Set up Email Notifications**:
   - Use Firebase Cloud Functions to email you on new submissions
   - Requires Firebase Blaze plan (pay-as-you-go, but still free for low usage)

3. **Add reCAPTCHA** (prevent spam):
   - Add Google reCAPTCHA v3 to your form
   - Free and easy to integrate

---

## 💰 Pricing & Limits

### Free Tier (Spark Plan)

**What you get for FREE:**
- 50,000 document reads/day
- 20,000 document writes/day
- 20,000 document deletes/day
- 1 GB storage
- 10 GB/month network egress

**For your waitlist:**
- Each form submission = 1 write
- You can collect **20,000 submissions/day** for FREE
- More than enough for a pre-launch waitlist!

### When to Upgrade

You'll likely **never need to upgrade** for a waitlist. But if you do:
- Blaze plan (pay-as-you-go)
- Only pay for what you use beyond free tier
- Still very affordable (cents per thousand operations)

---

## 🐛 Troubleshooting

### Error: "Firebase not initialized"

**Solution**: Make sure you've updated `script.js` with your actual Firebase config (Step 6)

---

### Error: "Permission denied"

**Solution**: Check your Firestore security rules (Step 4). Make sure you published them.

---

### Form submits but no data in Firebase

**Solution**: 
1. Check browser console for errors (F12)
2. Verify you're using a local server or deployed site (not `file://`)
3. Check Firebase Console > Firestore > Rules to ensure they're published

---

### CORS errors

**Solution**: Don't open `index.html` directly. Use a local server:
```bash
python -m http.server 8000
# or
npx http-server -p 8000
```

---

## 📧 Email Notifications (Optional)

Want to get emailed when someone joins the waitlist?

### Option 1: Zapier (No Code)

1. Sign up for [Zapier](https://zapier.com/) (free plan)
2. Create a Zap: Firebase Firestore → Gmail/Email
3. Trigger: New document in `waitlist` collection
4. Action: Send email to yourself

### Option 2: Firebase Cloud Functions (Code Required)

Requires Firebase Blaze plan (pay-as-you-go, but free for low usage):

```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.notifyOnWaitlistSignup = functions.firestore
    .document('waitlist/{docId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        
        // Send email using nodemailer
        // (Configure your email service)
        
        console.log('New waitlist signup:', data.email);
    });
```

---

## 🎯 Next Steps

1. ✅ Complete Firebase setup (Steps 1-8)
2. ✅ Test form submission
3. ✅ Verify data appears in Firebase
4. ✅ Deploy your website (see README.md)
5. ✅ Share with potential users!
6. ✅ Monitor submissions in Firebase Console
7. ✅ Export data periodically for analysis

---

## 🆘 Need Help?

### Firebase Documentation
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Common Issues
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)

---

**You're all set! 🎉 Your waitlist is ready to collect early access signups for HeatBox.**
