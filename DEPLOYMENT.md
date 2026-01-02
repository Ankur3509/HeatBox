# 🚀 HeatBox Deployment Guide

Quick guide to deploy your HeatBox pre-launch website to the internet.

---

## 🎯 Recommended: Netlify (Easiest & FREE)

### Why Netlify?
✅ **100% Free** for static sites  
✅ **Instant deployment** - drag & drop  
✅ **Free SSL certificate** (HTTPS)  
✅ **Custom domain support**  
✅ **Automatic deployments** from Git  
✅ **Global CDN** for fast loading  

### Steps:

1. **Go to Netlify**
   - Visit [netlify.com](https://www.netlify.com/)
   - Click "Sign up" (free account)

2. **Deploy Your Site**
   
   **Option A: Drag & Drop (Fastest)**
   - Click "Add new site" > "Deploy manually"
   - Drag the entire `HeatBox` folder onto the page
   - Wait 30 seconds
   - Your site is live! 🎉

   **Option B: Connect to Git (Recommended for updates)**
   - Create a GitHub repository
   - Upload your HeatBox files
   - In Netlify: "Add new site" > "Import from Git"
   - Connect your GitHub repo
   - Click "Deploy site"
   - Every time you push to GitHub, site auto-updates!

3. **Configure Custom Domain** (Optional)
   - In Netlify dashboard, click "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., `heatbox.in`)
   - Follow DNS configuration instructions
   - Free SSL certificate is auto-generated

4. **Update Site Name**
   - By default, you get: `random-name-12345.netlify.app`
   - Click "Site settings" > "Change site name"
   - Enter: `heatbox` → becomes `heatbox.netlify.app`

---

## 🔷 Alternative: Vercel (Also Great & FREE)

### Why Vercel?
✅ **Free forever** for personal projects  
✅ **Excellent performance**  
✅ **Easy Git integration**  
✅ **Free SSL & custom domains**  

### Steps:

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com/)
   - Sign up with GitHub (free)

2. **Deploy**
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Live in 30 seconds!

3. **Custom Domain**
   - Project settings > Domains
   - Add your domain
   - Configure DNS
   - SSL auto-configured

---

## 🔥 Alternative: Firebase Hosting (FREE)

Since you're already using Firebase for the database, you can host there too!

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   cd c:/Users/aaroh/OneDrive/Desktop/HeatBox
   firebase init hosting
   ```
   
   - Select your Firebase project
   - Public directory: `.` (current directory)
   - Single-page app: `No`
   - Overwrite index.html: `No`

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

5. **Your site is live!**
   - URL: `your-project-id.web.app`
   - Also: `your-project-id.firebaseapp.com`

6. **Custom Domain**
   ```bash
   firebase hosting:channel:deploy production --domain heatbox.in
   ```

---

## 🐙 Alternative: GitHub Pages (FREE)

### Steps:

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com/)
   - Click "New repository"
   - Name: `heatbox`
   - Public repository
   - Create

2. **Upload Files**
   - Click "Upload files"
   - Drag all HeatBox files
   - Commit changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Click "Save"

4. **Your site is live!**
   - URL: `yourusername.github.io/heatbox`

5. **Custom Domain**
   - In Pages settings, add custom domain
   - Configure DNS with your domain provider

---

## 🌐 Custom Domain Setup

### Buy a Domain

**Recommended registrars:**
- [Namecheap](https://www.namecheap.com/) - Cheap, reliable
- [Google Domains](https://domains.google/) - Simple, trusted
- [GoDaddy](https://www.godaddy.com/) - Popular, support
- [Hostinger](https://www.hostinger.in/) - India-focused

**Domain suggestions:**
- `heatbox.in` (if available)
- `getheatbox.in`
- `heatbox.co`
- `heatboxindia.com`

### Configure DNS

Once you have a domain, point it to your hosting:

**For Netlify:**
1. In Netlify: Add custom domain
2. Get Netlify nameservers or DNS records
3. In your domain registrar: Update nameservers
4. Wait 24-48 hours for propagation

**For Vercel:**
1. In Vercel: Add domain
2. Get DNS records (A record or CNAME)
3. Add records in your domain DNS settings
4. Wait for verification

**For Firebase:**
```bash
firebase hosting:channel:deploy production --domain yourdomain.com
```
Follow the DNS configuration instructions.

---

## 📊 Post-Deployment Checklist

After deploying, verify:

- [ ] Website loads correctly
- [ ] Logo displays properly
- [ ] All sections are visible
- [ ] Form submission works (test it!)
- [ ] Check Firebase Console for test submission
- [ ] Mobile responsiveness (test on phone)
- [ ] HTTPS is enabled (padlock icon in browser)
- [ ] Custom domain works (if configured)
- [ ] Contact email is correct
- [ ] No console errors (F12 > Console)

---

## 🔧 Updating Your Site

### Netlify (Drag & Drop)
1. Make changes to your files
2. Go to Netlify dashboard
3. Drag updated folder to "Deploys" tab
4. Site updates in 30 seconds

### Netlify/Vercel (Git)
1. Make changes to your files
2. Commit and push to GitHub
3. Site auto-updates in 1-2 minutes

### Firebase Hosting
```bash
firebase deploy --only hosting
```

---

## 🎨 Pre-Launch Checklist

Before sharing with users:

- [ ] Firebase is configured and tested
- [ ] Contact email is updated
- [ ] Founders section is filled (or removed)
- [ ] All placeholder text is replaced
- [ ] Pricing is finalized
- [ ] FAQ answers are accurate
- [ ] Test form on mobile and desktop
- [ ] Check all links work
- [ ] Verify HTTPS is enabled
- [ ] Set up Google Analytics (optional)
- [ ] Test on different browsers (Chrome, Safari, Firefox)

---

## 📈 Marketing Your Waitlist

Once deployed, share your site:

### Social Media
- LinkedIn post about HeatBox
- Twitter/X thread explaining the problem
- Instagram story with link
- WhatsApp status with website link

### Direct Outreach
- Email to friends, family, potential users
- Post in relevant Facebook groups
- Share in hostel/student communities
- Reach out to food bloggers

### Communities
- Reddit: r/india, r/IndianFood, r/startups
- Quora: Answer questions about lunch boxes
- Product Hunt (when ready to launch)

### Content Marketing
- Write a blog post about the problem
- Create a video explaining HeatBox
- Share on Medium or LinkedIn articles

---

## 🆘 Deployment Issues?

### Site not loading
- Check if deployment completed successfully
- Verify all files were uploaded
- Check browser console for errors

### Form not working after deployment
- Verify Firebase config is correct in `script.js`
- Check Firestore security rules are published
- Test in browser console for errors

### SSL/HTTPS issues
- Wait 24 hours for SSL certificate generation
- Check domain DNS configuration
- Contact hosting support if needed

---

## 📞 Support

Need help deploying?

- **Netlify Support**: [netlify.com/support](https://www.netlify.com/support/)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)

---

**Your HeatBox website is ready to go live! 🚀**

Choose your hosting platform and deploy in minutes.
