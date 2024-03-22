"use client"

import { SiteInfo } from "@/components/ai/site-info";
import { DashboardTitle } from "@/components/dashboard-title"
import { SiteSelect } from "@/components/sites/site-select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { WpApiEndpoint, wpGet } from "@/lib/wordpress";
import { auth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "lodash";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const httpRegex = /^(http|https):/
const completeUrlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

const FormSchema = z.object({
    url: z
        .string()
        .max(255)
        .transform((val, ctx) => {
            let completeUrl = val;
            if (!httpRegex.test(completeUrl)) {
                completeUrl = `https://${completeUrl}`;
            }
            if (!completeUrlRegex.test(completeUrl)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Please enter a valid URL",
                });

                return z.NEVER;
            }
            return completeUrl;
    }),
    username: z.string({
        required_error: "Username is required",
    }),
    appPassword: z.string({
        required_error: "App password is required",
    }),
})

const AIPage =  () => {
    // const { userId } = auth();

    // const sites = await db.site.findMany({
    //     where: {
    //         members: {
    //             some: {
    //                 userId: userId!,
    //             }
    //         }
    //     }, 
    //     include: {
    //         members: true
    //     }
    // })

    const [credentials, setCredentials] = useState<z.infer<typeof FormSchema>>()
    const [wpPages, setWpPages] = useState<any>({data: [], headers: []})
    const [wpPosts, setWpPosts] = useState<any>({data: [], headers: []})
    const [wpCategories, setWpCategories] = useState<any>({data: [], headers: []})
    const [wpPlugins, setWpPlugins] = useState<any>({data: [], headers: []})
    const [headers, setHeaders] = useState<any>({})

    // For testing purposes only
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            url: "demozone.flywheelsites.com",
            username: "test",
            appPassword: "PQaG iA4n bmZT zTVi IZB6 sj4R",
        }
    })

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        setCredentials(values);
        // SiteInfo(values).then((res) => {setData(res.data), setHeaders(res.headers)});
        wpGet({
            url: values.url,
            pretty: true,
            username: values.username,
            password: values.appPassword,
            endpoint: "pages",
        }).then((res) => 
            setWpPages({data: res.data, headers: res.headers})
        );
        wpGet({
            url: values.url,
            pretty: true,
            username: values.username,
            password: values.appPassword,
            endpoint: "posts",
        }).then((res) => 
            setWpPosts({data: res.data, headers: res.headers})
        );
        wpGet({
            url: values.url,
            pretty: true,
            username: values.username,
            password: values.appPassword,
            endpoint: "plugins",
        }).then((res) => 
            setWpPlugins({data: res.data, headers: res.headers})
        );
        console.log(wpPages, "<-- wpPages state")
        console.log(wpPosts, "<-- wpPosts state")
        form.reset();
    }

    return(
        <>
            <DashboardTitle />
            {/* <SiteSelect sites={sites} /> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Application Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                    {(credentials?.url && credentials?.username && credentials?.appPassword) && (<p>Access Granted</p>)}
                </form>
            </Form>
            {/* {(credentials?.url && credentials?.username && credentials?.appPassword) && (
                <SiteInfo {...credentials} />
            )} */}
            <div className="text-2xl py-4">Pages</div>
            {wpPages.headers.length > 0 && (<p>Total Pages: {wpPages.headers.find((header) => header[0] === 'x-wp-total')[1]}</p>)}
            {wpPages.data.length > 0 && (
                wpPages.data.map((page: object) => (
                    <div key={page.id} className="py-4">
                        <p>Title: {page.title.rendered}</p>
                        <p>Date: {new Date(page.date).toLocaleString()}</p>
                        <p>URL: {page.link}</p>
                        <Button>Select</Button>
                    </div>
            
                ))
            )}
            <div className="text-2xl py-4">Posts</div>
            {wpPosts.headers.length > 0 && (<p>Total Posts: {wpPosts.headers.find((header) => header[0] === 'x-wp-total')[1]}</p>)}
            {wpPosts.data.length > 0 && (
                wpPosts.data.map((post: object) => (
                    <div key={post.id} className="py-4">
                        <p>Title: {post.title.rendered}</p>
                        <p>Date: {new Date(post.date).toLocaleString()}</p>
                        <p>URL: {post.link}</p>
                        <Button>Select</Button>
                    </div>
            
                ))
            )}
            <div className="text-2xl py-4">Plugins</div>
            {wpPlugins.data.length > 0 && (
                wpPlugins.data.map((plugin: object) => (
                    <div key={plugin.plugin_uri} className="py-4">
                        <p>Name: {plugin.name}</p>
                        <p>Status: {plugin.status}</p>
                        <p>URI: {plugin.plugin_uri}</p>
                        <Button>Select</Button>
                    </div>
            
                ))
            )}
            
        </>
    )
};

export default AIPage;