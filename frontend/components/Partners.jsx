"use client";
import Image from "next/image";
import {Typography} from "@material-tailwind/react";
import {useTranslationClient} from "@/app/i18n/client";

export default function Partners({producers, lng}) {
    const { t } = useTranslationClient(lng);
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <Typography variant="h3" color="gray" textGradient className={'text-center'}>
                    {t('producers')}
                </Typography>

                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {producers?.length ? producers?.map((item, index) => (
                        <div className="flex flex-col items-center justify-center" key={index}>
                            <Image
                                key={index}
                                className="col-span-1 max-h-24 w-full object-contain lg:col-span-1"
                                src={item?.image}
                                alt={item?.name}
                                width={300}
                                height={100}
                            />

                            <Typography variant="h6" color="gray" textGradient>
                                {item?.name}
                            </Typography>
                        </div>
                    )): ''}
                </div>
            </div>
        </div>
    )
}
