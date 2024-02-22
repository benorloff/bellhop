"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import { FormErrors } from "./form-errors";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";

interface FormSelectProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    selectItems: SelectItemProps[];
    onBlur?: () => void;
};

interface SelectItemProps {
    value: string;
    label: string;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
    name,
    label,
    type,
    placeholder,
    selectItems,
    required,
    disabled,
    errors,
    className,
    defaultValue = "",
    onBlur
}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div>
            <div>
                {label ? (
                    <Label
                        htmlFor={name}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Select
                    defaultValue={defaultValue}
                    name={name}
                    disabled={pending || disabled}
                    required={required}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {selectItems.map((item: SelectItemProps) => (
                            <SelectItem key={item.value} value={item.value} className="bg-background w-full">
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <FormErrors id={name} errors={errors} />
        </div>
    )
});

FormSelect.displayName = "FormSelect";