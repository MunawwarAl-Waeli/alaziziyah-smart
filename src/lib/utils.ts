import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// lib/utils.ts (أو helpers.ts)

export function fixDoubleEncoding(slug: string): { cleanSlug: string | null; needsRedirect: boolean } {
  try {
    let decoded = decodeURIComponent(slug);
    let needsRedirect = false;

    const hasGarbageChars = /[ØÂÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß]/.test(decoded);

    if (hasGarbageChars) {
      try {
        const fixedBuffer = Buffer.from(decoded, "binary").toString("utf8");
        if (/[\u0600-\u06FF]/.test(fixedBuffer)) {
          decoded = fixedBuffer;
          needsRedirect = true; 
        }
      } catch (err) {
        console.error("Buffer decode failed");
      }
    }

    return { cleanSlug: decoded, needsRedirect };
  } catch (error) {
    return { cleanSlug: null, needsRedirect: false };
  }
}