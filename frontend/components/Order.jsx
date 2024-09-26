'use client';

import {useState} from "react";
import InputMask from 'react-input-mask';
import {DOMAIN} from "@/helpers/urls";
import {NextResponse} from "next/server";
import Modal from "@/components/Modal";
import {useRouter} from "next/navigation";

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// Making POST request
// const csrfToken = getCookie('csrftoken');  // Get CSRF token from cookie


export default function Order() {
    const [modal, setModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const router = useRouter();

    async function POST(event, body) {
        event.preventDefault();
        const {checkout, text} = await  getProductsFromLocalStorage()

        if (!body.name || !body.lastname || !body.phone) {
            setModalText('Пожалуйста, заполните все поля')
            setModal(true)
        } else if (!text || checkout < 1) {
            setModalText('Пожалуйста, убедитесь что ваша корзина не пусто')
            setModal(true)
        } else {
            const res = await fetch(`${DOMAIN}/api/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({...body, sum: checkout, order_text: text}),
                credentials: 'include',
            })

            const data = await res.json()

            return NextResponse.json(data)
        }
    }

    function getProductsFromLocalStorage() {
        if (typeof window !== 'undefined') {
            // Get the product data from localStorage
            const storedProducts = localStorage.getItem('products');

            // If products exist, parse them into a JavaScript array
            if (storedProducts) {
                console.log(storedProducts)
                let checkout = 0
                let text = '';
                JSON.parse(storedProducts).forEach((item, index) => {
                    if (item?.model) {
                        checkout = checkout + parseInt(item?.model?.price) * (parseInt(item?.product?.quantity) > 1 ? parseInt(item?.product?.quantity) : 1)
                        text = text + `\n\n${++index}. Название: ${item?.product?.name}; \n Модель: ${item?.model?.name}; \n Количество: ${item?.product?.quantity}; \n Цена: ${item?.model?.price};`
                    }
                })

                return {checkout, text};
            }
        }
        // Return an empty array if no products found or if it's running on the server
        return {};
    }

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, // Spread the previous formData
            [name]: value, // Dynamically update the name field
        });
    };

    const handleClick = async (event) => {
        event.preventDefault(); // Prevent default action if needed

        // First, get products from local storage
        const products = await getProductsFromLocalStorage(); // Assuming this is synchronous. If not, await it.

        // Then, make the POST request
        const response = await POST(event, formData);

        if (response && response.ok) {
            setModalText('Ваш заказ успешно создан');
            setModal(true);
            localStorage.setItem('products', '');

            // Redirect after 2 seconds
            setTimeout(() => router.push('/'), 3000);
        }
    };

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-12 lg:px-8">
            {modal ? <Modal modal={modal} setModal={setModal} text={modalText} /> : ''}
            <div
                className="absolute inset-x-0 top-[10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[5rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Оформить заказ</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Пожалуйста, заполните поля чтобы оформить свой заказ
                </p>
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Имя
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-semibold leading-6 text-gray-900">
                            Фамилия
                        </label>
                        <div className="mt-2.5">
                            <input
                                required
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email (если есть)
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                            Номер телефона
                        </label>
                        <div className="mt-2.5">
                            <InputMask
                                mask="+998 (99) 999-99-99"
                                value={formData.phone}
                                onChange={handleChange}
                            >
                                {() => (
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        autoComplete="tel"
                                        placeholder="+998 (__) ___-__-__"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                )}
                            </InputMask>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="comment" className="block text-sm font-semibold leading-6 text-gray-900">
                            Комментарии
                        </label>
                        <div className="mt-2.5">
                          <textarea
                              name="comment"
                              id="comment"
                              value={formData.comment}
                              onChange={handleChange}
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={''}
                          />
                        </div>
                    </div>
                    {/*<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">*/}
                    {/*    <div className="flex h-6 items-center">*/}
                    {/*        <Switch*/}
                    {/*            checked={agreed}*/}
                    {/*            onChange={setAgreed}*/}
                    {/*            className={classNames(*/}
                    {/*                agreed ? 'bg-indigo-600' : 'bg-gray-200',*/}
                    {/*                'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'*/}
                    {/*            )}*/}
                    {/*        >*/}
                    {/*            <span className="sr-only">Agree to policies</span>*/}
                    {/*            <span*/}
                    {/*                aria-hidden="true"*/}
                    {/*                className={classNames(*/}
                    {/*                    agreed ? 'translate-x-3.5' : 'translate-x-0',*/}
                    {/*                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'*/}
                    {/*                )}*/}
                    {/*            />*/}
                    {/*        </Switch>*/}
                    {/*    </div>*/}
                    {/*    <Switch.Label className="text-sm leading-6 text-gray-600">*/}
                    {/*        By selecting this, you agree to our{' '}*/}
                    {/*        <a href="#" className="font-semibold text-indigo-600">*/}
                    {/*            privacy&nbsp;policy*/}
                    {/*        </a>*/}
                    {/*        .*/}
                    {/*    </Switch.Label>*/}
                    {/*</Switch.Group>*/}
                </div>
                <div className="mt-10">
                    <button
                        onClick={(event) => {
                            handleClick(event)
                        }}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Оформить
                    </button>
                </div>
            </form>
        </div>
    )
}
