import React from 'react';
import Image from "next/image";

function Footer() {
    const iconsTab = [];
    return (
        <>
            <footer className="bg-white">
                <div className="container mx-auto  py-[10rem]">
                    {/* footer div all */}
                    <div className="flex justify-between flex-col md:flex-row  items-center md:items-start  md:gap-[5rem] text-left">
                        {/* logo side */}
                        <div className="flex flex-col w-1/2 md:p-0 py-4 gap-8">
                            <Image
                                width={200}
                                height={200}
                                src={require('../public/logo-havo.png')}
                                alt="footer_logo"
                                className="w-[18rem]"
                            />
                            <p className="text-[15px] font-medium text-[#646464]">
                                Take your health and body to the next level with our
                                comprehensive program designed to help you reach your fitness
                                goals.
                            </p>
                            {/* socials */}
                            <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start">
                                {iconsTab.map(({ icon }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#000000] hover:text-white"
                                            style={{ transition: "all 0.3s" }}
                                        >
                                            {icon}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-[16px] font-medium text-[#646464]">
                                Privacy Policy | © {new Date().getFullYear()} Gymate <br />{" "}
                                Design by{" "}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.radiustheme.com/"
                                >
                                    RadiusTheme
                                </a>
                            </p>
                        </div>

                        {/* middle div */}
                        <div className="flex flex-col gap-8 relative">
                            <p className="text-[22px] font-bold footer-main">Our Classes</p>

                            <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#000000]"></span>

                            <p className="text-[16px] hover:text-[#000000] cursor-pointer text-[#000000] font-medium hover:font-bold">
                                Fitness Classes
                            </p>
                            <p className="text-[16px] hover:text-[#000000] cursor-pointer text-[#000000] font-medium hover:font-bold">
                                Aerobics Classes
                            </p>
                            <p className="text-[16px] hover:text-[#000000] cursor-pointer text-[#000000] font-medium hover:font-bold">
                                Power Yoga
                            </p>
                            <p className="text-[16px] hover:text-[#000000] cursor-pointer text-[#000000] font-medium hover:font-bold">
                                Learn Machines
                            </p>
                            <p className="text-[16px] hover:text-[#000000] cursor-pointer text-[#000000] font-medium hover:font-bold">
                                Full-body Strength
                            </p>
                        </div>

                        {/* right div */}
                        <div className="flex flex-col gap-8 relative">
                            <p className="text-[22px] font-bold footer-main">Working Hours</p>

                            <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#000000]"></span>

                            <p className="text-[16px]  text-[#000000] font-bold">
                                Monday - Friday:
                            </p>
                            <p className="text-[16px] text-[#000000] font-medium">
                                7:00am - 21:00pm
                            </p>
                            <p className="text-[16px] text-[#000000] font-bold">Saturday:</p>
                            <p className="text-[16px] text-[#000000] font-medium">
                                7:00am - 19:00pm
                            </p>
                            <p className="text-[16px] text-[#000000] font-bold ">
                                Sunday - Closed
                            </p>
                        </div>

                        {/* middle div */}
                        <span></span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
