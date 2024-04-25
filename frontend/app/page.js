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

export default function Home() {
  return (
    <MainLayout>
      <Banner />
      <CarouselDefault />
      <Categories />
      <Products />
      <Information />
      <Stats />
      <Partners />
    </MainLayout>
  );
}


