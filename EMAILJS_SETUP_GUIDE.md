# EmailJS Setup & Troubleshooting Guide

## ✅ Quick Checklist

1. **Restart your dev server** after adding/changing `.env` file
   ```bash
   # Stop the server (Ctrl+C) and restart:
   npm run dev
   ```

2. **Check browser console** when registering a user
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for email-related logs (📧, ✅, or ❌)

3. **Verify EmailJS Template Setup**

## 📧 EmailJS Template Configuration

Your template ID: `template_xyfn06p`

### Required Template Variables

In your EmailJS template, you MUST include these variables:

**To Email (Required):**
- Variable: `{{to_email}}`
- Value: Will be `raju14102003@gmail.com`

**Subject Line:**
```
{{subject}}
```
OR hardcode it as:
```
New User Registration
```

**Email Body - Minimum Required:**
```
Name: {{user_name}}
Email: {{user_email}}
```

**Full Email Body (Recommended):**
```
Hello Admin,

A new user has registered on your platform.

User Details:
- Name: {{user_name}}
- Email: {{user_email}}
- Registration Method: {{registration_method}}
- Registration Date: {{registration_date}}
- User UID: {{user_uid}}

Please review this registration.
```

### Important Notes:

1. **To Email Field**: In EmailJS template settings, make sure the "To Email" field uses `{{to_email}}` variable, OR set it directly to `raju14102003@gmail.com`

2. **Template Variables**: All variables must match exactly (case-sensitive):
   - `{{user_name}}` ✓
   - `{{user_email}}` ✓
   - `{{registration_method}}` ✓
   - `{{registration_date}}` ✓
   - `{{user_uid}}` ✓
   - `{{to_email}}` ✓
   - `{{to_name}}` ✓
   - `{{subject}}` ✓
   - `{{message}}` ✓

## 🔍 Troubleshooting Steps

### Step 1: Check Console Logs

When you register a user, check the browser console for:

**Success:**
```
📧 Attempting to send registration email...
EmailJS Config Check: { serviceId: '✓ Set', templateId: '✓ Set', publicKey: '✓ Set' }
📤 Sending email with params: ...
✅ Registration email sent successfully!
📬 Email should arrive at: raju14102003@gmail.com
```

**If you see errors:**
- `❌ EmailJS is not configured` → Restart dev server
- `❌ Failed to send registration email` → Check template setup
- `⚠️ Bad Request (400)` → Template variables don't match
- `⚠️ Unauthorized (401)` → Public key is wrong

### Step 2: Verify EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Check **Email Templates** → `template_xyfn06p`
   - Verify template exists
   - Check "To Email" field is set correctly
   - Verify all variables are in the template

3. Check **Email Services** → `service_c7kis1kS`
   - Verify service is connected
   - Check if service is active

4. Check **Account** → **General**
   - Verify Public Key matches: `WR8p8tjk8dVd_JemJ`

### Step 3: Test EmailJS Directly

You can test if EmailJS is working by running this in browser console:

```javascript
// Test EmailJS connection
emailjs.init('WR8p8tjk8dVd_JemJ')
emailjs.send('service_c7kis1kS', 'template_xyfn06p', {
  to_email: 'raju14102003@gmail.com',
  to_name: 'Admin',
  user_name: 'Test User',
  user_email: 'test@example.com',
  registration_method: 'Email/Password',
  registration_date: new Date().toLocaleString(),
  user_uid: 'test-uid',
  subject: 'Test Registration',
  message: 'This is a test message'
}).then(() => {
  console.log('✅ Test email sent!')
}).catch((error) => {
  console.error('❌ Test failed:', error)
})
```

## 🚨 Common Issues & Solutions

### Issue 1: "EmailJS is not configured"
**Solution:** 
- Make sure `.env` file exists in project root
- Restart dev server after creating/modifying `.env`
- Check that variables start with `VITE_`

### Issue 2: "Bad Request (400)"
**Solution:**
- Check EmailJS template variables match exactly
- Make sure "To Email" field in template is set correctly
- Verify template ID is correct: `template_xyfn06p`

### Issue 3: "Unauthorized (401)"
**Solution:**
- Verify Public Key is correct: `WR8p8tjk8dVd_JemJ`
- Check if Public Key is active in EmailJS dashboard

### Issue 4: Email not received
**Solution:**
- Check spam/junk folder
- Verify email service in EmailJS is connected and active
- Check EmailJS dashboard → Logs to see if email was sent
- Make sure "To Email" in template is `raju14102003@gmail.com`

## 📝 Current Configuration

- **Service ID:** `service_c7kis1kS`
- **Template ID:** `template_xyfn06p`
- **Public Key:** `WR8p8tjk8dVd_JemJ`
- **Recipient Email:** `raju14102003@gmail.com`

## 🆘 Still Not Working?

1. Check EmailJS dashboard → **Logs** section to see if emails are being sent
2. Verify your email service (Gmail/Outlook) is properly connected in EmailJS
3. Check browser console for detailed error messages
4. Make sure you're testing with a NEW registration (not an existing user login)

