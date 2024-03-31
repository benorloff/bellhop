import { Button } from "@/components/ui/button";
import { Database, Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { FeatureCarousel } from "@/components/marketing/feature-carousel";
import { Section } from "@/components/marketing/section";
import { Overline } from "@/components/marketing/overline";

const MarketingPage = () => {
    return (
        <>
            <Section>
                <div className="w-full space-y-6 max-w-3xl text-center">
                    <div className="flex flex-row w-fit border rounded-full justify-center items-center pl-2 pr-4 py-2 mx-auto space-x-2">
                        <Badge variant="secondary">Coming Soon</Badge>
                        <span className="text-sm">Lorem ipsum dolor sit amet.</span>
                    </div>
                    <div className="text-8xl">
                        Lorem ipsum dolor sit amet.
                    </div>
                    <div className="text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                    </div>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <Input
                            className="max-w-xs"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Button>Join the Waitlist</Button>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="max-w-3xl space-y-4">
                    <Overline title="Pre-heading" />
                    <div className="text-6xl">
                        Lorem ipsum dolor sit amet.
                    </div>
                    <div className="text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-full text-left">
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-8">
                        <Database size={48} />
                        <div className="text-3xl">
                            Lorem ipsum.
                        </div>
                        <div className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                        </div>
                    </div>
                </div>
            </Section>
            <div className="flex flex-row flex-wrap py-32 justify-center items-center text-center space-y-8">
                <div className="flex flex-col gap-4 w-full lg:w-1/2 text-left pr-6">
                    <Overline title="Pre-heading" />
                    <div className="text-6xl">
                        Lorem ipsum dolor sit amet.
                    </div>
                    <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Donec ac odio tempor orci dapibus ultrices in iaculis nunc.
                    </div>
                </div>
                <div className="w-full min-h-max lg:w-1/2 pl-6">
                    <Image
                        src="/placeholder-browser.svg"
                        width={800}
                        height={600}
                        alt="Placeholder"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-8 py-32 justify-center items-center">
                Lorem ipsum.
            </div>
            <div className="w-full py-32">
                <FeatureCarousel />
            </div>
            <div className="w-full bg-secondary p-20 rounded-lg">
                <TestimonialCarousel />
            </div>
        </>
    )
};

export default MarketingPage;