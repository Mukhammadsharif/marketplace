import MainLayout from "@/layouts/MainLayout";
import ProductDetail from "@/components/ProductDetail";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, CONTACTS, DOMAIN, PRODUCT_DETAIL, PRODUCTS, SOCIALS} from "@/helpers/urls";

export async function loader(slug) {
    const product = await fetchRequest(`${DOMAIN}${PRODUCT_DETAIL.replace('id', slug)}`);
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    const contacts = await fetchRequest(`${DOMAIN}${CONTACTS}`);
    const socials = await fetchRequest(`${DOMAIN}${SOCIALS}`);
    return { product, categories, contacts, socials };
}

export default async function ProductDetailPage({ params: {lng, slug} }) {
    const {product, categories, contacts, socials} = await loader(slug);

    return (
        <MainLayout categories={categories} contacts={contacts} socials={socials} lng={lng}>
            <ProductDetail product={product} />
        </MainLayout>
    );
}


