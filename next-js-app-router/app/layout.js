import Script from 'next/script'

// Use your Rewardful API Key
const API_KEY= process.env.NEXT_PUBLIC_REWARDFUL_DEMO_API_KEY

// If not setting NEXT_PUBLIC_APP_REWARDFUL_SCRIPT_URL, just use https://r.wdfl.co/rw.js
const SCRIPT_URL = process.env.NEXT_PUBLIC_APP_REWARDFUL_SCRIPT_URL || 'https://r.wdfl.co/rw.js'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src={SCRIPT_URL} data-rewardful={API_KEY}></Script>
        <Script id="rewardful-queue" strategy="beforeInteractive">
            {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
      </body>
    </html>
  )
}
