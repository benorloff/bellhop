"use client"

import { currentUser, useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Image from "next/image"
import { User } from "@clerk/backend"
import { useCallback, useEffect, useState } from "react"
import { getUser } from "@/lib/get-user"
import { useOnboardStore } from "../providers/onboard-provider"

interface OnboardUserInfoProps {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        imageUrl: string;
    }
};

const OnboardUser = z.object({
    firstName: z.string({
        required_error: "First name is required",
    }),
    lastName: z.string({
        required_error: "Last name is required",
    }),
    email: z.string().email({
        message: "Please enter a valid email",
    }),
    imageUrl: z.string().url({
        message: "Please enter a valid URL",
    }),
})

export const OnboardUserInfo = ({
    user
}: OnboardUserInfoProps ) => {

    const form = useForm<z.infer<typeof OnboardUser>>({
        resolver: zodResolver(OnboardUser),
        defaultValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            imageUrl: user.imageUrl || "",
        }
    })

    const onSubmit = (values: z.infer<typeof OnboardUser>) => {
        console.log(values, "values")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled/>
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
                            <FormLabel>Profile Photo</FormLabel>
                            <FormControl>
                                {/* <Input {...field} /> */}
                                <Image 
                                    src={field.value} 
                                    alt="Profile Photo" 
                                    width={100} 
                                    height={100} 
                                    className="rounded-full"
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