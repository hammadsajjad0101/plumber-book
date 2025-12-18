export default function Logo({ size = 'default', showText = true }) {
  const sizes = {
    small: {
      container: 'w-8 h-8',
      icon: 'w-5 h-5',
      text: 'text-base',
      subtext: 'text-[10px]'
    },
    default: {
      container: 'w-10 h-10',
      icon: 'w-6 h-6',
      text: 'text-xl',
      subtext: 'text-xs'
    },
    large: {
      container: 'w-14 h-14',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      subtext: 'text-sm'
    }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon with Plumbing Theme */}
      <div className={`${currentSize.container} bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 relative overflow-hidden group`}>
        {/* Animated Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

        {/* Custom Plumbing Icon - Wrench + Droplet */}
        <svg
          className={`${currentSize.icon} text-white relative z-10`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wrench */}
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Water Droplet Accent */}
          <circle
            cx="12"
            cy="8"
            r="1.5"
            fill="currentColor"
            className="opacity-80"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div>
          <h1 className={`${currentSize.text} font-bold text-slate-100 leading-tight tracking-tight`}>
            Plumber<span className="text-blue-400">Book</span>
          </h1>
          <p className={`${currentSize.subtext} text-slate-500 leading-tight`}>
            Pro Platform
          </p>
        </div>
      )}
    </div>
  );
}
