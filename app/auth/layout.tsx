import React from 'react'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex items-center w-full h-svh bg-black/80">
            {children}
        </div>

    );
}
