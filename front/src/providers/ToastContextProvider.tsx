'use client'

import { createContext, useContext, useRef } from "react";
import { Toast, ToastMessage } from "primereact/toast";

interface ToastContextProps {
    showToast: (options: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextProps|undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast>(null);

    const showToast = (options: ToastMessage) => {
        if (!toastRef.current) return;

        toastRef.current.show(options);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToastContext have to be used within ToastContextProvider"
        );
    }

    return context;
};