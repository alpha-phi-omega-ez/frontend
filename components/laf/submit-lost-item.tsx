import { useForm } from "react-hook-form";
import {
  Button,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { useReducer, useEffect } from "react";
import { LostReportItem } from "@/types/laf";
import LostReportItems from "./lost-report-items";
import { fetchLostReportItems } from "@/utils/laf";
import { FoundItemFormData } from "@/types/laf";

interface FoundItemFormProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
}

export default function FoundItemForm({
  lafTypes,
  lafLocations,
  view,
}: FoundItemFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FoundItemFormData>({
    defaultValues: {
      type: "",
      location: "",
      date: "",
      description: "",
    },
  });

  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);

  // State interface for the reducer
  interface FoundItemState {
    items: LostReportItem[];
    formData: {
      type: string;
      location: string;
      date: string;
      dateFilter: string;
      description: string;
    };
    descriptionChange: string;
  }

  // Action types for the reducer
  type FoundItemAction =
    | { type: "SET_ITEMS"; payload: LostReportItem[] }
    | { type: "SET_FIELD"; payload: { name: keyof FoundItemFormData; value: string } }
    | { type: "RESET_FORM" }
    | { type: "SET_DEBOUNCE_VALUE"; payload: string };

  // Reducer function
  function foundItemReducer(
    state: FoundItemState,
    action: FoundItemAction
  ): FoundItemState {
    switch (action.type) {
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
      case "SET_DEBOUNCE_VALUE":
        return {
          ...state,
          descriptionChange: action.payload,
        };
      default:
        return state;
    }
  }

  // Initial state
  const initialState: FoundItemState = {
    items: [],
    formData: {
      type: "",
      location: "",
      date: todaysDate.toString(),
      dateFilter: "Before",
      description: "",
    },
    descriptionChange: "",
  };

  const [state, dispatch] = useReducer(foundItemReducer, initialState);

  const { newAlert } = useAlert();
  const { logout, auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const onSubmit = async (data: FoundItemFormData) => {
    try {
      data.date = state.formData.date;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/item/`,
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
        dispatch({ type: "RESET_FORM" });
        reset();
        setValue(
          "date",
          parseDate(new Date().toISOString().split("T")[0]).toString()
        );
        const data = await response.json();
        newAlert(
          "New LAF Item created with ID: " +
            data.data.type.charAt(0) +
            data.data.id,
          "success"
        );
      } else if (response.status === 401) {
        newAlert("Please log in and try again.", "danger");
        logout();
      } else {
        newAlert("Failed to create new LAF Item.", "warning");
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
    }
  };

  setValue("date", todaysDate.toString());

  useEffect(() => {
    if (isAuthenticated && view !== "Submit Lost Item") {
      reset();
      setValue("date", todaysDate.toString());
      clearErrors();
      dispatch({ type: "RESET_FORM" });
    }
  }, [view]);

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("description", state.descriptionChange);
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [state.descriptionChange]);

  const handleChange = (name: keyof FoundItemFormData, value: string) => {
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
      fetchLostReportItems(updatedFormData, dispatch, logout);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-3 px-6 py-2"
      >
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
            label="Location"
            variant="bordered"
            placeholder="Select a Location"
            isRequired
            {...register("location", { required: "Location is required" })}
            errorMessage={errors.location?.message}
            isInvalid={!!errors.location}
            onChange={(e) => {
              setValue("location", e.target.value);
              handleChange("location", e.target.value);
            }}
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
              handleChange("date", value?.toString() || "");
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
          onChange={(e) => dispatch({ type: "SET_DEBOUNCE_VALUE", payload: e.target.value })}
        />

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
      {state.items && state.items.length > 0 && (
        <>
          <h2 className="text-center mt-5 text-3xl">
            Potential Matching Lost Reports
          </h2>
          <LostReportItems
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
