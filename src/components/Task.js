import React from "react";
import "./Task.css"; // Import the corresponding CSS file

const TaskComponent = ({ tasks, isOpen, onClose }) => {
  if (!isOpen) {
    return null; // If the component is not open, return null to render nothing
  }

  return (
    <div className="task-component">
      {/* <button className="close-button" onClick={onClose}>
        Close
      </button> */}
      <div className="task-section">
        <h2>Daily Tasks</h2>
        <ul>
          {tasks.daily.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
      <div className="task-section">
        <h2>Weekly Tasks</h2>
        <ul>
          {tasks.weekly.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskComponent;
