function sortData(arr) {
    for (let i = 0; i <= 2; i++) {
        arr.sort(function (b, a) {
            a = a.periodOfExecution.split("-");
            b = b.periodOfExecution.split("-");
            return a[i] > b[i] ? -1 : a[i] < b[i] ? 1 : 0;
        });
    }
    return arr;
}
export default sortData;
