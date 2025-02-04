import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import { useAlert } from "@/context/AlertContext";

interface FoundLostReportModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  given_type: string;
  given_locations: string[];
  given_date: string;
  given_description: string;
  given_id: string;
  given_name: string;
  given_email: string;
  updateTable: () => void;
}

export default function FoundLostReportModal({
  isOpen,
  onOpenChange,
  given_type,
  given_locations,
  given_date,
  given_description,
  given_id,
  given_name,
  given_email,
  updateTable,
}: FoundLostReportModalProps) {
  const { newAlert } = useAlert();

  const checkIn = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/report/found/${given_id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        newAlert("Lost Report marked as found", "success");
        updateTable();
      } else {
        newAlert("Failed to mark Lost Report as found", "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to mark Lost Report as found", "danger");
    }
    onOpenChange();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Archive Lost Report</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to archive this lost report?</p>
              <p>{given_description}</p>
              <div className="flex flex-row gap-3 mb-5">
                <Chip>{given_type}</Chip>
                {given_locations.map((location, index) => (
                  <Chip key={index}>{location}</Chip>
                ))}
                <Chip>{given_date}</Chip>
                <Chip>{given_name}</Chip>
                <Chip>{given_email}</Chip>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" type="submit" onPress={checkIn}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
