import { toast, Bounce } from 'react-toastify';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "toast-custom",
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "toast-custom",
  });
};

export const showWarnToast = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "toast-custom",
  });
};

export const showLoadingToast = (message) => {
  const id = toast.info(message, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    className: "toast-custom",
  });
  return id;
};

