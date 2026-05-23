import { AuthForm } from "@/components/auth-form";
import { Navigation } from "@/components/navigation";
import { Suspense } from "react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function LoginPage() {
  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background flex flex-col items-center justify-center p-4", children: [/*#__PURE__*/
      _jsx(Navigation, {}), /*#__PURE__*/
      _jsx(Suspense, { fallback: /*#__PURE__*/_jsx("div", { className: "text-foreground", children: "Loading..." }), children: /*#__PURE__*/
        _jsx(AuthForm, { type: "login" }) }
      )] }
    ));

}