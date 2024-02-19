"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { toast } from "sonner";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "siteImage" | "ticketFile";
};

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value.split(".").pop();

    if (value) {
        return (
            <div className="relative aspect-video">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-sm"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-[-8px] right-[-8px] shadow-sm"
                    type="button"
                >
                    <X className="w-[16px] h-[16px]" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(error.message);
            }}
        />
    )
};
