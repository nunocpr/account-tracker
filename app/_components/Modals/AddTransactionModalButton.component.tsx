"use client";
import { ReactNode, useState } from "react";
import PrimaryButton from "../Common/PrimaryButton.component";
import Modal from "./ModalWrapper.component";
import AddTransaction from "../Form/AddTransaction.component";

interface ModalButtonProps {
    children: ReactNode | ReactNode[];
    buttonText?: string;
    mainCategories: any;
}

export default function AddTransactionModalButton({
    children,
    buttonText,
    mainCategories,
}: ModalButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <PrimaryButton onClick={openModal} buttonText={buttonText}>
                {children}
            </PrimaryButton>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddTransaction
                    mainCategories={mainCategories}
                    onClose={closeModal}
                />
            </Modal>
        </>
    );
}
