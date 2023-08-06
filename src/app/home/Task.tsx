"use client";

import { useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";

import Checkbox from "@/components/Checkbox";
import { SortableListItemType } from "@/library/drag&Drop/SortableListItem";
import Task from "@/types/Task";

interface TaskProps {
  SortableListItem: SortableListItemType;
  task: Task;
  grabbedTask: string;
  grabTask: (id: Task["id"]) => void;
  completeTask: (id: Task["id"]) => void;
  deleteTask: (id: Task["id"]) => void;
}

const totalVerticalPadding = 16 * 2;
const lineHeight = 24;

export default function Task({
  SortableListItem,
  task: { id, title, completed },
  grabbedTask,
  grabTask,
  completeTask,
  deleteTask,
}: TaskProps) {
  const titleRef = useRef<HTMLParagraphElement>(null);

  const [itemHeight, setItemHeight] = useState<number>(56);

  useEffect(() => {
    if (!titleRef.current) return;

    const numberOfLines = Math.floor(
      (titleRef.current?.clientHeight as number) / lineHeight,
    );

    setItemHeight(totalVerticalPadding + numberOfLines * lineHeight);
  }, [title]);

  return (
    <SortableListItem
      className={
        "mt-0.5 flex cursor-grab items-center justify-between border-b bg-white px-3.5 py-4" +
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
      <div className="z-10 flex items-center gap-4 outline-none">
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
      <button
        className="bg-transparent group z-10  h-6 w-6 border-none text-white-smoke-extra-dark"
        type="button"
        role="button"
        aria-label="Deletar to-do"
        onClick={() => deleteTask(id)}
        children={<FiTrash className=" group-hover:text-red" />}
      />
    </SortableListItem>
  );
}
