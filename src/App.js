import './App.css';
import Header from "./components/Header";
import Notes from "./components/Notes";
import {useEffect, useState} from "react";
import Theme from "./context/Theme";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css"

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [darkMode]);

    useEffect(() => {
        fetch('notes/test').then(console.log)
    }, []);

    return (
      <Theme.Provider value={[darkMode, setDarkMode]}>
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover={false}
              paseOnFocus={false}
          />
          <div className="app">
              <div>
                  <Header />
                  <Notes />
              </div>
          </div>
      </Theme.Provider>
    );
}

export default App;
