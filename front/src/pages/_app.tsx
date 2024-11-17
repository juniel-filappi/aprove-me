import "./globals.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContextProvider } from "@/providers/ToastContextProvider";
import { AppProps } from "next/app";
import { ReactElement } from "react";


type AppPropsWithLayout = AppProps & {
    Component: ReactElement
}

export default function RootLayout({
   Component,
    pageProps
}: AppPropsWithLayout) {
    return (
        <ReactQueryProvider>
            <PrimeReactProvider>
                <ToastContextProvider>
                    <Component {...pageProps} />
                </ToastContextProvider>
            </PrimeReactProvider>
        </ReactQueryProvider>
    );
}