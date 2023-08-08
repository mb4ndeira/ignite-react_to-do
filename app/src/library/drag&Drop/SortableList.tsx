import React, { LegacyRef, forwardRef, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import SortableListItem, { SortableListItemType } from "./SortableListItem";

export type RenderItem<T> = (
  Component: SortableListItemType,
  itemData: T,
) => React.ReactNode;

interface ISortableListProps<T>
  extends Omit<React.HTMLProps<HTMLUListElement>, "data"> {
  data: T[];
  renderItem: RenderItem<T>;
  handleDragEnd?: (event: DragEndEvent) => void;
  autoAnimate?: boolean;
}

const SortableList = <T extends { id: string }>({
  data,
  renderItem,
  handleDragEnd,
  autoAnimate,
  ...rest
}: ISortableListProps<T>) => {
  const [autoanimateRef] = useAutoAnimate();

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <ul
          {...rest}
          className={"list-none " + rest.className}
          ref={autoAnimate ? autoanimateRef : null}
        >
          {data.map((itemData) => renderItem(SortableListItem, itemData))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
