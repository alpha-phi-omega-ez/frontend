import { createContext, useContext, useState, ReactNode } from "react";
import AlertManager from "@/components/alert-manager";

// Create a context for the alerts
const AlertContext = createContext({
  newAlert: (alert: string, type: string) => {},
});

interface AlertProviderrProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderrProps) {
  const [alerts, setAlerts] = useState<{ message: string; type: string }[]>([]);

  const newAlert = (alert: string, type: string) => {
    setAlerts((prev) => [...prev, { message: alert, type: type }]);
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
