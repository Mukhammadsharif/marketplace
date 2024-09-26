"use client";
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const LanguageSwitcher = ({lng}) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    // Ensures that the component only runs on the client-side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, []);

    const handleLanguageChange = (newLang) => {
        if (!isClient || !pathname) return; // Prevent execution if not on the client or if pathname is undefined

        // Split the current path and replace the language segment
        const segments = pathname.split('/');

        // Ensure there's enough segments to replace the language
        if (segments.length > 1) {
            segments[1] = newLang; // Assuming language is in the second segment (like /kr/)
        }

        const newPath = segments.join('/');
        router.push(newPath); // Use router to navigate to the new path
    };

    if (!isClient || !pathname) {
        // Return nothing or a fallback UI until we are sure it's running client-side and pathname is available
        return null;
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {lng?.toUpperCase()}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </Menu.Button>
            </div>

            <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <Menu.Item>
                        <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" onClick={() => handleLanguageChange('uz')}>UZ</button>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => handleLanguageChange('kr')}>KR
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => handleLanguageChange('ru')}>RU
                        </button>
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default LanguageSwitcher;
