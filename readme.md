# CESA - Computer Engineering Students Association Website

A modern, responsive website for the Computer Engineering Students Association at ISBM College of Engineering.

## 🌟 Features

- **Dynamic Homepage**: Showcasing latest events, achievements, and announcements
- **Event Management**: Complete event lifecycle management with registration system
- **Team Showcase**: Interactive display of CESA committee members and faculty
- **Certificate Verification**: Secure digital certificate verification system
- **Gallery**: Dynamic photo gallery of past events and activities
- **Partner Portal**: Information about industry and academic partnerships
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices

## 🚀 Technologies Used

- HTML5
- CSS3 with Custom Animations
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Google Sheets API (for certificate verification)
- Bootstrap Icons

## 📁 Project Structure

```
CESA-WEBSITE/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── gallery.js
│   └── images/
│       ├── avatar/
│       └── events/
├── pages/
│   ├── about.html
│   ├── certificate-details.html
│   ├── events.html
│   ├── gallery.html
│   ├── partners.html
│   ├── team.html
│   └── verify.html
└── index.html
```

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd CESA-WEBSITE
   ```

3. Open `index.html` in your web browser or set up a local server.

## 🔧 Configuration

### Certificate Verification System
- Update the Google Sheets API configuration in `verify.html` and `certificate-details.html`
- Required fields in Google Sheet:
  - Registration Number
  - Certificate Number
  - Full Name
  - Issue Date
  - Valid Until
  - Event Name
  - Student Photo URL
  - Achievement/Rank
  - Certificate Download URL

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

## 🎨 Color Scheme

- Primary: #00ff9d (Neon Green)
- Background: Linear gradient of rgba(0,0,0,0.95)
- Text: #ffffff (White)
- Accent: #b4b4b4 (Light Gray)

## 🔐 Security Features

- Secure certificate verification system
- Protected API endpoints
- Input validation and sanitization
- Error handling and logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

- CESA Team - cesa@isbmcoe.org
- ISBM College of Engineering - Nande, Pune, Maharashtra 412115

## 🙏 Acknowledgments

- ISBM College of Engineering
- Faculty Advisors
- CESA Tech Team
- All Contributing Members

---
Made with ❤️ by Gaurav Singh