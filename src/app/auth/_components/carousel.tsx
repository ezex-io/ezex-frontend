"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import carouselImg1 from "@images/auth/carousel-1.avif";
import carouselImg2 from "@images/auth/carousel-2.avif";
import carouselImg3 from "@images/auth/carousel-3.avif";
import { ArrowRight } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Pagination from "./pagination";

const LayoutCarousel: FC = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="relative hidden w-full lg:flex">
            <Carousel
                setApi={setApi}
                className="max-h-[53rem] w-full max-w-[43.75rem]"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    <CarouselItem key={0} className="max-h-[53rem]">
                        <div className="w-full">
                            <Image
                                src={carouselImg1}
                                alt=""
                                width={713}
                                height={855}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                    <CarouselItem key={1} className="max-h-[53rem]">
                        <div>
                            <Image
                                src={carouselImg2}
                                alt=""
                                width={713}
                                height={855}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                    <CarouselItem key={2} className="max-h-[53rem]">
                        <div>
                            <Image
                                src={carouselImg3}
                                alt=""
                                width={713}
                                height={855}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>

            <Button className="border-primary-950 absolute top-7 right-7 bg-black text-white hover:bg-black/90">
                Back to website
                <ArrowRight />
            </Button>

            <Pagination
                id="auth"
                count={count}
                current={current}
                className="absolute bottom-16 left-1/2 -translate-x-1/2"
            />
        </div>
    );
};

export default LayoutCarousel;
