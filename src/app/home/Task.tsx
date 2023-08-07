"use client";

import { useEffect, useRef, useState } from "react";
import { FiTrash, FiPlusSquare } from "react-icons/fi";

import Checkbox from "@/components/Checkbox";
import { SortableListItemType } from "@/library/drag&Drop/SortableListItem";
import Task from "@/types/Task";

interface TaskProps {
  SortableListItem: SortableListItemType;
  task: Task;
  isSubtask: boolean;
  grabbedTask: string;
  grabTask: (id: Task["id"]) => void;
  completeTask: (id: Task["id"]) => void;
  deleteTask: (id: Task["id"]) => void;
  addSubtask: (id: Task["id"]) => void;
}

const calculateItemHeight = (textHeight: number) => {
  const totalVerticalPadding = 16 * 2;

  return totalVerticalPadding + textHeight;
};

export default function Task({
  SortableListItem,
  task: { id, title, completed },
  isSubtask,
  grabbedTask,
  grabTask,
  completeTask,
  deleteTask,
  addSubtask,
}: TaskProps) {
  const titleRef = useRef<HTMLParagraphElement>(null);

  const [itemHeight, setItemHeight] = useState<number>(56);

  useEffect(() => {
    if (!titleRef.current) return;

    setItemHeight(
      calculateItemHeight(titleRef.current?.clientHeight as number),
    );
  }, [title]);

  return (
    <SortableListItem
      className={
        "mt-0.5 flex cursor-grab items-center justify-between border-b bg-white py-4  pr-1.5" +
        (isSubtask ? " pl-8.5 " : " pl-3.5 ") +
        (grabbedTask
          ? " rounded-lg border-b-white"
          : " border-b-white-smoke-regular")
      }
      aria-describedby={`${id}-title`}
      key={id}
      id={id}
      height={itemHeight}
      onActivation={() => grabTask(id)}
    >
      <div className="flex items-center gap-4 outline-none">
        <Checkbox
          checked={completed}
          readOnly
          onClick={() => completeTask(id)}
        />
        <p
          className={
            "z-10 cursor-text text-base text-onyx-dark " +
            (completed ? " line-through opacity-60" : "")
          }
          id={`${id}-title`}
          ref={titleRef}
        >
          {title}
        </p>
      </div>
      <div className="flex items-center gap-4 outline-none">
        {!isSubtask && (
          <button
            className="bg-transparent group z-10 flex h-6 w-6  items-center justify-center border-none "
            type="button"
            role="button"
            aria-label="Adicionar sub-to-do"
            onClick={() => addSubtask(id)}
            children={
              <FiPlusSquare className={"text-white-smoke-extra-dark"} />
            }
          />
        )}
        <button
          className="bg-transparent group z-10 flex h-6 w-6  items-center justify-center border-none "
          type="button"
          role="button"
          aria-label="Deletar to-do"
          onClick={() => deleteTask(id)}
          children={
            <FiTrash className="text-white-smoke-extra-dark group-hover:text-red" />
          }
        />
      </div>
    </SortableListItem>
  );
}
