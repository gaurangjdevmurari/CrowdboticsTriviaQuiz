import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from './Button';
import { blue } from '../utils/constants';

const Question = ({question, handleChange, selected}) => {    
    return (
        <View style={{ backgroundColor: '#F5FCFF', flex:1 }}>
            <View style={{ margin:20 }}>
            <Text style={{ color: blue, fontSize:16, fontWeight:"500" }}>{question.question}</Text>
            </View>
            <View style={{ marginTop:30 }}>
            {question.options.map((option, i) => (
                <Button text={option}
                    onPress={() => handleChange(option)} key={i}
                    cardStyle={[styles.commanButtonCardStyle, selected !== option ? styles.enterButtonDisableCardStyle : styles.enterButtonCardStyle]}
                    btnStyle={selected !== option ? styles.enterButtonDisableStyle : styles.enterButtonStyle}
                />
            ))}
            </View>
        </View>         
    );
};
const styles = StyleSheet.create({
    commanButtonCardStyle: {
        margin: 5,
        borderRadius: 10,
    },
    enterButtonCardStyle: {
        backgroundColor: blue,
        elevation: 0
    },
    enterButtonDisableCardStyle: {
        backgroundColor: 'white',
        shadowColor: blue,
        elevation: 10
    },
    enterButtonStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight:'300'
    },
    enterButtonDisableStyle: {
        color: blue,
        fontSize: 15,
        fontWeight:'300'
    },
});
export {Question};
