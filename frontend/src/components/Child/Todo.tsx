import API_ENDPOINTS from "@/api/APIEndpoints";
import { Button } from "@/ui-elements/ui/button";
import { Card, CardTitle, CardDescription, CardFooter } from "@/ui-elements/ui/card";
import { toast } from "sonner";

const TODO_UPDATE_SUCCESS_MESSAGE = "Todo updated successfully!";
const TODO_DELETE_SUCCESS_MESSAGE = "Todo removed successfully!";

interface Todo {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function Todo({ _id, title, description, completed }: Todo) {
  
  const handleButtonClick = async (id: number, action: boolean) => {
    if (action === undefined || !id) {
      return;
    }

    const data = action? {
      id: id,
      completed: action,
    }: {
      id: id,
    };

    try {      
      const query = action ? API_ENDPOINTS.updateTodo(data) : API_ENDPOINTS.deleteTodo(data);
      await query;
      toast.success(action ? TODO_UPDATE_SUCCESS_MESSAGE : TODO_DELETE_SUCCESS_MESSAGE);
    } catch (error) {
      console.error(`Error ${action ? 'updating' : 'deleting'} todo:`, error);
      throw error;
    }
  };

  return (
    <Card className="p-3 gap-3 w-full">
      <div className="w-full mt-5 flex gap-3 justify-between">
        <CardTitle className="w-full">{title}</CardTitle>

        <div>
          {completed ? (
            <p className="text-green-500">Done</p>
          ) : (
            <p className="text-red-500">Pending</p>
          )}
        </div>
      </div>
      <CardDescription className="pt-3">{description}</CardDescription>
      <CardFooter className="w-full mt-5 flex gap-3 justify-around ">
        {!completed && (
          <>
            <Button className="w-full" variant={"default"}
                          onClick={() => handleButtonClick(_id, true)}
                          >
              Mark as Done
            </Button>
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => handleButtonClick(_id, false)}
            >
              Delete
            </Button>
          </>
        )}
        {completed && (
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => handleButtonClick(_id, false)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
