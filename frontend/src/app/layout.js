import { vcrFont } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
