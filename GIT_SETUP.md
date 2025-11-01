# Rose Search - Git Repository Setup

## 🌹 Quick Start

### Option 1: Clone This Repository (Recommended)
```bash
git clone https://github.com/yourusername/rose-search.git
cd rose-search
npm install
npm run dev
```

### Option 2: Create Your Own Repository

#### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Repository name: `rose-search`
3. Description: `A stunning, creative search engine with beautiful design`
4. Set as **Public**
5. Click **Create repository**

#### Step 2: Add Remote and Push
```bash
git remote add origin https://github.com/yourusername/rose-search.git
git push -u origin main
```

#### Step 3: Install and Run
```bash
npm install
npm run dev
```

## 📁 Repository Structure

```
rose-search/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── search/           # Web search API
│   │   │   └── search-images/    # Image search API
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main search interface
│   ├── components/
│   │   └── ui/                   # shadcn/ui components
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utility libraries
├── public/
│   ├── bg1.jpg - bg15.jpg        # Background images
│   ├── logo-clean.png           # Simple logo
│   └── favicon.ico             # Favicon
├── package.json
├── README.md
└── download.sh                # Download script
```

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🎯 Features

- ✅ **Real Web Search** - Powered by Z-AI API
- ✅ **Real Image Search** - Actual image search results
- ✅ **17 Languages** - Full localization support
- ✅ **Voice Search** - Multi-language voice recognition
- ✅ **15 Backgrounds** - Diverse image collection
- ✅ **6 Themes** - Beautiful color schemes
- ✅ **Advanced Customization** - Extensive personalization
- ✅ **Responsive Design** - Works on all devices

## 📄 License

MIT License - Feel free to use, modify, and distribute

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

---

Made with ❤️ by the Rose Search Team