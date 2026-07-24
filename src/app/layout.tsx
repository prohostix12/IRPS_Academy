import type { Metadata } from 'next';
import { DataProvider } from '../context/DataContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Excellence University - Admissions Portal',
  description: 'Maroon and white university admissions portal for exploring campus, degree programs, tuition & aid, and submitting online applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
