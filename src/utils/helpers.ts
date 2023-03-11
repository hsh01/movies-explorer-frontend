export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

export function minutesToString(minutes: number) {
    return `${Math.floor(minutes / 60)}ч ${zeroPad(minutes % 60, 2)}м`
}
