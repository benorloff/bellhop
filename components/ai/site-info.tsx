"use server"

interface SiteAccessValues {
    url: string,
    username: string,
    appPassword: string,
}

export const SiteInfo = async (values: SiteAccessValues) => {

    console.log(values, "<-- values from SiteInfo")
    const wpApiHost = `${values.url}/wp-json/wp/v2`
    console.log(wpApiHost, "<-- wpApiHost")

    // WP API Pages Endpoint
    const response = await fetch(`${wpApiHost}/pages`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${values.username}:${values.appPassword}`)}`
        }
    })

    const data = await response.json();
    const headers = response.headers;

    return { data, headers };
}