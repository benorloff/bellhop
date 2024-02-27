import { Site } from '@prisma/client';
import { SiteImage } from './site-image';

export const SiteHeader = (
    site: Site
) => {
    return (
        <div className="flex flex-row items-center gap-8 mb-8">
            <div className="shrink">
                <SiteImage {...site} />
            </div>
            <div className="grow">
                <div className="text-3xl">{site.name}</div>
                <div>{site.url}</div>
            </div>
        </div>
    );
} 