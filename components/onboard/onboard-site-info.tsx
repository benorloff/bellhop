"use client"

import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useDebounceCallback } from "usehooks-ts"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { siteIsWordPress } from "@/lib/wordpress"

import { AppWindow, CheckCircle, Loader2, XCircle } from "lucide-react"

import { useOnboardStore } from "@/components/providers/onboard-provider"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

const httpRegex = /^(http|https):/
const completeUrlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

const OnboardSite = z.object({
    name: z.string().min(1, {
        message: "Site name is required",
    }),
    url: z
        .string()
        .min(1, {
            message: "URL is required"
        })
        .max(255, {
            message: "URL must be less than 255 characters"
        })
        .transform((val, ctx) => {
            let completeUrl = val;
            // Prepend https:// if the URL 
            // doesn't start with http:// or https:// 
            if (!httpRegex.test(completeUrl)) {
                completeUrl = `https://${completeUrl}`;
            }
            // If the URL is still invalid, display an error message
            // and pass the fatal flag to abort the validation process early
            // This prevents unnecessary requests to the server to check
            // if the URL is a WordPress site
            if (!completeUrlRegex.test(completeUrl)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    fatal: true,
                    message: "Please enter a valid URL",
                });
                return z.NEVER;
            }
            return completeUrl;
        })
        // This refinement checks if the URL is a WordPress site
        // It only runs if the URL is valid
        .refine(async (completeUrl) => 
            completeUrl && await siteIsWordPress(completeUrl), { 
                message: "Uh oh! That doesn't look like a WordPress site.",
            }),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardSiteInfo = () => {

    // Check if the user has onboard state in local storage
    const storage = JSON.parse(localStorage.getItem("bellhop-onboard") || "")
    
    const form = useForm<z.infer<typeof OnboardSite>>({
        resolver: zodResolver(OnboardSite),
        defaultValues: {
            name: storage.state.site.name || "",
            url: storage.state.site.url || "",
            imageUrl: storage.state.site.imageUrl || "",
        },
        mode: "onChange"
    })

    // Expose the relevant props from useForm()
    const { 
        getFieldState, 
        setValue,
        trigger,
        handleSubmit,
        clearErrors,
        unregister,
        control,
        formState,
        formState: { 
            isValidating,
        } 
    } = form;

    const [urlValue, setUrlValue] = useState<string>("")
    const [isTyping, setIsTyping] = useState<boolean>(false)
    
    // Debounce URL value with 500ms delay 
    const debounced = useDebounceCallback(setUrlValue, 500)
    
    // Update the input value and trigger validation on debounce
    // to avoid excessive validation requests
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof z.infer<typeof OnboardSite>
    ) => {
        // Extract the value from the target element
        const { value } = e.target;
        // Update the rendered value immediately, 
        // but don't trigger validation yet
        if (fieldName === "url") {
            setValue("url", value, { shouldDirty: true, shouldValidate: false });
            setIsTyping(true);
            debounced(value);
        }
        if (fieldName === "name") {
            // Unregister the URL field to prevent validation
            // while the user is typing the site name
            unregister("url")
            setValue("name", value, { shouldDirty: true, shouldValidate: true });
        }
    }

    // When the debounced urlValue changes, trigger validation
    useEffect(() => {
        // Don't trigger validation if the field is empty
        // Instead, clear any existing field errors
        urlValue ? trigger("url") : clearErrors("url");
        // When the urlValue changes, we know the user has stopped typing
        // due to debounce delay. Update state accordingly.
        setIsTyping(false);
    }, [urlValue])

    const {
        updateSiteName,
        updateSiteUrl,
        updateSiteImageUrl,
        nextStep,
    } = useOnboardStore((state) => state);
    
    const onSubmit = (values: z.infer<typeof OnboardSite>) => {
        updateSiteName(values.name);
        updateSiteUrl(values.url);
        updateSiteImageUrl(values.imageUrl);
        nextStep();
    }

    // URL field states
    const urlIsDirty = getFieldState("url", formState).isDirty
    const urlInvalid = getFieldState("url", formState).invalid

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Website</CardTitle>
                        <CardDescription>Tell us about the website you will be moving to Bellhop.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site Name</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input 
                                                {...field} 
                                                onChange={(e) => handleChange(e, field.name)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site URL</FormLabel>
                                    <FormControl>
                                        <div className="relative flex items-center">
                                            { ( !urlIsDirty && !isTyping ) && 
                                                <AppWindow size={16} className="absolute left-2" />
                                            }
                                            { ( isValidating || isTyping ) && 
                                                <Loader2 size={16} className="absolute left-2 animate-spin" />
                                            }
                                            { ( !isValidating && urlIsDirty && urlInvalid && !isTyping ) && 
                                                <XCircle size={16} className="absolute left-2 text-red-500"/>
                                            }
                                            { ( !isValidating && urlIsDirty && !urlInvalid && !isTyping ) && 
                                                <CheckCircle size={16} className="absolute left-2 text-green-500" />
                                            }
                                            <Input
                                                {...field}
                                                onChange={(e) => handleChange(e, field.name)}
                                                className="pl-8"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="border border-red-500 p-4 rounded-md bg-destructive/50 text-destructive-foreground" />
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
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription>Recommended size: 300 x 200.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit">Next</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}