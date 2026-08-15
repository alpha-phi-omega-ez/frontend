import { Alert } from "@heroui/react";
import { AlertType } from "@/types";

interface AlertManagerProps {
  alerts: {
    id: string;
    message: string;
    type: AlertType;
  }[];
  setAlerts: React.Dispatch<
    React.SetStateAction<{ id: string; message: string; type: AlertType }[]>
  >;
}

export default function AlertManager({ alerts, setAlerts }: AlertManagerProps) {
  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed max-w-6xl top-4 w-full flex flex-col items-center space-y-4 z-50 left-1/2 transform -translate-x-1/2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant="solid"
          color={alert.type}
          isClosable
          onClose={() => removeAlert(alert.id)}
          description=""
          className="flex items-center"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
