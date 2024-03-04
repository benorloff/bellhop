import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/config/site'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // My-Organization | Bellhop
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "logo.svg",
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap')
          </style>
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <ModalProvider />
            <Toaster 
                position="top-center"
                richColors={true}
                closeButton={true}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    
  )
}
