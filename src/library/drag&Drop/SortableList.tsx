import React from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableListItem, { SortableListItemType } from "./SortableListItem";

export type RenderItem<T> = (
  Component: SortableListItemType,
  itemData: T,
) => React.ReactNode;

interface ISortableListProps<T> {
  data: T[];
  renderItem: RenderItem<T>;
  handleDragEnd?: (event: DragEndEvent) => void;
  kind?: "ordered" | "unnordered";
}

const SortableList = <T extends { id: string }>({
  data,
  renderItem,
  handleDragEnd,
  kind = "unnordered",
}: ISortableListProps<T>) => {
  const HTMLList: React.FC<
    React.HTMLProps<HTMLUListElement | HTMLOListElement>
  > = ({ children }) =>
    kind === "unnordered" ? <ul>{children}</ul> : <ol>{children}</ol>;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <HTMLList className="list-none">
          {data.map((itemData) => renderItem(SortableListItem, itemData))}
        </HTMLList>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
