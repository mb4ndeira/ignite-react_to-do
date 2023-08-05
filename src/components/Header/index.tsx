"use client";

import "./styles.scss";

import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div>
        <Image src="/logo.svg" alt="to.do logo" width={90} height={28} />
      </div>
    </header>
  );
}
