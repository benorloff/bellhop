"use server"

export const siteIsWordPress = async (url: string): Promise<boolean> => {    
    // Initialize as falsy
    let data: boolean = false;

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