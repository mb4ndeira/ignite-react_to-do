"use client";

import { useRef } from "react";
import { CgCheck } from "react-icons/cg";

import onKeyPress from "@/helpers/onKeyPress";

export default function Checkbox({
  checked,
  ...rest
}: { checked: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={"checkbox " + (checked ? "checkbox--checked" : "")}
      tabIndex={0}
      onKeyDown={onKeyPress("Enter", () => inputRef.current?.click())}
    >
      <div />
      <CgCheck />
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        tabIndex={0}
        ref={inputRef}
      />
    </div>
  );
}
