const banks = [
  {
    name: 'eghtesad',
    icon: require('./egh.png'),
    label: 'بانک اقتصادنوین',
  },
  {
    name: 'iran',
    icon: require('./ira.png'),
    label: 'بانک ایران زمین'
  },
  {
    name: 'ayandeh',
    icon: require('./aya.png'),
    label: 'بانک آینده'
  },
  {
    name: 'pasargad',
    icon: require('./pas.png'),
    label: 'بانک پاسارگاد'
  },
  {
    name: 'tejarat',
    icon: require('./tej.png'),
    label: 'بانک تجارت'
  },
  {
    name: 'day',
    icon: require('./day.png'),
    label: 'بانک دی'
  },
  {
    name: 'refah',
    icon: require('./ref.png'),
    label: 'بانک رفاه'
  },
  {
    name: 'saman',
    icon: require('./sam.png'),
    label: 'بانک سامان'
  },
  {
    name: 'sepah',
    icon: require('./sep.png'),
    label: 'بانک سپه'
  },
  {
    name: 'sarmayeh',
    icon: require('./sar.png'),
    label: 'بانک سرمایه'
  },
  {
    name: 'shahr',
    icon: require('./sha.png'),
    label: 'بانک شهر'
  },
  {
    name: 'saderat',
    icon: require('./sad.png'),
    label: 'بانک صادرات'
  },
  {
    name: 'sanat',
    icon: require('./san.png'),
    label: 'بانک صنعت و معدن'
  },
  {
    name: 'mehr',
    icon: require('./gha.png'),
    label: 'بانک قرض الحسنه مهر ایران'
  },
  {
    name: 'karafarin',
    icon: require('./kar.png'),
    label: 'بانک کارآفرینان'
  },
  {
    name: 'keshavarzi',
    icon: require('./kes.png'),
    label: 'بانک کشاورزی'
  },
  {
    name: 'gardeshgari',
    icon: require('./gar.png'),
    label: 'بانک گردشگری'
  },
  {
    name: 'markazi',
    icon: require('./mar.png'),
    label: 'بانک مرکزی'
  },
  {
    name: 'maskan',
    icon: require('./mas.png'),
    label: 'بانک مسکن'
  },
  {
    name: 'mellat',
    icon: require('./mel.png'),
    label: 'بانک ملت'
  },
  {
    name: 'parsian',
    icon: require('./par.png'),
    label: 'پارسیان بانک ایرانیان'
  },
  {
    name: 'melli',
    icon: require('./melli.png'),
    label: 'بانک ملی'
  },
  {
    name: 'ansar',
    icon: require('./ansar.png'),
    label: 'بانک تمام الکترونيک انصار'
  },
  {
    name: 'resalat',
    icon: require('./resalat.png'),
    label: 'بانک قرض الحسنه رسالت',
  },
  {
    name: 'sina',
    icon: require('./sina.png'),
    label: 'بانک سينا'
  }
];

export function getBank(bank) {
  return banks.filter(b => {
    return bank === b.name
  })[0]
}

export default banks;