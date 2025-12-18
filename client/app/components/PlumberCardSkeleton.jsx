export default function PlumberCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 bg-slate-700 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          {/* Name */}
          <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
          {/* Location */}
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
          {/* Rating */}
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
        {/* Verified badge skeleton */}
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-24 bg-slate-700 rounded-full"></div>
        <div className="h-6 w-28 bg-slate-700 rounded-full"></div>
        <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-900/50 rounded-xl">
        <div>
          <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
          <div className="h-5 bg-slate-700 rounded w-2/3"></div>
        </div>
        <div>
          <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
          <div className="h-5 bg-slate-700 rounded w-2/3"></div>
        </div>
        <div>
          <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
          <div className="h-5 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="h-10 bg-slate-700 rounded-lg flex-1"></div>
        <div className="h-10 bg-slate-700 rounded-lg flex-1"></div>
      </div>
    </div>
  );
}
