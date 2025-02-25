const Home = () => {
    return <div className="container"><h2>Főoldal</h2><p>Üdvözöllek az alkalmazásban!</p></div>;
};

const About = () => {
    return <div className="container"><h2>Rólunk</h2><p>Ez egy egyszerű React alkalmazás.</p></div>;
};

const App = () => {
    const [page, setPage] = React.useState("home");

    return (
        <div>
            <nav>
                <button onClick={() => setPage("home")}>Főoldal</button>
                <button onClick={() => setPage("about")}>Rólunk</button>
            </nav>
            {page === "home" ? <Home /> : <About />}
        </div>
    );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);