"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted (client only)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="">
      <div className=" mx-auto px-10 flex items-center justify-between gap-3">
        {/* LINK TO HOME PAGE */}
        <Link href="/resumes" className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={75}
            className="rounded-full"
          />
          <span className="text-2xl font-extrabold tracking-widest">
            RESUME
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* THEME TOGGLE MODE (NIGHT, LIGHT, SYSTEM) */}
          <ThemeToggle />

          {/* USER BUTTON COMPONENT FROM CLERK */}
          {mounted && (
            <UserButton
              appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Billing"
                  labelIcon={<CreditCard className="size-4" />}
                  href="/billing"
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>
      </div>
    </header>
  );
}
