import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  DatePicker,
  Textarea,
} from "@heroui/react";
import { FoundItemFormData } from "@/types/laf";
import { parseDate } from "@internationalized/date";
import { useState, useEffect } from "react";
import { useAlert } from "@/context/AlertContext";

interface EditLAFModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lafTypes: string[];
  lafLocations: string[];
  given_type: string;
  given_location: string;
  given_date: string;
  given_description: string;
  given_id: string;
  updateTable: () => void;
}

export default function EditLAFModal({
  isOpen,
  onOpenChange,
  lafTypes,
  lafLocations,
  given_type,
  given_location,
  given_date,
  given_description,
  given_id,
  updateTable,
}: EditLAFModalProps) {
  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FoundItemFormData>({
    defaultValues: {
      type: given_type,
      location: given_location,
      date: given_date,
      description: given_description,
    },
  });

  const { newAlert } = useAlert();
  const [date, setDate] = useState<string>(todaysDate.toString());
  const displayId = given_type.charAt(0).toUpperCase() + given_id;

  const onSubmit = async (data: FoundItemFormData) => {
    try {
      data.date = date;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/${given_id}`,
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
        newAlert("LAF item updated " + displayId, "success");
        updateTable();
      } else {
        newAlert("Failed to update LAF item " + displayId, "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to update LAF item " + displayId, "danger");
    }
    reset();
    clearErrors();
    onOpenChange();
  };

  useEffect(() => {
    setValue("type", given_type);
    setValue("location", given_location);
    setValue("date", given_date);
    setValue("description", given_description);
    setDate(given_date);
  }, [given_type, given_location, given_date, given_description]);

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
              Edit LAF Item{" #"}
              {displayId}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row gap-3">
                {/* Type Field */}
                <Select
                  label="Type"
                  variant="bordered"
                  placeholder="Select a Type"
                  isRequired
                  {...register("type", { required: "Type is required" })}
                  errorMessage={errors.type?.message}
                  isInvalid={!!errors.type}
                  onChange={(e) => {
                    setValue("type", e.target.value);
                  }}
                  defaultSelectedKeys={[given_type]}
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                >
                  {lafTypes.map((type) => (
                    <SelectItem key={type}>{type}</SelectItem>
                  ))}
                </Select>

                {/* Location Field */}
                <Select
                  label="Location"
                  variant="bordered"
                  placeholder="Select a Location"
                  isRequired
                  {...register("location", {
                    required: "Location is required",
                  })}
                  errorMessage={errors.location?.message}
                  isInvalid={!!errors.location}
                  onChange={(e) => {
                    setValue("location", e.target.value);
                  }}
                  defaultSelectedKeys={[given_location]}
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                >
                  {lafLocations.map((type) => (
                    <SelectItem key={type}>{type}</SelectItem>
                  ))}
                </Select>
                {/* Date Field */}
                <DatePicker
                  label="Date"
                  variant="bordered"
                  isRequired
                  onChange={(value) => {
                    const event = {
                      target: {
                        name: "date",
                        value: value?.toString() || "",
                      },
                    };
                    register("date").onChange(event);
                    if (value) {
                      setDate(value.toString());
                    }
                  }}
                  errorMessage={errors.date?.message}
                  isInvalid={!!errors.date}
                  defaultValue={parseDate(given_date)}
                  maxValue={todaysDate}
                />
              </div>
              {/* Description Field */}
              <Textarea
                label="Description"
                variant="bordered"
                isRequired
                {...register("description", {
                  required: "Description is required",
                })}
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                defaultValue={given_description}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Edit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
