# 🧠 MindCare - Digital Mental Health & Psychological Support System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)

A comprehensive, hybrid mobile and web application designed to provide mental health and psychological support for students in higher education. Built with modern technologies to deliver a calming, accessible, and supportive digital mental wellness platform.

## 🌟 Features

### 🎯 Core Functionality
- **📊 Interactive Dashboard** - Personalized wellness overview with mood tracking and progress analytics
- **🎮 Mental Health Games** - Interactive breathing exercises, meditation games, and stress-relief activities
- **🎵 Soothing Sounds Library** - Curated collection of nature sounds, white noise, and guided meditations
- **📚 Resources Center** - Educational content, self-help materials, and coping strategies
- **👥 Community Support** - Safe peer discussion forums and support groups
- **🤖 24/7 AI Support** - Intelligent chatbot providing round-the-clock mental health assistance
- **🆘 Emergency Support** - Crisis intervention tools with immediate access to helplines

### 🎨 User Experience
- **🌙 Dark/Light Mode** - System-adaptive theme with smooth transitions
- **📱 Responsive Design** - Seamless experience across all devices
- **♿ Accessibility First** - WCAG 2.1 compliant with screen reader support
- **🔐 Secure Authentication** - Email/password login with Google OAuth integration
- **🌍 Cross-Platform** - Single codebase for web and mobile applications

### 📈 Mental Health Tools
- **📅 Mood Calendar** - Visual mood tracking with historical data and insights
- **🧘 Mindfulness Activities** - Guided breathing exercises and relaxation techniques
- **📝 Wellness Journal** - Private space for thoughts and reflections
- **🎯 Goal Setting** - Personal wellness goals with progress tracking
- **⏰ Reminder System** - Gentle nudges for self-care activities

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (for mobile development)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindcare-app.git
   cd mindcare-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   REACT_APP_API_URL=your_api_url_here
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_WEATHER_API_KEY=your_weather_api_key
   ```

4. **Start the development server**
   ```bash
   # For web development
   npm start
   
   # For mobile development with Expo
   npx expo start
   ```

5. **Build for production**
   ```bash
   # Web build
   npm run build
   
   # Mobile build (Android APK)
   npx expo build:android
   ```

## 🏗️ Project Structure

```
mindcare-app/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 Auth/           # Authentication components
│   │   ├── 📁 Common/         # Shared components
│   │   ├── 📁 Community/      # Community forum components
│   │   ├── 📁 Dashboard/      # Dashboard widgets
│   │   ├── 📁 Games/          # Mental health games
│   │   └── 📁 Navigation/     # Navigation components
│   ├── 📁 pages/              # Main application pages
│   │   ├── 📄 Dashboard.jsx   # Main dashboard
│   │   ├── 📄 Games.jsx       # Mental health games
│   │   ├── 📄 Sounds.jsx      # Soothing sounds library
│   │   ├── 📄 Resources.jsx   # Educational resources
│   │   ├── 📄 Community.jsx   # Peer support forums
│   │   ├── 📄 AIChatbot.jsx   # 24/7 AI support
│   │   └── 📄 Emergency.jsx   # Crisis intervention
│   ├── 📁 contexts/           # React Context providers
│   │   ├── 📄 AuthContext.js  # Authentication state
│   │   ├── 📄 ThemeContext.js # Dark/light mode
│   │   └── 📄 AppContext.js   # Global app state
│   ├── 📁 utils/              # Utility functions
│   │   ├── 📄 auth.js         # Authentication helpers
│   │   ├── 📄 storage.js      # Local storage management
│   │   └── 📄 api.js          # API communication
│   ├── 📁 styles/             # Global styles and themes
│   └── 📁 assets/             # Images, icons, and media
├── 📁 public/                 # Static public assets
├── 📄 package.json            # Project dependencies
├── 📄 app.json               # Expo configuration
├── 📄 tailwind.config.js     # Tailwind CSS configuration
└── 📄 README.md              # Project documentation
```

## 🛠️ Technology Stack

### Frontend Framework
- **⚛️ React 18** - Modern React with hooks and functional components
- **📱 Expo React Native** - Cross-platform mobile development
- **🔷 TypeScript** - Type-safe development experience
- **🎨 Tailwind CSS** - Utility-first CSS framework

### State Management
- **🔄 React Context API** - Global state management
- **🗃️ Redux Toolkit** - Complex state management (where needed)
- **💾 AsyncStorage** - Persistent local storage

### Authentication & Security
- **🔐 JWT Tokens** - Secure session management
- **🔑 Google OAuth 2.0** - Social authentication
- **🛡️ Expo SecureStore** - Secure credential storage

### Additional Libraries
- **🎵 Expo Audio** - Audio playback and recording
- **📍 Expo Location** - Location services for emergency features
- **🔔 Expo Notifications** - Push notifications
- **📅 React Hook Form** - Form validation and management
- **🎭 Framer Motion** - Smooth animations and transitions

## 🎨 Design System

### Color Palette
```css
/* Light Theme */
--primary-blue: #2563eb
--primary-green: #10b981
--secondary-gray: #64748b
--accent-purple: #8b5cf6
--accent-orange: #f59e0b
--background: #ffffff
--surface: #f8fafc

/* Dark Theme */
--primary-blue-dark: #60a5fa
--primary-green-dark: #4ade80
--secondary-gray-dark: #cbd5e1
--background-dark: #0f172a
--surface-dark: #1e293b
```

### Typography
- **Primary Font**: Inter (clean, readable)
- **Secondary Font**: Poppins (friendly, approachable)
- **Font Sizes**: Responsive scale from 12px to 48px

### Components
- **Cards**: Rounded corners (12px), soft shadows
- **Buttons**: Multiple variants (primary, secondary, ghost)
- **Forms**: Floating labels, validation states
- **Navigation**: Tab-based with active state indicators

## 📱 Platform Support

### Web Browsers
- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

### Mobile Platforms
- ✅ Android (API 21+)
- ✅ iOS (13.0+)
- ✅ Progressive Web App (PWA)

### Screen Sizes
- 📱 Mobile: 320px - 767px
- 📟 Tablet: 768px - 1023px
- 💻 Desktop: 1024px+

## 🔒 Privacy & Security

### Data Protection
- **Local Storage Priority** - Sensitive data stored locally when possible
- **End-to-End Encryption** - User communications encrypted
- **HIPAA Compliance** - Healthcare data protection standards
- **No Personal Data Selling** - User privacy is paramount

### Emergency Features
- **Crisis Detection** - AI monitoring for emergency situations
- **Immediate Help Access** - One-tap emergency contacts
- **Professional Resources** - Direct connection to mental health professionals

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests with Cypress
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Testing Strategy
- **Unit Tests** - Individual component testing
- **Integration Tests** - Feature workflow testing
- **Accessibility Tests** - Screen reader and keyboard navigation
- **Cross-Platform Tests** - Web and mobile functionality

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the 'build' folder to your hosting provider
```

### Android Deployment
```bash
# Generate APK
npx expo build:android

# Generate App Bundle (recommended)
npx expo build:android -t app-bundle
```

### Environment Setup
- **Development**: Local development with hot reload
- **Staging**: Testing environment with production-like data
- **Production**: Live application with monitoring and analytics

## 📊 Analytics & Monitoring

### User Analytics
- **Privacy-First Approach** - Anonymous usage tracking
- **Mental Health Insights** - Aggregated wellness trends
- **Feature Usage** - Understanding user behavior

### Performance Monitoring
- **Real-Time Metrics** - App performance tracking
- **Error Reporting** - Crash and error monitoring
- **User Experience** - Loading times and interaction tracking

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines:

### Development Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint** configuration for code quality
- **Prettier** for consistent code formatting
- **Conventional Commits** for clear commit messages
- **Type Safety** with TypeScript

### Areas for Contribution
- 🐛 Bug fixes and stability improvements
- ✨ New mental health features and tools
- 🎨 UI/UX enhancements
- 📚 Documentation improvements
- 🧪 Testing coverage expansion
- 🌐 Internationalization (i18n)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Resources

### Emergency Contacts (India)
- **National Suicide Prevention**: 9152987821
- **KIRAN Mental Health Helpline**: 1800-599-0019
- **Vandrevala Foundation**: 9999666555
- **Emergency Services**: 108/102

### Project Support
- **📧 Email**: support@mindcare.app
- **💬 Discord**: [Join our community](https://discord.gg/mindcare)
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/mindcare-app/issues)
- **📖 Documentation**: [Full Documentation](https://mindcare-docs.vercel.app)

## 🙏 Acknowledgments

### Special Thanks
- **Mental Health Professionals** - For guidance on therapeutic approaches
- **Student Beta Testers** - For invaluable feedback and testing
- **Open Source Community** - For the amazing tools and libraries
- **Accessibility Advocates** - For ensuring inclusive design

### Inspiration
This project was inspired by the growing mental health challenges faced by students in higher education and the need for accessible, stigma-free support systems.

---

<div align="center">

**Made with ❤️ for student mental wellness**

[🌐 Website](https://mindcare.deno.dev/login) • [📧 Contact](mailto:support@mindcare.app)

</div>
