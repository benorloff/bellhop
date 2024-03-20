"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { siteIsWordPress } from "@/lib/wordpress"
import { useDebounceCallback, useDebounceValue } from "usehooks-ts"
import { AlertCircle, CheckCircle, CircleEllipsis, Loader2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useFormState } from "react-dom"
import { Button } from "../ui/button"

const OnboardSite = z.object({
    name: z.string({
        required_error: "Site name is required",
    }).min(2, {
        message: "Site name must be at least 2 characters",
    }),
    // url: z.string().url({
    //     message: "Please enter a valid URL",
    // }),
    url: z.string().refine(async (id) => 
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
        mode: "onChange"
    })

    const { 
        getFieldState, 
        setValue,
        trigger,
        handleSubmit,
        watch,
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
                                    {!getFieldState("url", formState).isDirty && <CircleEllipsis size={16} className="absolute left-2" />}
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
            </form>
        </Form>
    )
}