import MainLayout from "@/layouts/MainLayout";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, DOMAIN, PRODUCT_DETAIL} from "@/helpers/urls";
import CategoryProducts from "@/components/CategoryProducts";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { categories };
}

export default async function CategoryDetailPage({params}) {
    const { slug } = params;
    const {categories} = await loader(slug);
    return (
        <MainLayout categories={categories}>
            <CategoryProducts categoryId={slug}/>
        </MainLayout>
    );
}


