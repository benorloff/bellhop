"use server"

export const siteIsWordPress = async (url: string) => {

    let data;

    let headerLinks;
    try {
        const response = await fetch(url, {
            method: "HEAD",
            mode: "no-cors",
        })
        headerLinks = response.headers.get("link");
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