import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";

function App() {

    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
        document.querySelector("body").setAttribute("data-theme", selectedTheme)
    }
    return (
        <div id="app">
            <div id="container">
                <BrowserRouter>
                    <Routes>
                        <Route element={<Notes />} path="/" />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
