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
import { FoundItemModalData } from "@/types/laf";

interface EditLAFModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lafTypes: string[];
  lafLocations: string[];
  laf_data: FoundItemModalData;
  updateTable: () => void;
}

export default function EditLAFModal({
  isOpen,
  onOpenChange,
  lafTypes,
  lafLocations,
  laf_data,
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
      type: laf_data.type,
      location: laf_data.location,
      date: laf_data.date,
      description: laf_data.description,
    },
  });

  const { newAlert } = useAlert();
  const [date, setDate] = useState<string>(todaysDate.toString());
  const displayId = laf_data.type.charAt(0).toUpperCase() + laf_data.id;

  const onSubmit = async (data: FoundItemFormData) => {
    try {
      data.date = date;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/${laf_data.id}`,
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
    setValue("type", laf_data.type);
    setValue("location", laf_data.location);
    setValue("date", laf_data.date);
    setValue("description", laf_data.description);
    setDate(laf_data.date);
  }, [laf_data.type, laf_data.location, laf_data.date, laf_data.description]);

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
                  defaultSelectedKeys={[laf_data.type]}
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
                  defaultSelectedKeys={[laf_data.location]}
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
                  defaultValue={parseDate(laf_data.date)}
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
                  maxLength: {
                    value: 2000,
                    message: "Description must be 2000 characters or less",
                  },
                })}
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                defaultValue={laf_data.description}
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
