function getNumOrTime(time) {
    const newNum = time.split(".");
    const parseEndTime = new Date(newNum[2], newNum[1] - 1, newNum[0]);
    function getDayCount(dateEndTime) {
        const dateCurrentTime = Date.parse(new Date());
        const getTime = Date.parse(dateEndTime) - dateCurrentTime;
        const deadline = Math.floor(getTime / (24 * 60 * 60 * 1000));
        return deadline;
    }
    const styleEndTime = (color) => ({
        padding: "0px",
        borderRadius: "15px",
        boxShadow: `0px 0px 15px 15px ${color}`,
        background: color
    });
    if (getDayCount(parseEndTime) > 1) {
        return styleEndTime("#ffffff");
    }
    return styleEndTime("#f72819ac");
}
export default getNumOrTime;
