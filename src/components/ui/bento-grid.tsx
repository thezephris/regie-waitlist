"use client";

import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none p-4 bg-surface-1 border border-border-subtle hover:border-ai-accent/50 justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ai-accent/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        <div className="mb-2 mt-2">{icon}</div>
        <div className="font-bold text-foreground mb-2">
          {title}
        </div>
        <div className="font-normal text-text-secondary text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
