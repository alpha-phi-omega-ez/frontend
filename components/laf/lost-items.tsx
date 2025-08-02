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
import { useEffect, useState, Dispatch, SetStateAction } from "react";
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

  const [items, setItems] = useState<LAFItem[]>([]);
  const [formData, setFormData] = useState<LostItemsFormData>({
    type: "",
    location: "",
    date: todaysDate.toString(),
    dateFilter: "Before",
    description: "",
    id: "",
  });
  const [emptyForm, setEmptyForm] = useState(true);
  const [descriptionChange, setDescriptionChange] = useState("");
  const [idChange, setIdChange] = useState("");

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("description", descriptionChange);
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [descriptionChange]);

  useEffect(() => {
    const updateLAFItems = setTimeout(() => {
      handleChange("id", idChange.replace(/\D/g, ""));
    }, 500);
    return () => clearTimeout(updateLAFItems);
  }, [idChange]);

  useEffect(() => {
    if (isAuthenticated) {
      if (view !== "Lost Items") {
        reset();
        setValue("date", todaysDate.toString());
        setValue("dateFilter", "Before");
        clearErrors();
        setFormData({
          type: "",
          location: "",
          date: todaysDate.toString(),
          dateFilter: "Before",
          description: "",
          id: "",
        });
      } else {
        fetchLAFItems({ ...formData }, setItems, logout);
      }
    }
  }, [view]);

  const handleChange = (name: keyof LostItemsFormData, value: string) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    // Trigger the fetch when form data changes
    fetchLAFItems({ ...formData, [name]: value }, setItems, logout);

    if (
      updatedFormData.type === "" &&
      updatedFormData.location === "" &&
      updatedFormData.date === todaysDate.toString() &&
      updatedFormData.dateFilter === "Before" &&
      updatedFormData.description === ""
    ) {
      setEmptyForm(true);
    } else {
      setEmptyForm(false);
    }
  };

  const updateTable = () => {
    fetchLAFItems({ ...formData }, setItems, logout);
  };

  const onSubmit = async () => {
    setView("Submit Lost Report");
    setSwitchToLostReport({ ...formData });
    reset();
    setValue("date", todaysDate.toString());
    setValue("dateFilter", "Before");
    clearErrors();
    setFormData({
      type: "",
      location: "",
      date: todaysDate.toString(),
      dateFilter: "Before",
      description: "",
      id: "",
    });
    setEmptyForm(true);
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
            onChange={(e) => setIdChange(e.target.value)}
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
          onChange={(e) => setDescriptionChange(e.target.value)}
        />

        {!emptyForm && idChange === "" && (
          <Button color="primary" type="submit">
            Create Lost Report
          </Button>
        )}
      </form>
      <LAFItems
        items={items}
        lafTypes={lafTypes}
        lafLocations={lafLocations}
        updateTable={updateTable}
        edit={true}
      />
    </>
  );
}
