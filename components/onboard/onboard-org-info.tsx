"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useOnboardStore } from "../providers/onboard-provider"
import { useEffect } from "react"

interface OnboardOrgInfoProps {
    org: {
        name: string;
        imageUrl: string;
    }
};

const OnboardOrg = z.object({
    name: z.string({
        required_error: "First name is required",
    }),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardOrgInfo = ({
    org,
}: OnboardOrgInfoProps) => {
    // Change this to currentUser() from server-side
    const router = useRouter();

    const form = useForm<z.infer<typeof OnboardOrg>>({
        resolver: zodResolver(OnboardOrg),
        defaultValues: {
            name: org.name || "",
            imageUrl: org.imageUrl || "",
        }
    })

    const onSubmit = (values: z.infer<typeof OnboardOrg>) => {
        console.log(values, "values")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
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
                            <FormLabel>Org Photo</FormLabel>
                            <FormControl>
                                {/* <Input {...field} /> */}
                                <Image 
                                    src={field.value} 
                                    alt="Profile Photo" 
                                    width={75} 
                                    height={75} 
                                    className="rounded-full hover:cursor-not-allowed"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}