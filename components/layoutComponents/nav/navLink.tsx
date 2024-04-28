'use client'

import { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils";

export const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathname = usePathname();
    return <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
    pathname === props.href && "bg-background text-foreground")}/>
}