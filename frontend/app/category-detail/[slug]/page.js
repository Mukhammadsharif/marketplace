import MainLayout from "@/layouts/MainLayout";
import Products from "@/components/Products";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, DOMAIN, PRODUCT_DETAIL} from "@/helpers/urls";

export async function loader(slug) {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { categories };
}

export default async function Home() {
    const {categories} = await loader();
    return (
        <MainLayout categories={categories}>
            <Products />
        </MainLayout>
    );
}


