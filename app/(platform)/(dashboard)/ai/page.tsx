"use client"

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import WPAPI from "wpapi";
import { z } from "zod";
import { 
    WP_REST_API_Attachments, 
    WP_REST_API_Categories, 
    WP_REST_API_Comments, 
    WP_REST_API_Pages, 
    WP_REST_API_Posts,
    WP_REST_API_Tags,
    WP_REST_API_Taxonomies,
    WP_REST_API_Taxonomy,
    WP_REST_API_Users
} from "wp-types";

import { Activity, BookOpen, CreditCard, DollarSign, File, Image, LayoutList, ListTree, MessageCircle, Newspaper, Speech, Tags, User, Users, Users2 } from "lucide-react";
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
    const [wpComments, setWpComments] = useState<WP_REST_API_Comments>([])
    const [wpUsers, setWpUsers] = useState<WP_REST_API_Users>([])
    const [wpMedia, setWpMedia] = useState<WP_REST_API_Attachments>([])
    const [wpCategories, setWpCategories] = useState<WP_REST_API_Categories>([])
    const [wpTags, setWpTags] = useState<WP_REST_API_Tags>([])
    const [wpTaxonomies, setWpTaxonomies] = useState<WP_REST_API_Taxonomy[]>([])

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
        wp.comments().get()
            .then((res) => setWpComments(res))
            .catch((err) => console.error(err))
        wp.users().get()
            .then((res) => setWpUsers(res))
            .catch((err) => console.error(err))
        wp.categories().get()
            .then((res) => setWpCategories(res))
            .catch((err) => console.error(err))
        wp.tags().get()
            .then((res) => setWpTags(res))
            .catch((err) => console.error(err))
        wp.taxonomies().get()
            .then((res) => setWpTaxonomies(res))
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

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 py-8">
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Pages</div>
                        <p className="text-2xl">{wpPages?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <Newspaper size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Posts</div>
                        <p className="text-2xl">{wpPosts?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <Users2 size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Users</div>
                        <p className="text-2xl">{wpUsers?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <MessageCircle size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Comments</div>
                        <p className="text-2xl">{wpComments?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <Image size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Attachments</div>
                        <p className="text-2xl">{wpMedia?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <LayoutList size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Categories</div>
                        <p className="text-2xl">{wpCategories?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <Tags size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Tags</div>
                        <p className="text-2xl">{wpTags?.length || "0"}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 items-center border rounded-lg p-4">
                    <div className="border rounded-lg p-4">
                        <ListTree size={24} />
                    </div>
                    <div>
                        <div className="text-muted-foreground">Taxonomies</div>
                        <p className="text-2xl">{wpTaxonomies?.length || "0"}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AIPage;