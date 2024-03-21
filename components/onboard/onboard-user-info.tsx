"use client"

import Image from "next/image"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
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

    const {
        updateUserFirstName,
        updateUserLastName,
        updateUserEmail,
        updateUserImageUrl,
        ...rest
    } = useOnboardStore((state) => state);

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
        updateUserFirstName(values.firstName);
        updateUserLastName(values.lastName);
        updateUserEmail(values.email);
        updateUserImageUrl(values.imageUrl);        
    }

    console.log(rest, "rest")

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                                    width={75} 
                                    height={75} 
                                    className="rounded-full hover:cursor-not-allowed"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-center w-full gap-4">
                    <div className="flex-1">
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
                    </div>
                    <div className="flex-1">
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
                    </div>
                </div>
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
                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}