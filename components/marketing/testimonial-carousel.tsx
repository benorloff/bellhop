import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Logo } from "../logo"

export const TestimonialCarousel = () => {
    return (
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <div className="flex flex-col gap-8 justify-center items-center text-center p-8">
                            <Logo />
                            <div className="text-4xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-500/10"></div>
                                <div className="flex flex-col items-center justify-between">
                                    <span className="font-bold">John Doe</span>
                                    <span className="text-muted-foreground">CEO, Company</span>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="flex flex-col gap-8 justify-center items-center text-center p-8">
                            <Logo />
                            <div className="text-4xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-500/10"></div>
                                <div className="flex flex-col items-center justify-between">
                                    <span className="font-bold">John Doe</span>
                                    <span className="text-muted-foreground">CEO, Company</span>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="flex flex-col gap-8 justify-center items-center text-center p-8">
                            <Logo />
                            <div className="text-4xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-500/10"></div>
                                <div className="flex flex-col items-center justify-between">
                                    <span className="font-bold">John Doe</span>
                                    <span className="text-muted-foreground">CEO, Company</span>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    )
}