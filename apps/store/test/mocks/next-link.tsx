import type { AnchorHTMLAttributes, ReactNode } from "react";

type MockLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  children?: ReactNode;
};

export default function MockNextLink({
  href,
  children,
  ...props
}: MockLinkProps) {
  const resolvedHref = typeof href === "string" ? href : (href.pathname ?? "#");

  return (
    <a href={resolvedHref} {...props}>
      {children}
    </a>
  );
}
