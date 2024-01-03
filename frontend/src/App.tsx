import './App.css'
import { CreateTodo } from "./components/CreateTodo";
import { ThemeProvider } from "./components/Theme/Theme-Provider";
import { Menu } from "./components/Theme/Menu";
import { TodoList } from "./components/TodoList";
import { Toaster } from "./ui-elements/ui/sonner";

function App() {

  return (
    <ThemeProvider>
      <Menu />
      <main className="w-full container-fluid">
        <section className="flex w-full flex-col lg:flex-row p-3 gap-3">
          <div>
            <CreateTodo />
          </div>

          <div className="w-full">
            <TodoList/>
          </div>
        </section>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
