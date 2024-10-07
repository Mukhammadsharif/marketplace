import MainLayout from "@/layouts/MainLayout";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, CONTACTS, DOMAIN, PRODUCT_DETAIL, SOCIALS} from "@/helpers/urls";
import CategoryProducts from "@/components/CategoryProducts";
import {useTranslation} from "@/app/i18n";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    const contacts = await fetchRequest(`${DOMAIN}${CONTACTS}`);
    const socials = await fetchRequest(`${DOMAIN}${SOCIALS}`);
    return { categories, contacts, socials };
}

export default async function CategoryDetailPage({params: { lng, slug }}) {
    const { categories, contacts, socials } = await loader(slug);
    return (
        <MainLayout categories={categories} contacts={contacts} socials={socials} lng={lng}>
            <CategoryProducts categoryId={slug} lng={lng} />
        </MainLayout>
    );
}


