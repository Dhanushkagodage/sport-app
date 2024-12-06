import React, { createContext, useContext, useState } from "react";


interface HeartContextType {
  heartCount: number;
  incrementHeartCount: () => void;
  decrementHeartCount: () => void;
}

const HeartContext = createContext<HeartContextType | undefined>(undefined);

interface HeartProviderProps {
  children: React.ReactNode;
}

export const HeartProvider: React.FC<HeartProviderProps> = ({ children }) => {
  const [heartCount, setHeartCount] = useState(0);

  const incrementHeartCount = () => {
    setHeartCount((prev) => prev + 1);
  };

  const decrementHeartCount = () => {
    setHeartCount((prev) => Math.max(prev - 1, 0)); // Prevent negative heart count
  };

  return (
    <HeartContext.Provider
      value={{ heartCount, incrementHeartCount, decrementHeartCount }}
    >
      {children}
    </HeartContext.Provider>
  );
};

export const useHeart = (): HeartContextType => {
  const context = useContext(HeartContext);
  if (!context) {
    throw new Error("useHeart must be used within a HeartProvider");
  }
  return context;
};
