"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "usehooks-ts"
import { FeatureCarouselNavIndicator } from "./feature-carousel-nav-indicator"
import { de } from "@faker-js/faker"
import useDebounce from "@/hooks/use-debounce"

// const DynamicFeature = dynamic(() => import('./feature'), { ssr: false })

const Feature = (props: { number: number, title: string, description: string }) => {
    const { isIntersecting, ref } = useIntersectionObserver({
      threshold: 0.5,
    })
      
    return (
        <div ref={ref} id="Feature" data-key={props.number} className="min-w-full h-fit snap-start grid grid-cols-1 items-center gap-16">
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-8">
                <div className="">
                    <div className="text-6xl">{props.title}</div>
                </div>
                <div className="">
                    {props.description}
                </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 items-start gap-8">
                <div className="grid grid-cols-1 items-start gap-8">
                    <div className="space-y-4">
                        <div className="font-semibold pl-4 pr-32">Lorem ipsum.</div>
                        <div className="text-muted-foreground pl-4 pr-32 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="font-semibold pl-4 pr-32">Lorem ipsum.</div>
                        <div className="text-muted-foreground pl-4 pr-32">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div>
                    <Image 
                        src="/placeholder-browser.svg"
                        alt="Browser"
                        width={600}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
  }

export const FeatureCarousel = () => {
    
    const [activeFeature, setActiveFeature] = useState(1)
    const [scrollProgress, setScrollProgress] = useState(0)

    let featureTrack: HTMLElement | null = null;
    let featureTrackScrollWidth: number = 0;
    let featureTrackScrollLeft: number = 0;

    if (typeof document !== 'undefined') {
        featureTrack = document.getElementById("FeatureCarouselTrack");
        featureTrackScrollWidth = featureTrack?.scrollWidth as number;
        featureTrackScrollLeft = featureTrack?.scrollLeft as number;
    }

    const onTrackScroll = (e: any) => {
        let progress = ( featureTrackScrollLeft / featureTrackScrollWidth );
        setScrollProgress(progress);
    }

    featureTrack?.addEventListener('scroll', onTrackScroll);

    useEffect(() => {
        console.log(scrollProgress, 'scrollProgress')
        switch (true) {
            case scrollProgress >= 0 && scrollProgress < 0.25:
                setActiveFeature(1);
                break;
            case scrollProgress >= 0.25 && scrollProgress < 0.5:
                setActiveFeature(2);
                break;
            case scrollProgress >= 0.5 && scrollProgress < 0.75:
                setActiveFeature(3);
                break;
            case scrollProgress >= 0.75 && scrollProgress <= 1:
                setActiveFeature(4);
                break;
        }
    }, [scrollProgress])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = parseInt(e.currentTarget.id);
        let n = ( ( id - 1 ) / 4 ) * featureTrackScrollWidth;
        featureTrack?.scrollTo( { left: n , top: 0, behavior: 'smooth' } )
    }

    return (
        <div id="FeatureCarouselContainer" className="space-y-8">
            <div id="FeatureCarouselTrack" className="flex flex-row snap-x snap-mandatory overflow-x-scroll [scrollbar-width:none] overscroll-x-contain py-8 gap-32">
                <Feature 
                    number={1} 
                    title="Feature 1" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    number={2} 
                    title="Feature 2" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    number={3} 
                    title="Feature 3" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    number={4} 
                    title="Feature 4" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
            </div>
            <div className="relative grid grid-cols-4 w-full text-center border-collapse">
                <div 
                    id="1" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
                        activeFeature === 1 && "border-t border-solid border-t-primary text-foreground"
                    )}
                    onClick={(e) => handleClick(e)}
                >
                    Feature 1
                </div>
                <div 
                    id="2" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
                        activeFeature === 2 && "border-t border-solid border-t-primary text-foreground"
                    )}
                    onClick={(e) => handleClick(e)}
                >
                    Feature 2
                </div>
                <div 
                    id="3" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
                        activeFeature === 3 && "border-t border-solid border-t-primary text-foreground"
                    )}
                    onClick={(e) => handleClick(e)}
                >
                    Feature 3
                </div>
                <div 
                    id="4" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
                        activeFeature === 4 && "border-t border-solid border-t-primary text-foreground"
                    )}
                    onClick={(e) => handleClick(e)}
                >
                    Feature 4
                </div>
            </div>
        </div>
    )
}