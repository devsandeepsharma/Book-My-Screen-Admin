export const formatDate = (date) => {
    const dateObj = new Date(date);
    return `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
};

export const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    
    const timeDate = new Date();
    timeDate.setHours(+hour);
    timeDate.setMinutes(+minute);

    return timeDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
        });
}