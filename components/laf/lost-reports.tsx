import { useForm } from "react-hook-form";
import {
  Chip,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  Input,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useReducer, useEffect } from "react";
import LostReportItems from "./lost-report-items";
import { useAuth } from "@/context/AuthContext";
import { fetchLostReportItems } from "@/utils/laf";
import { LostReportItem } from "@/types/laf";

interface LostReportsFormData {
  type: string;
  location: string;
  date: string;
  dateFilter: string;
  description: string;
  name: string;
  email: string;
}

interface LostReportsFormProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
}

export default function LostReports({
  lafTypes,
  lafLocations,
  view,
}: LostReportsFormProps) {
  const {
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<LostReportsFormData>({ mode: "onSubmit" });
  const { logout, auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);
  setValue("date", todaysDate.toString());

  // State interface for the reducer
  interface LostReportsState {
    items: LostReportItem[];
    formData: LostReportsFormData;
    descriptionChange: string;
  }

  // Action types for the reducer
  type LostReportsAction =
    | { type: "SET_ITEMS"; payload: LostReportItem[] }
    | { type: "SET_FIELD"; payload: { name: keyof LostReportsFormData; value: string } }
    | { type: "RESET_FORM"; payload: LostReportsFormData }
    | { type: "SET_DEBOUNCE_VALUE"; payload: string };

  // Reducer function
  function lostReportsReducer(
    state: LostReportsState,
    action: LostReportsAction
  ): LostReportsState {
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
          formData: action.payload,
          descriptionChange: "",
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
  const initialState: LostReportsState = {
    items: [],
    formData: {
      type: "",
      location: "",
      date: todaysDate.toString(),
      dateFilter: "Before",
      description: "",
      name: "",
      email: "",
    },
    descriptionChange: "",
  };

  const [state, dispatch] = useReducer(lostReportsReducer, initialState);

  useEffect(() => {
    if (isAuthenticated) {
      if (view !== "Find Lost Report") {
        reset();
        setValue("date", parseDate(new Date().toISOString().split("T")[0]).toString());
        setValue("dateFilter", "Before");
        clearErrors();
        dispatch({
          type: "RESET_FORM",
          payload: {
            type: "",
            location: "",
            date: parseDate(new Date().toISOString().split("T")[0]).toString(),
            dateFilter: "Before",
            description: "",
            name: "",
            email: "",
          },
        });
      } else {
        fetchLostReportItems({ ...state.formData }, dispatch, logout);
      }
    }
  }, [view]);

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("description", state.descriptionChange);
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [state.descriptionChange]);

  const handleChange = (name: keyof LostReportsFormData, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { name, value } });
    // Trigger the fetch when form data changes
    fetchLostReportItems({ ...state.formData, [name]: value }, dispatch, logout);
  };

  const updateTable = () => {
    fetchLostReportItems({ ...state.formData }, dispatch, logout);
  };

  return (
    <>
      <form className="flex flex-1 flex-col gap-3 px-6 py-2">
        <div className="flex flex-row gap-3">
          {/* Type Field */}
          <Select
            label="Type"
            variant="bordered"
            placeholder="Select a Type"
            {...register("type", { required: "Type is required" })}
            errorMessage={errors.type?.message}
            isInvalid={!!errors.type}
            onChange={(e) => handleChange("type", e.target.value)}
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
            onChange={(e) => handleChange("location", e.target.value)}
          >
            {lafLocations.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-row gap-3">
          {/* Date Filter Selector */}
          <Select
            label="Date Filter"
            variant="bordered"
            defaultSelectedKeys={["Before"]}
            {...register("dateFilter", { required: "Date filter is required" })}
            errorMessage={errors.dateFilter?.message}
            isInvalid={!!errors.dateFilter}
            onChange={(e) => handleChange("dateFilter", e.target.value)}
            scrollShadowProps={{
              isEnabled: false,
            }}
          >
            <SelectItem key="Before">Before</SelectItem>
            <SelectItem key="After">After</SelectItem>
          </Select>

          {/* Date Field */}
          <DatePicker
            label="Date"
            variant="bordered"
            onChange={(value) => {
              setValue("date", value?.toString() || "");
              handleChange("date", value?.toString() || "");
            }}
            errorMessage={errors.date?.message}
            isInvalid={!!errors.date}
            defaultValue={todaysDate}
            maxValue={todaysDate}
          />
        </div>
        <div className="flex flex-row gap-3">
          {/* Name Field */}
          <Input
            autoFocus
            label="Name"
            variant="bordered"
            {...register("name", { required: "Name is required" })}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
            autoComplete="off"
          />
          {/* Email Field */}
          <Input
            label="Email"
            variant="bordered"
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
            onChange={(e) => {
              handleChange("email", e.target.value);
              clearErrors("email");
            }}
            autoComplete="off"
          />
        </div>
        {/* Description Field */}
        <Textarea
          label="Description"
          variant="bordered"
          {...register("description", { required: "Description is required" })}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          onChange={(e) => dispatch({ type: "SET_DEBOUNCE_VALUE", payload: e.target.value })}
        />
      </form>
      <LostReportItems
        items={state.items}
        lafTypes={lafTypes}
        lafLocations={lafLocations}
        updateTable={updateTable}
        edit={true}
      />
    </>
  );
}
