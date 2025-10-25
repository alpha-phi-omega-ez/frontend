import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Chip,
} from "@heroui/react";
import { useAlert } from "@/context/AlertContext";
import { LostReportModalData } from "@/types/laf";

interface ArchiveLostReportModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lost_report_data: LostReportModalData;
  updateTable: () => void;
}

export default function ArchiveLostReportModal({
  isOpen,
  onOpenChange,
  lost_report_data,
  updateTable,
}: ArchiveLostReportModalProps) {
  const { newAlert } = useAlert();

  const checkIn = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/report/found/${lost_report_data.id}`,
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
              <p>{lost_report_data.description}</p>
              <div className="flex flex-row gap-3 mb-5">
                <Chip>{lost_report_data.type}</Chip>
                {lost_report_data.locations.map((location, index) => (
                  <Chip key={index}>{location}</Chip>
                ))}
                <Chip>{lost_report_data.date}</Chip>
                <Chip>{lost_report_data.name}</Chip>
                <Chip>{lost_report_data.email}</Chip>
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
