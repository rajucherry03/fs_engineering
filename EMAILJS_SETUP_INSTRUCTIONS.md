# EmailJS Template Setup Instructions

## Why the Design is Not Applied

If you're seeing plain text emails instead of the professional HTML design, it's because:

1. **EmailJS template is not set to HTML mode**
2. **Template content wasn't pasted correctly**
3. **Template variables aren't being used**

## Step-by-Step Fix for Contact Form Template

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/admin/template
2. Click on your template: **`template_4dbnsbf`**

### Step 2: Switch to HTML Mode
1. In the template editor, look for a toggle or dropdown that says **"Content Type"** or **"Format"**
2. Make sure it's set to **"HTML"** (not "Text" or "Plain Text")
3. If you see a "Rich Text" editor, switch to **"HTML"** or **"Code"** view

### Step 3: Clear Existing Content
1. Select all existing content in the template editor
2. Delete it completely

### Step 4: Paste the HTML Template
1. Open the file: **`CONTACT_EMAILJS_TEMPLATE_SIMPLE.html`**
2. Copy **ALL** the content (from `<div style="font-family...` to the closing `</div>`)
3. Paste it into the EmailJS template editor

### Step 5: Configure Email Fields

In the EmailJS template settings (usually on the right side or top):

1. **To Email:**
   - Set to: `{{to_email}}` OR directly to `rajuedusbs@gmail.com`

2. **From Name:**
   - Set to: `{{from_name}}` OR `FSE Consultancy - Contact Form`

3. **Reply To:**
   - Set to: `{{reply_to}}` OR `{{contact_email}}`

4. **Subject:**
   - Set to: `{{subject}}` OR `New Contact Form Submission - {{contact_name}}`

### Step 6: Save the Template
1. Click **"Save"** button
2. Make sure you see a success message

## Important Notes

### Template Variables Available:
- `{{to_name}}` - Admin
- `{{to_email}}` - rajuedusbs@gmail.com
- `{{contact_name}}` - User's name
- `{{contact_email}}` - User's email
- `{{service_interest}}` - Selected service
- `{{message}}` - User's message
- `{{submission_date}}` - Date/time
- `{{subject}}` - Email subject
- `{{reply_to}}` - Reply-to email
- `{{from_name}}` - Sender name

### Common Issues:

1. **Still seeing plain text?**
   - Make sure Content Type is set to "HTML"
   - Check that you pasted the entire HTML code
   - Try using the simplified version: `CONTACT_EMAILJS_TEMPLATE_SIMPLE.html`

2. **Variables not showing?**
   - Make sure variable names match exactly (case-sensitive)
   - Variables should be in double curly braces: `{{variable_name}}`

3. **Design looks broken?**
   - Some email clients strip certain CSS
   - The simplified version uses inline styles which work better
   - Test by sending a test email from EmailJS dashboard

## Testing

1. **Test from EmailJS Dashboard:**
   - In your template, click "Test" or "Send Test Email"
   - Fill in sample values for variables
   - Send to your email
   - Check if HTML design appears

2. **Test from Your Website:**
   - Fill out the contact form
   - Submit it
   - Check your email at `rajuedusbs@gmail.com`
   - The email should have the professional design

## Alternative: Use the Simplified Template

If the full HTML template doesn't work, use the simplified version:
- File: `CONTACT_EMAILJS_TEMPLATE_SIMPLE.html`
- Uses div-based layout instead of tables
- More compatible with EmailJS
- Still looks professional

## Still Not Working?

1. Check browser console for errors when submitting the form
2. Verify all environment variables are set correctly
3. Make sure you restarted the dev server after adding `.env` variables
4. Check EmailJS dashboard → Logs to see if emails are being sent

