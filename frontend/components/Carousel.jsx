"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

export function CarouselDefault({ products }) {
    return (
        <Carousel className="rounded-xl bg-gray-300" style={{height: 500}}>
            {products?.slice(0, 10).map((product, index) => (
                <Image
                    src={product?.photo}
                    alt={'product'}
                    key={index}
                    width={100}
                    height={100}
                    className="h-full w-full object-contain"
                />
            ))}
        </Carousel>
    );
}
