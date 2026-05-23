
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (/*#__PURE__*/
    _jsxs(Button, {
      variant: "ghost",
      size: "icon",
      className: "rounded-full w-9 h-9 transition-all hover:bg-white/10",
      onClick: () => setTheme(theme === "light" ? "dark" : "light"), children: [/*#__PURE__*/

      _jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" }), /*#__PURE__*/
      _jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" }), /*#__PURE__*/
      _jsx("span", { className: "sr-only", children: "Toggle theme" })] }
    ));

}