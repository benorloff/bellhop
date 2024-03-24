"use server"

export type WpApiEndpoint = 
        "posts" 
        | "categories" 
        | "tags" 
        | "pages" 
        | "comments" 
        | "taxonomies" 
        | "media" 
        | "users" 
        | "types" 
        | "statuses" 
        | "settings" 
        | "themes" 
        | "search" 
        | "block-types" 
        | "blocks" 
        | "block-renderer" 
        | "block-directory/search" 
        | "plugins";


export interface WpApiRequest {
    url: string,
    pretty: boolean,
    username: string,
    password: string,
    endpoint: WpApiEndpoint,
    resourceId?: number,
}

export const siteIsWordPress = async (url: string) => {
    console.log("siteIsWordPress", url) 
    
    // Initialize as falsy
    let data = false;

    try {
        // Send a HEAD request to the provided URL
        const response = await fetch(url, {
            method: "HEAD",
        })
        // Check the headers for the presence of the WordPress API
        // Further checks will be needed to determine if the site is WordPress
        // when the Rest API is disabled
        const headerLinks = response.headers.get("link");
        if (headerLinks?.includes("wp-json" || "api.w.org")) {
            data = true;
        }
    } catch (error) {
        console.log("Error parsing response headers: ", error);
    }

    // Return the result as a boolean
    return data!!;
}

export const wpGet = async ({
    url,
    pretty,
    username,
    password,
    endpoint,
    resourceId,
}: WpApiRequest) => {

    let data;
    let headers;

    let urlPath = `${url}${pretty ? '/wp-json' : '/?rest_route='}/wp/v2/${endpoint}/${resourceId ? `/${resourceId}` : ""}`
    console.log(urlPath, "<-- urlPath")

    try {
        const response = await fetch(urlPath, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${username}:${password}`)}`
            },
            cache: "no-cache",
        })
        data = await response.json();
        headers = response.headers;
        console.log(headers, '<-- headers')
    } catch (error) {
        console.error(error);
        return {
            error: "An error occurred while fetching data from the WordPress API",
        }
    }
    return { data, headers };
}