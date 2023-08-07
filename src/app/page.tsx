import Image from "next/image";

import Tasks from "./home/Tasks";

const Header = () => (
  <header className="flex items-center justify-center bg-blue pb-48 pt-16">
    <div className="flex max-w-5xl items-center justify-center">
      <Image src="/logo.svg" alt="to.do logo" width={90} height={28} />
    </div>
  </header>
);

export default function App() {
  return (
    <>
      <Header />
      <main className="task-list lg: z-10 flex items-start justify-center">
        <div
          className="z-10 -mt-40  w-full max-w-5xl rounded-2xl bg-white px-10 py-16 pb-20 md:px-14 lg:h-max"
          style={{ filter: "drop-shadow(0px 1px 40px rgba(0, 0, 0, 0.03)" }}
        >
          <Tasks />
        </div>
      </main>
    </>
  );
}
