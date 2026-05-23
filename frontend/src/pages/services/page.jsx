import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function ServicesPage() {
  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [/*#__PURE__*/
      _jsx(Navigation, {}), /*#__PURE__*/
      _jsxs("div", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [/*#__PURE__*/
        _jsx("h1", { className: "text-4xl font-bold mb-8", children: "Our Services" }), /*#__PURE__*/
        _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [/*#__PURE__*/
          _jsx(ServiceCard, {
            title: "Software Development",
            description: "Custom enterprise solutions built with modern technologies." }
          ), /*#__PURE__*/
          _jsx(ServiceCard, {
            title: "Drone R&D",
            description: "Cutting-edge propeller design and aerodynamic research." }
          ), /*#__PURE__*/
          _jsx(ServiceCard, {
            title: "Edutech Platform",
            description: "Empowering the next generation with digital learning tools." }
          )] }
        )] }
      ), /*#__PURE__*/
      _jsx(Footer, {})] }
    ));

}

function ServiceCard({ title, description }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all", children: [/*#__PURE__*/
      _jsx("h3", { className: "text-xl font-bold mb-4", children: title }), /*#__PURE__*/
      _jsx("p", { className: "text-muted-foreground", children: description })] }
    ));

}