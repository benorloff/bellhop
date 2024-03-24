"use client"

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import WPAPI from "wpapi";
import { z } from "zod";
import { 
    WP_REST_API_Attachments, 
    WP_REST_API_Pages, 
    WP_REST_API_Posts
} from "wp-types";

import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { DashboardTitle } from "@/components/dashboard-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

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
    const [wpPosts, setWpPosts] = useState<WP_REST_API_Posts>([])
    const [wpPages, setWpPages] = useState<WP_REST_API_Pages>([])
    const [wpMedia, setWpMedia] = useState<WP_REST_API_Attachments>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            // For testing purposes only
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
            .catch((err) => console.error(err))
        wp.pages().get()
            .then((res) => setWpPages(res))
            .catch((err) => console.error(err))
        wp.media().get()
            .then((res) => setWpMedia(res))
            .catch((err) => console.error(err))

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
                </form>
            </Form>
            {/* <div className="text-2xl py-4">Posts</div>
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
            )} */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Posts
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{wpPosts?.length || "0"}</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Pages
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{wpPages?.length || "0"}</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Media</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{wpMedia?.length || "0"}</div>
                    <p className="text-xs text-muted-foreground">
                        +19% from last month
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                        +201 since last hour
                    </p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
};

export default AIPage;