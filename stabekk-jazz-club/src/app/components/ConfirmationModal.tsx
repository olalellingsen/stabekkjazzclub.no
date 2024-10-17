import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-sky-950 p-6 rounded-md max-w-sm">
        <h3 className="text-xl mb-4">
          Er du sikker på at du vil slette denne konserten?
        </h3>
        <div className="flex justify-center">
          <button className="btn2 mr-4" onClick={onClose}>
            Avbryt
          </button>
          <button className="btn1" onClick={onConfirm}>
            Bekreft
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
