"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createSite } from "@/actions/create-site";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FileUpload } from "@/components/file-upload";
import { UploadDropzone } from "@uploadthing/react";
import { UploadButton } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const MigrationPage = () => {

    const [fileUrl, setFileUrl] = useState("");

    const router = useRouter();

    const { execute, fieldErrors } = useAction(createSite, {
        onSuccess: (data) => {
            toast.success("Site migration submitted!");
            // TODO: Redirect to site page?
            // router.push(`/site/${data.slug}`);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const url = formData.get("url") as string; 
        const ipAddress = formData.get("ipAddress") as string;

        execute({ name, slug, url, ipAddress });
    }

    return ( 
        <div>
            <div className="text-3xl mb-8">Migration Page</div>
            <form action={onSubmit} className="space-y-4">
                <div className="space-y-4">
                    <FormInput 
                        id="name"
                        label="Site name"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="slug"
                        label="Site slug"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="url"
                        label="Site URL"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="ipAddress"
                        label="IP Address"
                        type="text"
                        errors={fieldErrors}
                    />
                    {/* <UploadButton
                        endpoint="siteImage"
                        onClientUploadComplete={(res) => {
                            setFileUrl(res?.[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            toast.error(error.message);
                        }}
                    />   */}
                </div>
                <FormSubmit className="w-full">
                    Submit
                </FormSubmit>
            </form>
            <UploadButton
                endpoint="siteImage"
                onClientUploadComplete={(res) => {
                    console.log("Files:", res);
                }}
                onUploadError={(error: Error) => {
                    console.log("Upload error:", error.message)
                }}
            />  
        </div>
     );
}
 
export default MigrationPage;