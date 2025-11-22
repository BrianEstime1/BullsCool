# 🐂 BullsCool AI - Instant HVAC Quotes for USF Students


<div align="center">
  <h3>Fast AC quotes in Florida heat — Powered by Gemini AI</h3>
  <p>Made at HackJam 2025 | University of South Florida</p>
</div>

<img width="1470" height="956" alt="Screenshot 2025-11-22 at 5 33 54 PM" src="https://github.com/user-attachments/assets/5e07f4cf-acc9-47e0-8b8e-447d259bc8df" />

## 🎯 Problem

USF students and Tampa residents face frequent AC issues in Florida's brutal heat but struggle to:
- Know if repair quotes are fair
- Understand what's wrong with their AC
- Find reliable HVAC help quickly
- Avoid getting overcharged

## 💡 Solution

BullsCool uses Google Gemini AI's vision capabilities to:
- Analyze photos of AC problems instantly
- Provide realistic cost estimates ($low - $high range)
- Recommend DIY vs. professional fixes
- Offer student-friendly tips and local resources

## ✨ Features

- 📸 **AI Vision Analysis** - Upload a photo of your AC issue
- 💰 **Instant Cost Estimates** - Get fair price ranges immediately  
- 🔧 **Smart Recommendations** - Learn what needs fixing
- 🐂 **Bulls-Themed** - Built by and for the USF community
- 📱 **Mobile-Friendly** - Works on any device

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **AI**: Google Gemini 1.5 Flash (Vision + Language)
- **Hosting**: GitHub Pages / Vercel (planned)
- **APIs**: Generative Language API

## 🚀 Quick Start

### Option 1: Open Locally
1. Clone this repository
```bash
git clone https://github.com/BrianEstime1/BullsCool.git
cd BullsCool
```

2. Open `index.html` in your browser
```bash
open index.html
```

### Option 2: View Live Demo
🔗 [Live Demo](https://brianestime1.github.io/BullsCool) *(coming soon)*

## 📸 How It Works

1. **Enter Your ZIP Code** (e.g., 33620 - USF area)
2. **Describe the Problem** (e.g., "AC not blowing cold air")
3. **Upload a Photo** of the AC unit or issue
4. **Get Instant AI Analysis** with cost estimates and recommendations

## 🎓 Built For

- USF Students dealing with dorm/apartment AC issues
- Tampa Bay residents needing quick HVAC guidance
- Anyone wanting fair, transparent AC repair estimates

## 🐂 Team

**Brian Estime** - Developer & Student-Athlete  
- Computer Science @ Hillsborough Community College
- Men's Basketball Team
- [LinkedIn](https://linkedin.com/in/brian-estime-747435355) | [GitHub](https://github.com/BrianEstime1)

## 🏆 HackJam 2025

This project was built during HackJam 2025 at the University of South Florida, a 12-hour web development hackathon focused on creating real-world applications that solve everyday problems.

## 📝 Future Enhancements

- [ ] Real-time chat with HVAC experts
- [ ] Integration with local Tampa HVAC companies
- [ ] Price comparison from multiple providers
- [ ] Appointment scheduling
- [ ] User accounts to track AC maintenance history
- [ ] Push notifications for maintenance reminders
- [ ] Spanish language support

## 🤝 Contributing

Want to improve BullsCool? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini AI for vision capabilities
- University of South Florida for hosting HackJam 2025
- FERDAIR LLC for real-world HVAC insights
- The Tampa Bay HVAC community

---

<div align="center">
  <p><strong>Go Bulls! 🐂⚡</strong></p>
  <p>Stay cool in the Florida heat!</p>
</div>
```

## Step 2: Create .gitignore

Create a file called `.gitignore`:
```
# Environment variables
.env
*.env

# Node modules (if you add backend later)
node_modules/
package-lock.json

# macOS
.DS_Store
.AppleDouble
.LSOverride

# VS Code
.vscode/
*.code-workspace

# Logs
*.log

# API Keys (important!)
*_key.txt
secrets/


