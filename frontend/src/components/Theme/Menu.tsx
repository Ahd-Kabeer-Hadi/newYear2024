import { ModeToggler } from "./MoodToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui-elements/ui/avatar";
export function Menu() {
  const user = {
    username: "KabeerHadi",
    name: "KabeerHadi",
    image: "https://avatars.githubusercontent.com/u/120118908?v=4",
  }
  const fallBackLetter = user.name.charAt(0);
  return (
    <div className="flex p-3 mb-3 w-full justify-between">
      <div className="flex gap-3 align-middle" style={{ alignItems: "center" }}>
        <Avatar>
          <AvatarImage src={user.image} alt={`@${user.username}`} />
          <AvatarFallback>{fallBackLetter}</AvatarFallback>
        </Avatar>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
      <div>
        <ModeToggler />
      </div>
    </div>
  );
}
