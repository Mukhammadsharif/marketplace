import Image from "next/image";
import Guarantee from '../app/assets/guarantee.png'
import Timing from '../app/assets/timing.png'
import Clients from '../app/assets/clients.png'
import Year from '../app/assets/year.png'

const people = [
    {
        name: '100%',
        role: 'Гарантия качества',
        imageUrl: Guarantee,
    },
    {
        name: '100%',
        role: 'Соблюдение сроков',
        imageUrl: Timing,
    },
    {
        name: 'более 54',
        role: 'Постоянных клиентов',
        imageUrl: Clients,
    },
    {
        name: '14 лет',
        role: 'Опыта',
        imageUrl: Year,
    },
]

export default function Information() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Наши преимущества</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Комплексные решения системы вентиляции и кондиционирования воздуха
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
