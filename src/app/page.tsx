import Tasks from "./components/Tasks";
import { Header } from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className="task-list container">
        <Tasks />
      </main>
    </>
  );
}
