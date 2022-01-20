import  { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

export default function useSMS(callBack) {
  const [ permission, setPermission ] = useState(); 

  useEffect(() => {
    const getPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const filter = {
          minDate: Date.now() - 7776000000, //equel to 3 months ago
          maxDate: Date.now()
        }

        SmsAndroid.list(
          JSON.stringify(filter),
          (fail) => {
            console.log('Failed with this error: ' + fail);
          },
          async (count, smsList) => {
            const arr = JSON.parse(smsList);
            callBack(arr);
          },
        );
        
      } else {
        getPermission();
      }
    }

    getPermission();
  }, []);
}