"use client";

import "../styles/task-list.scss";

import { useRef, useState } from "react";
import { FiCheckSquare, FiTrash } from "react-icons/fi";
import { CgCheck } from "react-icons/cg";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const checkEnterPress = (func?: () => void) => (e: React.KeyboardEvent) => {
  if (e.key !== "Enter") return;

  return func?.();
};

const Checkbox = ({
  checked,
  ...rest
}: { checked: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={"checkbox " + (checked ? "checkbox--checked" : "")}
      tabIndex={0}
      onKeyDown={checkEnterPress(() => inputRef.current?.click())}
    >
      <div />
      <CgCheck />
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        tabIndex={0}
        ref={inputRef}
      />
    </div>
  );
};

export default function Tasks() {
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!addTaskInputRef.current?.value) return;

    const newTask = {
      id: Math.random().toString(),
      title: addTaskInputRef.current?.value,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

    addTaskInputRef.current.value = "";
  };

  const completeTask = (id: string) => {
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

  const deleteTask = (id: string) => {
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
            ref={addTaskInputRef}
            onKeyDown={checkEnterPress(addTask)}
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
              draggable={true}
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
