type RequestOptions = Omit<RequestInit, "body"> & {
    params?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
};

const BASE_URL = process.env.NEXT_API_URL ?? "http://localhost:5000/api";

export const fetchBaseQuery = async <T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> => {
    const { params, body, headers, ...rest } = options;

    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        });
    }

    const response = await fetch(url, {
        ...rest,

        headers: {
            "Content-Type": "application/json",
            ...headers,
        },

        body: body !== undefined
            ? JSON.stringify(body)
            : undefined,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
};