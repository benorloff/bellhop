"use client"

import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useDebounceCallback } from "usehooks-ts"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { siteIsWordPress } from "@/lib/wordpress"

import { AppWindow, CheckCircle, Loader2, XCircle } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
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
import { useOnboardStore } from "../providers/onboard-provider"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const httpRegex = /^(http|https):/
const completeUrlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

const OnboardSite = z.object({
    name: z.string({
        required_error: "Site name is required",
    }).min(2, {
        message: "Site name must be at least 2 characters",
    }),
    url: z
        .string()
        .max(255)
        .transform((val, ctx) => {
            let completeUrl = val;
            // If the URL doesn't start with http:// or https:// add https://
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
            completeUrl && await siteIsWordPress(completeUrl) as boolean, { 
                message: "Uh oh! That doesn't look like a WordPress site.",
            }
        ),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardSiteInfo = () => {
    
    const form = useForm<z.infer<typeof OnboardSite>>({
        resolver: zodResolver(OnboardSite),
        defaultValues: {
            name: "",
            url: "",
            imageUrl: "",
        },
        mode: "onChange"
    })

    // Extract the revelant props from useForm()
    const { 
        getFieldState, 
        setValue,
        trigger,
        handleSubmit,
        clearErrors,
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extract the value from the target element
        const { value } = e.target;
        // Update the rendered value immediately, 
        // but don't trigger validation yet
        setValue("url", value, { shouldDirty: true, shouldValidate: false });
        setIsTyping(true);
        debounced(value);
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
        logSiteState,
        nextStep,
    } = useOnboardStore((state) => state);
    
    const onSubmit = (values: z.infer<typeof OnboardSite>) => {
        console.log(values, "values")
        updateSiteName(values.name);
        updateSiteUrl(values.url);
        updateSiteImageUrl(values.imageUrl);
        logSiteState();
        nextStep();
    }

    // URL field states
    const urlIsDirty = getFieldState("url", formState).isDirty
    const urlInvalid = getFieldState("url", formState).invalid

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Website</CardTitle>
                        <CardDescription>Tell us about the website you will be moving to Bellhop.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site Name</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input {...field} />
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
                                                onChange={handleChange}
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