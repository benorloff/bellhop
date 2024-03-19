"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { siteIsWordPress } from "@/lib/wordpress"
import { useDebounceCallback, useDebounceValue } from "usehooks-ts"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const OnboardSite = z.object({
    name: z.string({
        required_error: "Site name is required",
    }),
    url: z.string().url({
        message: "Please enter a valid URL",
    }),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardSiteInfo = () => {

    const { watch } = useForm<z.infer<typeof OnboardSite>>();
    const watchUrl = watch("url");

    const [loading, setLoading] = useState<boolean>(false);
    const [urlResult, setUrlResult] = useState<{valid: boolean, message: string}>({valid: false, message: ""});

    const [debouncedValue, setValue] = useDebounceValue(watchUrl, 1000);

    const form = useForm<z.infer<typeof OnboardSite>>({
        resolver: zodResolver(OnboardSite),
        defaultValues: {
            name: "",
            url: "",
            imageUrl: "",
        }
    })

    const onSubmit = (values: z.infer<typeof OnboardSite>) => {
        console.log(values, "values")
    }

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            setUrlResult(await siteIsWordPress(debouncedValue) as {valid: boolean, message: string});
            setLoading(false);
        };

        fetchData();

    },  [debouncedValue])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                    name="url"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Site URL</FormLabel>
                            <FormControl>
                                <Input
                                    onChange={event => setValue(event.target.value)}
                                    {...field}
                                />
                            </FormControl>
                                {loading && <Loader2 size={16} className="animate-spin"/>}
                                        
                                {(!loading && debouncedValue) && 
                                    <Alert variant={!urlResult.valid ? "destructive" : "default"}>
                                        <AlertCircle size={16} />
                                        <AlertTitle>{urlResult.valid ? "Great news!" : "Uh oh"}</AlertTitle>
                                        <AlertDescription>
                                            {urlResult?.message!}
                                        </AlertDescription>
                                    </Alert>
                                }
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}