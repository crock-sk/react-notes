import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export default function Modal({ setIsModalOpen, children }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [setIsModalOpen]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
