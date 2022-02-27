import React from "react";
import ReactDOM from "react-dom";
import ProvideContexts from "./context/Contexts";
import "./index.css";
import App from "./App";

ReactDOM.render(
    <ProvideContexts>
        <App />
    </ProvideContexts>,
    document.getElementById("root")
);
