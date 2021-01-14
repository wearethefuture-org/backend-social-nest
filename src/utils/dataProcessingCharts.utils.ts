import moment = require("moment");

export const processedData = (filterDto, data: any[]) => {
    const dataObj = {};
    data.map((item) => {
        return dataObj[item.date] = item.count;
    })

    const processedData = [];
    const step = filterDto.step;
    const start = moment(filterDto.startDate);
    const end = moment(filterDto.endDate);
    let sumCount = 0;

    for (start; start.isSameOrBefore(end, step); start.add(1, step)) {
        const date = start.format(step === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM');
        if (dataObj[date]) {
            const count = Number(dataObj[date])
            sumCount += count;
            processedData.push({ date, sumCount, count })
            continue;
        }

        processedData.push({ date, sumCount, 'count': 0 })
    }

    return processedData;
}