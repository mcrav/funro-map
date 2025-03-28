import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import { type TestIds } from "~/constants/test";

export const Button = ({
  color = "primary",
  type = "button",
  loading = false,
  disabled = false,
  children,
  onClick,
  className,
  testId,
}: PropsWithChildren<{
  color?: "primary" | "secondary";
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  testId?: TestIds;
}>) => {
  return (
    <button
      data-cy={testId}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(className, "m-1 px-6 py-3", {
        "bg-teal-700 text-white": color === "primary",
        "bg-slate-300 text-black": color === "secondary",
      })}
    >
      {children}
      {loading && "loading spinner"}
    </button>
  );
};
