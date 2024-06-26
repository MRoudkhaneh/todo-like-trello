import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import {App} from "./app/app";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "mobx-react";
import TasksStore from "./store/tasks";

const stores = {
    TasksStore,
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Provider {...stores}>
            <App/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
