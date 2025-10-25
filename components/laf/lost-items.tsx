import { useForm } from "react-hook-form";
import {
  Chip,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  Button,
  Input,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useEffect, useReducer, Dispatch, SetStateAction } from "react";
import LAFItems from "./laf-items";
import { LAFItem, ViewState } from "@/types/laf";
import { fetchLAFItems } from "@/utils/laf";
import { useAuth } from "@/context/AuthContext";

interface LostItemsFormData {
  type: string;
  location: string;
  date: string;
  dateFilter: string;
  description: string;
  id: string;
}

interface LostItemstFormProps {
  lafTypes: string[];
  lafLocations: string[];
  view: string;
  setSwitchToLostReport: Dispatch<
    SetStateAction<Record<string, string> | null>
  >;
  setView: Dispatch<SetStateAction<ViewState>>;
}

export default function LostItems({
  lafTypes,
  lafLocations,
  view,
  setSwitchToLostReport,
  setView,
}: LostItemstFormProps) {
  const { logout, auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const {
    register,
    setValue,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<LostItemsFormData>({ mode: "onSubmit" });

  const todaysDate = parseDate(new Date().toISOString().split("T")[0]);
  setValue("date", todaysDate.toString());

  // State interface for the reducer
  interface LostItemsState {
    items: LAFItem[];
    formData: LostItemsFormData;
    emptyForm: boolean;
    descriptionChange: string;
    idChange: string;
  }

  // Action types for the reducer
  type LostItemsAction =
    | { type: "SET_ITEMS"; payload: LAFItem[] }
    | { type: "SET_FIELD"; payload: { name: keyof LostItemsFormData; value: string } }
    | { type: "RESET_FORM"; payload: LostItemsFormData }
    | { type: "SET_DEBOUNCE_VALUE"; payload: { field: "descriptionChange" | "idChange"; value: string } }
    | { type: "UPDATE_EMPTY_FORM"; payload: LostItemsFormData };

  // Reducer function
  function lostItemsReducer(
    state: LostItemsState,
    action: LostItemsAction
  ): LostItemsState {
    switch (action.type) {
      case "SET_ITEMS":
        return { ...state, items: action.payload };
      case "SET_FIELD":
        const updatedFormData = {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        };
        return {
          ...state,
          formData: updatedFormData,
          emptyForm: isFormEmpty(updatedFormData),
        };
      case "RESET_FORM":
        return {
          ...state,
          formData: action.payload,
          emptyForm: true,
          descriptionChange: "",
          idChange: "",
        };
      case "SET_DEBOUNCE_VALUE":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      case "UPDATE_EMPTY_FORM":
        return {
          ...state,
          emptyForm: isFormEmpty(action.payload),
        };
      default:
        return state;
    }
  }

  // Helper function to check if form is empty
  const isFormEmpty = (formData: LostItemsFormData): boolean => {
    return (
      formData.type === "" &&
      formData.location === "" &&
      formData.date === parseDate(new Date().toISOString().split("T")[0]).toString() &&
      formData.dateFilter === "Before" &&
      formData.description === ""
    );
  };

  // Initial state
  const initialState: LostItemsState = {
    items: [],
    formData: {
      type: "",
      location: "",
      date: todaysDate.toString(),
      dateFilter: "Before",
      description: "",
      id: "",
    },
    emptyForm: true,
    descriptionChange: "",
    idChange: "",
  };

  const [state, dispatch] = useReducer(lostItemsReducer, initialState);


  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("description", state.descriptionChange);
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [state.descriptionChange]);

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("id", state.idChange.replace(/\D/g, ""));
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [state.idChange]);

  useEffect(() => {
    if (isAuthenticated) {
      if (view !== "Lost Items") {
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
            id: "",
          },
        });
      } else {
        fetchLAFItems({ ...state.formData }, dispatch, logout);
      }
    }
  }, [view]);

  const handleChange = (name: keyof LostItemsFormData, value: string) => {
    dispatch({ type: "SET_FIELD", payload: { name, value } });
    // Trigger the fetch when form data changes
    fetchLAFItems({ ...state.formData, [name]: value }, dispatch, logout);
  };

  const updateTable = () => {
    fetchLAFItems({ ...state.formData }, dispatch, logout);
  };

  const onSubmit = async () => {
    setView("Submit Lost Report");
    setSwitchToLostReport({ ...state.formData });
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
        id: "",
      },
    });
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
            {...register("type")}
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
          {/* Id Field */}
          <Input
            label="ID"
            variant="bordered"
            placeholder="LAF ID"
            {...register("id")}
            errorMessage={errors.id?.message}
            isInvalid={!!errors.id}
            onChange={(e) => dispatch({ type: "SET_DEBOUNCE_VALUE", payload: { field: "idChange", value: e.target.value } })}
            autoComplete="off"
          />

          {/* Date Filter Selector */}
          <Select
            label="Date Filter"
            variant="bordered"
            defaultSelectedKeys={["Before"]}
            {...register("dateFilter")}
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
            {...register("date")}
            errorMessage={errors.date?.message}
            isInvalid={!!errors.date}
            defaultValue={todaysDate}
            maxValue={todaysDate}
            onChange={(value) => {
              setValue("date", value?.toString() || "");
              handleChange("date", value?.toString() || "");
            }}
          />
        </div>

        {/* Description Field */}
        <Textarea
          label="Description"
          variant="bordered"
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          onChange={(e) => dispatch({ type: "SET_DEBOUNCE_VALUE", payload: { field: "descriptionChange", value: e.target.value } })}
        />

        {!state.emptyForm && state.idChange === "" && (
          <Button color="primary" type="submit">
            Create Lost Report
          </Button>
        )}
      </form>
      <LAFItems
        items={state.items}
        lafTypes={lafTypes}
        lafLocations={lafLocations}
        updateTable={updateTable}
        edit={true}
      />
    </>
  );
}
