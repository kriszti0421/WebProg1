const { useState } = React;

function Header() {
    return React.createElement("header", null, 
        React.createElement("h1", null, "React Alkalmazás")
    );
}

function Footer() {
    return React.createElement("footer", null, 
        React.createElement("p", null, "Készítette: [Te Neved] – NEPTUN: XXXXX")
    );
}

function Counter() {
    const [count, setCount] = useState(0);

    return React.createElement("div", null, 
        React.createElement(Header),
        React.createElement("h2", null, "Számláló"),
        React.createElement("h3", null, count),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Növel"),
        React.createElement("button", { onClick: () => setCount(count - 1) }, "Csökkent"),
        React.createElement("button", { onClick: () => setCount(0) }, "Nulláz"),
        React.createElement(Footer)
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Counter));
