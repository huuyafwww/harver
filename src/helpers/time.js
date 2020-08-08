import moment from 'moment';
import { timeFormatOption } from '@config';

const millisecond2second = (
    millisecond,
    secondDigit = 1000,
    roundDigit = 100
) => {
    return Math.round((millisecond / secondDigit) * roundDigit) / roundDigit;
};

const date2time = dateStr => {
    return moment(dateStr).format(timeFormatOption);
};

export { millisecond2second, date2time };
