"use client";

import { createTicket } from "@/actions/create-ticket";
import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

const NewTicketPage = () => {

    const { execute, fieldErrors } = useAction(createTicket, {
        onSuccess: () => {
            toast.success("Ticket submitted!");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const name = "Test name";
        const email = "benjamin.orloff@gmail.com";
        const subject = formData.get("subject") as string;
        const type = "Bug";
        const status = 2;
        const priority = 2;
        const description = formData.get("description") as string;
        const source = 2;

        execute({ 
            name, 
            email, 
            subject, 
            type, 
            status, 
            priority, 
            description,
            source,
        });
    }

    return (
        <div>
            <div className="text-3xl mb-8">
                Open a new ticket
            </div>
            <form action={onSubmit} className="space-y-4">
                <div className="space-y-4">
                    <FormInput 
                        id="subject"
                        label="Subject"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="description"
                        label="Description"
                        type="text"
                        errors={fieldErrors}
                    />
                </div>
                <FormSubmit className="w-full">
                    Submit
                </FormSubmit>
            </form>
        </div>
    )
};
 
export default NewTicketPage;