import React from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableListItem from "./SortableListItem";

export type RenderItem<T> = (
  Component: React.ComponentType<
    { children?: React.ReactNode } & React.HTMLProps<HTMLLIElement>
  >,
  itemData: T
) => React.ReactElement;

const SortableList = <T extends { id: string | number }>({
  data,
  renderItem,
  handleDragEnd,
  kind = "unnordered",
}: {
  data: T[];
  renderItem: RenderItem<T>;
  handleDragEnd?: (event: DragEndEvent) => void;
  kind?: "ordered" | "unnordered";
}) => {
  const HTMLList = React.forwardRef<
    HTMLUListElement | HTMLOListElement,
    { children: React.ReactNode }
  >(({ children }, ref) =>
    kind === "unnordered" ? (
      <ul ref={ref}>{children}</ul>
    ) : (
      <ol ref={ref as React.LegacyRef<HTMLOListElement>}>{children}</ol>
    )
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <HTMLList>
          {data.map((itemData) => {
            const ListItem = ({ children }: { children?: React.ReactNode }) => (
              <SortableListItem id={itemData.id} children={children} />
            );

            return renderItem(ListItem, itemData);
          })}
        </HTMLList>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
