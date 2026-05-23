
import { HeroSection } from "@/components/hero-section";
import { SegmentsSection } from "@/components/segments-section";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { ContactSection } from "@/components/contact-section";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function BlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return (/*#__PURE__*/
      _jsx("div", { className: "min-h-screen flex items-center justify-center text-gray-500", children: "No content blocks published. Access Admin to build your page." }

      ));

  }

  return (/*#__PURE__*/
    _jsx("div", { className: "flex flex-col", children:
      blocks.map((block) => {
        const content = JSON.parse(block.content);

        switch (block.type) {
          case "HERO":
            return /*#__PURE__*/_jsx(HeroSection, { ...content }, block.id);
          case "FEATURE_CARDS":
            return /*#__PURE__*/_jsx(SegmentsSection, { ...content }, block.id);
          case "PORTFOLIO_GRID":
            return /*#__PURE__*/_jsx(PortfolioGrid, { ...content }, block.id);
          case "CONTACT_FORM":
            return /*#__PURE__*/_jsx(ContactSection, { ...content }, block.id);
          case "SYSTEM_CONFIG":
          case "NAV_LINKS":
          case "FOOTER_LINKS":
            return null;
          default:
            return /*#__PURE__*/_jsxs("div", { className: "py-20 text-center border border-dashed border-white/5", children: ["Unknown Block Type: ", block.type] }, block.id);
        }
      }) }
    ));

}