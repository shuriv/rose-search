# Rose Search - Creative Search Engine

A stunning, creative search engine with beautiful design, featuring multi-language support, voice search, real image search, and extensive customization options.

## ✨ Features

### 🔍 **Dual Search Modes**
- **Web Search**: Real web search with comprehensive results
- **Image Search**: Real image search with beautiful previews

### 🌍 **Multi-Language Support (17 Languages)**
- English, Spanish, French, Russian, Portuguese, German, Italian
- Ukrainian, Finnish, Swedish, Chinese, Japanese, Hindi
- Czech, Polish, Turkish, Arabic

### 🎙️ **Voice Search**
- Hands-free searching with speech recognition
- Visual feedback when listening
- Support for multiple languages

### 🎨 **6 Beautiful Themes**
- Light, Dark, Ocean Blue, Purple Dream, Sunset Orange, Forest Green

### 🖼️ **15 Diverse Backgrounds**
From abstract geometric patterns to tropical beaches, cosmic nebulas to city skylines.

### ⚙️ **Advanced Customization**
- Typography: Font size adjustment (12-24px)
- Visual Effects: Toggle animations, particles, and effects
- Background Blur: Adjustable intensity (0-20px)
- Glow Effects: Customizable glow intensity
- Border Radius: Customizable corner roundness
- Auto-Save: Settings persistence
- Search History: Track and manage your searches

### 🎭 **Beautiful Animations & Effects**
- Floating particles
- Smooth transitions
- Loading animations
- Hover effects
- Glass morphism effects

### 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with Web Speech API support (for voice search)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/rose-search.git
   cd rose-search
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 🎮 Usage Guide

### Web Search
1. Select "Web Search" mode from settings
2. Enter your search query or use voice search
3. Press Enter or click the search button
4. Click on results to open in new tabs

### Image Search
1. Select "Image Search" mode from settings
2. Describe the images you want to find
3. Press Enter or click the search button
4. View image thumbnails and click to visit sources

### Voice Search
1. Click the microphone icon in the search bar
2. Speak your search query clearly
3. The system will automatically search when you stop speaking
4. Click the microphone again to stop listening

### Language Selection
1. Click the globe icon in the top-right
2. Select your preferred language from the list
3. The interface will update immediately
4. Voice search will use the selected language

### Customization
1. Click the settings icon (⚙️) in the top-right
2. **Themes**: Choose from 6 beautiful color schemes
3. **Backgrounds**: Select from 15 diverse backgrounds or use solid colors
4. **Effects**: Toggle animations, particles, and visual effects
5. **Typography**: Adjust font size and appearance
6. **Advanced**: Fine-tune blur, glow, and border radius

## 🔧 Technical Details

### Technologies Used
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Z-AI SDK** for search functionality
- **Web Speech API** for voice recognition

### API Endpoints
- `POST /api/search` - Web search functionality
- `POST /api/search-images` - Real image search

### Features Implementation
- **Voice Search**: Uses Web Speech API with multi-language support
- **Image Search**: Real web search with image filtering
- **Multi-language**: Complete UI translation system
- **Settings Persistence**: LocalStorage for user preferences
- **Responsive Design**: Mobile-first with touch support

## 📦 Download

You can download this project in multiple ways:

### Option 1: Git Clone
```bash
git clone https://github.com/yourusername/rose-search.git
cd rose-search
npm install
npm run dev
```

### Option 2: Download Archive
Download the latest release from the [Releases](https://github.com/yourusername/rose-search/releases) page.

## 🌟 New Features Highlights

### 🎙️ Voice Search
- Hands-free operation
- Multi-language support
- Visual feedback indicators
- Automatic search completion

### 🌍 Multi-Language Support
- 17 languages fully supported
- Complete UI translation
- Language-specific voice recognition
- Persistent language selection

### 🎨 Enhanced Customization
- Beautiful pop-up dialogs
- Real-time preview
- Advanced effect controls
- Particle system
- Glow intensity control

### 🖼️ Real Image Search
- Actual image search from web
- Thumbnail previews
- Source attribution
- Click-to-visit functionality

### 🎭 Advanced Animations
- Particle effects
- Loading animations
- Hover effects
- Smooth transitions
- Gradient animations

## 📱 Browser Support

- Chrome 90+ (full voice support)
- Firefox 88+ (limited voice support)
- Safari 14+ (limited voice support)
- Edge 90+ (full voice support)

**Note**: Voice search works best in Chrome. Other browsers may have limited support.

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate Prisma client
npm run db:migrate  # Run database migrations
npm run db:reset    # Reset database
```

## 🎯 Customization Details

### Themes
- **Light**: Clean, minimal design
- **Dark**: Easy on the eyes for night browsing
- **Ocean Blue**: Calming blue tones
- **Purple Dream**: Creative purple gradients
- **Sunset Orange**: Warm, energetic colors
- **Forest Green**: Natural, soothing greens

### Backgrounds
1. Abstract Geometric - Modern patterns
2. Ocean Waves - Peaceful sea scenes
3. Mountain Dawn - Majestic landscapes
4. Cosmic Nebula - Space imagery
5. Autumn Forest - Nature scenes
6. City Skyline - Urban architecture
7. Desert Dunes - Minimalist landscapes
8. Aurora Lights - Natural phenomena
9. Tropical Beach - Vacation scenery
10. Cherry Blossom - Japanese gardens
11. Marble Texture - Luxury patterns
12. Rainforest Waterfall - Water scenes
13. Liquid Art - Abstract fluid designs
14. Mediterranean Village - Coastal architecture
15. Gradient Mesh - Modern abstract

### Effects
- **Particles**: Floating animated elements
- **Glow**: Adjustable glow intensity
- **Animations**: Toggle all animations
- **Blur**: Background blur for readability
- **Border Radius**: Corner roundness control

## 🔍 Search Features

### Web Search
- Comprehensive results from Z-AI API
- Fast response times
- Relevant result ordering
- Source attribution

### Image Search
- Real image search from web
- Thumbnail previews
- Multiple sources
- Click to visit original source

### Voice Search
- Speech-to-text conversion
- Multi-language recognition
- Automatic search triggering
- Visual feedback

## 🌟 User Experience

### Interface
- Clean, modern design
- Intuitive navigation
- Responsive layout
- Touch-friendly controls

### Performance
- Optimized loading
- Smooth animations
- Efficient search
- Minimal resource usage

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## 📞 Support

If you encounter any issues or have questions, please:
1. Check browser compatibility for voice search
2. Ensure microphone permissions are granted
3. Try refreshing the page if settings don't save
4. Check internet connection for search functionality

### Troubleshooting

**Voice search not working?**
- Check if browser supports Web Speech API
- Ensure microphone permissions are granted
- Try using Chrome for best compatibility

**Images not loading?**
- Check internet connection
- Try different search terms
- Ensure image search mode is selected

**Settings not saving?**
- Enable LocalStorage in your browser
- Check if "Auto Save Settings" is enabled
- Clear browser cache and try again

**Performance issues?**
- Disable particle effects
- Reduce background blur
- Use a simpler theme
- Disable animations

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ and creativity by the Rose Search Team