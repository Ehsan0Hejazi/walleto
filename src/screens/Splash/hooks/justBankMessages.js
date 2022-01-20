import banks from '../../../assets/bank';
import validator from 'validator';


function includesNumber(value) {
  var re = /\d/;
  return re.test(value);
}

export default function (arr) {
  const reduced = arr.map(element => {
    const newBody = element.body.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
    return {
      body: newBody,
      date: element.date,
      number: element.address
    }
  });

  const bankMessages = reduced.filter(sms => {
    const firstLine = sms.body.split('\n')[0];
    const includeBank = firstLine.includes('بانک');
    const includeBalance = sms.body.split('\n').some(line => {
      return (line.includes('موجود') || line.includes('مانده'));
    });
    const notMobile = !validator.isMobilePhone(sms.number, 'fa-IR');
    const mayBank = sms.number.includes('+98999') || sms.number.includes('98999');

    return (includeBank && includeBalance && !includesNumber(firstLine) && notMobile || mayBank);
  });

  const categorizedBanksMessages = banks.map(bank => {
    const singleBankMessages = bankMessages.filter(msg => {
      return msg.body.split('\n')[0].includes(bank.label);
    });

    if (singleBankMessages.length > 0) {
      return {
        bankName: bank.name,
        messages: singleBankMessages,
      }
    }
  });
  
  const result = categorizedBanksMessages.filter (element => {
    return element
  })

  return result
}