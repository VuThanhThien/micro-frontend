import React from "react";
import { cn } from "@utils/cn";

interface IWaveElementProps {
  delay: number;
  color?: "pink" | "violet";
}

const WaveElement: React.FC<IWaveElementProps> = ({ delay, color }) => {
  return (
    <div
      className={cn(
        "w-4 bg-white rounded-xl animate-wave first:bg-pink-500 [&:nth-child(2)]:bg-[#d94cab] [&:nth-child(3)]:bg-[#ce4eb6] [&:nth-child(4)]:bg-[#b852ca] [&:nth-child(5)]:bg-[#b054d3] [&:nth-child(6)]:bg-[#9e59e5] last:bg-violet-500",
        {
          "pink-500": color === "pink",
          "violet-500": color === "violet",
        }
      )}
      style={{ animationDelay: `${delay}s` }}
    />
  );
};

export default WaveElement;
