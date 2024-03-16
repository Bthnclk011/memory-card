function Header({score, bestScore})
{
    return (
    <header className="header">
        <div>
            <h1>Memory Card Game</h1>
            <p>Don't click the same card twice!</p>
        </div>
        <div>
            <p>Score: {score} </p>
            <p>Best Score: {bestScore} </p>
        </div>
    </header>
    )
}

export default Header