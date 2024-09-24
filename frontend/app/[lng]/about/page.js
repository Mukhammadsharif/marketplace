import MainLayout from "@/layouts/MainLayout";
import fetchRequest from "@/helpers/request";
import {CATEGORIES, CONTACTS, DOMAIN, SOCIALS} from "@/helpers/urls";
import About from "@/components/About";

export async function loader() {
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    const contacts = await fetchRequest(`${DOMAIN}${CONTACTS}`);
    const socials = await fetchRequest(`${DOMAIN}${SOCIALS}`);
    return { categories, contacts, socials };
}

export default async function AboutPage({params: {lng}}) {
    const {categories, contacts, socials} = await loader();

    return (
        <MainLayout categories={categories} contacts={contacts} socials={socials}>
            <About lng={lng}/>
        </MainLayout>
    );
}


