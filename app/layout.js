import './globals.css'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${geist.className}`}
      >
        {children}
      </body>
    </html>
  );
}
