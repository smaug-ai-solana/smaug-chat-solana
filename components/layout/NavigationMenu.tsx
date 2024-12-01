import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/stats", label: "Stats" },
  { path: "/create-agent", label: "Create Agent" },
  { path: "/agents", label: "Agents" },
];

export function NavigationMenu() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col gap-2 mt-8">
      {navigationItems.map((item) => (
        <SheetClose key={item.path} asChild>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </Button>
        </SheetClose>
      ))}
    </div>
  );
}
