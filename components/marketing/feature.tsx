import Image from "next/image";

export const Feature = ({
    number,
    title,
    description
}: {
    number: number;
    title: string;
    description: string;
}) => {
      
    return (
        <div id="Feature" data-key={number} className="min-w-full h-fit snap-start grid grid-cols-1 items-center gap-16 px-16">
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-8">
                <div className="">
                    <div className="text-6xl">{title}</div>
                </div>
                <div className="">
                    {description}
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