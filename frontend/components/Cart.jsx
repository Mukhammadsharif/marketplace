"use client";
import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import {useProducts} from "@/components/Context";

export default function Cart({ open, setOpen}) {
    const [products, setProducts] = useState([])
    const [sum, setSum] = useState(0)
    const [toggle, setToggle] = useState(false)
    const { productToggle, setProductToggle } = useProducts();

    function getProductsFromLocalStorage() {
        if (typeof window !== 'undefined') {
            // Get the product data from localStorage
            const storedProducts = localStorage.getItem('products');

            // If products exist, parse them into a JavaScript array
            if (storedProducts) {
                let checkout = 0
                let withQuantity = []
                JSON.parse(storedProducts).forEach((item) => {
                    if (item?.model) {
                        checkout = checkout + parseInt(item?.model?.price) * (parseInt(item?.product?.quantity) > 1 ? parseInt(item?.product?.quantity) : 1)
                    }
                    withQuantity.push({...item, product: {...item?.product, quantity: item?.product.quantity ?? 1}})
                })
                setSum(checkout)

                return withQuantity;
            }
        }
        // Return an empty array if no products found or if it's running on the server
        return [];
    }

    useEffect(() => {
        setProducts(getProductsFromLocalStorage());
    }, [open, toggle])

    function removeProductFromLocalStorage(productIndex) {
        if (typeof window !== 'undefined') {
            // Get the existing products from localStorage
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                let products = JSON.parse(storedProducts);

                // Filter out the product to be removed
                products = products.filter((product, index) => index !== productIndex);

                // Save the updated products array back to localStorage
                localStorage.setItem('products', JSON.stringify(products));

                setProducts(getProductsFromLocalStorage());

                setProductToggle(!productToggle);
            }
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Корзина</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {products.map((product, index) => (
                                                            <li key={index} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product?.product?.photo}
                                                                        alt={product?.product?.name}
                                                                        className="h-full w-full object-contain"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <Link href={`/product-detail/${product?.product?.id}`}>{product?.product?.name}</Link>
                                                                            </h3>
                                                                            <p className="ml-4">{product?.model?.price}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{product?.model?.name}</p>
                                                                    </div>
                                                                    <div
                                                                        className="flex flex-1 items-end justify-between text-sm mt-2">
                                                                        <input
                                                                            value={product?.product?.quantity}
                                                                            onChange={(e) => {
                                                                                let withQuantity = []
                                                                                products?.forEach((item) => {
                                                                                    if (item?.product?.id !== product?.product?.id) {
                                                                                        withQuantity.push({...item})
                                                                                    } else  {
                                                                                        withQuantity.push({...item, product: {...item?.product, quantity: e.target.value}})
                                                                                    }
                                                                                })
                                                                                setProducts(withQuantity)
                                                                                localStorage.setItem('products', JSON.stringify(withQuantity));
                                                                                setToggle(!toggle)
                                                                            }}
                                                                            style={{width: 70}}
                                                                            min={1}
                                                                            type="number"
                                                                            name="last-name"
                                                                            id="last-name"
                                                                            autoComplete="family-name"
                                                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />

                                                                        <div className="flex">
                                                                            <button
                                                                                onClick={() => removeProductFromLocalStorage(index)}
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Удалить
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Итого</p>
                                                <p>{sum}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Подтвердите заказ</p>
                                            <div className="mt-6">
                                                <Link
                                                    href={'/order'}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Заказать
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    или{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Продолжить покупку
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
