import "./Header.css"
import {useContext} from "react";
import Theme from "../context/Theme";

function Header() {
    const [darkMode, setDarkMode] = useContext(Theme);

    return (
        <div className="header">
            <h1 className="header_text">Notes</h1>
            <button className="header_btn" onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
        </div>
    );
}

export default Header;