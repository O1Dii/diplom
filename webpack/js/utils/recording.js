export const getRecordingEndTime = (events) => {
    if (events.length === 0) {
        return 0;
    }

    return Math.max(
        ...events.map(event => event.time + event.duration),
    );
};