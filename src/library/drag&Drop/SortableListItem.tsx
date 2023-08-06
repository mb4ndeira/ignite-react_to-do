import { useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";

export type SortableListItemType<
  P extends ISortableListItemProps = ISortableListItemProps,
  O extends string = "",
> = React.FC<Omit<ISortableListItemProps, O>>;

interface ISortableListItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "id"> {
  id: UniqueIdentifier;
  height: number;
  onActivation?: () => void;
}

const SortableListItem = ({
  id,
  height,
  onActivation,
  children,
  ...rest
}: ISortableListItemProps) => {
  const { active, attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  useEffect(() => {
    active && onActivation?.();
  }, [active]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height,
  };

  return (
    <li
      {...rest}
      className={"relative " + rest.className}
      style={{ ...rest.style, ...style }}
      ref={setNodeRef}
      {...attributes}
    >
      {children}
      <div
        className="absolute left-0 top-0 w-full"
        {...listeners}
        style={{ height: `${height}px` }}
      />
    </li>
  );
};

export default SortableListItem;
