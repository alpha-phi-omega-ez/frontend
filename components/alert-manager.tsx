import { Alert } from "@nextui-org/react";

// AlertManager component
interface AlertManagerProps {
  alerts: string[];
  setAlerts: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AlertManager({ alerts, setAlerts }: AlertManagerProps) {
  const removeAlert = (index: number) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed top-4 w-full flex flex-col items-center space-y-4 z-50">
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          className="w-11/12 max-w-md"
          variant="flat"
          color="primary"
          closable
          onClose={() => removeAlert(index)}
        >
          {alert}
        </Alert>
      ))}
    </div>
  );
}
