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
      className={"relative flex items-center justify-center rounded"}
      tabIndex={0}
      onKeyDown={onKeyPress("Enter", () => inputRef.current?.click())}
    >
      <div
        className={
          "absolute left-1/2 top-1/2 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transform rounded " +
          (checked ? " bg-blue" : " bg-white-smoke-regular")
        }
      />
      <CgCheck
        className={
          "h-4.5 w-4.5 scale-150 text-white opacity-0 " +
          (checked ? " opacity-100" : "")
        }
      />
      <input
        {...rest}
        className="absolute left-1/2 top-1/2 z-10 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer opacity-0"
        type="checkbox"
        checked={checked}
        tabIndex={0}
        ref={inputRef}
      />
    </div>
  );
}
