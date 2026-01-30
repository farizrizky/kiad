import type { Metadata } from "next";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';

export const metadata: Metadata = {
  title: "KIAD",
  description: "Aplikasi Administrasi Bengkulu Tengah",
};

const theme = {
  primaryColor: 'blue',
  defaultRadius: 'md',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider 
          theme={theme}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
