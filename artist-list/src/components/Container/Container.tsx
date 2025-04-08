import { cn } from "@nextui-org/react";
import React, { ComponentProps } from "react";

interface IContainerProps extends ComponentProps<"div"> {
  children?: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ className, ...props }) => {
  return <div className={cn("mx-auto max-w-[1466px] px-4", className)} {...props} />;
};

export default Container;
