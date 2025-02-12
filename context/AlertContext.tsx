import { createContext, useContext, useState, ReactNode } from "react";
import AlertManager from "@/components/alert-manager";
import { AlertType } from "@/types";

// Create a context for the alerts
const AlertContext = createContext({
  newAlert: (alert: string, type: AlertType) => {},
});

interface AlertProviderrProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderrProps) {
  const [alerts, setAlerts] = useState<
    {
      id: number;
      message: string;
      type: AlertType;
    }[]
  >([]);

  const newAlert = (alert: string, type: AlertType) => {
    setAlerts((prev) => [
      ...prev,
      { id: Date.now(), message: alert, type: type },
    ]);
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
