import type { AppProps } from 'next/app'
import Script from 'next/script'

const API_KEY= process.env.NEXT_PUBLIC_REWARDFUL_DEMO_API_KEY
const SCRIPT_URL = process.env.NEXT_PUBLIC_APP_REWARDFUL_SCRIPT_URL

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <Script src={SCRIPT_URL} data-rewardful={API_KEY}></Script>
        <Script id="rewardful-queue" strategy="beforeInteractive">
          {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
      </>
  )}
