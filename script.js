const button = document.getElementById('escapingButton');
const attemptsDisplay = document.getElementById('attempts');
const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const roastMessage = document.getElementById('roastMessage');
const idiotScreen = document.getElementById('idiotScreen');
const downloadProgress = document.getElementById('downloadProgress');
const downloadPercent = document.getElementById('downloadPercent');
const closeButton = document.getElementById('closeButton');
let attempts = 0;
let gameStarted = false;
let lastMouseMoveTime = Date.now();
let roastTimer = null;
let justEscaped = false; // Flag to prevent multiple counts

// Debug mode variables
let debugMode = false;
let hackFreezeActive = false;
let hackSlowActive = false;
let hackBiggerActive = false;
const debugPanel = document.getElementById('debugPanel');
const debugMouseX = document.getElementById('debugMouseX');
const debugMouseY = document.getElementById('debugMouseY');
const debugButtonX = document.getElementById('debugButtonX');
const debugButtonY = document.getElementById('debugButtonY');
const debugDistance = document.getElementById('debugDistance');
const debugRadius = document.getElementById('debugRadius');
const debugStatus = document.getElementById('debugStatus');
const debugAttempts = document.getElementById('debugAttempts');

// Hack buttons
const hackFreezeBtn = document.getElementById('hackFreeze');
const hackSlowBtn = document.getElementById('hackSlow');
const hackBiggerBtn = document.getElementById('hackBigger');
const hackTeleportBtn = document.getElementById('hackTeleport');
const hackResetBtn = document.getElementById('hackReset');
const hackIncreaseBtn = document.getElementById('hackIncrease');
const hackJump1000Btn = document.getElementById('hackJump1000');

// Cheater screen elements
const cheaterScreen = document.getElementById('cheaterScreen');
const legitAttemptsDisplay = document.getElementById('legitAttempts');
const freezeCountDisplay = document.getElementById('freezeCount');
const teleportCountDisplay = document.getElementById('teleportCount');
const biggerCountDisplay = document.getElementById('biggerCount');
const slowUsedDisplay = document.getElementById('slowUsed');
const tryAgainButton = document.getElementById('tryAgainButton');

// Track cheat usage
let cheatsUsed = false;
let legitAttempts = 0;
let freezeCount = 0;
let teleportCount = 0;
let biggerCount = 0;
let slowUsed = false;

// Toggle debug mode with 'D' key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd') {
        debugMode = !debugMode;
        debugPanel.style.display = debugMode ? 'block' : 'none';
        if (debugMode) {
            updateDebugInfo(0, 0); // Initialize with current values
        }
    }
    
    // Keyboard shortcuts for hacks (only when debug mode is on)
    if (debugMode && gameStarted) {
        if (e.key.toLowerCase() === 'f') {
            toggleFreeze();
        } else if (e.key.toLowerCase() === 's') {
            toggleSlow();
        } else if (e.key.toLowerCase() === 'b') {
            toggleBigger();
        } else if (e.key.toLowerCase() === 't') {
            hackTeleport();
        } else if (e.key.toLowerCase() === 'r') {
            hackResetAttempts();
        } else if (e.key.toLowerCase() === 'i') {
            hackIncreaseAttempts();
        } else if (e.key.toLowerCase() === 'k') {
            hackJumpTo1000();
        }
    }
});

// Hack: Freeze button
hackFreezeBtn.addEventListener('click', toggleFreeze);
function toggleFreeze() {
    hackFreezeActive = !hackFreezeActive;
    hackFreezeBtn.classList.toggle('active', hackFreezeActive);
    hackFreezeBtn.textContent = hackFreezeActive ? '🔒 Frozen (F)' : 'Freeze Button (F)';
    if (hackFreezeActive) {
        cheatsUsed = true;
        freezeCount++;
    }
}

// Hack: Slow mode (increase detection radius to make it easier)
hackSlowBtn.addEventListener('click', toggleSlow);
function toggleSlow() {
    hackSlowActive = !hackSlowActive;
    hackSlowBtn.classList.toggle('active', hackSlowActive);
    hackSlowBtn.textContent = hackSlowActive ? '🐌 Slow Mode ON (S)' : 'Slow Mode (S)';
    if (hackSlowActive) {
        cheatsUsed = true;
        slowUsed = true;
    }
}

// Hack: Make button bigger
hackBiggerBtn.addEventListener('click', toggleBigger);
function toggleBigger() {
    hackBiggerActive = !hackBiggerActive;
    hackBiggerBtn.classList.toggle('active', hackBiggerActive);
    if (hackBiggerActive) {
        button.style.padding = '25px 50px';
        button.style.fontSize = '1.5rem';
        hackBiggerBtn.textContent = '🔍 Big Button ON (B)';
        cheatsUsed = true;
        biggerCount++;
    } else {
        button.style.padding = '12px 24px';
        button.style.fontSize = '1rem';
        hackBiggerBtn.textContent = 'Bigger Button (B)';
    }
}

// Hack: Teleport button to mouse
hackTeleportBtn.addEventListener('click', hackTeleport);
function hackTeleport() {
    const mousePos = { x: parseInt(debugMouseX.textContent), y: parseInt(debugMouseY.textContent) };
    if (mousePos.x && mousePos.y) {
        button.style.left = mousePos.x + 'px';
        button.style.top = mousePos.y + 'px';
        button.style.transform = 'translate(-50%, -50%)';
        cheatsUsed = true;
        teleportCount++;
    }
}

// Hack: Reset attempts
hackResetBtn.addEventListener('click', hackResetAttempts);
function hackResetAttempts() {
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    debugAttempts.textContent = attempts;
    roastMessage.textContent = '';
}

// Hack: Increase attempts by 100
hackIncreaseBtn.addEventListener('click', hackIncreaseAttempts);
function hackIncreaseAttempts() {
    attempts += 100;
    attemptsDisplay.textContent = attempts;
    debugAttempts.textContent = attempts;
    
    // Check if we should roast based on new attempts
    checkAttemptRoast(attempts);
    
    // Check if reached 1000 attempts
    if (attempts >= 1000) {
        showIdiotScreen();
    }
}

// Hack: Jump directly to 1000 attempts (trigger idiot screen)
hackJump1000Btn.addEventListener('click', hackJumpTo1000);
function hackJumpTo1000() {
    attempts = 1000;
    attemptsDisplay.textContent = attempts;
    debugAttempts.textContent = attempts;
    showIdiotScreen();
}

// Array of roasting messages for idle players
const idleRoasts = [
    "Are you even trying? 😴",
    "My grandma moves faster than you! 👵",
    "Did you fall asleep? 💤",
    "Is your mouse broken? 🖱️",
    "C'mon, I'm RIGHT HERE! 🙄",
    "Are you scared of me? 😏",
    "This is too easy... BORING! 🥱",
    "Hello? Anyone home? 🏠",
    "I've seen statues move faster! 🗿",
    "Wake up! The game started! ⏰",
    "Are you just gonna stare at me? 👀",
    "Move it or lose it, slowpoke! 🐌",
    "Is this your first time using a mouse? 🤔",
    "My AI is literally waiting here... 🤖",
    "Don't be shy, come get me! 😎"
];

// Array of roasting messages based on attempts
const attemptRoasts = {
    5: "5 attempts already? You're too slow! 🐢",
    10: "10 tries? Come on, you can do better! 😂",
    15: "15 attempts... Are you even trying? 🤦",
    20: "20 TRIES?! This is embarrassing! 😅",
    25: "25 attempts... I'm getting bored here! 🥱",
    30: "30 attempts! Maybe give up? 😏",
    40: "40 tries! This is just sad now... 😭",
    50: "50 ATTEMPTS?! You're legendary... at failing! 🏆",
    75: "75 tries! At this point, just admit defeat! 😎",
    100: "100 ATTEMPTS! Okay, I respect the persistence! 💪",
    125: "125 tries?! Do you not have anything better to do? 📱",
    150: "150 attempts... This is becoming your full-time job! 💼",
    200: "200 TRIES! You're more dedicated to this than your studies! 📚",
    250: "250 attempts! I'm starting to feel bad for you... Almost. 😈",
    300: "300 TRIES?! Your determination is admirable... but futile! 🤷",
    400: "400 attempts! Even I didn't think you'd go this far! 🤯",
    500: "500 ATTEMPTS! LEGENDARY FAILURE UNLOCKED! 🏅",
    750: "750 tries! You need therapy, not a button! 🛋️",
    1000: "1000 ATTEMPTS! You've achieved MAXIMUM DEDICATION! This is art! 🎨"
};

// Function to display a roast message
function displayRoast(message) {
    roastMessage.textContent = message;
    roastMessage.style.animation = 'none';
    setTimeout(() => {
        roastMessage.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Function to display a random idle roast
function displayIdleRoast() {
    const randomRoast = idleRoasts[Math.floor(Math.random() * idleRoasts.length)];
    displayRoast(randomRoast);
}

// Function to check if we should roast based on attempts
function checkAttemptRoast(attemptCount) {
    if (attemptRoasts[attemptCount]) {
        displayRoast(attemptRoasts[attemptCount]);
        // Message will stay until replaced by another roast
    }
}

// Function to check if player is idle
function checkIdle() {
    const timeSinceLastMove = Date.now() - lastMouseMoveTime;
    // If 3 seconds without movement, roast the player
    if (timeSinceLastMove > 3000 && gameStarted) {
        displayIdleRoast();
    }
}

// Start button click handler
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameStarted = true;
    lastMouseMoveTime = Date.now();
    
    // Set initial button position to center of screen
    button.style.left = '50%';
    button.style.top = '50%';
    
    // Start checking for idle player every 3 seconds
    roastTimer = setInterval(checkIdle, 3000);
});

// Detection radius - how close the mouse needs to be before button escapes
const detectionRadius = 200; // Increased from 150 to 200 - button detects you from farther away!

// Function to get a random position that's away from the mouse
function getRandomPosition(mouseX, mouseY) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;
    
    // Keep trying to find a position that's far enough from the mouse
    do {
        newX = Math.random() * (windowWidth - buttonWidth - 100) + 50;
        newY = Math.random() * (windowHeight - buttonHeight - 100) + 50;
        attempts++;
        
        // Calculate distance from mouse
        const distance = Math.sqrt(
            Math.pow(newX - mouseX, 2) + 
            Math.pow(newY - mouseY, 2)
        );
        
        // If far enough away or tried too many times, accept this position
        if (distance > detectionRadius * 2.5 || attempts >= maxAttempts) { // Increased from 2x to 2.5x - button moves even farther away!
            break;
        }
    } while (attempts < maxAttempts);
    
    return { x: newX, y: newY };
}

// Function to move button away from mouse
function moveButton(mouseX, mouseY) {
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate distance between mouse and button center
    const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
    );
    
    // Update debug info if debug mode is on
    if (debugMode) {
        updateDebugInfo(mouseX, mouseY, buttonCenterX, buttonCenterY, distance);
    }
    
    // Apply hacks
    if (hackFreezeActive) {
        // Button is frozen, but still count attempts
        if (distance < detectionRadius && !justEscaped) {
            attempts++;
            attemptsDisplay.textContent = attempts;
            
            if (debugMode) {
                debugStatus.textContent = 'FROZEN 🔒';
                debugAttempts.textContent = attempts;
            }
            
            // Check if reached 1000 attempts
            if (attempts >= 1000) {
                showIdiotScreen();
                return;
            }
            
            // Check if we should roast based on attempts
            checkAttemptRoast(attempts);
            
            justEscaped = true;
        } else if (distance >= detectionRadius) {
            justEscaped = false;
        }
        return;
    }
    
    // Adjust detection radius based on slow mode hack
    const effectiveRadius = hackSlowActive ? detectionRadius * 0.5 : detectionRadius;
    
    // If mouse is too close, move the button
    if (distance < effectiveRadius) {
        // Only count once per escape
        if (!justEscaped) {
            const newPos = getRandomPosition(mouseX, mouseY);
            button.style.left = newPos.x + 'px';
            button.style.top = newPos.y + 'px';
            button.style.transform = 'translate(0, 0)';
            
            // Increment attempts counter
            attempts++;
            attemptsDisplay.textContent = attempts;
            
            // Track legitimate attempts (no cheats used)
            if (!cheatsUsed) {
                legitAttempts++;
            }
            
            // Update debug status
            if (debugMode) {
                debugStatus.textContent = 'ESCAPED!';
                debugAttempts.textContent = attempts;
            }
            
            // Check if reached 1000 attempts
            if (attempts >= 1000) {
                showIdiotScreen();
                return;
            }
            
            // Check if we should roast based on attempts
            checkAttemptRoast(attempts);
            
            // Set flag to prevent counting multiple times
            justEscaped = true;
        }
    } else {
        // Reset flag when mouse is far away
        justEscaped = false;
        if (debugMode) {
            debugStatus.textContent = distance < effectiveRadius * 1.5 ? 'Warning Zone' : 'Safe';
        }
    }
}

// Function to update debug information
function updateDebugInfo(mouseX, mouseY, buttonX = 0, buttonY = 0, distance = 0) {
    debugMouseX.textContent = Math.round(mouseX);
    debugMouseY.textContent = Math.round(mouseY);
    
    if (buttonX && buttonY) {
        debugButtonX.textContent = Math.round(buttonX);
        debugButtonY.textContent = Math.round(buttonY);
    }
    
    debugDistance.textContent = Math.round(distance);
    debugAttempts.textContent = attempts;
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (gameStarted) {
        lastMouseMoveTime = Date.now();
        // Don't clear roast messages anymore - let them stay
        moveButton(e.clientX, e.clientY);
    }
});

// Handle button click (just in case someone manages to click it)
button.addEventListener('click', (e) => {
    e.preventDefault();
    roastMessage.textContent = '';
    clearInterval(roastTimer);
    
    // Check if cheats were used
    if (cheatsUsed) {
        showCheaterScreen();
    } else {
        // Legitimate win!
        alert('🎉 Wow! You actually clicked it! You are amazing! 🎉\n\nAND YOU DID IT WITHOUT CHEATS! 👑');
        resetGame();
    }
});

// Function to show cheater screen
function showCheaterScreen() {
    gameScreen.style.display = 'none';
    cheaterScreen.style.display = 'block';
    gameStarted = false;
    
    // Display cheater statistics
    legitAttemptsDisplay.textContent = legitAttempts;
    freezeCountDisplay.textContent = freezeCount;
    teleportCountDisplay.textContent = teleportCount;
    biggerCountDisplay.textContent = biggerCount;
    slowUsedDisplay.textContent = slowUsed ? 'Yes' : 'No';
}

// Try again button
tryAgainButton.addEventListener('click', () => {
    resetGame();
    cheaterScreen.style.display = 'none';
    startScreen.style.display = 'block';
});

// Function to reset game state
function resetGame() {
    attempts = 0;
    legitAttempts = 0;
    attemptsDisplay.textContent = attempts;
    lastMouseMoveTime = Date.now();
    
    // Reset all cheats
    cheatsUsed = false;
    freezeCount = 0;
    teleportCount = 0;
    biggerCount = 0;
    slowUsed = false;
    hackFreezeActive = false;
    hackSlowActive = false;
    hackBiggerActive = false;
    
    // Reset button appearance
    button.style.padding = '12px 24px';
    button.style.fontSize = '1rem';
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    
    // Reset hack buttons
    hackFreezeBtn.classList.remove('active');
    hackFreezeBtn.textContent = 'Freeze Button (F)';
    hackSlowBtn.classList.remove('active');
    hackSlowBtn.textContent = 'Slow Mode (S)';
    hackBiggerBtn.classList.remove('active');
    hackBiggerBtn.textContent = 'Bigger Button (B)';
    
    // Restart roast timer
    roastTimer = setInterval(checkIdle, 3000);
}

// Handle touch events for mobile devices
button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameStarted) {
        const touch = e.touches[0];
        moveButton(touch.clientX, touch.clientY);
    }
});

document.addEventListener('touchmove', (e) => {
    if (gameStarted) {
        const touch = e.touches[0];
        moveButton(touch.clientX, touch.clientY);
    }
});

// Function to show the "idiot" screen after 1000 attempts
function showIdiotScreen() {
    gameScreen.style.display = 'none';
    idiotScreen.style.display = 'block';
    gameStarted = false;
    clearInterval(roastTimer);
    
    // Simulate downloading a file
    let percent = 0;
    const downloadInterval = setInterval(() => {
        percent += 1;
        downloadProgress.style.width = percent + '%';
        downloadPercent.textContent = percent;
        
        if (percent >= 100) {
            clearInterval(downloadInterval);
            // Create and download a text file
            downloadIdiotCertificate();
            // Show close button
            closeButton.style.display = 'inline-block';
        }
    }, 30);
}

// Function to create and download the "idiot certificate"
function downloadIdiotCertificate() {
    const text = `
═══════════════════════════════════════════════════
           CERTIFICATE OF IDIOCY
═══════════════════════════════════════════════════

This certifies that YOU ARE AN IDIOT! 🤡

You have successfully failed to click a button
1000 times in a row.

This level of dedication to failure is truly
remarkable and deserves recognition.

Congratulations on your persistence in futility!

Date: ${new Date().toLocaleDateString()}
Attempts: 1000
Success Rate: 0%
IQ Level: Questionable

═══════════════════════════════════════════════════
      This certificate is valid forever
       (because you can't undo stupidity)
═══════════════════════════════════════════════════
`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'YOU_ARE_AN_IDIOT.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Close button handler
closeButton.addEventListener('click', () => {
    // Try to close the window (will only work if opened by script)
    window.close();
    // If that doesn't work, redirect to a blank page
    setTimeout(() => {
        window.location.href = 'about:blank';
    }, 100);
});
