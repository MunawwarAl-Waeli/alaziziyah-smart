"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  activeCategory: number;
  onCategoryChange: (id: number) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-12">
      {/* للشاشات الصغيرة */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          <span className="font-medium">
            {categories.find(c => c.id === activeCategory)?.name}
          </span>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg z-50 overflow-hidden"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-right px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0",
                  activeCategory === category.id && "bg-primary/5 text-primary"
                )}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* للشاشات الكبيرة - أزرار مدورة */}
      <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium",
              activeCategory === category.id
                ? "bg-primary text-white shadow-md"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
            )}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}