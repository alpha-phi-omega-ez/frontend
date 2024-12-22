import { useForm } from "react-hook-form";
import {
  Button,
  Chip,
  Select,
  SelectItem,
  Input,
  Textarea,
  DatePicker,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useEffect } from "react";

interface NewLostReportFormData {
  type: string;
  location: string;
  date: string;
  name: string;
  email: string;
  description: string;
}

interface NewLostReportFormProps {
  lafTypes: string[];
  lafLocations: string[];
}

export default function NewLostReport({
  lafTypes,
  lafLocations,
}: NewLostReportFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewLostReportFormData>();

  const onSubmit = (data: NewLostReportFormData) => {
    console.log(data);
  };

  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    setValue("date", todaysDate.toString()); // Set the default date in form state
  }, [setValue, todaysDate]);

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
          }}
          errorMessage={errors.date?.message}
          isInvalid={!!errors.date}
          defaultValue={todaysDate}
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
          {...register("location", { required: "Location is required" })}
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
        {...register("description", { required: "Description is required" })}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
      />

      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
