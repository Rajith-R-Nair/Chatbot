import React, { createContext, useState } from "react";

interface BodyPartsContextProps {
  selectedBodyparts: string[];
  setSelectedBodyparts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BodyPartsContext = createContext<
  BodyPartsContextProps | undefined
>(undefined);

// @ts-ignore
export const BodyPartsProvider: React.FC = ({ children }) => {
  const [selectedBodyparts, setSelectedBodyparts] = useState<string[]>([]);

  return (
    <BodyPartsContext.Provider
      value={{ selectedBodyparts, setSelectedBodyparts }}
    >
      <div style={{ width: "10px" }}>{children}</div>
    </BodyPartsContext.Provider>
  );
};
