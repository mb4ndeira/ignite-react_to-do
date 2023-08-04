"use client";

import "../styles/header.scss";
import Image from "next/image";

export function Header() {
  return (
    <header className="header">
      <div>
        <Image src="/logo.svg" alt="to.do logo" width={90} height={28} />
      </div>
    </header>
  );
}
