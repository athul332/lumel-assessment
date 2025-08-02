import React, { useEffect } from "react";
import styles from "./Toaster.module.scss";

interface ToasterProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return <div className={styles.toaster}>{message}</div>;
};

export default Toaster;
