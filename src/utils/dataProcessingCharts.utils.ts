import moment = require('moment');
import { AnalyticsFilterDto } from '../analytics/dto/analytics-filter.dto';

export const processedData = (filterDto: AnalyticsFilterDto, data: object[]) => {
  const dataObj = {};
  data.map(item => {
    return (dataObj[item['date']] = item['count']);
  });

  const processedData = [];
  const { step, startDate, endDate } = filterDto;
  const start = moment(startDate).utc().startOf('day');
  const end = moment(endDate).utc().endOf('day');
  let sumCount = 0;

  for (start; start.isSameOrBefore(end, step); start.add(1, step)) {
    const date = start.format(step === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM');
    if (dataObj[date]) {
      const count = Number(dataObj[date]);
      sumCount += count;
      processedData.push({ date, sumCount, count });
      continue;
    }

    processedData.push({ date, sumCount, count: 0 });
  }

  return processedData;
};
