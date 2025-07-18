import React from 'react';
import { LoaderIcon } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <LoaderIcon className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse" />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold gradient-primary bg-clip-text text-transparent">
          AI is crafting your perfect event plan...
        </h3>
        <p className="text-muted-foreground mt-2">
          Analyzing requirements and generating recommendations
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;