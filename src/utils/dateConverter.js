import { dates } from '../vars/date';

export default function (value) {
    let res;
    if (value === 'DAY') {
        res = (1000*3600*24)
    } else if (value === 'WEEK') {
        res = 1000*3600*24*7
    } else if (value === 'MONTH') {
        res = 1000*3600*24*30
    } else if (value === 'SEASON') {
        res = 1000*3600*24*90
    }
    
    return res
}