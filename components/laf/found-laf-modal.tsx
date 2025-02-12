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

interface FoundLAFModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  given_type: string;
  given_location: string;
  given_date: string;
  given_description: string;
  given_id: string;
  updateTable: () => void;
}

interface SubmitFoundItemFormData {
  name: string;
  email: string;
}

export default function FoundLAFModal({
  isOpen,
  onOpenChange,
  given_type,
  given_location,
  given_date,
  given_description,
  given_id,
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
  });

  const { newAlert } = useAlert();
  const displayId = given_type.charAt(0).toUpperCase() + given_id;

  const onSubmit = async (data: SubmitFoundItemFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/found/${given_id}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/archive/${given_id}`,
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
              <p>{given_description}</p>
              <div className="flex flex-row gap-3 mb-5">
                <Chip>{given_type}</Chip>
                <Chip>{given_location}</Chip>
                <Chip>{given_date}</Chip>
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
