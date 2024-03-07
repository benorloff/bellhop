"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { createSite } from "@/actions/create-site";
import { useAction } from "@/hooks/use-action";

import { CreateSite } from "@/actions/create-site/schema";
import { DashboardTitle } from "@/components/dashboard-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileUpload } from "@/components/file-upload";
import { get } from "lodash";

const MigrationPage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof CreateSite>>({
        resolver: zodResolver(CreateSite),
        defaultValues: {
            name: "",
            slug: "",
            url: "",
            ipAddress: "",
            imageUrl: "",
        }
    });

    const { execute, isLoading } = useAction(createSite, {
        onSuccess: () => {
            toast.success("Site migration submitted!");
            router.push("/sites");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (values: z.infer<typeof CreateSite>) => {
        console.log(values, "values")
        const name = values.name;
        const slug = values.slug;
        const url = values.url;
        const ipAddress = values.ipAddress;
        const imageUrl = values.imageUrl;

        execute({ name, slug, url, ipAddress, imageUrl });
    }

    return ( 
        <div>
            <DashboardTitle />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Site Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Site Slug</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Site URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ipAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IP Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <FileUpload 
                                        endpoint="siteImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>Recommended size: 300 x 200.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {isLoading 
                            ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            : "Submit"
                        }
                    </Button>
                </form>
            </Form>
        </div>
     );
}
 
export default MigrationPage;