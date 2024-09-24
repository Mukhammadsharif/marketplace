import MainLayout from "@/layouts/MainLayout";
import Partners from "@/components/Partners";
import Stats from "@/components/Stats";
import Banner from "@/components/Banner";
import Information from "@/components/Information";
import Products from "@/components/Products";
import Categories from "@/components/Categories";
import {CarouselDefault} from "@/components/Carousel";
import {CATEGORIES, CONTACTS, DOMAIN, PRODUCERS, SOCIALS} from "@/helpers/urls";
import fetchRequest from "@/helpers/request";

export async function loader() {
    const producers = await fetchRequest(`${DOMAIN}${PRODUCERS}`);
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    const contacts = await fetchRequest(`${DOMAIN}${CONTACTS}`);
    const socials = await fetchRequest(`${DOMAIN}${SOCIALS}`);
    return { producers, categories, contacts, socials };
}


export default async function Home({ params: { lng } }) {
  const { producers, categories, contacts, socials } = await loader();

  return (
    <MainLayout categories={categories} contacts={contacts} socials={socials} lng={lng}>
      {/*<Banner />*/}
      <CarouselDefault />
      <Categories />
      <Products />
      <Information />
      <Stats />
      <Partners producers={producers} />
    </MainLayout>
  );
}


