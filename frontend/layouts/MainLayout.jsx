"use client";
import { useState } from 'react'
import MaterialFooter from "@/components/MaterialFooter";
import Header from "@/components/Header";
import Cart from "@/components/Cart";

export default function MainLayout({children, categories, contacts, socials, lng}) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Header open={open} setOpen={setOpen} categories={categories} contacts={contacts} lng={lng}/>

            <Cart open={open} setOpen={setOpen}/>

            {children}

            <MaterialFooter contacts={contacts} socials={socials}/>
        </div>
    );
}
