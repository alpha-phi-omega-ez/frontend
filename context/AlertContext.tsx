import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import AlertManager from "@/components/alert-manager";
import { AlertType } from "@/types";

export type AlertItem = {
  id: string;
  message: string;
  type: AlertType;
};

interface AlertContextType {
  newAlert: (alert: string, type: AlertType) => void;
}

const noop = () => {};

const AlertContext = createContext<AlertContextType>({
  newAlert: noop,
});

interface AlertProviderProps {
  children: ReactNode;
}

let alertIdCounter = 0;

function createAlertId(): string {
  alertIdCounter += 1;
  return `alert-${alertIdCounter}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const newAlert = useCallback((message: string, type: AlertType) => {
    const id = createAlertId();
    setAlerts((prev) => {
      // Avoid stacking identical alerts from effect retries / race conditions.
      if (prev.some((alert) => alert.message === message && alert.type === type)) {
        return prev;
      }
      return [...prev, { id, message, type }];
    });
  }, []);

  const value = useMemo(() => ({ newAlert }), [newAlert]);

  return (
    <AlertContext.Provider value={value}>
      <div>
        {children}
        <AlertManager alerts={alerts} setAlerts={setAlerts} />
      </div>
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
