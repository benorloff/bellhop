import { forwardRef } from "react"
import { useIntersectionObserver } from "usehooks-ts"

const Feature = (({
    number,
    title,
    description,
}: {
    number: number,
    title: string,
    description: string,
}) => {
    
    return (
        <div data-key={number} id={`Feature${number}`} className="min-w-full snap-start">
            <div className="lg:w-1/2">
                <div className="text-6xl">{title}</div>
            </div>
            <div className="lg:w-1/2">
                {description}
            </div>
        </div>
    )
})

export default Feature;