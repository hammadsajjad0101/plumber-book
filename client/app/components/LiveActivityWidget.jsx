'use client';

import { useEffect, useState } from 'react';

const recentActivities = [
  { name: "John D.", action: "booked a plumber", time: "2 mins ago", location: "Austin, TX" },
  { name: "Sarah M.", action: "completed a service", time: "5 mins ago", location: "Denver, CO" },
  { name: "Mike R.", action: "left a 5-star review", time: "8 mins ago", location: "Seattle, WA" },
  { name: "Emily K.", action: "booked emergency repair", time: "12 mins ago", location: "Portland, OR" },
  { name: "David L.", action: "joined as a plumber", time: "15 mins ago", location: "Phoenix, AZ" },
  { name: "Lisa P.", action: "booked a plumber", time: "18 mins ago", location: "San Diego, CA" },
  { name: "Tom W.", action: "completed a service", time: "22 mins ago", location: "Boston, MA" },
  { name: "Anna B.", action: "left a 5-star review", time: "25 mins ago", location: "Miami, FL" },
];

export default function LiveActivityWidget() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % recentActivities.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const activity = recentActivities[currentActivity];

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 pr-12 max-w-sm backdrop-blur-sm relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">{activity.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {activity.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {activity.action}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{activity.location}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
