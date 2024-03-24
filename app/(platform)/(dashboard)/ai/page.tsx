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
import WPAPI from "wpapi";
import { WP_REST_API_Post } from "wp-types";
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

    const [credentials, setCredentials] = useState<z.infer<typeof FormSchema>>()
    const [wpPosts, setWpPosts] = useState<any>({data: []})

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
        const wp = new WPAPI({ endpoint: `${values.url}/wp-json`})
        wp.posts().get()
            .then((res) => setWpPosts(res))
        console.log(wpPosts, "<-- wpPosts state")
        form.reset();
    }

    return(
        <>
            <DashboardTitle />
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
            <div className="text-2xl py-4">Posts</div>
            <p>Total Posts: {wpPosts.length}</p>
            {wpPosts.length > 0 && (
                wpPosts.map((post: WP_REST_API_Post) => (
                    <div key={post.id} className="py-4">
                        <p>Title: {post.title.rendered}</p>
                        <p>Date: {new Date(post.date).toLocaleString()}</p>
                        <p>URL: {post.link}</p>
                        <Button>Select</Button>
                    </div>
            
                ))
            )}
        </>
    )
};

export default AIPage;