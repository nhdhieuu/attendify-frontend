import React from 'react';

export interface LoadingComponentProps {
    /**
     * Optional className for additional styling
     */
    className?: string;
}

const LoadingComponent = ({className}: LoadingComponentProps) => {
    return (
        <div
            className={`flex items-center justify-center fixed top-0 left-0 w-full h-full z-[9999999] bg-white/30 backdrop-blur-sm ${className}`}>
            <div className="flex flex-col items-center justify-center">
                <div
                    className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                <p className="mt-4 text-xl text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingComponent;
