import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import Error from "../_error";
import { useAuth } from "@/context/AuthContext";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Typography } from "@mui/material";
import { Card, CardBody } from "@nextui-org/card";
import { useForm } from "react-hook-form";

export default function LoanerTechPage() {
  const [loanerTech, setLoanerTech] = useState<
    | false
    | {
        description: string;
        id: number;
        in_office: boolean;
        name?: string;
        phone?: string;
        email?: string;
      }[]
  >([]);
  const { auth, logout } = useAuth();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isAuthenticated } = auth;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const fetchLoanerTech = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setLoanerTech([]);
      } else {
        const data = await response.json();
        setLoanerTech(data["data"]);
        if (!data["loggedIn"]) {
          logout();
        }
      }
    } catch (error) {
      setLoanerTech([]);
    }
  };

  useEffect(() => {
    fetchLoanerTech();

    const intervalId = setInterval(() => {
      fetchLoanerTech();
    }, 5000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleCardSelection = (id: number, inOffice: boolean): boolean => {
    let changed = false;
    let wasRemoved = false;
    setSelectedCards((prev) => {
      if (prev.includes(id)) {
        wasRemoved = true;
        changed = true;
        return prev.filter((cardId) => cardId !== id);
      }
      return prev;
    });

    const checkedOut = isCheckedOut();

    if (
      !wasRemoved &&
      (selectedCards.length === 0 ||
        (checkedOut && !inOffice) ||
        (!checkedOut && inOffice))
    ) {
      setSelectedCards((prev) => [...prev, id]);
      changed = true;
    }

    return changed;
  };

  const isCheckedOut = () =>
    selectedCards.every(
      (id) =>
        Array.isArray(loanerTech) &&
        loanerTech.find((item) => item.id === id)?.in_office === false
    );

  interface FormData {
    name: string;
    email: string;
    phone: string;
  }

  const checkIn = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/checkin`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedCards,
          }),
        }
      );

      if (response.ok) {
        fetchLoanerTech(); // Refresh data
        setSelectedCards([]);
        onOpenChange(); // Close modal after submission
      }
    } catch (error) {
      console.error("Checkin operation failed:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/checkout`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedCards,
            phone_number: data.phone,
            email: data.email,
            name: data.name,
          }),
        }
      );

      if (response.ok) {
        fetchLoanerTech(); // Refresh data
        setSelectedCards([]);
      }
    } catch (error) {
      console.error("Checkout operation failed:", error);
    }
    reset();
    setValue("phone", "", { shouldValidate: false });
    onOpenChange(); // Close modal after submission
  };

  // Watch the phone field value for auto-formatting
  const phoneValue = watch("phone", "");

  // Function to format phone number as "XXX-XXX-XXXX"
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  };

  // Update the field with the formatted value
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: formatted.length === 12 }); // Update and trigger validation
  };

  const now = new Date();
  const loanerTechAvailable =
    now.getDay() >= 1 &&
    now.getDay() <= 5 &&
    now.getHours() >= 9 &&
    now.getHours() <= 12 + 4;

  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6 text-center">
        <div className="mb-10">
          <h1 className={title()}>Loaner Tech</h1>
        </div>
        {isAuthenticated && (
          <div className="flex items-center justify-center gap-4 mb-6">
            <Typography variant="body1">
              Selected: {selectedCards.length}
            </Typography>
            <Button
              disabled={!selectedCards.length}
              onClick={onOpen}
              style={{ width: "120px" }} // Set a fixed width
            >
              {!selectedCards.length
                ? "Select Items"
                : isCheckedOut()
                ? "Check In"
                : "Check Out"}
            </Button>
          </div>
        )}
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
          {Array.isArray(loanerTech) &&
            loanerTech.map((item) => {
              const operationMode = isCheckedOut() ? "check-in" : "check-out";
              let isSelected = selectedCards.includes(item.id);

              return isAuthenticated ? (
                <Card
                  key={item.id}
                  className={`p-2 border ${
                    isSelected ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => {
                    const operationMode = isCheckedOut()
                      ? "check-in"
                      : "check-out";
                    const isDisabled =
                      selectedCards.length > 0 &&
                      ((operationMode === "check-in" && item.in_office) ||
                        (operationMode === "check-out" && !item.in_office));
                    if (!isDisabled) {
                      if (toggleCardSelection(item.id, item.in_office)) {
                        isSelected = isSelected ? false : true;
                      }
                    }
                  }}
                  isPressable={true}
                >
                  <CardBody>
                    <h2 className="text-xl mb-1">
                      #{item.id} {item.description}
                    </h2>
                    <div className="flex pt-2">
                      <div
                        className={`status-indicator ${
                          item.in_office ? "available" : "unavailable"
                        }`}
                      ></div>
                      <p>{item.in_office ? "Available" : "Unavailable"}</p>
                    </div>
                    {item.name &&
                      item.name !== "" &&
                      item.phone &&
                      item.phone !== "" &&
                      item.email &&
                      item.email !== "" && (
                        <div className="flex flex-col mt-2">
                          <div className="flex justify-between mb-1">
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                          </div>
                          <p>{item.phone}</p>
                        </div>
                      )}
                  </CardBody>
                </Card>
              ) : (
                <Card key={item.id} className="p-2">
                  <CardBody>
                    <h2 className="text-xl">
                      #{item.id} {item.description}
                    </h2>
                    <div className="flex pt-2">
                      <div
                        className={`status-indicator ${
                          item.in_office && loanerTechAvailable
                            ? "available"
                            : "unavailable"
                        }`}
                      ></div>
                      <p>
                        {item.in_office && loanerTechAvailable
                          ? "Available"
                          : "Unavailable"}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) =>
            isCheckedOut() ? (
              <>
                <ModalHeader>
                  <Typography id="modal-title" variant="h6">
                    {isCheckedOut() ? "Check In" : "Check Out"}{" "}
                    {selectedCards
                      .sort()
                      .map((id) => `#${id}`)
                      .join(", ")}
                  </Typography>
                </ModalHeader>
                <ModalBody>
                  <Typography variant="body1">
                    Are you sure you want to check in the selected items?
                  </Typography>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="success" onPress={checkIn}>
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>
                  <Typography id="modal-title" variant="h6">
                    {isCheckedOut() ? "Check In" : "Check Out"}{" "}
                    {selectedCards
                      .sort()
                      .map((id) => `#${id}`)
                      .join(", ")}
                  </Typography>
                </ModalHeader>
                <ModalBody>
                  {!loanerTechAvailable && (
                    <Typography className="mb-4" color="warning">
                      Warning, it is outside of loaner tech hours.
                    </Typography>
                  )}
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
                  {/* Phone Number Field */}
                  <Input
                    label="Phone Number"
                    variant="bordered"
                    isRequired
                    value={formatPhoneNumber(phoneValue)} // Display the formatted phone number
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{3}-\d{3}-\d{4}$/,
                        message: "Phone number must be in format XXX-XXX-XXXX",
                      },
                    })}
                    isInvalid={!!errors.phone}
                    onChange={handlePhoneNumberChange}
                    errorMessage={errors.phone?.message}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="success" type="submit">
                    Confirm
                  </Button>
                </ModalFooter>
              </form>
            )
          }
        </ModalContent>
      </Modal>
      {loanerTech && !loanerTech.length && (
        <Error title="Error Loading Loanertech Data" />
      )}
    </DefaultLayout>
  );
}
