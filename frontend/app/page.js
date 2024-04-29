import MainLayout from "@/layouts/MainLayout";
import Partners from "@/components/Partners";
import Stats from "@/components/Stats";
import Banner from "@/components/Banner";
import Information from "@/components/Information";
import Products from "@/components/Products";
import Categories from "@/components/Categories";
import {CarouselDefault} from "@/components/Carousel";
import {CATEGORIES, DOMAIN, PRODUCERS} from "@/helpers/urls";
import fetchRequest from "@/helpers/request";

export async function loader() {
    const producers = await fetchRequest(`${DOMAIN}${PRODUCERS}`);
    const categories = await fetchRequest(`${DOMAIN}${CATEGORIES}`);
    return { producers, categories };
}


export default async function Home() {
  const { producers, categories } = await loader();
  return (
    <MainLayout categories={categories}>
      <Banner />
      <CarouselDefault />
      <Categories />
      <Products />
      <Information />
      <Stats />
      <Partners producers={producers} />
    </MainLayout>
  );
}


