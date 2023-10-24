import React, { type PropsWithChildren } from "react";
import classNames from "classnames";

export const Button = ({
  color = "primary",
  type = "button",
  loading = false,
  disabled = false,
  children,
  onClick,
  className,
}: PropsWithChildren<{
  color?: "primary" | "secondary";
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}>) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(className, " px-6 py-3", {
        "bg-teal-600 text-white": color === "primary",
        "bg-slate-300 text-black": color === "secondary",
      })}
    >
      {children}
      {loading && "loading spinner"}
    </button>
  );
};
