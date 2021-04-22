/* eslint-disable import/no-anonymous-default-export */
import { createContext } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext();

export default () => {
  // This handles the global user of the window dimension information

  const showToast = (type, message) => {
    switch (type) {
      case "info":
        toast.info("📝 " + message);
        break;
      case "success":
        toast.success("✔️ " + message);
        break;
      case "warning":
        toast.warning("⚠️ " + message);
        break;
      case "error":
        toast.error("🚨 " + message);
        break;
      default:
        toast.name("💡 " + message);
        break;
    }
  };

  return [
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={true}
      pauseOnHover={true}
    />,
    { showToast },
  ];
};
