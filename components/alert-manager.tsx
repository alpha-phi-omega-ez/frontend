import { Alert } from "@heroui/react";
import { AlertType } from "@/types";

// AlertManager component
interface AlertManagerProps {
  alerts: {
    message: string;
    type: AlertType;
  }[];
  setAlerts: React.Dispatch<
    React.SetStateAction<{ message: string; type: AlertType }[]>
  >;
}

export default function AlertManager({ alerts, setAlerts }: AlertManagerProps) {
  const removeAlert = (index: number) => {
    setAlerts((prev) => {
      const newAlerts = [...prev];
      newAlerts.splice(index, 1);
      return newAlerts;
    });
  };

  return (
    <div className="fixed max-w-6xl top-4 w-full flex flex-col items-center space-y-4 z-50 left-1/2 transform -translate-x-1/2">
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          variant="flat"
          color={alert.type}
          isClosable
          onClose={() => removeAlert(index)}
          description=""
          className="flex items-center"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
