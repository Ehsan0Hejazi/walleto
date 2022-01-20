import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export default function (Query) {
  return new Promise(async (resolve, reject) => {
    const db = await SQLite.openDatabase(
      {
        name: 'WalletDB.db',
        location: 'default',
        createFromLocation: '~www/WalletDB.db'
      },
    );

    await db.transaction(tx => {
      tx.executeSql(
        Query, [],
        (tx, results) => {
          resolve(results)
        },
        (error) => {
          reject(error);
        }
      );
    });
  })

}