export const currentDate = () => {
    const options: any = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const formattedDate = new Date().toLocaleString('en-US', options)
    return formattedDate
}