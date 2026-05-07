"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BlogPost } from "../types/bolg.types"; // ✅ 1. استيراد النوع بدلاً من البيانات الثابتة

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category: string;
}

// ✅ 2. جعل المكون يستقبل المقالات كـ Prop
interface SearchBarProps {
  posts?: BlogPost[];
}

export function SearchBar({ posts = [] }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchPosts = () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      // محاكاة بحث سريع جداً في الواجهة الأمامية باستخدام المقالات الممررة (posts)
      setTimeout(() => {
        // ✅ 3. استخدمنا posts بدلاً من blogPosts المحذوفة
        const searchResults = posts
          .filter(
            (post) =>
              post.title.toLowerCase().includes(query.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
              (post.tags && post.tags.some((tag) => tag.includes(query))),
          )
          .slice(0, 5)
          .map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            category: post.category?.name || "عام",
          }));

        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    };

    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query, posts]); // ✅ أضفنا posts لمصفوفة التبعيات

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* شريط البحث الرئيسي */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="ابحث في المدونة..."
          className="w-full px-4 py-3 pr-12 pl-10 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 text-sm"
        />
        <Search className="absolute right-4 top-3.5 w-4 h-4 text-amber-500" />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute left-3 top-3.5"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </form>

      {/* نتائج البحث المنسدلة */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-amber-100 dark:border-amber-900 overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500" />
            </div>
          ) : results.length > 0 ? (
            <div>
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/blog/${result.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="block p-3 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                >
                  <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                    {result.title}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    {result.category}
                  </p>
                </Link>
              ))}

              <Link
                href={`/blog/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block p-3 text-center text-sm text-amber-600 hover:text-amber-700 font-bold bg-amber-50 dark:bg-amber-950/30"
              >
                عرض جميع النتائج ({results.length})
              </Link>
            </div>
          ) : (
            <div className="p-4 text-center text-slate-500">
              لا توجد نتائج لـ {query}
            </div>
          )}
        </div>
      )}

      {/* علامات شائعة */}
      <div className="flex flex-wrap gap-2 mt-3">
        {["مظلات سيارات", "برجولات", "سواتر", "مدارس", "صيانة"].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              handleSearch({ preventDefault: () => {} } as React.FormEvent);
            }}
            className="px-2 py-1 text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
