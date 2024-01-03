import API_ENDPOINTS from "@/api/APIEndpoints";
import { Button } from "@/ui-elements/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui-elements/ui/card";
import { Input } from "@/ui-elements/ui/input";
import { Label } from "@/ui-elements/ui/label";
import { Textarea } from "@/ui-elements/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Todo</CardTitle>
          <CardDescription>Organize your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">What needs to be done?</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Write down the task here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Description">How to do it?</Label>
              <Textarea
                name="Description"
                id="Description"
                placeholder="Take notes here...."
                aria-labelledby="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter
          className="flex justify-between gap-2"
          style={{ alignItems: "center" }}
        >
          <Button
            className="w-full"
            variant={"default"}
            onClick={async () => {
             
              try {
                if (title === "" || description === ""){
                  console.log(title, description);

                  return toast.error("Please fill in all fields" ) 
                }
  
                const todo = await API_ENDPOINTS.createTodo({
                  title,
                  description,
                });
                toast.success("Todo created successfully");
                setTitle("");
                setDescription("");
              } catch (error) {
                console.error(`Error creating todo at todos:`, error);
                throw error;
              }
            }}
          >
            I'll do it today!
          </Button>
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => {
              setTitle("");
              setDescription("");
            }}
          >
            Nah, I'll do it later
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
