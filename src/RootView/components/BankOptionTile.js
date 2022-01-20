import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';

import Text from '../../components/Text';
import banks, { getBank } from '../../assets/bank';
import colors from '../../vars/color';

export default function BankOptionTile({ bank, current, onPress }) {
	const [ icon, setIcon ] = useState();

	useEffect(() => {
		if (bank.BankName !== 'all') {
			const bankObj = banks.filter(e => {
				return e.name === bank.BankName
			});
	
			setIcon(bankObj[0].icon);
		}
	}, []);

	const _onPress = () => {
		onPress && onPress(bank.BankName);
	}

	if (bank.BankName !== 'all') {
		return (
			<Pressable style={[styles.container, {borderColor: bank.BankName === current ? '#b3ecff' : '#e2e2e2' }]} onPress={_onPress}>
				<Image source={icon} style={{width: 21, height: 26}}/>
				<Text style={{marginRight: 10, color: colors.code1}}>{getBank(bank.BankName).label}</Text>
			</Pressable>
		)
	} else {
		return (
			<Pressable style={[styles.container, {borderColor: 'all' === current ? '#b3ecff' : '#e2e2e2' }]} onPress={() => onPress('all')}>
				<View style={{flex: 1}}>
					<Text style={{marginRight: 10, color: colors.code1}}>همه بانک ها</Text>
				</View>
			</Pressable>
		)
	}
	
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		borderRadius: 3,
		marginBottom: 10,
		marginTop: 10,
		flexDirection: 'row-reverse',
		alignItems: 'center',
		borderWidth: 2,
		paddingLeft: 15,
		paddingRight: 15
	}
})