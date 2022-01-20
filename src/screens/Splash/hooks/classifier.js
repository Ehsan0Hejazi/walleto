import banks from '../../../assets/bank';

export default function (arr) {

  // arr[3].messages.forEach(msg => {
  //   console.log(msg.body)
  // });

  const bankObj = arr.map(bank => {
    const lastMessage = bank.messages[0].body;
    const lastMessageLines = lastMessage.split('\n');

    //undefiend lastmaeesage line lead to error for inculude not defined

    let balance = 0;
    let accountNumber = "";

    //extract balance
    lastMessageLines.forEach(line => {
      if (line.includes('موجودی') || line.includes('مانده')) {
        if (/\d/.test(line)) {
          balance = parseInt(line.replace(/\D/g, '').slice(0, -1));
        }
      }
    });

    //extract account number
    for (let i = 0; lastMessageLines.length > i; i++) {
      if (!lastMessageLines[i].includes(',') && /\d/.test(lastMessageLines[i])) {
        const tempAccount = lastMessageLines[i].replace(/\D/g, '');
        if (tempAccount.length > 4) {
          accountNumber = tempAccount;
          break;
        }
      }
    }

    // transaction extractor
    let cost = 0;
    let income = 0;

    const transactions = bank.messages.map(msg => {
      const body = msg.body;
      const bodyLines = body.split('\n');
      let priortized = false;
      
      const amountLine = bodyLines.filter(line => {
        return line.includes(',');
      });

      bodyLines.forEach(line => {
        if (line.includes('-') && line.includes(',')) {
          priortized = true
        }
      });

      if (priortized) {
        const intAmount = parseInt(amountLine[0].replace(/\D/g, ''));
        cost += intAmount;
        return {
          type: 'cost',
          amount: intAmount,
          date: msg.date,
        }
      }

      if (body.includes('برداشت')) {
        const intAmount = parseInt(amountLine[0].replace(/\D/g, ''));
        cost += intAmount;
        return {
          type: 'cost',
          amount: intAmount,
          date: msg.date,
        }
      }
      
      if (body.includes('واریز') || body.includes('+')) {
        const intAmount = parseInt(amountLine[0].replace(/\D/g, ''));
        income += intAmount;
        return {
          type: 'income',
          amount: intAmount,
          date: msg.date,
        }
      }
    });

    transactionsX = transactions.filter(tx => {
      if (tx) {
        return tx
      }
    })

    return {
      bankName: bank.bankName,
      balance,
      accountNumber,
      transactions: transactionsX,
      cost,
      income
    }
  });

  return bankObj;
}