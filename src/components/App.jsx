import { useEffect } from "react";
import { useState } from "react";
import Header from './Header.jsx'
import Card from './Card.jsx'
import '../styles/app.css'

function App()
{
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);

    useEffect(() =>
    {
        let isMounted = true;
        async function fetchData()
        {
            try
            {
                const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/draw/?count=12')
                const jsonData = await response.json();
                if(isMounted)
                {
                    setData(jsonData.cards)
                }
            }

            catch(err)
            {
                console.log(err);
            }
        }
        fetchData()
        setClickedCards([]);
        return () => isMounted = false;
        
    }, [])

    function shuffleCards()
    {
        const shuffledCards = [...data].sort((a,b) => Math.random() - 0.5);
        setData(shuffledCards)
    }

    function handleBestScore()
    {
        if(score > bestScore)
        {
            setBestScore(score)
        }
        setScore(0);
    }

    function handleCardClick(cardCode)
    {
        if(clickedCards.includes(cardCode))
        {
            handleBestScore();
            setClickedCards([]);
        }

        else
        {
            setClickedCards([...clickedCards, cardCode])
            shuffleCards()
            setScore(score + 1)
        }
    }

    return (
        <>
            <Header 
                score={score}
                bestScore={bestScore}
            />

            <section className="cards">
            <ul>
            {data.map((card) => 
            {
                return  <li key={card.code} onClick={() => handleCardClick(card.code)}>
                        <Card 
                            image={card.image} 
                            alt={card.suit}
                        />
                        </li>
            })}
                </ul>
            </section>
        </>
    )
}
export default App