import { EdutechSidebar } from "@/components/edutech-sidebar";
const auth = async () => null;import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default async function EdutechLayout({
  children


}) {
  const session = await auth();

  if (!session) {
    return (/*#__PURE__*/
      _jsx("div", { className: "min-h-screen bg-background", children:
        children }
      ));

  }

  return (/*#__PURE__*/
    _jsxs("div", { className: "min-h-screen bg-background flex", children: [/*#__PURE__*/
      _jsx(EdutechSidebar, {}), /*#__PURE__*/
      _jsx("main", { className: "flex-1 lg:pl-80", children:
        children }
      )] }
    ));

}