"use client";

import "../styles/task-list.scss";

import { useState } from "react";
import { FiCheckSquare, FiTrash } from "react-icons/fi";
import { CgCheck } from "react-icons/cg";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Checkbox = ({
  checked,
  ...rest
}: { checked: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={"checkbox " + (checked ? "checkbox--checked" : "")}>
      <div />
      <CgCheck />
      <input type="checkbox" checked={checked} {...rest} />
    </div>
  );
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      completed: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle("");
  };

  const completeTask = (id: number) => {
    const newTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(newTask);
  };

  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id != id);

    setTasks(filteredTasks);
  };

  return (
    <div>
      <div>
        <h2>Minhas tasks</h2>
        <div className="input-group">
          <input
            type="text"
            name="to-do"
            placeholder="Adicionar novo to.do"
            aria-label="Adicionar novo to.do"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="button" aria-label="Botão de adição" onClick={addTask}>
            <FiCheckSquare color="#fff" />
          </button>
        </div>
      </div>

      <div>
        <ul>
          {tasks.map((task) => (
            <li
              aria-describedby={`${task.id}-title`}
              tabIndex={0}
              key={task.id}
            >
              <div className={task.completed ? "completed" : ""}>
                <Checkbox
                  checked={task.completed}
                  readOnly
                  onClick={() => completeTask(task.id)}
                />
                <p id={`${task.id}-title`}>{task.title}</p>
              </div>
              <button
                type="button"
                aria-label="Deletar to-do"
                onClick={() => deleteTask(task.id)}
              >
                <FiTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
