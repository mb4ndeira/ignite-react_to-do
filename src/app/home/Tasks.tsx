"use client";

import "./task-list.scss";

import React, { useRef, useState } from "react";
import { FiCheckSquare, FiTrash } from "react-icons/fi";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SortableList, { RenderItem } from "@/library/drag&Drop/SortableList";
import onKeyPress from "@/helpers/onKeyPress";
import Checkbox from "@/components/Checkbox";

type Task = {
  id: string;
  title: string;
  completed: boolean;
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

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const indexMap = new Map<UniqueIdentifier, number>(
        tasks.map((task, index) => [task.id, index])
      );

      return arrayMove(
        prev,
        indexMap.get(active.id) as number,
        indexMap.get(over.id) as number
      );
    });
  };

  const renderTaskItem: RenderItem<Task> = (TaskListItem, task) => (
    <TaskListItem
      tabIndex={0}
      aria-describedby={`${task.id}-title`}
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
        children={<FiTrash />}
      />
    </TaskListItem>
  );

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
            onKeyDown={onKeyPress("Enter", addTask)}
          />
          <button type="button" aria-label="Botão de adição" onClick={addTask}>
            <FiCheckSquare color="#fff" />
          </button>
        </div>
      </div>

      <div>
        <SortableList
          data={tasks}
          renderItem={renderTaskItem}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}
