import { randomUUID } from "crypto";
import { toast } from "react-toastify";

export const notifySuccess = (msg: string, id?: string | number) => {
    toast(msg, {
        toastId: id || crypto.randomUUID(),
        type: 'success',
    });
}
export const notifyError = (msg: string) => {
    toast(msg, {
        // toastId: useId(),
        type: 'error',
    });
}
export const notifyInfo = (msg: string) => {
    toast(msg, {
        // toastId: useId(),
        type: 'info',
    });
}
export const notifyWarning = (msg: string) => {
    toast(msg, {
        // toastId: useId(),
        type: 'warning',
    });
}