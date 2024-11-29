import { Modal, ModalBody, ModalContent, Input } from "@nextui-org/react";
import { Typography } from "@mui/material";
import { fetchLoanerTech } from "@/utils/loanertech/utils";
import {
  LoanerTechModalFooter,
  LoanerTechModalHeader,
} from "./modalComponents";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

interface CheckOutModalContentProps {
  isOpen: boolean;
  onOpenChange: () => void;
  loanerTechAvailable: boolean;
  selectedCards: number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
  setLoanerTech: Dispatch<
    SetStateAction<
      | false
      | {
          description: string;
          id: number;
          in_office: boolean;
          name?: string;
          phone?: string;
          email?: string;
        }[]
    >
  >;
}

interface CheckOutFormData {
  name: string;
  email: string;
  phone: string;
}

export default function CheckOutModalContent({
  isOpen,
  onOpenChange,
  loanerTechAvailable,
  selectedCards,
  setSelectedCards,
  setLoanerTech,
}: CheckOutModalContentProps) {
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CheckOutFormData>();

  // Watch the phone field value for auto-formatting
  const phoneValue = watch("phone", "");

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formatted = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join("-");
      return formatted.length > 12 ? formatted.slice(0, 12) : formatted;
    }
    return value.length > 12 ? value.slice(0, 12) : value;
  };

  // Update the field with the formatted value
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: formatted.length === 12 }); // Update and trigger validation
  };

  const onSubmit = async (data: CheckOutFormData) => {
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
        fetchLoanerTech(setLoanerTech, logout); // Refresh data
        setSelectedCards([]);
      }
    } catch (error) {
      console.error("Checkout operation failed:", error);
    }
    reset();
    setValue("phone", "", { shouldValidate: false });
    onOpenChange(); // Close modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoanerTechModalHeader
              title="Check Out"
              selectedCards={selectedCards}
            />
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
            <LoanerTechModalFooter onClose={onClose} />
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
