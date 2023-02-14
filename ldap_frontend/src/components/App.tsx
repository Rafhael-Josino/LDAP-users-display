import React from "react";
import Header from "./Header";
import AppRoutes from "../routes";

function App() {
    return <React.Fragment>
        <Header />
        <main>
            <AppRoutes />
        </main>
    </React.Fragment>
}

export default App;