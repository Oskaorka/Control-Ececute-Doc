function parseDate(time) {
    const newNum = time.split(".");
    const parseEndTime = new Date(newNum[2], newNum[1] - 1, newNum[0]);
    function getDayCount(dateEndTime) {
        const dateCurrentTime = Date.parse(new Date());
        const getTime = Date.parse(dateEndTime) - dateCurrentTime;
        const deadline = Math.floor(getTime / (24 * 60 * 60 * 1000));
        return deadline;
    }
    return getDayCount(parseEndTime);
}
export default parseDate;
