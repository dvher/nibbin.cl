import '../styles/globals.css';

export const Metadata = {
    title: 'Nibbin',
    description: 'Nibbin es una tienda de mascotas online.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <html lang="es">
        <body>{children}</body>
    </html>
    )
}