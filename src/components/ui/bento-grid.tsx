import { cn } from "@/utils/cn";

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
        "grid md:auto-rows-[16rem] grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
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
  itemClassNames,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  itemClassNames?: string;
}) => {
  return (
    <div
      className={cn(
        `row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] border-2 justify-between flex flex-col space-y-4`,
        className,
        itemClassNames
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <span className="w-fit text-left">{header}</span>
        <div className="font-sans  text-left font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans text-left font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
