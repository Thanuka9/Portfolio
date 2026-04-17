"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-10 w-10 rounded-md" />;
  }

  return (
    <div className="flex items-center gap-1 bg-secondary/80 backdrop-blur-2xl p-1.5 rounded-2xl border-2 border-primary/20 shadow-xl">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setTheme("light")}
        className={cn(
          "h-8 w-8 rounded-lg transition-all duration-300",
          theme === "light" ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setTheme("dark")}
        className={cn(
          "h-8 w-8 rounded-lg transition-all duration-300",
          theme === "dark" ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </Button>
    </div>
  );
}
