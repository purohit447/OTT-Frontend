import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Task from "./Task";

function Nav() {
  const [show, handleShow] = useState(false);
  const [isTaskComponentOpen, setIsTaskComponentOpen] = useState(false);

  const handleTaskIconClick = () => {
    setIsTaskComponentOpen(!isTaskComponentOpen);
  };

  const tasks = {
    daily: [
      { id: 1, name: "Complete daily workout" },
      { id: 2, name: "Read a chapter of a book" },
      { id: 3, name: "Write a journal entry" },
      { id: 4, name: "Practice a new skill" },
    ],
    weekly: [
      { id: 1, name: "Grocery shopping" },
      { id: 2, name: "Meet with friends" },
      { id: 3, name: "Submit weekly report" },
      { id: 4, name: "Clean the house" },
    ],
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <Link to="/home">
        <img
          className="nav__logo"
          // src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          src="https://martingarrix.com/img/mg-autograph.png"
          alt="Netflix Logo"
        />
      </Link>

      <div className="right__icons">
        <div className="nav__task-symbol" onClick={handleTaskIconClick}>
          <img
            className="nav__task-icon"
            src="https://cdn-icons-png.flaticon.com/512/665/665939.png"
            alt="task__icon"
          />
        </div>
        <Task
          tasks={tasks}
          isOpen={isTaskComponentOpen}
          onClose={() => setIsTaskComponentOpen(false)}
        />
        <Link to="/user">
          <img
            className="nav__avatar"
            //   src="https://pbs.twimg.com/profile_images/124011999041155"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User Profile"
          />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
