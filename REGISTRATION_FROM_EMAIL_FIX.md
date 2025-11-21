# Fix: Use Registered User's Email as "From" Email

## Problem
The registration email is showing `raju14102003@gmail.com` (your service email) instead of the registered user's email.

## Solution: Uncheck "Use Default Email Address"

### Step-by-Step for Registration Template (`template_xyfn06p`):

1. **Go to EmailJS Dashboard:**
   - Visit: https://dashboard.emailjs.com/admin/template
   - Click on template: `template_xyfn06p`

2. **Find "From Email" Section:**
   - Look for the "From Email" field
   - You'll see a checkbox: **"Use Default Email Address"** with a `(?)` icon

3. **Uncheck the Checkbox:**
   - **UNCHECK** the "Use Default Email Address" checkbox
   - This is the key step! The checkbox must be unchecked.

4. **Set "From Email" Field:**
   - After unchecking, the "From Email" input field should become active/enabled
   - Enter: `{{from_email}}` or `{{user_email}}`
   - This will use the registered user's email

5. **Set "From Name" Field:**
   - In "From Name" field, enter: `{{from_name}}` or `{{user_email}}`
   - This will show the user's email as the sender name

6. **Set "Reply To" Field:**
   - In "Reply To" field, enter: `{{reply_to}}` or `{{user_email}}`
   - This ensures replies go to the user

7. **Save the Template:**
   - Click "Save" button at the bottom
   - Make sure you see a success message

## Complete Registration Template Settings:

| Field | Value |
|-------|-------|
| **To Email** | `{{to_email}}` |
| **From Name** | `{{user_email}}` |
| **From Email** | `{{user_email}}` ⚠️ (with checkbox UNCHECKED) |
| **Reply To** | `{{user_email}}` |
| **Subject** | `{{subject}}` |

## Visual Guide:

**Before (Wrong):**
- ☑️ Use Default Email Address (CHECKED)
- From Email: [disabled/greyed out]
- Result: `raju14102003@gmail.com`

**After (Correct):**
- ☐ Use Default Email Address (UNCHECKED)
- From Email: `{{user_email}}`
- Result: `example@gmail.com` (user's email)

## Important Notes:

### If EmailJS Doesn't Allow Custom From Email:
Some EmailJS services may not allow custom "From Email" addresses for security reasons. If you get an error after unchecking:

**Alternative Solution:**
- Keep "Use Default Email Address" checked
- Set "From Name" to: `{{user_email}}`
- Set "Reply To" to: `{{user_email}}`
- Result: `example@gmail.com <raju14102003@gmail.com>` (but replies go to user)

### Code is Already Correct:
The code is already sending the user's email:
- ✅ `from_email: registrationData.userEmail`
- ✅ `from_name: registrationData.userEmail`
- ✅ `reply_to: registrationData.userEmail`

The issue is just the EmailJS template configuration.

## Testing:

1. **Uncheck "Use Default Email Address"** in registration template
2. **Set From Email** to `{{user_email}}`
3. **Save the template**
4. **Register a new user** on your website
5. **Check your email** - the "From" should now show the user's email

## Troubleshooting:

**Still showing your email?**
- Make sure the checkbox is UNCHECKED (not checked)
- Make sure you saved the template
- Try using `{{from_email}}` instead of `{{user_email}}`
- Check browser console for any errors when registering

**Getting an error?**
- EmailJS may not allow custom from emails (security restriction)
- Use the alternative solution above (From Name + Reply To)

