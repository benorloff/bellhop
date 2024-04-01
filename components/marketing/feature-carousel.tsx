"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Feature } from "./feature"

export const FeatureCarousel = () => {
    
    const [scrollProgress, setScrollProgress] = useState(0)

    let featureTrack: HTMLElement | null = null;
    let featureTrackScrollWidth: number = 0;
    let featureEl: HTMLElement | null = null;
    let featureElClientWidth: number = 0;

    if (typeof document !== 'undefined') {
        featureTrack = document.getElementById("FeatureCarouselTrack");
        featureTrackScrollWidth = featureTrack?.scrollWidth as number;
        featureEl = document.getElementById("Feature");
        featureElClientWidth = featureEl?.clientWidth as number;
    }

    const onTrackScroll = (e: React.UIEvent<HTMLElement>) => {
        let progress = Number(( e.currentTarget.scrollLeft / e.currentTarget.scrollWidth ).toPrecision(2)) * 100;
        setScrollProgress(progress);
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = parseInt(e.currentTarget.id);
        let n: number = 0;
        n = ( ( id - 1 ) ) * featureElClientWidth;
        
        featureTrack?.scrollTo( { left: n , top: 0, behavior: 'smooth' } )
    }

    return (
        <div id="FeatureCarouselContainer" className="space-y-8">
            <div id="FeatureCarouselTrack" onScroll={onTrackScroll} className="flex flex-row snap-x snap-mandatory overflow-x-scroll [scrollbar-width:none] overscroll-x-contain py-8">
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
            <div className="relative grid grid-cols-4 w-full text-center border-collapse overflow-clip">
                <div 
                    className="absolute top-0 w-1/4 h-[1px] bg-primary ease-linear"
                    style={{ left: `${scrollProgress}%` }} 
                />
                <div 
                    id="1" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
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
                    )}
                    onClick={(e) => handleClick(e)}
                >
                    Feature 4
                </div>
            </div>
        </div>
    )
}