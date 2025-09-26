import './globals.css'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | ValTracker',
    default: 'ValTracker'
  }
}

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
