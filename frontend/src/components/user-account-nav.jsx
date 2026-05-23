import { useSession, signOut } from "@/lib/auth-store";
    
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, User, Settings } from "lucide-react";
import { Link } from 'react-router-dom';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function UserAccountNav() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return null;

  return (/*#__PURE__*/
    _jsxs(DropdownMenu, { children: [/*#__PURE__*/
      _jsx(DropdownMenuTrigger, { asChild: true, children: /*#__PURE__*/
        _jsx(Button, { variant: "ghost", className: "relative h-10 w-10 rounded-full border border-border p-0 hover:bg-muted", children: /*#__PURE__*/
          _jsxs(Avatar, { className: "h-9 w-9", children: [/*#__PURE__*/
            _jsx(AvatarImage, { src: user.image || "", alt: user.name || "User" }), /*#__PURE__*/
            _jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-bold", children:
              user.name?.[0] || user.email?.[0] || "U" }
            )] }
          ) }
        ) }
      ), /*#__PURE__*/
      _jsxs(DropdownMenuContent, { className: "w-56 glass border-border text-foreground bg-card shadow-lg", align: "end", forceMount: true, children: [/*#__PURE__*/
        _jsx(DropdownMenuLabel, { className: "font-normal", children: /*#__PURE__*/
          _jsxs("div", { className: "flex flex-col space-y-1", children: [/*#__PURE__*/
            _jsx("p", { className: "text-sm font-medium leading-none text-foreground", children: user.name }), /*#__PURE__*/
            _jsx("p", { className: "text-xs leading-none text-muted-foreground", children: user.email })] }
          ) }
        ), /*#__PURE__*/
        _jsx(DropdownMenuSeparator, { className: "bg-border" }),
        (user.role === "ADMIN" || user.role === "MASTER") && /*#__PURE__*/
        _jsx(DropdownMenuItem, { asChild: true, className: "hover:bg-muted focus:bg-muted focus:text-foreground cursor-pointer text-foreground", children: /*#__PURE__*/
          _jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [/*#__PURE__*/
            _jsx(LayoutDashboard, { className: "h-4 w-4" }), /*#__PURE__*/
            _jsx("span", { children: "Admin Dashboard" })] }
          ) }
        ), /*#__PURE__*/
        _jsx(DropdownMenuSeparator, { className: "bg-border" }), /*#__PURE__*/
        _jsxs(DropdownMenuItem, {
          className: "hover:bg-red-500/10 focus:bg-red-500/10 text-red-500 cursor-pointer flex items-center gap-2",
          onClick: () => signOut({ callbackUrl: "/" }), children: [/*#__PURE__*/

          _jsx(LogOut, { className: "h-4 w-4" }), /*#__PURE__*/
          _jsx("span", { children: "Log out" })] }
        )] }
      )] }
    ));

}