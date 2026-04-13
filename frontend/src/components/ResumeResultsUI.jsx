import React from 'react';

export const ScoreBar = ({ score }) => {
  const percentage = Math.round(score * 100);
  
  let colorClass = "bg-rose-500";
  let shadowClass = "shadow-rose-500/20";
  
  if (percentage >= 70) {
    colorClass = "bg-emerald-500";
    shadowClass = "shadow-emerald-500/20";
  } else if (percentage >= 40) {
    colorClass = "bg-amber-500";
    shadowClass = "shadow-amber-500/20";
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-20 lg:w-32 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass} ${shadowClass} shadow-lg relative z-10`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <span className={`font-black text-xs tabular-nums text-gray-900 dark:text-white`}>{percentage}%</span>
    </div>
  );
};

export const HighlightedText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-md px-1 py-0.5 border-b-2 border-indigo-200 dark:border-indigo-700 font-black">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
