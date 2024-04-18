import Image from "next/image";

import { FullScreenHeroSection } from "@/components/marketing/full-screen-hero-section";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { FeatureCarousel } from "@/components/marketing/feature-carousel";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Section } from "@/components/marketing/section";
import { Boxes } from "@/components/ui/background-boxes";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Globe2, Infinity, ScanEye, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FeatureAccordion } from "@/components/marketing/feature-accordion";

const MarketingPage = () => {

    return (
        <>
        {/* the rest of your code */}
            <FullScreenHeroSection>
                {/* <Boxes /> */}
                <div className="relative z-5 flex flex-row w-fit border rounded-full justify-center items-center pl-2 pr-4 py-2 mx-auto space-x-2 bg-background">
                    <Badge variant="secondary">Coming Soon</Badge>
                    <span className="text-sm">Lorem ipsum dolor sit amet.</span>
                </div>
                <h1 className="text-8xl relative z-5 ">
                    You deserve a
                    <span className="font-bold text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text ">
                        {` better `}
                    </span>
                    WordPress experience.
                </h1>
                <div className="text-muted-foreground relative z-5 ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl purus in mollis nunc.
                </div>
                    <WaitlistForm />
            </FullScreenHeroSection>
            <Section>
                <SectionHeading
                    overline="Overline"
                    headline="Lorem ipsum dolor sit amet."
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full text-left">
                    <FeatureCard 
                        title="Unlimited updates." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <Infinity 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                    <FeatureCard 
                        title="Global availability." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <Globe2 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                    <FeatureCard 
                        title="Proactive monitoring." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <ScanEye 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                    <FeatureCard 
                        title="AI enabled." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <Brain 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                    <FeatureCard 
                        title="Blazing fast." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <Zap 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                    <FeatureCard 
                        title="Expert support." 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                        icon={
                            <Database 
                                size={36} 
                                className="group-hover:text-orange-500 transition-colors ease-in-out"
                            />
                        }
                    />
                </div>
            </Section>
            <Section>
                <div className="max-w-screen-xl m-auto px-4">
                    <FeatureAccordion />
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