import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {HeroUIProvider, ToastProvider} from '@heroui/react'
export default function App({ Component, pageProps }: AppProps) {
   return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <Component {...pageProps} />
    </HeroUIProvider>
  )
}
