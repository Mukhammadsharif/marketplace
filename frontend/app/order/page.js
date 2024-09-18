import MainLayout from "@/layouts/MainLayout";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, DOMAIN} from "@/helpers/urls";
import Order from "@/components/Order";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { categories };
}

export default async function ProductDetailPage() {
    const {categories} = await loader();

    return (
        <MainLayout categories={categories}>
            <Order />
        </MainLayout>
    );
}


