"use server"

export const siteIsWordPress = async (url: string) => {
    console.log("siteIsWordPress", url)

    let data;

    try {
        const response = await fetch(url, {
            method: "HEAD",
        })
        const headerLinks = response.headers.get("link");
        if (headerLinks?.includes("wp-json")) {
            data = true;
        }
    } catch (error) {
        data = false;
    }

    return data!!;
}