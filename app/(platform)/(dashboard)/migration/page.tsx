"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createSite } from "@/actions/create-site";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { FormSubmit } from "@/components/form/form-submit";

const MigrationPage = () => {

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

        execute({ name, slug, url });
    }

    return ( 
        <div>
            <p>Migration Page</p>
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
                </div>
                <FormSubmit className="w-full">
                    Submit
                </FormSubmit>
            </form>

        </div>
     );
}
 
export default MigrationPage;