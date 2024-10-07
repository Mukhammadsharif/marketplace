import {Fragment, useState} from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {Bars3Icon, XMarkIcon,} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import Image from "next/image";
import {IconButton, Badge} from "@material-tailwind/react";
import Logo from '../app/assets/logo-01.svg'
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {useProducts} from "@/components/Context";
import {useTranslationClient} from "@/app/i18n/client";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({open, setOpen, categories, contacts, lng}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { productsLength } = useProducts();
    const { t } = useTranslationClient(lng);

    const callsToAction = [
        { name: t('call'), href: '#', icon: PhoneIcon },
    ]

    const getLocalName = (product) => {
        if (product && lng) {
            if (lng === 'ru' && product?.name_ru) {
                return product?.name_ru;
            } else if (lng === 'kr' && product?.name_kr) {
                return product?.name_kr;
            } else if (lng === 'uz' && product?.name_uz) {
                return product?.name_uz;
            } else {
                return product?.name;
            }
        }
    }

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Havo Group</span>
                        <Image
                            src={Logo}
                            alt="footer_logo"
                            className="w-[18rem]"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <Popover.Button
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            {t('categories')}
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {categories?.length ? categories.filter((item) => !item?.parent)?.slice(0, 5)?.map((category, index) => (
                                        <div
                                            key={index}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div
                                                className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <Image
                                                    src={category?.image}
                                                    alt={category?.name}
                                                    className="h-full w-full object-cover object-center"
                                                    width={300}
                                                    height={300}
                                                />
                                            </div>
                                            <div className="flex-auto">
                                                <Link href={`/category-detail/${category?.id}`} className="block font-semibold text-gray-900">
                                                    {getLocalName(category)}
                                                    <span className="absolute inset-0"/>
                                                </Link>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                                <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={`tel:${contacts?.find((item) => item?.name === 'phone' && item.status)?.contact}`}
                                            className="flex items-center justify-center gap-x-2.5 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                        >
                                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                                            {item.name}: {contacts?.find((item) => item?.name === 'phone' && item.status)?.contact}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('about_us')}
                    </Link>
                    <Link href="/policy" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('politics_confidence')}
                    </Link>
                    <Link href="/conditions" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('use_conditions')}
                    </Link>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div className="text-sm font-semibold text-gray-900 mr-5"
                         onClick={() => setOpen(!open)}>
                        <IconButton color="black" size={'lg'}>
                            <i className="fas fa-cart-plus"></i>
                        </IconButton>
                        {productsLength ? <Badge content={productsLength} size="sm" style={{ marginTop: -20 }} /> : ''}
                    </div>

                    <LanguageSwitcher lng={lng}/>
                </div>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Havo group</span>
                            <Image
                                src={Logo}
                                alt="footer_logo"
                                className="w-[18rem]"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Закрыть</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                {t('categories')}
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {categories?.length ? categories.filter((item) => !item?.parent)?.slice(0, 5)?.map((category, index) => (
                                                        <Disclosure.Button
                                                            key={index}
                                                            as="a"
                                                            href={`/category-detail/${category?.id}`}
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {getLocalName(category)}
                                                        </Disclosure.Button>
                                                )) : ''}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Link
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {t('about_us')}
                                </Link>
                                <Link
                                    href="/policy"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {t('politics_confidence')}
                                </Link>
                                <Link
                                    href="/conditions"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {t('use_conditions')}
                                </Link>
                            </div>
                            <div className="py-6 flex items-center justify-between">
                                <div className="text-sm font-semibold leading-6 text-gray-900"
                                     onClick={() => setOpen(!open)}>
                                    <IconButton color="black" size={'lg'}>
                                        <i className="fas fa-cart-plus"></i>
                                    </IconButton>
                                    {productsLength ? <Badge content={productsLength} size="sm" style={{ marginTop: -20 }} /> : ''}
                                </div>

                                <LanguageSwitcher lng={lng}/>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
