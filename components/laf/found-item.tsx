import { useForm } from "react-hook-form";
import {
  Button,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useEffect } from "react";

interface FoundItemFormData {
  type: string;
  location: string;
  date: string;
  description: string;
}

interface FoundItemFormProps {
  lafTypes: string[];
  lafLocations: string[];
}

export default function FoundItemForm({
  lafTypes,
  lafLocations,
}: FoundItemFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FoundItemFormData>();

  const onSubmit = (data: FoundItemFormData) => {
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
      {/* Type Field */}
      <div className="flex flex-row gap-3">
        <Select
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
          label="Location"
          variant="bordered"
          isRequired
          placeholder="Select a Location"
          {...register("location", { required: "Location is required" })}
          errorMessage={errors.location?.message}
          isInvalid={!!errors.location}
        >
          {lafLocations.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
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
          }}
          errorMessage={errors.date?.message}
          isInvalid={!!errors.date}
          defaultValue={todaysDate}
          maxValue={todaysDate}
        />
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
