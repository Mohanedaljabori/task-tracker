import React from "react";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <TaskList />
        </div>
    );
};

export default App;
