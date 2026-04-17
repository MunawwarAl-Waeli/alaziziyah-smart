"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface WordPressContentProps {
  content: string;
  className?: string;
}

const WordPressContent = ({
  content,
  className = "",
}: WordPressContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;
    const links = containerRef.current.querySelectorAll("a[href^='/']");
    const handleClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (href) router.push(href);
    };
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () =>
      links.forEach((link) => link.removeEventListener("click", handleClick));
  }, [router, content]);

  if (!content) return null;

  return (
    <div
      ref={containerRef}
      className={`prose prose-base sm:prose-lg lg:prose-xl max-w-none text-right ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default WordPressContent;
