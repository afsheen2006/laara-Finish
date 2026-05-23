import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Search, MessageCircle, FileText, LifeBuoy } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function HelpPage() {
  return (/*#__PURE__*/
    _jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [/*#__PURE__*/
      _jsx(Navigation, {}), /*#__PURE__*/
      _jsxs("div", { className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto", children: [/*#__PURE__*/
        _jsxs("div", { className: "text-center mb-16", children: [/*#__PURE__*/
          _jsx("h1", { className: "text-4xl font-bold mb-4", children: "How can we help?" }), /*#__PURE__*/
          _jsxs("div", { className: "max-w-xl mx-auto relative mt-8", children: [/*#__PURE__*/
            _jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" }), /*#__PURE__*/
            _jsx("input", {
              type: "text",
              placeholder: "Search for articles, guides...",
              className: "w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary outline-none transition-all" }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [/*#__PURE__*/
          _jsx(HelpCategory, {
            icon: /*#__PURE__*/_jsx(FileText, {}),
            title: "Documentation",
            links: ["Getting Started", "API Reference", "Integrations"] }
          ), /*#__PURE__*/
          _jsx(HelpCategory, {
            icon: /*#__PURE__*/_jsx(MessageCircle, {}),
            title: "Community",
            links: ["User Forum", "Discord Server", "Blog"] }
          ), /*#__PURE__*/
          _jsx(HelpCategory, {
            icon: /*#__PURE__*/_jsx(LifeBuoy, {}),
            title: "Direct Support",
            links: ["Submit a Ticket", "Live Chat", "Contact Us"] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "glass-card rounded-3xl p-12 text-center border border-primary/20", children: [/*#__PURE__*/
          _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Still need help?" }), /*#__PURE__*/
          _jsx("p", { className: "text-muted-foreground mb-8", children: "Our support team is available 24/7 to assist you with any technical issues." }), /*#__PURE__*/
          _jsx("button", { className: "px-8 py-3 rounded-full bg-primary text-black font-bold hover:scale-105 transition-all", children: "Contact Support" }

          )] }
        )] }
      ), /*#__PURE__*/
      _jsx(Footer, {})] }
    ));

}

function HelpCategory({ icon, title, links }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "p-8 rounded-2xl bg-card border border-border", children: [/*#__PURE__*/
      _jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6", children:
        icon }
      ), /*#__PURE__*/
      _jsx("h3", { className: "text-xl font-bold mb-4", children: title }), /*#__PURE__*/
      _jsx("ul", { className: "space-y-2", children:
        links.map((link) => /*#__PURE__*/
        _jsx("li", { children: /*#__PURE__*/
          _jsxs("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-all text-sm flex items-center gap-2", children: [/*#__PURE__*/
            _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/30" }),
            link] }
          ) }, link
        )
        ) }
      )] }
    ));

}