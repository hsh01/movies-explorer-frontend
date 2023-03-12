export function minutesToString(minutes: number) {
    let minutesLabel = 'минут';
    if (minutes % 10 >= 2 && minutes % 10 <= 4) {
        minutesLabel = 'минуты'
    } else if (minutes % 10 === 1) {
        minutesLabel = 'минута'
    }
    return `${minutes} ${minutesLabel}`;
}
