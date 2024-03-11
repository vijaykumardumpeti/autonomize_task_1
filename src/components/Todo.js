    import React, { useState } from "react";
    import { RxCross2 } from "react-icons/rx";
    // import { PiPencil } from "react-icons/pi";
    import "./todo.css";

    import InitialFocus from "./popup";

    // import {v4 as uuidv4} from 'uuid'

    // {
    //     task: "hello",
    //     originalQuantity: 1,
    //     updatedQuantity: 0,
    //     updated: false

    // }

    const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [counts, setCounts] = useState({});
    const [inputTask, setInputTask] = useState("");

    const [nextId, setNextId] = useState(0);

    const addTask = () => {
        let task = (inputTask ).split(" ");

        let taskName = task.slice(0, -1).join(' ');
        console.log(taskName);

        let quantity = parseInt(task.pop());
        if (isNaN(quantity)) {
        quantity = 1;
        taskName = taskName + "  ";
        }

        console.log(quantity);

        console.log(taskName);

        for (let i = 0; i < quantity; i++) {
        let newTask = {
            id: nextId + i,
            name: taskName,
            originalQuantity: quantity,
            updatedQuantity: 0,
            updated: false,
        };
        setTasks((prevState) => [...prevState, newTask]);
        }

        setNextId((prevId) => prevId + quantity);

        setCounts((prevState) => ({
        ...prevState,
        [taskName]: prevState[taskName] || 0,
        }));
    };

    const deleteTask = (deleteIndex) => {
        const task = tasks[deleteIndex];

        const filteredTasks = tasks.filter((ele, index) => index !== deleteIndex);
        setTasks([...filteredTasks]);

        setCounts((prevState) => ({
        ...prevState,
        [task.name]: prevState[task.name] > 0 && prevState[task.name] - 1,
        }));
    };

    const updateTodo = (taskObject, newTodoName) => {
        console.log(newTodoName);
        const task = (newTodoName + " ").split(" ");
        console.log(task);

        let quantity = parseInt(task.pop());
        console.log(quantity);

        const taskName = task.join(" ");

        if (isNaN(quantity)) {
        quantity = 1;
        }
        console.log(taskName);

        //-------------------------------------------------------------------------------

        const updatedTasks = tasks.map((item) => {
        if (item.id === taskObject.id) {
            return {
            ...item,
            name: taskName,
            originalQuantity: quantity,
            updatedQuantity: item.updatedQuantity + 1,
            updated: true,
            };
        }
        return item;
        });

        setTasks(updatedTasks);

        setCounts((prevState) => ({
        ...prevState,
        [taskName]: (prevState[taskName] || 0) + 1,
        }));
    };

    console.log("objects=========", tasks);

    console.log("counts=======", counts);
    return (
        <div className="todo-main">
        <div className="todo-container">
            <h1>Day Goals!</h1>
            <div className="input-btn-container">
            <input
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
                className="input-element"
                type="text"
                placeholder="Write code 3"
            />{" "}
            <br />
            <button
                onClick={() => {
                if (inputTask !== "") {
                    addTask();
                    setInputTask("");
                }
                }}
                className="add-button"
                type="button"
            >
                Add Todo
            </button>
            </div>
            <ul className="list-container">
            {tasks.map((task, index) => (
                <li key={index} className="list-item">
                <span>
                    {task.name} (Updated {task.updatedQuantity} Times)
                </span>
                <div className="icons-container">
                    {/* <PiPencil onClick={()=> updateTodo(index)}/> */}
                    <InitialFocus
                    taskObject={task}
                    updateIndex={index}
                    updateTodo={updateTodo}
                    />
                    <RxCross2 onClick={() => deleteTask(index)} />
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
    };

    export default Todo;
