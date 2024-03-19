"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { siteIsWordPress } from "@/lib/wordpress"
import { useDebounceValue } from "usehooks-ts"
import { AlertCircle, CheckCircle, CircleEllipsis, Loader2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const OnboardSite = z.object({
    name: z.string({
        required_error: "Site name is required",
    }).min(2, {
        message: "Site name must be at least 2 characters",
    }),
    url: z.string().url({
        message: "Please enter a valid URL",
    }),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardSiteInfo = () => {

    const { 
        register, 
        setValue, 
        getValues,
        setError,
        formState: { errors, isDirty, isValid },
    } = useForm<z.infer<typeof OnboardSite>>();
    
    const form = useForm<z.infer<typeof OnboardSite>>({
        resolver: zodResolver(OnboardSite),
        defaultValues: {
            name: "",
            url: "",
            imageUrl: "",
        },
        mode: "onChange",
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [urlResult, setUrlResult] = useState<boolean>(false);
    const [debouncedValue, setDebouncedValue] = useDebounceValue(getValues("url"), 1000);


    const onSubmit = (values: z.infer<typeof OnboardSite>) => {
        console.log(values, "values")
    }

    useEffect(() => {
        const checkSite = async () => {
            setLoading(true);
            setUrlResult(await siteIsWordPress(debouncedValue) as boolean);
            setValue("url", debouncedValue);
            setLoading(false);
        };
        checkSite()
            // .then(() => setValue("url", debouncedValue))
            // .then(() => setLoading(false))
    }, [debouncedValue])

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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Site URL</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    {loading && <Loader2 size={16} className="absolute left-2 animate-spin" />}
                                    {(!loading && !urlResult) ? <XCircle size={16} className="absolute left-2 text-red-500"/> :
                                    <CheckCircle size={16} className="absolute left-2 text-green-500" />}
                                    <Input
                                        {...register("url")}
                                        onChange={(e) => setDebouncedValue(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Alert className=" bg-status-open text-status-open-foreground">
                    <CheckCircle size={16} className="text-status-open-foreground" />
                    <AlertTitle>Great news!</AlertTitle>
                    <AlertDescription>
                        This site appears to be built with WordPress.
                    </AlertDescription>
                </Alert> */}
            </form>
        </Form>
    )
}