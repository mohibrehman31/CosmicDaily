import React from "react";

const AIGeneratingIndicator: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-full py-2 px-4 flex items-center space-x-2 max-w-xs mx-auto">
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"></div>
      <span className="text-white text-sm font-medium">
        CosmoAI is generating
      </span>
    </div>
  );
};

export default AIGeneratingIndicator;
