const TimerCount = (year, mounth, day) => {
    const dateEndTime = Date.parse(new Date(year, mounth - 1, day));
    const dateCurrentTime = Date.parse(new Date());
    const getTime = dateEndTime - dateCurrentTime;
    const deadline = getTime / (24 * 60 * 60 * 1000);
    const hours = Math.floor((getTime / (1000 * 60 * 60)) % 24);
    const timer = (time) => {
        if (time === 1) {
            return `${time} день`;
        }
        if (time > 1 && time < 5) {
            return `${time} дня`;
        }
        if (time > 4 || (25 && time < 21)) {
            return `${time} дней`;
        }
    };
    return deadline > 0 && deadline < 1
        ? hours + " часов"
        : timer(Math.floor(deadline));
};

export default TimerCount;
