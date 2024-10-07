import Image from "next/image";
import Guarantee from '../app/assets/guarantee.png'
import Timing from '../app/assets/timing.png'
import Clients from '../app/assets/clients.png'
import Year from '../app/assets/year.png'
import {useTranslation} from "@/app/i18n";

export default async function Information({ lng }) {
    const { t } = await useTranslation(lng)

    const people = [
        {
            name: '100%',
            role: t('guarantee'),
            imageUrl: Guarantee,
        },
        {
            name: '100%',
            role: t('timing'),
            imageUrl: Timing,
        },
        {
            name: t('clients_description'),
            role: t('clients'),
            imageUrl: Clients,
        },
        {
            name: t('year_description'),
            role: t('year'),
            imageUrl: Year,
        },
    ]

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('our_advantages')}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {t('complex_solution')}
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <Image width={100} height={100} className="h-30 w-30 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
