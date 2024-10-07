import Link from "next/link";
import fetchRequest from "@/helpers/request";
import { CATEGORIES, DOMAIN } from "@/helpers/urls";
import Image from "next/image";
import { useTranslation } from "@/app/i18n";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { categories };
}

export default async function Categories({ lng }) {
    const {categories} = await loader();
    const { t } = await useTranslation(lng)

    const getLocalName = (category) => {
        if (category && lng) {
            if (lng === 'ru' && category?.name_ru) {
                return category?.name_ru;
            } else if (lng === 'kr' && category?.name_kr) {
                return category?.name_kr;
            } else if (lng === 'uz' && category?.name_uz) {
                return category?.name_uz;
            } else {
                return category?.name;
            }
        }
    }

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900">{t('categories')}</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {categories?.length ? categories?.filter((item) => !item?.parent).map((category, index) => (
                            <Link href={category?.is_parent ? `/sub-category/${category?.id}` : `/category-detail/${category?.id}`} key={index} className="group relative">
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
                                {/*<h3 className="mt-6 text-sm text-gray-500">*/}
                                {/*    <span className="absolute inset-0"/>*/}
                                {/*    {category?.name}*/}
                                {/*</h3>*/}
                                <p className="text-base font-semibold text-gray-900 text-center mt-2">{getLocalName(category)}</p>
                            </Link>
                        )) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
