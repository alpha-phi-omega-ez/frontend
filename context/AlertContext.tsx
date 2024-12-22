import { createContext, useContext, useState, ReactNode } from "react";
import AlertManager from "@/components/alert-manager";

// Create a context for the alerts
const AlertContext = createContext({
  newAlert: (alert: string) => {},
});

interface AlertProviderrProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderrProps) {
  const [alerts, setAlerts] = useState<string[]>([]);

  const newAlert = (alert: string) => {
    setAlerts((prev) => [...prev, alert]);
  };

  return (
    <AlertContext.Provider value={{ newAlert }}>
      <div>
        {children}
        <AlertManager alerts={alerts} setAlerts={setAlerts} />
      </div>
    </AlertContext.Provider>
  );
}

// Custom hook to use the setAlerts function
export const useAlert = () => useContext(AlertContext);
