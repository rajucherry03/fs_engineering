import emailjs from '@emailjs/browser'

interface RegistrationData {
  userName: string
  userEmail: string
  userMobile: string
  registrationMethod: 'email' | 'google'
  registrationDate: string
  userUid?: string
}

interface ContactFormData {
  name: string
  email: string
  service: string
  message: string
}

/**
 * Sends a registration notification email to the admin
 * @param registrationData - User registration details
 * @returns Promise that resolves when email is sent
 */
export const sendRegistrationEmail = async (registrationData: RegistrationData): Promise<void> => {
  try {
    console.log('📧 Attempting to send registration email...', registrationData)
    
    // EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xyfn06p'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    console.log('EmailJS Config Check:', {
      serviceId: serviceId ? `✓ Set (${serviceId.substring(0, 10)}...)` : '✗ Missing',
      templateId: templateId ? `✓ Set (${templateId})` : '✗ Missing',
      publicKey: publicKey ? `✓ Set (${publicKey.substring(0, 10)}...)` : '✗ Missing'
    })
    
    // Log actual values for debugging (first few characters only for security)
    console.log('EmailJS Environment Variables:', {
      VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'Present' : 'Missing',
      VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? 'Present' : 'Missing (using fallback)',
      VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing'
    })

    // Check if EmailJS is configured
    if (!serviceId || !publicKey) {
      console.error('❌ EmailJS is not configured. Registration email will not be sent.')
      console.error('Missing required values:', {
        serviceId: !serviceId,
        publicKey: !publicKey
      })
      console.error('Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY in Vercel environment variables')
      console.error('Template ID will use fallback:', templateId)
      return
    }
    
    // Template ID has fallback, so it should always be available
    if (!templateId) {
      console.error('❌ Template ID is missing even with fallback')
      return
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey)

    // Prepare email template parameters
    const templateParams = {
      to_email: 'yours.iq@gmail.com',
      to_name: 'Admin',
      from_name: `Registration System - ${registrationData.userEmail}`, // Format: "Registration System - user@email.com"
      from_email: registrationData.userEmail,
      reply_to: registrationData.userEmail,
      user_name: registrationData.userName,
      user_email: registrationData.userEmail,
      user_mobile: registrationData.userMobile,
      registration_method: registrationData.registrationMethod === 'google' ? 'Google OAuth' : 'Email/Password',
      registration_date: registrationData.registrationDate,
      user_uid: registrationData.userUid || 'N/A',
      subject: `New User Registration - ${registrationData.userName} (${registrationData.userEmail})`,
      message: `
A new user has registered on your platform.

User Details:
- Name: ${registrationData.userName}
- Email: ${registrationData.userEmail}
- Mobile Number: ${registrationData.userMobile}
- Registration Method: ${registrationData.registrationMethod === 'google' ? 'Google OAuth' : 'Email/Password'}
- Registration Date: ${registrationData.registrationDate}
- User UID: ${registrationData.userUid || 'N/A'}

Please review this registration.
      `.trim()
    }

    console.log('📤 Sending email with params:', {
      serviceId,
      templateId,
      to_email: templateParams.to_email,
      user_name: templateParams.user_name,
      user_email: templateParams.user_email,
      user_mobile: templateParams.user_mobile
    })

    // Send email using EmailJS
    const response = await emailjs.send(serviceId, templateId, templateParams)
    
    console.log('✅ Registration email sent successfully!', response)
    console.log('📬 Email should arrive at: yours.iq@gmail.com')
  } catch (error: any) {
    // Log error but don't throw - we don't want to block registration if email fails
    console.error('❌ Failed to send registration email:', error)
    console.error('Error details:', {
      message: error?.message,
      text: error?.text,
      status: error?.status
    })
    
    // Provide helpful error messages
    if (error?.text) {
      console.error('EmailJS Error:', error.text)
    }
    if (error?.status === 400) {
      console.error('⚠️ Bad Request - Check your EmailJS template variables match the parameters being sent')
    }
    if (error?.status === 401) {
      console.error('⚠️ Unauthorized - Check your EmailJS Public Key is correct')
    }
  }
}

/**
 * Sends a contact form submission email to the admin
 * @param contactData - Contact form details
 * @returns Promise that resolves when email is sent
 */
export const sendContactEmail = async (contactData: ContactFormData): Promise<void> => {
  try {
    console.log('📧 Attempting to send contact form email...', contactData)
    
    // EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_4dbnsbf'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    console.log('EmailJS Contact Config Check:', {
      serviceId: serviceId ? '✓ Set' : '✗ Missing',
      contactTemplateId: contactTemplateId ? '✓ Set' : '✗ Missing',
      publicKey: publicKey ? '✓ Set' : '✗ Missing'
    })

    // Check if EmailJS is configured
    if (!serviceId || !contactTemplateId || !publicKey) {
      console.error('❌ EmailJS is not configured. Contact email will not be sent.')
      console.error('Missing values:', {
        serviceId: !serviceId,
        contactTemplateId: !contactTemplateId,
        publicKey: !publicKey
      })
      console.error('Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_CONTACT_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file')
      return
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey)

    // Prepare email template parameters
    const templateParams = {
      to_email: 'yours.iq@gmail.com',
      to_name: 'Admin',
      from_name: `Contact Form - ${contactData.email}`, // Format: "Contact Form - user@email.com"
      from_email: contactData.email,
      reply_to: contactData.email,
      contact_name: contactData.name,
      contact_email: contactData.email,
      service_interest: contactData.service || 'Not specified',
      message: contactData.message,
      subject: `New Contact Form Submission - ${contactData.name}`,
      submission_date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
    }

    console.log('📤 Sending contact email with params:', {
      serviceId,
      contactTemplateId,
      to_email: templateParams.to_email,
      contact_name: templateParams.contact_name,
      contact_email: templateParams.contact_email,
      service_interest: templateParams.service_interest
    })

    // Send email using EmailJS
    const response = await emailjs.send(serviceId, contactTemplateId, templateParams)
    
    console.log('✅ Contact form email sent successfully!', response)
    console.log('📬 Email should arrive at: yours.iq@gmail.com')
  } catch (error: any) {
    // Log error but don't throw - we don't want to block form submission if email fails
    console.error('❌ Failed to send contact form email:', error)
    console.error('Error details:', {
      message: error?.message,
      text: error?.text,
      status: error?.status
    })
    
    // Provide helpful error messages
    if (error?.text) {
      console.error('EmailJS Error:', error.text)
    }
    if (error?.status === 400) {
      console.error('⚠️ Bad Request - Check your EmailJS template variables match the parameters being sent')
    }
    if (error?.status === 401) {
      console.error('⚠️ Unauthorized - Check your EmailJS Public Key is correct')
    }
  }
}
