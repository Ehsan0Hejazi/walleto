import { useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';


export default function useDB(Query, CallBack) {
  const [ db, setDB ] = useState();

  useEffect(() => {
    connectDB();

  }, []);

  const connectDB = () => {
    const getDB = SQLite.openDatabase(
      {
        name: 'WalletDB.db',
        location: 'default',
        createFromLocation: '~www/WalletDB.db'
      },
    );

    setDB(getDB);
  }

  useEffect(() => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(Query, [], (tx, results) => {
          CallBack(results)
        });
      });
    }
  }, [db])
}