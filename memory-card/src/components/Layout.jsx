import { useEffect, useState } from "react";

export const Layout = () => {
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing');

    useEffect(() => {
        const initializeCards = async () => {
            const cardData = [];
            for (let i = 1; i <= 12; i++) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const pokemon = await response.json();
                    cardData.push({
                        id: i,
                        name: pokemon.name,
                        image: pokemon.sprites.front_default,
                    });
                } catch (error) {
                    console.error(`Error fetching Pokemon ${i}:`, error);
                    cardData.push({
                        id: i,
                        name: `Pokemon ${i}`,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
                    });
                }
            }
            setCards(shuffleArray(cardData));
        };

        initializeCards();
    }, []);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const handleCardClick = (cardId) => {
        if (gameStatus !== 'playing') return;

        setCards(prevCards => shuffleArray(prevCards));

        if (clickedCards.includes(cardId)) {
            setGameStatus('lost');
            if (currentScore > bestScore) {
                setBestScore(currentScore);
            }
        } else {
            const newClickedCards = [...clickedCards, cardId];
            const newScore = currentScore + 1;
            
            setClickedCards(newClickedCards);
            setCurrentScore(newScore);

            if (newClickedCards.length === cards.length) {
                setGameStatus('won');
                setBestScore(newScore);
            }
        }
    };

    const resetGame = () => {
        setClickedCards([]);
        setCurrentScore(0);
        setGameStatus('playing');
        setCards(prevCards => shuffleArray(prevCards));
    };

    return (
        <div className="game-container">
            <header className="game-header">
                <h1>Memory Card Game</h1>
                <p className="game-instructions">
                    Get points by clicking on an image but don't click on any more than once!
                </p>
            </header>

            <div className="scoreboard">
                <div className="score">
                    <span className="score-label">Score:</span>
                    <span className="score-value">{currentScore}</span>
                </div>
                <div className="score">
                    <span className="score-label">Best Score:</span>
                    <span className="score-value">{bestScore}</span>
                </div>
            </div>

            {gameStatus === 'won' && (
                <div className="game-message win">
                    <h2>🎉 Congratulations! You Won! 🎉</h2>
                    <p>You clicked all {cards.length} cards without repeating!</p>
                    <button onClick={resetGame} className="play-again-btn">
                        Play Again
                    </button>
                </div>
            )}

            {gameStatus === 'lost' && (
                <div className="game-message lose">
                    <h2>😞 Game Over!</h2>
                    <p>You clicked on a card you've already selected!</p>
                    <p>Final Score: {currentScore}</p>
                    <button onClick={resetGame} className="play-again-btn">
                        Try Again
                    </button>
                </div>
            )}

            <div className="grid-container">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        className={`card`}
                        onClick={() => handleCardClick(card.id)}
                        disabled={gameStatus !== 'playing'}
                    >
                        <img 
                            src={card.image} 
                            alt={card.name}
                            loading="lazy"
                        />
                        <p className="card-name">{card.name}</p>
                    </button>
                ))}
            </div>

            {gameStatus === 'playing' && (
                <div className="game-stats">
                    <p>Cards clicked: {clickedCards.length} / {cards.length}</p>
                </div>
            )}
        </div>
    );
};