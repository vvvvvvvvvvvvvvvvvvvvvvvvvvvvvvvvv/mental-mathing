# Mental Mathing 🧠

**Math is now mathing in your mind**

A beautiful React Native mobile app for mastering mental math through 14 powerful calculation tricks. Practice, learn, and track your progress as you develop lightning-fast mental math skills!

## Features

### 14 Mental Math Tricks
- **The 1% Anchor** - Find 1% first, scale up/down (Easy)
- **The Flip Trick** - a% of b = b% of a (Easy)
- **Quick × 5** - Multiply by 10, divide by 2 (Easy)
- **Squaring numbers ending in 5** - n5² = n(n+1), then add 25 (Medium)
- **25% Shortcut** - Divide by 4 (Easy)
- **11 Multiplication** - Split digits, add sum in middle (Easy)
- **Numbers near 100** - Cross-subtract method (Medium)
- **Difference of Squares** - a² - b² = (a+b)(a-b) (Medium)
- **Divide by 5** - Double it, divide by 10 (Easy)
- **Complement Subtraction** - Subtract from powers of 10 (Hard)
- **Multiply by 9** - Multiply by 10, subtract original (Easy)
- **Percentage ±10%** - Multiply by 1.1 or 0.9 (Medium)
- **Cube numbers ending in 5** - n5³ = 125 × (2n+1)³ (Hard)
- **Multiply by 99** - Multiply by 100, subtract number (Medium)

### App Screens
- **Home** - Browse all tricks with difficulty badges
- **Learn Mode** - Detailed explanations with worked examples
- **Practice Mode** - Generate random problems with instant feedback
- **Progress Tracking** - View stats, accuracy, and streaks
- **Settings** - Dark mode toggle and data management

### Key Features
- 🌓 Light and dark mode support
- 📊 Comprehensive progress tracking with AsyncStorage
- 📱 Haptic feedback for better UX
- ✨ Smooth animations and transitions
- 🎨 Beautiful, brain-themed UI
- 🔥 Streak tracking and encouragement messages
- 💯 Per-trick and overall statistics

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and build tooling
- **TypeScript** - Type-safe code
- **React Navigation** - Stack and tab navigation
- **AsyncStorage** - Local data persistence
- **Expo Haptics** - Tactile feedback
- **Bun** - Fast package manager

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental-mathing-app
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun start
```

4. Run on your platform:
```bash
# iOS (Mac only)
bun run ios

# Android
bun run android

# Web
bun run web
```

## Project Structure

```
mental-mathing-app/
├── src/
│   ├── components/      # Reusable UI components (Button, Card, Badge, Input)
│   ├── constants/       # App constants (theme, tricks data)
│   ├── navigation/      # Navigation setup and types
│   ├── screens/         # All app screens
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utilities (storage, theme context)
├── assets/              # Images and icons
├── App.tsx              # Root component
└── app.json             # Expo configuration
```

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Branding & Encouragement Messages

The app uses "mathing" themed messages throughout:
- "The math is mathing! 🧠"
- "Now we're mathing! ✨"
- "Keep mathing! 🔥"
- "Math mathed perfectly! 💯"

## License

MIT

## Created With ❤️

Built with Bun, React Native, and Expo for an amazing mental math learning experience!
