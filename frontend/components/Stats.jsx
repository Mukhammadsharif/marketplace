const stats = [
    { id: 1, name: '100%', value: 'Сертифицированный персонал' },
    { id: 2, name: 'Качественное выполнение всех работ', value: 'Профессиональный опыт с 2012 года' },
    { id: 3, name: '100%', value: 'Гарантия на все виды оказываемых услуг' },
]

export default function Stats() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-base font-semibold tracking-tight text-gray-900 sm:text-3xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
