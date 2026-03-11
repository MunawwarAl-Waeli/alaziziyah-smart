export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="bg-gradient-to-l from-amber-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="h-10 w-64 bg-white/20 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-96 bg-white/20 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}