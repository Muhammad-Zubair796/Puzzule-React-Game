import React from "react";
import clsx from "clsx";
import confetti from "canvas-confetti";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";

export default function AssemblyGame() {
  const [currentWord, setCurrentWord] = React.useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numberOfGuessesLeft = languages.length - 1;

  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.toLowerCase().includes(letter)
  ).length;

  const isGameWon = currentWord
    .toLowerCase()
    .split("")
    .every(letter => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= numberOfGuessesLeft;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.toLowerCase().includes(lastGuessedLetter);

  React.useEffect(() => {
    if (isGameWon) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isGameWon]);

  function addGuessedLetter(letter) {
    if (isGameOver) return;
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function resetGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const languageElement = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    }
    return (
      <span 
        className={clsx("chip", isLanguageLost && "lost")} 
        key={lang.name} 
        style={styles}
      >
        {lang.name}
      </span>
    )
  })

  const letterElement = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter.toLowerCase());
    const shouldRevealLetter = isGameLost || isGuessed;
    const letterClassName = clsx(
      isGameLost && !isGuessed && "missed-letter"
    );

    return (
      <span className="letter" key={index}>
        <span className={letterClassName}>
          {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
      </span>
    );
  })

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.toLowerCase().includes(letter);
    const isWrong = isGuessed && !currentWord.toLowerCase().includes(letter);
    
    const className = clsx("key", {
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button 
        key={letter} 
        className={className} 
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter.toUpperCase()}`}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-text">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning Assembly! 🤔</p>
        </>
      );
    }

    return null;
  }

  return (
    <main>
      <header>
        <h1>Assembly Game</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>

      <section className="language-chips">
        {languageElement}
      </section>

      <section className="word">
        {letterElement}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {lastGuessedLetter ? (
              currentWord.toLowerCase().includes(lastGuessedLetter) ? 
              `Correct! The letter ${lastGuessedLetter.toUpperCase()} is in the word.` : 
              `Wrong! The letter ${lastGuessedLetter.toUpperCase()} is not in the word.`
          ) : ""}
          You have {numberOfGuessesLeft - wrongGuessCount} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter =>
          guessedLetters.includes(letter.toLowerCase()) ? letter : "blank."
        ).join(" ")}</p>
      </section>

      {isGameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  )
}