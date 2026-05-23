
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings } from
"lucide-react";
import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(1247); // 20:47 in seconds
  const totalTime = 3600; // 60:00

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = currentTime / totalTime * 100;

  return (/*#__PURE__*/
    _jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-card border border-border", children: [/*#__PURE__*/

      _jsxs("div", { className: "relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800", children: [/*#__PURE__*/

        _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /*#__PURE__*/
          _jsxs("div", { className: "text-center", children: [/*#__PURE__*/
            _jsx("div", { className: "w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4", children: /*#__PURE__*/
              _jsx(Play, { className: "h-8 w-8 text-primary ml-1" }) }
            ), /*#__PURE__*/
            _jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: "Advanced Drone Navigation Systems" }

            ), /*#__PURE__*/
            _jsx("p", { className: "text-sm text-muted-foreground", children: "Module 3: Autonomous Flight Paths" })] }
          ) }
        ), /*#__PURE__*/


        _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }), /*#__PURE__*/


        _jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4", children: [/*#__PURE__*/

          _jsxs("div", { className: "mb-4 group cursor-pointer", children: [/*#__PURE__*/
            _jsxs("div", { className: "relative h-1 bg-white/20 rounded-full overflow-hidden group-hover:h-1.5 transition-all", children: [/*#__PURE__*/
              _jsx(motion.div, {
                className: "absolute left-0 top-0 bottom-0 bg-primary rounded-full",
                style: { width: `${progress}%` },
                layoutId: "progress" }
              ), /*#__PURE__*/

              _jsx(motion.div, {
                className: "absolute top-0 bottom-0 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100",
                style: { left: `${progress}%` } }
              )] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "flex justify-between mt-1 text-xs text-white/70", children: [/*#__PURE__*/
              _jsx("span", { children: formatTime(currentTime) }), /*#__PURE__*/
              _jsx("span", { children: formatTime(totalTime) })] }
            )] }
          ), /*#__PURE__*/


          _jsxs("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-10 w-10 text-white hover:bg-white/20",
                onClick: () => setCurrentTime(Math.max(0, currentTime - 10)), children: /*#__PURE__*/

                _jsx(SkipBack, { className: "h-5 w-5" }) }
              ), /*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-12 w-12 text-white hover:bg-white/20",
                onClick: () => setIsPlaying(!isPlaying), children:

                isPlaying ? /*#__PURE__*/
                _jsx(Pause, { className: "h-6 w-6" }) : /*#__PURE__*/

                _jsx(Play, { className: "h-6 w-6 ml-0.5" }) }

              ), /*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-10 w-10 text-white hover:bg-white/20",
                onClick: () => setCurrentTime(Math.min(totalTime, currentTime + 10)), children: /*#__PURE__*/

                _jsx(SkipForward, { className: "h-5 w-5" }) }
              ), /*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-10 w-10 text-white hover:bg-white/20",
                onClick: () => setIsMuted(!isMuted), children:

                isMuted ? /*#__PURE__*/
                _jsx(VolumeX, { className: "h-5 w-5" }) : /*#__PURE__*/

                _jsx(Volume2, { className: "h-5 w-5" }) }

              )] }
            ), /*#__PURE__*/

            _jsxs("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-10 w-10 text-white hover:bg-white/20", children: /*#__PURE__*/

                _jsx(Settings, { className: "h-5 w-5" }) }
              ), /*#__PURE__*/
              _jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "h-10 w-10 text-white hover:bg-white/20", children: /*#__PURE__*/

                _jsx(Maximize, { className: "h-5 w-5" }) }
              )] }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsx("div", { className: "p-4 border-t border-border", children: /*#__PURE__*/
        _jsxs("div", { className: "flex items-start justify-between gap-4", children: [/*#__PURE__*/
          _jsxs("div", { children: [/*#__PURE__*/
            _jsx("h4", { className: "font-medium text-foreground", children: "Module 3: Autonomous Flight Paths" }

            ), /*#__PURE__*/
            _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Learn to implement GPS waypoint navigation and obstacle avoidance algorithms" }

            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "flex-shrink-0 text-right", children: [/*#__PURE__*/
            _jsx("p", { className: "text-sm font-medium text-primary", children: "35% Complete" }), /*#__PURE__*/
            _jsx("p", { className: "text-xs text-muted-foreground", children: "24 min remaining" })] }
          )] }
        ) }
      )] }
    ));

}