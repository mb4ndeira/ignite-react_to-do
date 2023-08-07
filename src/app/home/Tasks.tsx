"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import SortableList, { RenderItem } from "@/library/drag&Drop/SortableList";
import onKeyPress from "@/helpers/onKeyPress";
import Task from "@/types/Task";
import TaskComponent from "./Task";

export default function Tasks() {
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const [addingTo, setAddingTo] = useState<Task["id"] | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Task 1",
      completed: false,
      subtasks: [
        {
          id: "2",
          title: "Subtask 1",
          completed: false,
          subtasks: null,
          parent: "1",
        },
      ],
      parent: null,
    },
  ]);
  const [grabbedTask, setGrabbedTask] = useState("");

  useEffect(() => {
    if (!addTaskInputRef.current) return;

    if (!addingTo) addTaskInputRef.current.placeholder = "Adicionar novo to.do";
  }, [addingTo]);

  const orderedTasks = tasks.flatMap((task) => [
    task,
    ...(task["subtasks"] as Task[]),
  ]);

  const addTask = () => {
    if (!addTaskInputRef.current?.value) return;

    const newTask = {
      id: Math.random().toString(),
      title: addTaskInputRef.current?.value,
      completed: false,
    };

    if (addingTo) {
      const indexToReplace = orderedTasks.findIndex(
        (task) => task.id === addingTo,
      );

      setTasks([
        ...orderedTasks.slice(0, indexToReplace),
        { ...newTask, subtasks: null, parent: addingTo },
        ...orderedTasks.slice(indexToReplace + 1),
      ]);

      setAddingTo(null);

      return;
    } else {
      setTasks((prev) => [...prev, { ...newTask, subtasks: [], parent: null }]);
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

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id != id);

    setTasks(filteredTasks);
  };

  const addSubtask = (id: string) => {
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
      deleteTask={deleteTask}
      addSubtask={addSubtask}
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
            onBlur={() => setAddingTo(null)}
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
          data={orderedTasks}
          renderItem={renderTaskItem}
          handleDragEnd={handleDragEnd}
          autoAnimate={true}
        />
      </div>
    </div>
  );
}
