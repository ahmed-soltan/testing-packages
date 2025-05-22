"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Function to handle navigation with animation
  const handleNavigate = (href: string) => {
    gsap.to(menuRef.current, {
      opacity: 0,
      y: -10,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href); // Redirect after animation
      },
    });
  };

  useGSAP(() => {
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [open]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>menu</DropdownMenuTrigger>
      <DropdownMenuContent ref={menuRef} className="overflow-hidden">
        <DropdownMenuItem onClick={() => handleNavigate("/")}>
          Home
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate("/about")}>
          About
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate("/contact")}>
          Contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
