import { type FunctionComponent, type PropsWithChildren } from "react";
import classnames from "classnames";
import classNames from "classnames";

type TypographyProps = PropsWithChildren<{
  className?: string;
}>;

export const H1: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return (
    <h1 className={classnames(className, "text-lg font-bold")}>{children}</h1>
  );
};

export const H2: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <h2 className={className}>{children}</h2>;
};

export const H3: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <h3 className={className}>{children}</h3>;
};

export const H4: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <h4 className={className}>{children}</h4>;
};

export const H5: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <h5 className={className}>{children}</h5>;
};

export const H6: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <h6 className={className}>{children}</h6>;
};

export const P: FunctionComponent<TypographyProps> = ({
  children,
  className,
}) => {
  return <p className={classNames(className, "my-1")}>{children}</p>;
};

export const A: FunctionComponent<
  TypographyProps & { href: string; target?: "_blank" }
> = ({ children, className, href, target }) => {
  return (
    <a
      href={href}
      target={target}
      className={classNames(className, "text-sky-800 hover:text-sky-600 underline")}
    >
      {children}
    </a>
  );
};
