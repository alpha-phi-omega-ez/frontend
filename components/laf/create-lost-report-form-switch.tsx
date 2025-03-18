import { useForm } from "react-hook-form";
import {
  Button,
  Chip,
  Select,
  SelectItem,
  Input,
  Textarea,
  DatePicker,
} from "@heroui/react";
import { NewLostReportFormData } from "@/types/laf";
import { useAlert } from "@/context/AlertContext";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

interface CreateLostReportFormSwitchProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
  switchToLostReport: Record<string, string> | null;
  setSwitchToLostReport: Dispatch<
    SetStateAction<Record<string, string> | null>
  >;
}

export default function CreateLostReportFormSwitch({
  lafTypes,
  lafLocations,
  view,
  switchToLostReport,
  setSwitchToLostReport,
}: CreateLostReportFormSwitchProps) {
  const { newAlert } = useAlert();
  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLostReportFormData>({
    defaultValues: {
      type: switchToLostReport?.type || "",
      location: switchToLostReport?.location || "",
      date: switchToLostReport?.date || todaysDate.toString(),
      name: "",
      email: "",
      description: switchToLostReport?.description || "",
    },
  });

  useEffect(() => {
    if (view !== "Submit Lost Report") {
      setSwitchToLostReport(null);
    }
  }, [view]);

  const [date, setDate] = useState<string>(todaysDate.toString());

  const onSubmit = async (data: NewLostReportFormData) => {
    try {
      data.date = date;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/report/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        newAlert("New Lost Report Created", "success");
        setSwitchToLostReport(null);
      } else {
        newAlert("Failed to create new Lost Report.", "danger");
      }
    } catch (error) {
      console.error("Lost Report creation operation failed:", error);
      newAlert("Failed to create new Lost Report.", "danger");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-3 px-6 py-2"
    >
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
          autoComplete="off"
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
          autoComplete="off"
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
          defaultValue={
            switchToLostReport?.date
              ? parseDate(switchToLostReport.date)
              : todaysDate
          }
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
          classNames={{
            trigger: "min-h-14 py-2",
          }}
          isMultiline={true}
          // label="Possible Locations"
          aria-label="Possible Locations"
          variant="bordered"
          isRequired
          placeholder="Select Location(s)"
          {...register("location", { required: "Location is required" })}
          errorMessage={errors.location?.message}
          isInvalid={!!errors.location}
          items={lafLocations.map((location) => ({
            key: location,
            name: location,
          }))}
          scrollShadowProps={{
            isEnabled: false,
          }}
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
          defaultSelectedKeys={switchToLostReport?.location?.split(",") || []}
        >
          {lafLocations.map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
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
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
