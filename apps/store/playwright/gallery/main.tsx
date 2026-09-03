import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "../../app/globals.css";

const stories = import.meta.glob(
  [
    "/components/**/*.story.{ts,tsx}",
    "/playwright/gallery/**/*.story.{ts,tsx}",
  ],
  {
    eager: true,
  },
);

let root: Root | undefined;

function findStory(storyId: string) {
  for (const [path, exports] of Object.entries(stories)) {
    const normalizedPath = path
      .replace(/^\//, "")
      .replace(/\.story\.(ts|tsx)$/, "");
    const moduleExports = exports as Record<string, React.ComponentType>;

    for (const [exportName, Story] of Object.entries(moduleExports)) {
      const id = `${normalizedPath}/${exportName}`;

      if (id === storyId) {
        return Story;
      }
    }
  }

  throw new Error(`Unknown story: ${storyId}`);
}

window.mount = async ({ story, props = {} }) => {
  const Story = findStory(story);

  const container = document.getElementById("root");

  if (!container) {
    throw new Error("Gallery root element was not found");
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(<Story {...props} />);
};

window.unmount = async () => {
  root?.unmount();
  root = undefined;
};
