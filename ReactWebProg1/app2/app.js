const DiceRoller = () => {
    const [roll, setRoll] = React.useState(null);
    const [rollTwo, setRollTwo] = React.useState(null);

    const rollDice = (twoDice = false) => {
        setRoll(Math.floor(Math.random() * 6) + 1);
        if (twoDice) setRollTwo(Math.floor(Math.random() * 6) + 1);
        else setRollTwo(null);
    };

    return (
        <div className="container">
            <h2>Dobókocka Szimulátor</h2>
            <button onClick={() => rollDice(false)}>1 Kocka Dobása</button>
            <button onClick={() => rollDice(true)}>2 Kocka Dobása</button>
            <h3>{roll !== null ? `Dobás: ${roll}` : "Kattints a dobásra!"}</h3>
            {rollTwo !== null && <h3>Második kocka: {rollTwo}</h3>}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<DiceRoller />);
