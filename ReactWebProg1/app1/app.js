const Calculator = () => {
    const [num1, setNum1] = React.useState("");
    const [num2, setNum2] = React.useState("");
    const [result, setResult] = React.useState(null);

    const calculate = (operation) => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (isNaN(n1) || isNaN(n2)) return;
        
        let res = 0;
        switch (operation) {
            case "+": res = n1 + n2; break;
            case "-": res = n1 - n2; break;
            case "*": res = n1 * n2; break;
            case "/": res = n2 !== 0 ? n1 / n2 : "Hiba!"; break;
            default: return;
        }
        setResult(res);
    };

    return (
        <div className="container">
            <h2>Számológép</h2>
            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
            <br />
            <button onClick={() => calculate("+")}>+</button>
            <button onClick={() => calculate("-")}>-</button>
            <button onClick={() => calculate("*")}>*</button>
            <button onClick={() => calculate("/")}>/</button>
            <h3>Eredmény: {result}</h3>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Calculator />);
