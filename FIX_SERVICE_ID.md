# Fix: Service ID Not Found Error

## 🔍 How to Find Your Correct Service ID

1. **Go to EmailJS Dashboard:**
   - Visit: https://dashboard.emailjs.com/admin/integration
   - Or: https://dashboard.emailjs.com/admin

2. **Find Your Email Service:**
   - Click on **"Email Services"** in the left sidebar
   - You should see a list of your email services
   - Look for the service you want to use (Gmail, Outlook, etc.)

3. **Copy the Service ID:**
   - Click on your email service
   - The Service ID will be displayed (it looks like: `service_xxxxxxxxx`)
   - **Copy this exact Service ID**

4. **Verify the Service is Active:**
   - Make sure the service shows as "Connected" or "Active"
   - If it's not connected, you need to set it up first

## 🔧 Update Your .env File

Once you have the correct Service ID:

1. Open your `.env` file
2. Update the `VITE_EMAILJS_SERVICE_ID` line with the correct Service ID
3. Save the file
4. **Restart your dev server** (important!)

## ⚠️ Common Issues

### Issue 1: No Service Created Yet
If you don't see any services:
1. Go to **"Email Services"** → **"Add New Service"**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions
4. Copy the Service ID after creation

### Issue 2: Service ID Format
Service IDs should look like:
- ✅ `service_abc123xyz`
- ✅ `service_c7kis1kS`
- ❌ `c7kis1kS` (missing `service_` prefix)

### Issue 3: Wrong Account
Make sure:
- The Service ID belongs to the same EmailJS account
- The Public Key matches the account that owns the service

## 📝 Quick Fix Steps

1. Get correct Service ID from EmailJS dashboard
2. Update `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_correct_service_id_here
   ```
3. Restart dev server
4. Test registration again

