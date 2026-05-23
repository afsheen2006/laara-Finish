
import { motion } from "framer-motion";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function OdometerCounter({ value = 120, suffix = "" }) {
  const digits = String(value).split("");

  // Create a list containing 3 sets of 0-9 to give a rolling-wheel effect
  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  return (
    <div className="flex items-center overflow-hidden font-mono h-[1.2em]">
      {digits.map((digit, idx) => {
        const targetDigit = parseInt(digit, 10) || 0;
        // Position the target digit in the third set (index 20 + targetDigit)
        const targetIndex = 20 + targetDigit;

        return (
          <div key={idx} className="relative w-[0.65em] h-full">
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: `-${targetIndex * (100 / numbers.length)}%` }}
              transition={{
                duration: 1.5 + idx * 0.4, // Staggered stops
                ease: [0.16, 1, 0.3, 1]    // Premium easeOut
              }}
              className="flex flex-col"
            >
              {numbers.map((n, i) => (
                <span key={i} className="flex justify-center h-[1.2em]">
                  {n}
                </span>
              ))}
            </motion.div>
          </div>
        );
      })}
      <span className="ml-1 font-sans">{suffix}</span>
    </div>
  );
}