import React from 'react';

const ResumeSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="py-8 px-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex-shrink-0"></div>
          <div className="space-y-3 flex-1">
            <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-lg w-48"></div>
            <div className="h-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg w-24"></div>
          </div>
        </div>
      </td>
      <td className="py-8 px-10">
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-lg w-32"></div>
      </td>
      <td className="py-8 px-10">
        <div className="flex flex-col items-center gap-2">
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full w-24"></div>
            <div className="h-2 bg-gray-50 dark:bg-gray-800/50 rounded-full w-16"></div>
        </div>
      </td>
      <td className="py-8 px-10 text-right">
        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl w-36 ml-auto"></div>
      </td>
    </tr>
  );
};

export default ResumeSkeleton;
