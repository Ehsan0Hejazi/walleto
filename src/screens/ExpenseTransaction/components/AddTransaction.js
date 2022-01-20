import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { connect } from 'react-redux';

import Text from '../../../components/Text';
import InputLabel from '../../../components/InputLabel';
import DropDownMenu from '../../../components/DropDownMenu';
import CategorySelectorModal from '../../../components/CategorySelectorModal';
import CategorySelectorButton from '../../../components/CategorySelectorButton';
import BankSelectorModal from '../../../components/BankSelectorModal';
import BankSelectorButton from '../../../components/BankSelectorButton';
import categories from '../../../assets/categories';

function AddTransaction({ accounts, modal }) {
  const initialCat = Object.keys(categories)[0];
  const initialAcc = accounts[0];

  const [ visibleCats, setVisibleCats ] = useState(false);
  const [ visibleBanks, setVisibleBanks ] = useState(false);

  const [ kind, setKind ] = useState(modal.kind);
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState(initialCat);
  const [ amount, setAmount ] = useState();
  const [ account, setAccount ] = useState(initialAcc);

  const _category = cat => {
    setCategory(cat);
    setVisibleCats(false);
  }

  const _bank = acc => {
    setAccount(acc);
    setVisibleBanks(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={{paddingLeft: 20, paddingRight: 20}} 
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>افزودن تراکنش</Text>
        </View>

        <Text style={styles.label}>نوع</Text>
        <DropDownMenu 
          options={[
            'هزینه',
            'درآمد',
            'جیب به جیب'
          ]} 
          initialState={modal.kind}
          onChange={ val => setKind(val) }
        />

        <InputLabel label="شرح" defaultValue={modal.description} />
        
        <Text style={styles.label}>دسته بندی</Text>
        <CategorySelectorButton  onPress={() => {setVisibleCats(true)}} category={category} />

        <InputLabel label="مبلغ" defaultValue={modal.amount} />

        <Text style={styles.label}>شماره حساب</Text>
        {/* send accounts value available into user reducer  */}
        <BankSelectorButton  onPress={() => {setVisibleBanks(true)}} account={account} /> 

        <View style={{height: 20}}></View>
      </ScrollView>

      <Pressable style={styles.submitButton}>
        <Image 
          source={require('../../../assets/plus.png')}
          style={{width: 15, height: 15, tintColor: '#ffffff'}}
        />
        <Text style={{color: '#ffffff', marginRight: 12}}>افزودن تراکنش</Text>
      </Pressable>

      <CategorySelectorModal onChoose={_category} visible={visibleCats}/>
      <BankSelectorModal onChoose={_bank} visible={visibleBanks} accounts={accounts}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  headerText: {
    color: '#1f3f60'
  },
  label: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 7,
    marginTop: 20
  },
  submitButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#1f3f60',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
})

const mapStateToProps = state => ({
  accounts: state.user.accounts,
  modal: state.controller.modal.initialValues
});

export default connect(mapStateToProps)(AddTransaction);