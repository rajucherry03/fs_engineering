# Fix: Use User's Email as "From Email" in EmailJS

## Problem
EmailJS is using the default service email instead of the user's email because the "Use Default Email Address" checkbox is checked.

## Solution: Uncheck "Use Default Email Address"

### For Contact Form Template (`template_4dbnsbf`):

1. **Go to EmailJS Dashboard:**
   - Visit: https://dashboard.emailjs.com/admin/template
   - Click on template: `template_4dbnsbf`

2. **Find "From Email" Field:**
   - Look for the "From Email" field in the template settings
   - You'll see a checkbox: **"Use Default Email Address"** with a `(?)` icon

3. **Uncheck the Checkbox:**
   - **UNCHECK** the "Use Default Email Address" checkbox
   - This allows you to use a custom email address

4. **Set From Email to Variable:**
   - In the "From Email" input field, enter: `{{from_email}}` or `{{contact_email}}`
   - This will use the user's email from the form

5. **Set From Name:**
   - In "From Name" field, enter: `{{from_name}}` or `{{contact_email}}`
   - This will show the user's email as the sender name

6. **Save the Template:**
   - Click "Save" button

### For Registration Template (`template_xyfn06p`):

1. **Go to EmailJS Dashboard:**
   - Visit: https://dashboard.emailjs.com/admin/template
   - Click on template: `template_xyfn06p`

2. **Find "From Email" Field:**
   - Look for the "From Email" field
   - Find the checkbox: **"Use Default Email Address"**

3. **Uncheck the Checkbox:**
   - **UNCHECK** the "Use Default Email Address" checkbox

4. **Set From Email to Variable:**
   - In "From Email" field, enter: `{{from_email}}` or `{{user_email}}`

5. **Set From Name:**
   - In "From Name" field, enter: `{{from_name}}` or `{{user_email}}`

6. **Save the Template:**
   - Click "Save" button

## Important Notes:

### EmailJS Security Restriction:
⚠️ **Note:** EmailJS may still require the "From Email" to be a verified email address for security reasons. If EmailJS doesn't allow using the user's email directly, you have two options:

**Option 1: Use User's Email in From Name (Recommended)**
- Keep "Use Default Email Address" checked
- Set "From Name" to: `{{user_email}}` or `{{contact_email}}`
- Set "Reply To" to: `{{user_email}}` or `{{contact_email}}`
- Result: `user@example.com <service-email@gmail.com>` (but replies go to user)

**Option 2: Try Unchecking (May Work)**
- Uncheck "Use Default Email Address"
- Set "From Email" to: `{{from_email}}`
- If EmailJS allows it, the user's email will be used
- If not, you'll get an error and need to use Option 1

## Current Code Configuration:

Both templates are now sending:
- ✅ `from_name`: User's email address
- ✅ `from_email`: User's email address
- ✅ `reply_to`: User's email address

## Testing:

1. **Uncheck "Use Default Email Address"** in both templates
2. **Set From Email** to `{{from_email}}` or the appropriate variable
3. **Save both templates**
4. **Test:**
   - Register a new user → Check email
   - Submit contact form → Check email
5. **Check the "From" field:**
   - Should show: `user@example.com` (if EmailJS allows)
   - Or: `user@example.com <service-email@gmail.com>` (if restricted)

## Variables Available:

### Registration Template:
- `{{from_email}}` = User's email
- `{{user_email}}` = User's email
- `{{from_name}}` = User's email

### Contact Template:
- `{{from_email}}` = User's email
- `{{contact_email}}` = User's email
- `{{from_name}}` = User's email

## If It Still Doesn't Work:

If EmailJS doesn't allow custom "From Email" addresses (for security), the best alternative is:
- **From Name**: `{{user_email}}` or `{{contact_email}}`
- **Reply To**: `{{user_email}}` or `{{contact_email}}`

This way, even though the actual sender is your service email, the display name shows the user's email, and replies go directly to the user.

