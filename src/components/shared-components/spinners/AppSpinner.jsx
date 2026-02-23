import React from "react";

export default function AppSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
}
