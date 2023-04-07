export function minutesToString(minutes: number) {
    let minutesLabel = 'минут';
    if (minutes % 10 >= 2 && minutes % 10 <= 4) {
        minutesLabel = 'минуты'
    } else if (minutes % 10 === 1) {
        minutesLabel = 'минута'
    }
    return `${minutes} ${minutesLabel}`;
}

export function clean(target: string) {
    return target.toLowerCase()
        .replace(/[^a-zA-ZА-ЯЁёа-я0-9 ]/g, '')
        .trim()
        .replace(/\s+/, ' ');
}

export function clean_words(target: string) {
    if (target) {
        return clean(target).split(' ');
    }
    return []
}
export function getEmbedLink(link?: string) {
    if (link) {
        const url = new URL(link);
        const urlParams = new URLSearchParams(url.search);
        return `https://www.youtube.com/embed/${urlParams.get('v')}?mute=1`;
    }
}