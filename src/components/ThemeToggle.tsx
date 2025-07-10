"use client"

import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
   const {setTheme} = useTheme();

   // SHADCN DROPDOWN MENU COMPONENT
   return (
    <DropdownMenu>
        {/* AS CHILD */}
        <DropdownMenuTrigger asChild> 
            <Button variant="ghost" size="icon">
                {/* ICON FOR LIGHT/DARK MODE */}
                <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-[1.2rem] rotate-90 sclae-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("system")}>
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
} 