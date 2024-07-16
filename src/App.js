import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
    NotFound,
    Index
} from "./Pages";

import "./cdn/css/main.css";


function App() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.split("/").pop().length > 0) {
            const Text = location.pathname.split("/").pop().replaceAll("-", " ");
            document.title = `Doc Gamer Memorial - ${Text.toUpperCase()[0]}${Text.slice(1, Text.length)}`;
        } else {
            document.title = `Doc Gamer Memorial`;
        }
    }, [location.pathname]);

    return (<>
        <Routes>
            <Route path="" element={<Index />} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </>);
}

export default App;