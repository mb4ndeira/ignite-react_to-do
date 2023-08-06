import React, { LegacyRef, forwardRef } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import SortableListItem, { SortableListItemType } from "./SortableListItem";

type ListType = "ordered" | "unordered";

export type RenderItem<T> = (
  Component: SortableListItemType,
  itemData: T,
) => React.ReactNode;

interface ISortableListProps<T> {
  data: T[];
  renderItem: RenderItem<T>;
  handleDragEnd?: (event: DragEndEvent) => void;
  kind?: ListType;
  autoAnimate?: boolean;
}

const HTMLList = forwardRef<
  HTMLUListElement | HTMLOListElement,
  React.HTMLProps<HTMLUListElement | HTMLOListElement> & { kind: ListType }
>(({ kind, children }, ref) =>
  kind === "unordered" ? (
    <ul ref={ref}>{children}</ul>
  ) : (
    <ol ref={ref as LegacyRef<HTMLOListElement>}>{children}</ol>
  ),
);

const SortableList = <T extends { id: string }>({
  data,
  renderItem,
  handleDragEnd,
  kind = "unordered",
  autoAnimate,
}: ISortableListProps<T>) => {
  const [autoanimateRef] = useAutoAnimate();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <HTMLList
          className="list-none"
          ref={autoAnimate ? autoanimateRef : null}
          kind={kind}
        >
          {data.map((itemData) => renderItem(SortableListItem, itemData))}
        </HTMLList>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
