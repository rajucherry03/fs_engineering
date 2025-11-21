# Fix: Registration Email Not Working on Vercel

## Problem
Registration emails work locally but not on Vercel. Contact form emails work fine.

## Root Cause
The environment variable `VITE_EMAILJS_TEMPLATE_ID` is missing or incorrectly set in Vercel.

## Solution: Verify and Fix Vercel Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: `fs_engineering`
3. Go to **Settings** → **Environment Variables**

### Step 2: Check ALL Environment Variables

Make sure you have EXACTLY these 10 variables (case-sensitive):

#### EmailJS Variables (4 required):
```
VITE_EMAILJS_SERVICE_ID = service_c7kis1k
VITE_EMAILJS_TEMPLATE_ID = template_xyfn06p
VITE_EMAILJS_CONTACT_TEMPLATE_ID = template_4dbnsbf
VITE_EMAILJS_PUBLIC_KEY = WR8p8tjk8dVd_JemJ
```

#### Firebase Variables (6 required):
```
VITE_FIREBASE_API_KEY = AIzaSyAu7c9J7QAcGFjHj0xw39QjsmvdyrC2tsQ
VITE_FIREBASE_AUTH_DOMAIN = consultancy-services-48b5d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = consultancy-services-48b5d
VITE_FIREBASE_STORAGE_BUCKET = consultancy-services-48b5d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 695440911733
VITE_FIREBASE_APP_ID = 1:695440911733:web:17e181929d9f0d2d91773c
```

### Step 3: Common Issues to Check

#### Issue 1: Wrong Variable Name
❌ **Wrong:** `VITE_EMAILJS_SERVICE_ID` = `template_xyfn06p`  
✅ **Correct:** `VITE_EMAILJS_TEMPLATE_ID` = `template_xyfn06p`

#### Issue 2: Missing Variable
- Make sure `VITE_EMAILJS_TEMPLATE_ID` exists (not just `VITE_EMAILJS_CONTACT_TEMPLATE_ID`)

#### Issue 3: Wrong Environment Selected
- Make sure all variables are selected for: **Production**, **Preview**, and **Development**

### Step 4: After Fixing Variables

1. **Redeploy your application:**
   - Go to **Deployments** tab
   - Click three dots (⋯) on latest deployment
   - Click **"Redeploy"**

2. **Or push a new commit:**
   ```powershell
   git add .
   git commit -m "Fix environment variables"
   git push origin main
   ```

### Step 5: Test and Debug

1. **Open your Vercel site**
2. **Open browser console (F12)**
3. **Register a new user**
4. **Check console for:**
   - `EmailJS Config Check:` - Should show all ✓ Set
   - `EmailJS Environment Variables:` - Shows which vars are present
   - Look for any error messages

## Expected Console Output (Success):

```
📧 Attempting to send registration email...
EmailJS Config Check: {
  serviceId: "✓ Set (service_c7k...)",
  templateId: "✓ Set (template_xyfn06p)",
  publicKey: "✓ Set (WR8p8tjk8d...)"
}
EmailJS Environment Variables: {
  VITE_EMAILJS_SERVICE_ID: "Present",
  VITE_EMAILJS_TEMPLATE_ID: "Present",
  VITE_EMAILJS_PUBLIC_KEY: "Present"
}
📤 Sending email with params: ...
✅ Registration email sent successfully!
```

## If Still Not Working:

1. **Check browser console** on Vercel site for exact error
2. **Verify variable names** match exactly (case-sensitive)
3. **Check variable values** are correct (no extra spaces)
4. **Make sure you redeployed** after adding variables
5. **Clear browser cache** and hard refresh (Ctrl+F5)

## Quick Checklist:

- [ ] `VITE_EMAILJS_SERVICE_ID` exists and = `service_c7kis1k`
- [ ] `VITE_EMAILJS_TEMPLATE_ID` exists and = `template_xyfn06p` ⚠️ **This is the one that's missing!**
- [ ] `VITE_EMAILJS_CONTACT_TEMPLATE_ID` exists and = `template_4dbnsbf`
- [ ] `VITE_EMAILJS_PUBLIC_KEY` exists and = `WR8p8tjk8dVd_JemJ`
- [ ] All variables selected for Production, Preview, Development
- [ ] Application redeployed after adding variables

