"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { siteIsWordPress } from "@/lib/wordpress"
import { useDebounceCallback, useDebounceValue } from "usehooks-ts"
import { AlertCircle, AppWindow, CheckCircle, CircleDot, CircleEllipsis, Computer, Dot, DotIcon, Loader2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useFormState } from "react-dom"
import { Button } from "../ui/button"
import { FileUpload } from "../file-upload"

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
        })
        .refine(async (id) => 
        await siteIsWordPress(id) as boolean, { 
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
        mode: "onBlur"
    })

    const { 
        getFieldState, 
        setValue,
        trigger,
        handleSubmit,
        watch,
        register,
        control,
        formState,
        formState: { 
            errors, 
            isDirty, 
            isValid, 
            isSubmitting, 
            touchedFields,
            isValidating,
        } 
    } = form;

    const url = watch("url")
    const [urlValue, setUrlValue] = useState<string>("")
    const debounced = useDebounceCallback(setUrlValue, 500)
    
    // Update the input value and trigger validation on debounce
    // to avoid excessive validation requests
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue("url", value, { shouldDirty: true, shouldValidate: false });
        value !== "" && debounced(value);
    }

    // When the debounced value changes, trigger validation
    useEffect(() => {
        console.log(!!urlValue, "urlValue");
        console.log(!!url, "url");
        !!url && trigger("url");
    }, [urlValue])
    
    const onSubmit = (values: z.infer<typeof OnboardSite>) => {
        console.log(values, "values")
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
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
                                    {!getFieldState("url", formState).isDirty && <AppWindow size={16} className="absolute left-2" />}
                                    {isValidating && <Loader2 size={16} className="absolute left-2 animate-spin" />}
                                    {(!isValidating && getFieldState("url", formState).isDirty && getFieldState("url", formState).invalid) && <XCircle size={16} className="absolute left-2 text-red-500"/>}
                                    {(!isValidating && getFieldState("url", formState).isDirty && !getFieldState("url", formState).invalid) && <CheckCircle size={16} className="absolute left-2 text-green-500" />}
                                    <Input
                                        {...field}
                                        onChange={handleChange}
                                        className="pl-8"
                                    />
                                </div>
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
                                    onChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormDescription>Recommended size: 300 x 200.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}