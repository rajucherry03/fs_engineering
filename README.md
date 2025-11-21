# FSE Consultancy Services

A modern, responsive website for FullStack Engineering Consultancy Services built with React, Vite, TailwindCSS, and Firebase.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, TailwindCSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Firebase Integration**: Authentication, Firestore database, and cloud storage
- **Component-Based Architecture**: Reusable and maintainable code structure
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Performance Optimized**: Fast loading with Vite's build system

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS with custom design system
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fse-consultancy-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Then update the `.env` file with your Firebase configuration.

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore Database, and Storage
3. Copy your Firebase configuration to the `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### EmailJS Setup (for Registration Notifications)

The app sends email notifications to `raju14102003@gmail.com` when new users register. To enable this feature:

1. **Sign up for EmailJS** (free tier available):
   - Go to [EmailJS](https://www.emailjs.com/)
   - Create a free account

2. **Create an Email Service**:
   - In EmailJS dashboard, go to "Email Services"
   - Add a new service (Gmail, Outlook, etc.)
   - Follow the setup instructions for your email provider

3. **Create an Email Template**:
   - Go to "Email Templates" in EmailJS dashboard
   - Create a new template
   - Use these template variables in your email:
     - `{{to_email}}` - Recipient email (will be raju14102003@gmail.com)
     - `{{to_name}}` - Recipient name
     - `{{user_name}}` - New user's name
     - `{{user_email}}` - New user's email
     - `{{registration_method}}` - Registration method (Google OAuth or Email/Password)
     - `{{registration_date}}` - Registration date and time
     - `{{user_uid}}` - Firebase user UID
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message body

4. **Get your credentials**:
   - Go to "Account" → "General" to find your Public Key
   - Copy your Service ID from "Email Services"
   - Copy your Template ID from "Email Templates"

5. **Add to `.env` file**:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: If EmailJS is not configured, the app will still work normally, but registration emails will not be sent (a warning will be logged to the console).

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About page
│   ├── Services.tsx    # Services page
│   ├── Projects.tsx    # Projects page
│   ├── Contact.tsx     # Contact page
│   ├── Login.tsx       # Authentication page
│   ├── Careers.tsx     # Careers page
│   └── Gallery.tsx     # Gallery page
├── lib/                # Utility libraries
│   └── firebase.ts     # Firebase configuration
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Design System

The project uses a custom design system built on TailwindCSS:

- **Primary Colors**: Blue-based color palette
- **Typography**: Inter font family
- **Components**: Custom button styles, cards, and form elements
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase hosting:
   ```bash
   firebase init hosting
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

## 📱 Pages

- **Home**: Hero section, services overview, projects showcase
- **About**: Company information, team, workflow
- **Services**: Detailed service offerings with images
- **Projects**: Portfolio of completed projects
- **Contact**: Contact form with validation
- **Login**: Authentication for users
- **Careers**: Job openings and company benefits
- **Gallery**: Project gallery with filtering

## 🔒 Authentication

The app includes Firebase Authentication for:
- User registration and login (Email/Password and Google OAuth)
- Protected routes
- User profile management
- **Registration Email Notifications**: When a new user registers (via email/password or Google), an email notification is automatically sent to `raju14102003@gmail.com` with the user's registration details

## 📊 Database Structure

Firestore collections:
- `users` - User profiles
- `projects` - Project information
- `contacts` - Contact form submissions
- `careers` - Job applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email chilakapatil247@gmail.com or call +91 63029 91175.

---

Built with ❤️ by FullStack Engineering Consultancy Services
