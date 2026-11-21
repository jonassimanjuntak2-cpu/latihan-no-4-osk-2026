import katex from 'katex';
import { useMemo } from 'react';

interface MathBlockProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function MathBlock({
  latex,
  displayMode = true,
  className = '',
}: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  if (!displayMode) {
    return (
      <span
        className={`inline-block align-middle ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`overflow-x-auto py-1 text-[#1E1433] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
