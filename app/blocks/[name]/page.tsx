"use client";

import React, { useState, useEffect } from "react";

type BlockPageProps = {
  params: Promise<{ name: string }>;
};

export default function BlockPage({ params }: BlockPageProps) {
  const { name } = React.use(params);
  const [BlockComponent, setBlockComponent] =
    useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlock = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert kebab-case to PascalCase for component name
        const componentName = name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

        // Dynamically import the block component with better error handling
        let blockModule;
        try {
          blockModule = await import(`@/components/blocks/${name}`);
        } catch {
          // Try alternative file extensions or naming conventions
          try {
            blockModule = await import(`@/components/blocks/${name}.tsx`);
          } catch {
            try {
              blockModule = await import(`@/components/blocks/${name}.jsx`);
            } catch {
              throw new Error(
                `Block file not found: @/components/blocks/${name}`
              );
            }
          }
        }

        // Try to get the component (either default export or named export)
        const Component = blockModule.default || blockModule[componentName];

        if (Component) {
          setBlockComponent(() => Component);
        } else {
          setError(
            `Component "${componentName}" not exported from @/components/blocks/${name}`
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : `Failed to load block: ${name}`;
        setError(errorMessage);
        console.error("Block loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlock();
  }, [name]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {name.replace(/-/g, " ")}
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading block...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {name.replace(/-/g, " ")}
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-destructive">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {name.replace(/-/g, " ")}
      </h1>
      {BlockComponent && <BlockComponent />}
    </div>
  );
}
