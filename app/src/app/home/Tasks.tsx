"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SortableList, { RenderItem } from "@/library/drag&Drop/SortableList";
import onKeyPress from "@/helpers/onKeyPress";
import { addTask, deleteTask, getMyTasks } from "@/services/index";

import Task from "@/types/Task";
import TaskComponent from "./Task";

export default function Tasks() {
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const [addingTo, setAddingTo] = useState<Task["id"] | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [grabbedTask, setGrabbedTask] = useState("");

  useEffect(() => {
    (async () => {
      const myTasks = await getMyTasks();
      setTasks(myTasks);
    })();
  }, []);

  useEffect(() => {
    if (!addTaskInputRef.current) return;

    if (!addingTo) addTaskInputRef.current.placeholder = "Adicionar novo to.do";
  }, [addingTo]);

  const handleAddTask = async () => {
    if (!addTaskInputRef.current?.value) return;

    const newTask = await addTask(
      addTaskInputRef.current?.value,
      addingTo as Task["parent"],
    );

    if (!newTask) return;

    if (addingTo) {
      const indexToReplace = tasks.findIndex((task) => task.id === addingTo);

      setTasks([
        ...tasks.slice(0, indexToReplace),
        newTask,
        ...tasks.slice(indexToReplace + 1),
      ]);

      setAddingTo(null);

      return;
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

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

  const handleDeleteTask = (id: string) => {
    deleteTask(id);

    const filteredTasks = tasks.filter((task) => task.id != id);

    setTasks(filteredTasks);
  };

  const handleAddSubtask = (id: string) => {
    if (!addTaskInputRef.current) return;

    addTaskInputRef.current?.focus();

    addTaskInputRef.current.placeholder = "Adicionar sub to.do";

    setAddingTo(id);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setGrabbedTask("");

    let { active, over } = e;

    if (!over || active.id === over.id) return;

    const tasksMap = new Map<string, Task & { index: number }>(
      tasks.map((task, index) => [task.id, { ...task, index }]),
    );

    const draggedTask = tasksMap.get(active.id.toString());
    const droppedOn = tasksMap.get(over.id.toString());

    if (draggedTask?.subtasks && droppedOn?.subtasks) {
      setTasks((prev) => {
        return arrayMove(
          prev,
          draggedTask?.index as number,
          droppedOn?.index as number,
        );
      });
      return;
    }
  };

  const renderTaskItem: RenderItem<Task> = (ListItemComponent, task) => (
    <TaskComponent
      key={task.id}
      SortableListItem={ListItemComponent}
      task={task}
      isSubtask={!task.subtasks ? true : false}
      grabbedTask={grabbedTask}
      grabTask={() => setGrabbedTask(task.id)}
      completeTask={completeTask}
      deleteTask={handleDeleteTask}
      addSubtask={handleAddSubtask}
    />
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h2 className="text-3xl font-semibold text-onyx-regular md:text-3xl lg:text-4xl">
          Minhas tasks
        </h2>
        <div className="mt-8 flex w-full items-center gap-2 md:mt-0 md:w-max">
          <input
            className=" w-full rounded-lg border-none bg-white-smoke-regular px-6 py-2.5 text-base text-onyx-dark placeholder-onyx-extra-light lg:w-96"
            type="text"
            name="to-do"
            placeholder="Adicionar novo to.do"
            aria-label="Adicionar novo to.do"
            ref={addTaskInputRef}
            onKeyDown={onKeyPress("Enter", handleAddTask)}
            onBlur={() => setAddingTo(null)}
          />
          <button
            className=" flex items-center justify-center rounded-lg border-none bg-green p-3 text-xl font-semibold text-white transition duration-200 hover:brightness-95"
            type="button"
            aria-label="Botão de adição"
            onClick={handleAddTask}
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
