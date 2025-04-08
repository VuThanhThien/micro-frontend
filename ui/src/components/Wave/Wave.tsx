import React from "react";
import WaveElement from "./WaveElement";

interface IWaveProps {
  children?: React.ReactNode;
}

const Wave: React.FC<IWaveProps> = () => {
  return (
    <div className="flex items-center gap-6 h-[8rem]">
      <WaveElement delay={0} />
      <WaveElement delay={0.3} />
      <WaveElement delay={0.6} />
      <WaveElement delay={0.9} />
      <WaveElement delay={0.6} />
      <WaveElement delay={0.3} />
      <WaveElement delay={0} />
    </div>
  );
};

export default Wave;
