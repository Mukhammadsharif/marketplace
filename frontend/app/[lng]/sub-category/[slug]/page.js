import MainLayout from "@/layouts/MainLayout";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, CONTACTS, DOMAIN, SOCIALS} from "@/helpers/urls";
import Link from "next/link";
import Image from "next/image";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    const contacts = await fetchRequest(`${DOMAIN}${CONTACTS}`);
    const socials = await fetchRequest(`${DOMAIN}${SOCIALS}`);
    return { categories, contacts, socials };
}

export default async function CategoryDetailPage({ params: { lng, slug } }) {
    const {categories, socials, contacts} = await loader(slug);

    return (
        <MainLayout categories={categories} socials={socials} contacts={contacts} lng={lng}>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Категории</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {categories?.length ? categories?.filter((item) => item?.parent === parseInt(slug)).map((category, index) => (
                                <Link
                                    href={category?.is_parent ? `/sub-category/${category?.id}` : `/category-detail/${category?.id}`}
                                    key={index} className="group relative">
                                    <div
                                        className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 mt-5">
                                        <Image
                                            src={category?.image}
                                            alt={category?.name}
                                            className="h-full w-full object-cover object-center"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                    <p className="text-base font-semibold text-gray-900 text-center mt-2">{category?.name}</p>
                                </Link>
                            )) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}


