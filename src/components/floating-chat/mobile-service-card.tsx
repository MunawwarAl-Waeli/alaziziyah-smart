// components/floating-chat/mobile-service-card.tsx
import React, { memo } from "react";
import { LucideIcon } from "lucide-react";

export interface CombinedItem {
  id: string;
  name: string;
  href: string;
  type: "service" | "project";
  IconComponent: LucideIcon;
}

const ServiceCard = memo(
  ({ item }: { item: CombinedItem }) => {
    const { IconComponent, name, href, type } = item;
    return (
      <a
        href={href}
        className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border/50 hover:border-amber-500/50 transition-colors text-center relative overflow-hidden"
        style={{
          width: "100%",
          height: "130px",
          contain: "strict",         // يمنع أي تسرب للتخطيط
          willChange: "transform",   // يضع البطاقة في طبقة GPU مستقلة
        }}
      >
        {type === "project" && (
          <span className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] px-2 py-0.5 rounded-bl-lg font-bold">
            اعمالنا
          </span>
        )}
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
          <IconComponent className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </div>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 line-clamp-2">
          {name}
        </span>
      </a>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.name === nextProps.item.name,
);
ServiceCard.displayName = "ServiceCard";

export default ServiceCard;