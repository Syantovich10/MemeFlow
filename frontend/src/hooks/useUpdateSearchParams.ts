"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchParams = Record<
    string,
    string | number | boolean | null | undefined
>;

export const useUpdateSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (newParams: SearchParams, overwrite = false, pathname= '') => {
        const params = overwrite
            ? new URLSearchParams()
            : new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                params.delete(key);
                return;
            }

            params.set(key, String(value));
        });

        const query = params.toString();

        router.push(query ? `${pathname}?${query}` : pathname);
    };
};
