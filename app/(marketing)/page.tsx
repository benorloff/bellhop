import Image from "next/image";

import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { FeatureCarousel } from "@/components/marketing/feature-carousel";
import { WaitlistButton } from "@/components/marketing/waitlist-button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Section } from "@/components/marketing/section";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { FullScreenHeroSection } from "@/components/marketing/full-screen-hero-section";

const MarketingPage = () => {

    return (
        <>
            <FullScreenHeroSection>
                <Boxes />
                <div className="relative z-20 flex flex-row w-fit border rounded-full justify-center items-center pl-2 pr-4 py-2 mx-auto space-x-2 bg-background">
                    <Badge variant="secondary">Coming Soon</Badge>
                    <span className="text-sm">Lorem ipsum dolor sit amet.</span>
                </div>
                <div className="text-8xl relative z-20 ">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="text-muted-foreground relative z-20 ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                </div>
                <div className=" relative z-20 flex w-full flex-row justify-center items-center gap-4">
                    <Input
                        className="max-w-xs"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <WaitlistButton />
                </div>
            </FullScreenHeroSection>
            <Section>
                <SectionHeading
                    overline="Overline"
                    headline="Lorem ipsum dolor sit amet."
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-full text-left">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <FeatureCard 
                            key={i}
                            title="Lorem ipsum." 
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                            icon={
                                <Database 
                                    size={48} 
                                    className="group-hover:text-orange-500 transition-colors ease-in-out"
                                />
                            }
                        />
                    ))}
                </div>
            </Section>
            <Section>
                <div className="max-w-screen-xl mx-auto px-4 flex flex-row flex-wrap justify-center items-center text-center space-y-8">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 pr-6">
                        <SectionHeading
                            overline="Overline"
                            headline="Lorem ipsum dolor sit amet."
                            subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            align="left"
                        />
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
            </Section>
            <Section>
                <FeatureCarousel />
            </Section>
            <section className="m-auto py-16 h-full">
                <div className="max-w-screen-xl mx-auto bg-secondary p-20 rounded-lg">
                    <TestimonialCarousel />
                </div>
            </section>
        </>
    )
};

export default MarketingPage;