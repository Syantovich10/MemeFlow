import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function transformVideoDuration(duration: string): string | null {
    const cleanDuration = duration.trim()

    if (!cleanDuration) return null

    const isAlreadyFormatted = /^\d+:\d{2}(?::\d{2})?$/.test(cleanDuration)
    if (isAlreadyFormatted) return cleanDuration

    const match = cleanDuration.match(
        /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i
    )

    if (!match) return null

    const hoursText = match[1]
    const minutesText = match[2]
    const secondsText = match[3]

    const hasTime =
        hoursText !== undefined ||
        minutesText !== undefined ||
        secondsText !== undefined

    if (!hasTime) return null

    const hours = Number(hoursText ?? 0)
    const minutes = Number(minutesText ?? 0)
    const seconds = Number(secondsText ?? 0)
    const addLeadingZero = (number: number) => String(number).padStart(2, "0")

    if (hours > 0) {
        return `${hours}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
    }

    return `${minutes}:${addLeadingZero(seconds)}`
}

export function transformViews(views: number) {
    return new Intl.NumberFormat('ru-RU').format(views)
}
