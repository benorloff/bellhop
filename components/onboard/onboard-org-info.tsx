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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

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

    const {
        updateOrgName,
        updateOrgImageUrl,
        nextStep,
    } = useOnboardStore((state) => state);

    const onSubmit = (values: z.infer<typeof OnboardOrg>) => {
        updateOrgName(values.name);
        updateOrgImageUrl(values.imageUrl);
        nextStep();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Your Organization</CardTitle>
                        <CardDescription>Let's set up your brand. You can make changes or add other organizations later.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type="submit">Next</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}