import Link from "next/link";
import { cn } from "~/lib/utils";

export type AnchorProps = {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
  children: React.ReactNode;
};

export const Anchor: React.FC<AnchorProps> = ({
  href,
  target,
  className = "",
  children,
}) => (
  <Link
    className={cn(
      "bg-gradient-to-r from-orange-400 to-orange-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-200 hover:bg-[length:100%_2px]",
      className,
    )}
    href={href}
    target={target}
    {...(target === "_blank" && { rel: "noopener noreferrer" })}
  >
    {children}
  </Link>
);
