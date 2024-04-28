import Image from "next/image";
import { Fragment } from 'react'
import MainLayout from "@/layouts/MainLayout";
import Partners from "@/components/Partners";
import Stats from "@/components/Stats";
import Banner from "@/components/Banner";
import Information from "@/components/Information";
import Products from "@/components/Products";
import Categories from "@/components/Categories";
import {CarouselDefault} from "@/components/Carousel";
import {DOMAIN, PRODUCERS} from "@/helpers/urls";

async function getProducers() {
    const res = await fetch(`${DOMAIN}${PRODUCERS}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {
  const producers = await getProducers()
  return (
    <MainLayout>
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


