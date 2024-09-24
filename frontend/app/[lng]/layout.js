// import { Inter } from "next/font/google";
import "./globals.css";
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Havo Air",
  description: "Havo Air Group",
};

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
    <head>
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
      <title>Havo Air</title>
    </head>
    <body>
        {children}
    </body>
    </html>
  );
}
