import Header from "../components/Header";
import Tasks from "./home/Tasks";

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
