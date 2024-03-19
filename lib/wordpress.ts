"use server"

export const siteIsWordPress = async (url: string) => {

    let data;

    try {
        const response = await fetch(url, {
            method: "HEAD",
        })
        const headerLinks = response.headers.get("link");
        if (headerLinks?.includes("wp-json")) {
            data = {
                valid: true,
                message: "This site is using WordPress"
            }
        }
    } catch (error) {
        data = {
            valid: false,
            message: "This site is not using WordPress"
        }
    }

    return data;
}