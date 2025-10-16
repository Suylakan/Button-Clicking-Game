# 🏃‍♂️ Button Clicking Game

A hilarious and frustrating interactive web game where you try to click a button that runs away from your mouse cursor!

![Game Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎮 About The Game

The **Button Clicking Game** is a fun and challenging browser-based game where your mission is simple: click the button. But there's a catch - the button is smart and will escape from your cursor whenever you get too close! 

Can you outsmart the AI and actually click it? Spoiler: probably not! 😈

## ✨ Features

### 🎯 Core Gameplay
- **Smart Button AI**: The button detects your mouse from 200px away and instantly escapes to a safe location
- **Attempt Counter**: Tracks how many times you've failed to catch the button
- **Difficulty**: Ultra-hard mode with smaller button size and faster escape speed

### 😂 Roasting System
The button has attitude! It will mock you in two ways:

1. **Idle Roasts**: If you stop moving for 3 seconds, expect to be insulted!
   - "Are you even trying? 😴"
   - "My grandma moves faster than you! 👵"
   - "Did you fall asleep? 💤"
   - And 12 more hilarious taunts!

2. **Attempt-Based Roasts**: Special roasts at milestone attempts
   - 5 attempts: "You're too slow! 🐢"
   - 50 attempts: "You're legendary... at failing! 🏆"
   - 100 attempts: "I respect the persistence! 💪"
   - Up to 1000 attempts with increasingly savage roasts!

### 🤡 Special 1000 Attempt Event
Reach 1000 failed attempts and unlock:
- A dramatic "YOU ARE AN IDIOT" screen with shaking effects
- Color-changing text animations
- Fake "downloading" progress bar
- **Automatic download** of a "Certificate of Idiocy" text file
- The ultimate humiliation experience!

### 🚨 Cheater Detection System
If you use debug hacks to win:
- Special "CHEATER DETECTED" screen appears instead of victory
- Shows detailed statistics of all cheats used:
  - Number of legitimate attempts
  - Times frozen, teleported, made bigger
  - Whether slow mode was used
- Verdict: "Not Impressed!" 
- Option to try again without cheats for a real victory
- Only legitimate wins (no debug hacks) get the true victory message!

### 📱 Mobile Support
- Full touch screen support for mobile devices
- Responsive design that works on all screen sizes

### 🐛 Debug Mode
- Press `D` key to toggle debug mode
- Shows real-time information:
  - Mouse position (X, Y)
  - Button position (X, Y)
  - Distance between mouse and button
  - Detection radius visualization
  - Escape status indicator
- Visual debug overlay with semi-transparent background
- Perfect for understanding game mechanics or adjusting difficulty

#### ⚡ Built-in Hacks/Cheats:
Debug mode includes powerful cheats:
1. **Freeze Button (F)**: Completely stops the button from moving
2. **Slow Mode (S)**: Reduces detection radius by 50% (makes it easier)
3. **Bigger Button (B)**: Doubles the button size for easier clicking
4. **Teleport to Mouse (T)**: Brings button directly to your cursor
5. **Reset Attempts (R)**: Resets the attempt counter back to 0
6. **+100 Attempts (I)**: Instantly adds 100 to your attempt count
7. **Jump to 1000 (K)**: Sets attempts to 1000 and triggers the idiot screen

All hacks can be toggled with keyboard shortcuts (shown in parentheses) or by clicking the buttons in the debug panel. Active hacks are highlighted in yellow!

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Suylakan/Button-Clicking-Game.git
```

2. Navigate to the project directory:
```bash
cd Button-Clicking-Game
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

That's it! No dependencies, no build process, no servers needed. Pure vanilla HTML, CSS, and JavaScript!

## 🎯 How to Play

1. Open `index.html` in your browser
2. Click the "Start Game 🚀" button
3. Try to click the escaping button before it runs away
4. Watch your attempt counter rise as you fail repeatedly
5. Enjoy the roasts from the button's AI
6. Try to reach 1000 attempts if you dare!

## 🛠️ Technical Details

### File Structure
```
Button-Clicking-Game/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Game logic and AI behavior
└── README.md          # This file
```

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
  - Gradient backgrounds
  - Keyframe animations (pulse, shake, color change)
  - Flexbox layout
- **Vanilla JavaScript**: All game logic
  - Mouse/touch event tracking
  - Distance calculations
  - Dynamic DOM manipulation
  - File download API

### Key Game Mechanics

#### Detection Radius
```javascript
const detectionRadius = 200; // pixels
```
The button detects your mouse when it gets within 200px of the button's center.

#### Escape Algorithm
```javascript
// Button jumps 2.5x the detection radius away
distance > detectionRadius * 2.5
```
Ensures the button always escapes to a safe distance.

#### Attempt Tracking
Uses a flag system to prevent multiple counts during a single approach:
```javascript
let justEscaped = false;
```

## 🎨 Customization

Want to make it easier or harder? Modify these values in `script.js`:

```javascript
// Make it easier (or harder!)
const detectionRadius = 200;  // Lower = easier, higher = harder

// Adjust button size in style.css
padding: 12px 24px;  // Increase padding = easier to click

// Change escape distance in getRandomPosition()
if (distance > detectionRadius * 2.5)  // Lower multiplier = easier
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- [ ] Add sound effects
- [ ] Multiple difficulty levels
- [ ] Leaderboard system
- [ ] More roast messages
- [ ] Power-ups (slow down button, make it bigger, etc.)
- [ ] Different button skins/themes
- [ ] Multiplayer mode

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - feel free to use it for whatever you want!

## 👨‍💻 Author

**Harun Berke Öztürk (Suylakan)**

- GitHub: [@Suylakan](https://github.com/Suylakan)
- Repository: [Button-Clicking-Game](https://github.com/Suylakan/Button-Clicking-Game)

## 🎉 Acknowledgments

- Inspired by classic "catch me if you can" games
- Thanks to everyone who rage-quit after 100 attempts
- Special thanks to the button for being such a jerk

## 📊 Stats

- **Lines of Code**: ~400
- **Time to Beat**: ∞ (impossible)
- **Fun Factor**: 😂/10
- **Frustration Level**: 🤬/10

## 🐛 Known Issues

- None! The button escaping is a feature, not a bug 😉
- Actually impossible to click (this is intentional)

## 💡 Fun Facts

- The button can move anywhere on the screen, always staying 500px away from your cursor
- There are 15 different idle roast messages
- There are 19 different attempt-based roast messages
- The "Certificate of Idiocy" contains your attempt count, date, and calculated IQ level
- Most players give up after 20-50 attempts
- If you reach 1000, you really are an idiot (in the most loving way possible 😂)

---

## 🎮 Pro Tips (Not That They'll Help)

1. **The Direct Approach**: Just move straight at it. It won't work, but at least you tried.
2. **The Corner Trap**: Try to corner it. The button will still escape. Nice try though!
3. **The Speed Strategy**: Move really fast. The button moves faster. Better luck next time!
4. **The Patience Game**: Wait for it to come to you. Spoiler: It won't.
5. **The Give Up Method**: Close the browser. This is the only winning move.

---

Made with 😂 and a lot of JavaScript

**Remember**: The only way to win is not to play... but you're going to try anyway, aren't you? 😏
