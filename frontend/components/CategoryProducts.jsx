import Link from "next/link";
import fetchRequest from "@/helpers/request";
import {DOMAIN, PRODUCTS} from "@/helpers/urls";
import Image from "next/image";
import {useTranslation} from "@/app/i18n";

export async function loader() {
    const products = await fetchRequest(`${DOMAIN}${PRODUCTS}`);
    return { products };
}

export default async function CategoryProducts({categoryId, lng}) {
    const {products} = await loader();
    const { t } = await useTranslation(lng)

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
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('products')}</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products?.length ? products.filter((item) => item?.category?.id === parseInt(categoryId)).map((product, index) => (
                        <Link className="group relative" href={`/product-detail/${product?.id}`} key={index}>
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image
                                    src={product?.photo}
                                    alt={product?.name}
                                    className="h-full w-full object-contain lg:h-full lg:w-full"
                                    width={200}
                                    height={250}
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        {getLocalName(product)}
                                    </h3>
                                    {/*<p className="mt-1 text-sm text-gray-500">{product?.views}</p>*/}
                                </div>
                                {/*<p className="text-sm font-medium text-gray-900">{product?.price}</p>*/}
                            </div>
                        </Link>
                    )) : ''}
                </div>
            </div>
        </div>
    )
}
