import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui-elements/ui/card";
import { Todo } from "./Child/Todo";
import API_ENDPOINTS from "@/api/APIEndpoints";
import { useState, useEffect } from "react";
// import { useQuery } from "react-query";

interface Todo {
  key: number;
  _id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function TodoList() {
  
  // const { isLoading, error, data } = useQuery("users", API_ENDPOINTS.getTodos);

  // if(isLoading) return <p>Loading...</p>
  // if(error) return <p>Error loading todos</p>
  // console.log(data);
  const [Todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = (await API_ENDPOINTS.getTodos()) as Todo[];
        setTodos(todos);
      } catch (error) {
        console.error(`Error fetching todos from todos:`, error);
        throw error;
      }
    };
    getTodos();
  }, []);

  return (
    <Card className="flex flex-1 flex-col ">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>Your task view</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row flex-wrap w-full gap-3 mb-3">
        {Todos.length ? (
          Todos.map((todo) => (
          
              <div key={todo._id } className="flex flex-col lg:basis-3/12 flex-1 md:basis-6/12 flex-wrap w-full gap-3">
                <Todo
                 
                  _id={todo._id}
                  title={todo.title}
                  description={todo.description}
                  completed={todo.completed}
                />
              </div>
      
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No todos found.</p>
        )}
      </CardContent>
    </Card>
  );
}
