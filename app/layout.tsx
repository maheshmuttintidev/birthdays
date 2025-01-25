import { WebsiteTrackerClient } from "components/website-tracker";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Birthday Wishes",
  description:
    "Birthday Wishes to My Friends, Collegues, Teachers, Lecturers, Neighbours, Best Friends, and Beloved Peoples",
  metadataBase: new URL("https://birthdays.maheshmuttintidev.in/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}
        <WebsiteTrackerClient />
      </body>
    </html>
  );
}
