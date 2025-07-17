import './globals.css'

export const metadata = {
  title: 'CGPA Calculator | B.E Cyber Security',
  description: 'Anna University R2023 - CGPA Calculator by Gokul Amaran',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
