import { NewLostReportFormData } from "@/types/laf";
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
import { parseDate } from "@internationalized/date";
import { useEffect, useReducer, Dispatch, SetStateAction } from "react";
import { LAFItem } from "@/types/laf";
import LAFItems from "./laf-items";
import { fetchLAFItems } from "@/utils/laf";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";

interface CreateLostReportFormProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
  setSwitchToLostReport: Dispatch<
    SetStateAction<Record<string, string> | null>
  >;
}

export default function CreateLostReportForm({
  lafTypes,
  lafLocations,
  view,
  setSwitchToLostReport,
}: CreateLostReportFormProps) {
  const { newAlert } = useAlert();
  const { auth, logout } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
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
    mode: "onSubmit",
  });

  // State interface for the reducer
  interface CreateLostReportState {
    descriptionChange: string;
    items: LAFItem[];
    formData: {
      type: string;
      location: string;
      date: string;
      dateFilter: string;
      description: string;
    };
  }

  // Action types for the reducer
  type CreateLostReportAction =
    | { type: "SET_DEBOUNCE_VALUE"; payload: string }
    | { type: "SET_ITEMS"; payload: LAFItem[] }
    | { type: "SET_FIELD"; payload: { name: string; value: string } }
    | { type: "RESET_FORM" };

  // Reducer function
  function createLostReportReducer(
    state: CreateLostReportState,
    action: CreateLostReportAction
  ): CreateLostReportState {
    switch (action.type) {
      case "SET_DEBOUNCE_VALUE":
        return { ...state, descriptionChange: action.payload };
      case "SET_ITEMS":
        return { ...state, items: action.payload };
      case "SET_FIELD":
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.name]: action.payload.value,
          },
        };
      case "RESET_FORM":
        return {
          ...state,
          formData: {
            type: "",
            location: "",
            date: parseDate(new Date().toISOString().split("T")[0]).toString(),
            dateFilter: "Before",
            description: "",
          },
          descriptionChange: "",
          items: [],
        };
      default:
        return state;
    }
  }

  // Initial state
  const initialState: CreateLostReportState = {
    descriptionChange: "",
    items: [],
    formData: {
      type: "",
      location: "",
      date: todaysDate.toString(),
      dateFilter: "Before",
      description: "",
    },
  };

  const [state, dispatch] = useReducer(createLostReportReducer, initialState);

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("description", state.descriptionChange);
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [state.descriptionChange]);

  useEffect(() => {
    if (isAuthenticated && view !== "Submit Lost Report") {
      reset();
      setValue("date", todaysDate.toString());
      clearErrors();
      dispatch({ type: "RESET_FORM" });
      setSwitchToLostReport(null);
    }
  }, [view, isAuthenticated]);

  const onSubmit = async (data: NewLostReportFormData) => {
    try {
      data.date = state.formData.date;
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
        reset();
        setValue(
          "date",
          parseDate(new Date().toISOString().split("T")[0]).toString()
        );
        clearErrors();
        dispatch({ type: "RESET_FORM" });
        setSwitchToLostReport(null);
      } else {
        newAlert("Failed to create new Lost Report.", "danger");
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
      newAlert("Failed to create new Lost Report.", "danger");
    }
  };

  const handleChange = (name: keyof NewLostReportFormData, value: string) => {
    if (isAuthenticated) {
      dispatch({ type: "SET_FIELD", payload: { name, value } });

      const updatedFormData = {
        ...state.formData,
        [name]: value,
      };

      // Check if the form is reset to the initial state
      if (
        updatedFormData.type === "" &&
        updatedFormData.location === "" &&
        updatedFormData.date === todaysDate.toString() &&
        updatedFormData.dateFilter === "Before" &&
        updatedFormData.description === ""
      ) {
        dispatch({ type: "SET_ITEMS", payload: [] });
      } else {
        // Trigger the fetch when form data changes
        fetchLAFItems(updatedFormData, dispatch, logout);
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
            {...register("name", { 
              required: "Name is required",
              maxLength: {
                value: 100,
                message: "Name must be 100 characters or less",
              },
            })}
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
            onChange={() => clearErrors("email")}
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
            onChange={(e) => {
              setValue("type", e.target.value);
              handleChange("type", e.target.value);
            }}
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
            onChange={(e) => {
              setValue("location", e.target.value);
              handleChange("location", e.target.value);
            }}
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
            maxLength: {
              value: 2000,
              message: "Description must be 2000 characters or less",
            },
          })}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          onChange={(e) => dispatch({ type: "SET_DEBOUNCE_VALUE", payload: e.target.value })}
        />

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
      {isAuthenticated && state.items && state.items.length > 0 && (
        <>
          <h2 className="text-center mt-5 text-3xl">
            Potential Matching LAF items
          </h2>
          <LAFItems
            items={state.items}
            lafTypes={[]}
            lafLocations={[]}
            updateTable={() => {}}
            edit={false}
          />
        </>
      )}
    </>
  );
}
