import axe, { type ElementContext, type Result } from "axe-core";
import { expect } from "vitest";

const formatViolations = (violations: Result[]) =>
  violations
    .map(
      (violation) =>
        [
          `${violation.id}: ${violation.help}`,
          violation.helpUrl,
          ...violation.nodes.map(
            (node) =>
              `  ${node.target.join(" ")}\n  ${node.failureSummary}`,
          ),
        ].join("\n"),
    )
    .join("\n\n");

export const expectNoAccessibilityViolations = async (
  context: ElementContext,
) => {
  const results = await axe.run(context, {
    runOnly: {
      type: "tag",
      values: [
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
      ],
    },
  });

  expect(
    results.violations,
    formatViolations(results.violations),
  ).toEqual([]);
};