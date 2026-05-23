
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const propellerDesigns = [
{ id: "alpha", name: "Alpha Series", efficiency: 94, thrust: "High", material: "Carbon Fiber" },
{ id: "beta", name: "Beta Series", efficiency: 89, thrust: "Medium", material: "Graphene Composite" },
{ id: "gamma", name: "Gamma Series", efficiency: 97, thrust: "Ultra", material: "Titanium Alloy" }];


export function DroneShowcase() {
  const [activeDesign, setActiveDesign] = useState(propellerDesigns[0]);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);

  return (/*#__PURE__*/
    _jsxs("div", { className: "space-y-6", children: [/*#__PURE__*/
      _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
        _jsx("h3", { className: "text-xl font-semibold text-foreground", children: "3D Visualization" }), /*#__PURE__*/
        _jsxs("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
          _jsx(Button, {
            variant: "outline",
            size: "icon",
            className: `h-8 w-8 ${isSpinning ? "border-primary text-primary" : ""}`,
            onClick: () => setIsSpinning(!isSpinning),
            "aria-label": "Toggle auto-spin", children: /*#__PURE__*/

            _jsx(RotateCcw, { className: `h-4 w-4 ${isSpinning ? "animate-spin" : ""}` }) }
          ), /*#__PURE__*/
          _jsx(Button, {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setZoom((z) => Math.max(0.5, z - 0.2)),
            "aria-label": "Zoom out", children: /*#__PURE__*/

            _jsx(ZoomOut, { className: "h-4 w-4" }) }
          ), /*#__PURE__*/
          _jsx(Button, {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setZoom((z) => Math.min(2, z + 0.2)),
            "aria-label": "Zoom in", children: /*#__PURE__*/

            _jsx(ZoomIn, { className: "h-4 w-4" }) }
          ), /*#__PURE__*/
          _jsx(Button, {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setZoom(1),
            "aria-label": "Reset view", children: /*#__PURE__*/

            _jsx(Maximize2, { className: "h-4 w-4" }) }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { className: "relative aspect-square rounded-2xl bg-card border border-border overflow-hidden", children: [/*#__PURE__*/

        _jsx("div", { className: "absolute inset-0 circuit-pattern opacity-30" }), /*#__PURE__*/


        _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /*#__PURE__*/
          _jsx("div", { className: "w-48 h-48 rounded-full bg-primary/20 blur-3xl" }) }
        ), /*#__PURE__*/


        _jsx(motion.div, {
          className: "absolute inset-0 flex items-center justify-center",
          animate: {
            rotate: isSpinning ? [rotation, rotation + 360] : rotation,
            scale: zoom
          },
          transition: isSpinning ? {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          } : {
            duration: 0.5,
            ease: "easeOut"
          }, children: /*#__PURE__*/

          _jsxs("div", { className: "relative w-64 h-64", children: [/*#__PURE__*/

            _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-primary/30 shadow-lg z-10" }),


            [0, 90, 180, 270].map((angle, i) => /*#__PURE__*/
            _jsx(motion.div, {

              className: "absolute top-1/2 left-1/2 origin-center",
              style: {
                rotate: `${angle}deg`,
                translateX: "-50%",
                translateY: "-50%"
              },
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: i * 0.1 }, children: /*#__PURE__*/

              _jsx("div", {
                className: "w-4 h-24 rounded-full bg-gradient-to-t from-slate-800 via-slate-700 to-primary/40",
                style: {
                  transformOrigin: "center bottom",
                  transform: "translateY(-50%)"
                } }
              ) }, i
            )
            ), /*#__PURE__*/


            _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-primary/40 glow-primary" })] }
          ) }
        ), /*#__PURE__*/


        _jsx("div", { className: "absolute bottom-4 left-4 right-4 glass rounded-xl p-4", children: /*#__PURE__*/
          _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("p", { className: "text-sm font-medium text-foreground", children: activeDesign.name }), /*#__PURE__*/
              _jsx("p", { className: "text-xs text-muted-foreground", children: activeDesign.material })] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "text-right", children: [/*#__PURE__*/
              _jsxs("p", { className: "text-lg font-bold text-primary", children: [activeDesign.efficiency, "%"] }), /*#__PURE__*/
              _jsx("p", { className: "text-xs text-muted-foreground", children: "Efficiency" })] }
            )] }
          ) }
        )] }
      ), /*#__PURE__*/


      _jsx("div", { className: "grid grid-cols-3 gap-3", children:
        propellerDesigns.map((design) => /*#__PURE__*/
        _jsxs("button", {

          onClick: () => setActiveDesign(design),
          className: `p-3 rounded-xl border transition-smooth text-left ${
          activeDesign.id === design.id ?
          "border-primary bg-primary/10" :
          "border-border bg-card hover:border-primary/50"}`, children: [/*#__PURE__*/


          _jsx("p", { className: "text-sm font-medium text-foreground", children: design.name }), /*#__PURE__*/
          _jsxs("p", { className: "text-xs text-muted-foreground", children: [design.thrust, " Thrust"] })] }, design.id
        )
        ) }
      )] }
    ));

}