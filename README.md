

```
# 🧩 Assembly Game: Save the World from Assembly!

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.info/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

An interactive, programming-themed word guessing game. Your mission is to guess the word letter by letter. Every wrong guess "kills" a programming language. If all languages are gone, you're forced to write in **Assembly**!

**[🎮 Play the Live Demo Here!](https://Muhammad-Zubair796.github.io/Puzzule-React-Game/)**

---

## 🚀 Key Features

* **Interactive Virtual Keyboard:** Tracks your guesses with real-time color feedback (Green for Correct, Red for Wrong).
* **Visual Life System:** Watch as languages like JavaScript, Python, and Ruby disappear with every mistake.
* **Dynamic Word Reveal:** If you lose, the game automatically reveals the letters you missed in red.
* **Celebration Logic:** Integrated `canvas-confetti` library to celebrate your wins.
* **Screen Reader Accessible:** Built with ARIA live regions and semantic HTML for a better experience for all users.
* **Responsive Design:** Optimized for both mobile and desktop screens.

---

## 🛠️ Technical Implementation

### State Management
The game uses multiple React `useState` hooks to track:
* `currentWord`: The random target word.
* `guessedLetters`: An array containing all unique letters selected by the user.

### Derived State & Logic
To keep the code clean and performant, several variables are calculated during the render phase:
* `wrongGuessCount`: Computed by filtering `guessedLetters` against the `currentWord`.
* `isGameOver`: A boolean derived from win/loss conditions.
* `farewellMessage`: Logic that triggers a "goodbye" message to the language currently being lost.

### Performance Optimization
* **useEffect Hook:** Used to trigger the confetti celebration only once at the exact moment `isGameWon` becomes true.
* **Clsx Utility:** Used for clean conditional class management in the keyboard and status sections.

---

## 📂 Project Structure

```text
src/
├── components/     # React components
├── languages.js    # Data for the programming languages (colors/names)
├── words.js        # The list of possible secret words
├── utils.js        # Helper functions (getRandomWord, getFarewellText)
└── App.jsx         # Main game logic and state

```

---

## 💻 How to Run Locally

1. Clone the repository:
```bash
git clone [https://github.com/Muhammad-Zubair796/Puzzule-React-Game.git](https://github.com/Muhammad-Zubair796/Puzzule-React-Game.git)

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```



---

## 👤 Author

**Muhammad Zubair**

* GitHub: [@Muhammad-Zubair796](https://www.google.com/search?q=https://github.com/Muhammad-Zubair796)

---

*Show some love by starring ⭐ this repository if you like the project!*

