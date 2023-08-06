"use client";

import React, { useRef, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SortableList, { RenderItem } from "@/library/drag&Drop/SortableList";
import onKeyPress from "@/helpers/onKeyPress";
import Task from "@/types/Task";
import TaskComponent from "./Task";

export default function Tasks() {
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [grabbedTask, setGrabbedTask] = useState("");

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
        : task,
    );

    setTasks(newTask);
  };

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id != id);

    setTasks(filteredTasks);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setGrabbedTask("");

    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const indexMap = new Map<UniqueIdentifier, number>(
        tasks.map((task, index) => [task.id, index]),
      );

      return arrayMove(
        prev,
        indexMap.get(active.id) as number,
        indexMap.get(over.id) as number,
      );
    });
  };

  const renderTaskItem: RenderItem<Task> = (ListItemComponent, task) => (
    <TaskComponent
      key={task.id}
      SortableListItem={ListItemComponent}
      task={task}
      grabbedTask={grabbedTask}
      grabTask={() => setGrabbedTask(task.id)}
      completeTask={completeTask}
      deleteTask={deleteTask}
    />
  );

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-4xl font-semibold text-onyx-regular">
          Minhas tasks
        </h2>
        <div className="flex items-center gap-2">
          <input
            className="rounded-lg border-none bg-white-smoke-regular px-6 py-2.5 text-base text-onyx-dark placeholder-onyx-extra-light"
            type="text"
            name="to-do"
            placeholder="Adicionar novo to.do"
            aria-label="Adicionar novo to.do"
            ref={addTaskInputRef}
            onKeyDown={onKeyPress("Enter", addTask)}
          />
          <button
            className=" flex items-center justify-center rounded-lg border-none bg-green p-3 text-xl font-semibold text-white transition duration-200 hover:brightness-95"
            type="button"
            aria-label="Botão de adição"
            onClick={addTask}
            children={<FiCheckSquare className="text-white" />}
          />
        </div>
      </div>

      <div className="mt-12">
        <SortableList
          data={tasks}
          renderItem={renderTaskItem}
          handleDragEnd={handleDragEnd}
          autoAnimate={true}
        />
      </div>
    </div>
  );
}
