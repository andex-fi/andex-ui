import * as React from "react";
import {
  Id,
  toast,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from "react-toastify";

import Messages from "./Messages";

export const NotifyType = toast.TYPE;

export type { TypeOptions, ToastPosition };

export type NotifyOptions = ToastOptions & {
  dismiss?: boolean;
  update?: boolean;
};

const defaults: ToastOptions = {
  autoClose: 15000,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: true,
  pauseOnHover: true,
};

export function notify(
  messages: React.ReactNode | React.ReactNode[],
  title?: React.ReactNode,
  options?: NotifyOptions
): Id {
  const {
    update,
    dismiss = false,
    toastId = 1,
    ...restOptions
  } = { ...options };

  if (dismiss && toastId && toast.isActive(toastId)) {
    toast.dismiss(toastId);
    return toastId;
  }

  // const Icon = restOptions.type !== undefined && restOptions.type !== 'default' ? Icons[restOptions.type] : Icons.info

  const toastOptions: ToastOptions = {
    toastId,
    ...defaults,
    ...restOptions,
  };

  if (update && toastId && toast.isActive(toastId)) {
    toast.update(toastId, {
      render: <Messages messages={messages} title={title} />,
      toastId,
      ...toastOptions,
    });
    return toastId;
  }

  return toast(<Messages messages={messages} title={title} />, toastOptions);
}
