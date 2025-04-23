import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  Chip,
} from "@heroui/react";
import { useAlert } from "@/context/AlertContext";
import { FoundItemModalData } from "@/types/laf";

interface FoundLAFModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  laf_data: FoundItemModalData;
  updateTable: () => void;
}

interface SubmitFoundItemFormData {
  name: string;
  email: string;
}

export default function FoundLAFModal({
  isOpen,
  onOpenChange,
  laf_data,
  updateTable,
}: FoundLAFModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<SubmitFoundItemFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onSubmit",
  });

  const { newAlert } = useAlert();
  const displayId = laf_data.type.charAt(0).toUpperCase() + laf_data.id;

  const onSubmit = async (data: SubmitFoundItemFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/found/${laf_data.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        newAlert("LAF item marked as found " + displayId, "success");
        updateTable();
      } else {
        newAlert("Failed to mark LAF item as found " + displayId, "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to mark LAF item as found " + displayId, "danger");
    }
    reset();
    clearErrors();
    onOpenChange();
  };

  const archiveItem = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/archive/${laf_data.id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        newAlert("LAF item archived " + displayId, "success");
        updateTable();
      } else {
        newAlert("Failed to archive LAF item " + displayId, "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to archive LAF item " + displayId, "danger");
    }
    reset();
    clearErrors();
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-3 px-6 py-2"
          >
            <ModalHeader>
              Found LAF Item{" #"}
              {displayId}
            </ModalHeader>
            <ModalBody>
              <p>{laf_data.description}</p>
              <div className="flex flex-row gap-3 mb-5">
                <Chip>{laf_data.type}</Chip>
                <Chip>{laf_data.location}</Chip>
                <Chip>{laf_data.date}</Chip>
              </div>
              <div className="flex flex-row gap-3">
                {/* Name Field */}
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  isRequired
                  {...register("name", { required: "Name is required" })}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                />
                {/* Email Field */}
                <Input
                  label="Email"
                  variant="bordered"
                  isRequired
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+\.{0,1}[^\s@]*$/,
                      message: "Enter a valid email",
                    },
                  })}
                  onChange={() => clearErrors("email")}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                />
              </div>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="warning" onPress={archiveItem}>
                Archive Item
              </Button>
              <div>
                <Button color="danger" onPress={onClose} className="mr-2">
                  Cancel
                </Button>
                <Button color="success" type="submit">
                  Mark as Found
                </Button>
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
