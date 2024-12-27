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
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { LAFItem } from "@/types/laf";
import LAFItems from "./laf-items";
import { fetchLAFItems } from "@/utils/laf/utils";

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
  view: string;
  switchToLostReport?: Record<string, string> | null;
  setSwitchToLostReport: Dispatch<
    SetStateAction<Record<string, string> | null>
  >;
}

export default function NewLostReport({
  lafTypes,
  lafLocations,
  view,
  switchToLostReport,
  setSwitchToLostReport,
}: NewLostReportFormProps) {
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
      date: todaysDate.toString(),
      name: "",
      email: "",
      description: "",
    },
  });

  const { newAlert } = useAlert();
  const { auth, logout } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const [switched, setSwitched] = useState(false);

  const onSubmit = async (data: NewLostReportFormData) => {
    try {
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
        const data = await response.json();
        newAlert("New Lost Report Created", "success");
        reset();
        setValue(
          "date",
          parseDate(new Date().toISOString().split("T")[0]).toString()
        );
        setSwitched(false);
      } else {
        newAlert("Failed to create new Lost Report.", "warning");
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
    }
  };

  const [items, setItems] = useState<LAFItem[]>([]);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    date: todaysDate.toString(),
    dateFilter: "Before",
    description: "",
  });

  useEffect(() => {
    if (isAuthenticated && view !== "Submit Lost Report") {
      reset();
      setValue("date", todaysDate.toString());
      clearErrors();
      setFormData({
        type: "",
        location: "",
        date: todaysDate.toString(),
        dateFilter: "Before",
        description: "",
      });
      setSwitched(false);
      console.log("Switched to false");
    }
    if (view === "Submit Lost Report" && switchToLostReport) {
      console.log("Switched to true");
      console.log(switchToLostReport);
      console.log("Type: ", switchToLostReport.type);
      console.log("Location: ", switchToLostReport.location);
      console.log("Date: ", switchToLostReport.date);
      console.log("Description: ", switchToLostReport.description);
      // setTimeout(() => {
      //   setValue("type", switchToLostReport?.type || "");
      //   setValue("location", switchToLostReport?.location || "");
      //   setValue("date", switchToLostReport?.date || todaysDate.toString());
      //   setValue("description", switchToLostReport?.description || "");
      //   setFormData({
      //     type: switchToLostReport?.type || "",
      //     location: switchToLostReport?.location || "",
      //     date: switchToLostReport?.date || todaysDate.toString(),
      //     dateFilter: "Before",
      //     description: switchToLostReport?.description || "",
      //   });
      // }, 0);
      setTimeout(() => {
        reset({
          type: switchToLostReport.type || "",
          location: switchToLostReport.location || "",
          date: switchToLostReport.date || todaysDate.toString(),
          description: switchToLostReport.description || "",
          name: "",
          email: "",
        });
        setFormData({
          type: switchToLostReport.type,
          location: switchToLostReport.location,
          date: switchToLostReport.date,
          dateFilter: "Before",
          description: switchToLostReport.description,
        });
      }, 0);
      setSwitched(true);

      // Log after state update
      setTimeout(() => {
        console.log("Updated Form Data:", formData);
        console.log("Updated Switched:", switched);
      }, 0);

      // Clear switchToLostReport after use
      setTimeout(() => {
        setSwitchToLostReport(null);
      }, 0);
    }
  }, [view, switchToLostReport, isAuthenticated]);

  const handleChange = (name: keyof NewLostReportFormData, value: any) => {
    if (isAuthenticated && !switched) {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };

      setFormData(updatedFormData);

      // Check if the form is reset to the initial state
      if (
        updatedFormData.type === "" &&
        updatedFormData.location === "" &&
        updatedFormData.date === todaysDate.toString() &&
        updatedFormData.dateFilter === "Before" &&
        updatedFormData.description === ""
      ) {
        setItems([]);
      } else {
        // Trigger the fetch when form data changes
        fetchLAFItems(updatedFormData, setItems, logout);
      }
    }
  };

  return (
    <>
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
              handleChange("date", value?.toString() || "");
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
            onChange={(e) => handleChange("type", e.target.value)}
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
            onChange={(e) => handleChange("location", e.target.value)}
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
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
      {isAuthenticated && !switched && items && items.length > 0 && (
        <LAFItems items={items} />
      )}
    </>
  );
}
