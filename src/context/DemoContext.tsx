import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProfileType } from '../utils/demoLogic';

interface DemoContextValue {
  profileType: ProfileType | null;
  profileName: string;
  setDemoProfile: (type: ProfileType | null, name: string) => void;
  clearDemoProfile: () => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  const [profileName, setProfileName] = useState<string>('');

  const setDemoProfile = (type: ProfileType | null, name: string) => {
    setProfileType(type);
    setProfileName(name.trim());
  };

  const clearDemoProfile = () => {
    setProfileType(null);
    setProfileName('');
  };

  return (
    <DemoContext.Provider
      value={{
        profileType,
        profileName,
        setDemoProfile,
        clearDemoProfile,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemoContext must be used inside a DemoProvider');
  }
  return ctx;
}
