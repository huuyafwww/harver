import moment from 'moment';
import { timeFormatOption } from '@config';

const ms2s = (millisecond, secondDigit = 1000, roundDigit = 100) => {
    return Math.round((millisecond / secondDigit) * roundDigit) / roundDigit;
};

const date2time = dateStr => {
    return moment(dateStr).format(timeFormatOption);
};

export { ms2s, date2time };
