import MainLayout from "@/layouts/MainLayout";
import ProductDetail from "@/components/ProductDetail";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, DOMAIN, PRODUCT_DETAIL, PRODUCTS} from "@/helpers/urls";

export async function loader(slug) {
    const product = await fetchRequest(`${DOMAIN}${PRODUCT_DETAIL.replace('id', slug)}`);
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { product, categories };
}

export default async function ProductDetailPage({params}) {
    const { slug } = params;
    const {product, categories} = await loader(slug);

    return (
        <MainLayout categories={categories}>
            <ProductDetail product={product} />
        </MainLayout>
    );
}


