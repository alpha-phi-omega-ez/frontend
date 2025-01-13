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
  Chip,
  Input,
} from "@nextui-org/react";
import { NewLostReportFormData } from "@/types/laf";
import { parseDate } from "@internationalized/date";
import { useState, useEffect } from "react";
import { useAlert } from "@/context/AlertContext";

interface EditLostReportModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lafTypes: string[];
  lafLocations: string[];
  given_type: string;
  given_locations: string[];
  given_date: string;
  given_description: string;
  given_id: string;
  given_name: string;
  given_email: string;
  updateTable: () => void;
}

export default function EditLostReportModal({
  isOpen,
  onOpenChange,
  lafTypes,
  lafLocations,
  given_type,
  given_locations,
  given_date,
  given_description,
  given_id,
  given_name,
  given_email,
  updateTable,
}: EditLostReportModalProps) {
  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<NewLostReportFormData>({
    defaultValues: {
      type: "",
      location: "",
      date: "",
      name: "",
      email: "",
      description: "",
    },
  });

  const { newAlert } = useAlert();
  const [date, setDate] = useState<string>(todaysDate.toString());

  const onSubmit = async (data: NewLostReportFormData) => {
    try {
      data.date = date;
      data.location = data.location
        .split(",")
        .map((loc) => loc.trim())
        .join(",");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/report/${given_id}`,
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
        newAlert("Lost Report updated", "success");
        updateTable();
      } else {
        newAlert("Failed to update Lost Report", "danger");
      }
    } catch (error) {
      console.error(error);
      newAlert("Failed to update Lost Report", "danger");
    }
    reset();
    clearErrors();
    onOpenChange();
  };

  useEffect(() => {
    setValue("type", given_type);
    setValue("location", given_locations.join(","));
    setValue("date", given_date);
    setValue("description", given_description);
    setValue("name", given_name);
    setValue("email", given_email);
    setDate(given_date);
  }, [
    given_type,
    given_locations,
    given_date,
    given_description,
    given_name,
    given_email,
  ]);

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
            <ModalHeader>Edit Lost Report</ModalHeader>
            <ModalBody>
              <p>{given_description}</p>
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
                  defaultValue={given_name}
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
                  defaultValue={given_email}
                />
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
                    setDate(value?.toString() || "");
                  }}
                  errorMessage={errors.date?.message}
                  isInvalid={!!errors.date}
                  defaultValue={parseDate(given_date)}
                  maxValue={todaysDate}
                />
              </div>
              <div className="flex flex-row gap-3">
                {/* Type Field */}
                <Select
                  className="w-1/3"
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
                >
                  {lafTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>

                {/* Location Field */}
                <Select
                  classNames={{
                    trigger: "min-h-14 py-2",
                  }}
                  isMultiline={true}
                  // label="Possible Locations"
                  aria-label="Possible Locations"
                  variant="bordered"
                  isRequired
                  placeholder="Select Location(s)"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  errorMessage={errors.location?.message}
                  isInvalid={!!errors.location}
                  items={lafLocations.map((location) => ({
                    key: location,
                    name: location,
                  }))}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.textValue}</Chip>
                        ))}
                      </div>
                    );
                  }}
                  selectionMode="multiple"
                  onChange={(e) => {
                    setValue("location", e.target.value);
                  }}
                  defaultSelectedKeys={given_locations || []}
                >
                  {lafLocations.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
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
