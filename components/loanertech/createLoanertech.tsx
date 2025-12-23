import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { CreateLoanerTechFormData } from "@/types/loanertech";
import { useAlert } from "@/context/AlertContext";

interface CreateLoanerTechModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export function CreateLoanerTechModal({ isOpen, onOpenChange }: CreateLoanerTechModalProps) {

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<CreateLoanerTechFormData>();

    const { newAlert } = useAlert();

    const onSubmit = async (data: CreateLoanerTechFormData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/loanertech/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                const id = data.data.id;
                newAlert("Loanertech item created with ID: " + id, "success");
            } else {
                newAlert("Failed to create loanertech item", "danger");
            }
        } catch (error) {
            console.error(error);
            newAlert("Failed to create loanertech item", "danger");
        }
        reset();
        clearErrors();
        onOpenChange();
    }


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="lg"
            backdrop="blur"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>
                            <h1>Create Loaner Tech</h1>
                        </ModalHeader>
                        <ModalBody>
                            <p>Create a new loaner tech item</p>
                            <Input
                                label="Description/Name of Item"
                                variant="bordered"
                                isRequired
                                {...register("description", { required: "Description is required" })}
                                errorMessage={errors.description?.message}
                                isInvalid={!!errors.description}
                            />
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="success" type="submit">
                                    Create
                                </Button>
                            </ModalFooter>

                        </ModalBody>
                    </form>
                )}
            </ModalContent>
        </Modal >
    );
}
