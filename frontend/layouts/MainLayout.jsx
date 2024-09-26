"use client";
import { useState } from 'react'
import MaterialFooter from "@/components/MaterialFooter";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import {ContextProvider} from "@/components/Context";

export default function MainLayout({children, categories, contacts, socials, lng}) {
    const [open, setOpen] = useState(false)
    return (
        <ContextProvider>
            <div>
                <Header open={open} setOpen={setOpen} categories={categories} contacts={contacts} lng={lng}/>

                <Cart open={open} setOpen={setOpen}/>

                {children}

                <MaterialFooter contacts={contacts} socials={socials}/>
            </div>
        </ContextProvider>
    );
}
