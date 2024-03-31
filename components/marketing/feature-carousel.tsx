"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "usehooks-ts"

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
                        <div className="font-semibold pl-4 pr-32 border-l border-l-primary">Lorem ipsum.</div>
                        <div className="text-muted-foreground pl-4 pr-32 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="font-semibold pl-4 pr-32 border-l border-l-primary">Lorem ipsum.</div>
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

    let observerOptions = {
        rootMargin: '0px',
        threshold: 0.5
    }
    
    let featureTrack: HTMLElement | null = null;
    
    if (typeof document !== 'undefined') {
        featureTrack = document.getElementById("FeatureCarouselTrack")!
        const observer = new IntersectionObserver(observerCallback, observerOptions); 
        document.querySelectorAll('#Feature').forEach((i) => {
                if (i) {
                    observer.observe(i)
                }
            })
    };

    function observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let key = entry.target.getAttribute('data-key')
                setActiveFeature(parseInt(key!))
            }
        })
    }

    const handleClick = (e: any, id: number) => {
        setActiveFeature(id)
    }

    useEffect(() => {
        let featureEl = document.getElementById('Feature')
        let width = featureEl?.getBoundingClientRect().width!;
        let n = ( activeFeature - 1 ) * width;
        featureTrack?.scrollTo( n , 0 )
    }, [activeFeature])

    return (
        <div id="FeatureCarouselContainer" className="space-y-8">
            <div id="FeatureCarouselTrack" className="flex flex-row snap-x snap-mandatory overflow-x-scroll [scrollbar-width:none] overscroll-x-contain py-8 gap-32">
                <Feature 
                    key={1} 
                    number={1} 
                    title="Unlimited Updates" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    key={2} 
                    number={2} 
                    title="Automated with AI" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    key={3} 
                    number={3} 
                    title="Maximum Security" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
                <Feature 
                    key={4} 
                    number={4} 
                    title="Blazing Fast" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                />
            </div>
            <div className="grid grid-cols-4 w-full text-center border-collapse">
                <div 
                    id="1" 
                    role="button" 
                    className={cn(
                        "border-t border-dashed border-muted py-8 px-2 text-muted-foreground",
                        activeFeature === 1 && "border-t border-solid border-t-primary text-foreground"
                    )}
                    onClick={(e) => handleClick(e, parseInt(e.currentTarget.id))}
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
                    onClick={(e) => handleClick(e, parseInt(e.currentTarget.id))}
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
                    onClick={(e) => handleClick(e, parseInt(e.currentTarget.id))}
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
                    onClick={(e) => handleClick(e, parseInt(e.currentTarget.id))}
                >
                    Feature 4
                </div>
            </div>
        </div>
    )
}