import React, {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type MockLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string | { pathname?: string };
  children?: ReactNode;
};

const Link = forwardRef<HTMLAnchorElement, MockLinkProps>(
  ({ href, children, ...props }, ref) => {
    const resolvedHref =
      typeof href === "string"
        ? href
        : href.pathname ?? "#";

    return (
      <a ref={ref} href={resolvedHref} {...props}>
        {children}
      </a>
    );
  },
);

Link.displayName = "MockNextLink";

export default Link;