# How to Set User's Email as "From" Email in Contact Form

## Code Updated ✅

The code has been updated to send the user's email as the `from_email` parameter.

## EmailJS Template Configuration

### Important Note:
EmailJS typically requires the "From Email" to be a verified email address from your EmailJS service. However, you can configure it to show the user's email in the "From Name" field, which will display as:

**`user@example.com <your-service-email@gmail.com>`**

### Step-by-Step Setup:

1. **Go to EmailJS Dashboard:**
   - Visit: https://dashboard.emailjs.com/admin/template
   - Click on template: `template_4dbnsbf`

2. **Configure "From Name" Field:**
   - Find the **"From Name"** field in template settings
   - Set it to: `{{from_name}}` or `{{contact_email}}`
   - This will show the user's email address as the sender name

3. **Configure "From Email" Field:**
   - Find the **"From Email"** field
   - Try setting it to: `{{from_email}}` or `{{contact_email}}`
   - **Note:** If EmailJS doesn't allow this (for security), it will use your service email, but the "From Name" will still show the user's email

4. **Configure "Reply To" Field:**
   - Set **"Reply To"** to: `{{reply_to}}` or `{{contact_email}}`
   - This ensures replies go directly to the user's email

### What You'll See:

**Best Case (if EmailJS allows):**
- From: `user@example.com` (user's email)

**Typical Case (EmailJS security):**
- From: `user@example.com <your-service-email@gmail.com>`
- Reply To: `user@example.com` (replies go to user)

### Alternative: Show User's Email in From Name

If EmailJS doesn't allow changing the From Email, you can format the From Name to include both:

1. Set **"From Name"** to: `{{contact_name}} <{{contact_email}}>`
   - This will show: `John Doe <john@example.com> <service-email@gmail.com>`

2. Or set **"From Name"** to: `{{contact_email}}`
   - This will show: `john@example.com <service-email@gmail.com>`

## Current Configuration:

The code now sends:
- `from_name`: User's email address
- `from_email`: User's email address  
- `reply_to`: User's email address
- `contact_email`: User's email address

All of these are available as template variables in EmailJS.

## Testing:

1. Submit the contact form with a test email
2. Check your email at `rajuedusbs@gmail.com`
3. The "From" field should show the user's email (either directly or as `user@example.com <service-email>`)
4. Clicking "Reply" should reply to the user's email

