import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import Link from "next/link";

interface WordPressContentProps {
  content: string;
  className?: string;
}

const WordPressContent = ({
  content,
  className = "",
}: WordPressContentProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "a") {
        const href = domNode.attribs?.href;

        if (!href) return;

        const frontendDomain = "api.al-azizia.com";
        // أضف دومين الووردبريس الخاص بك هنا

        const isInternal =
          href.startsWith("/") || href.includes(frontendDomain);

        if (isInternal) {
          // تنظيف الرابط الداخلي من أي من الدومينين
          let relativePath = href
            .replace(new RegExp(`^https?://(www\\.)?${frontendDomain}`), "")

          // التأكد من أن المسار يبدأ بـ /
          if (!relativePath.startsWith("/")) {
            relativePath = "/" + relativePath;
          }

          return (
            <Link
              href={relativePath}
              className="text-primary hover:text-primary/80 transition-colors no-underline font-medium"
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          );
        }

        // معالجة الروابط الخارجية (مثل ويكيبيديا أو واتساب)
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {domToReact(domNode.children as DOMNode[], options)}
          </a>
        );
      }
    },
  };

  if (!content) return null;

  return <div className={`w-full ${className}`}>{parse(content, options)}</div>;
};

export default WordPressContent;
