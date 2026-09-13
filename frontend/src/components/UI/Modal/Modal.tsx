"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/UI/Button/Button";

type ModalProps = {
    children: ReactNode;
};

export function Modal({ children }: ModalProps) {
    const router = useRouter();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md"
            onClick={() => router.back()}
        >
            <div
                className="relative w-full max-w-[452px] rounded-3xl border border-primary/20 bg-background p-3 shadow-[0_24px_100px_-24px_var(--primary)] ring-1 ring-white/5"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mb-3 flex items-center justify-between gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="h-11 gap-2 border-primary/20 bg-primary/10 px-4 text-foreground hover:border-primary/50 hover:bg-primary/20 motion-reduce:transition-none"
                    >
                        <ArrowLeft aria-hidden="true" />
                        Назад
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-lg"
                        aria-label="Закрыть видео"
                        onClick={() => router.back()}
                        className="size-11 border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:bg-primary/20 hover:text-foreground motion-reduce:transition-none"
                    >
                        <X aria-hidden="true" />
                    </Button>
                </div>

                {children}
            </div>
        </div>
    );
}
