import React from 'react';
import { Text, View, Platform, TouchableOpacity} from 'react-native';
import {blue} from '../utils/constants';

const Header = ({headerText, questions, current, onPreviousPress, onNextPress, onFinishPress}) => {
    const {viewStyle, textStyle} = styles;
    let renderPreviousView = (onPreviousPress) => {
        return(
            <TouchableOpacity onPress={onPreviousPress} >
                <Text style={textStyle}>
                Previous
                </Text>
            </TouchableOpacity> 
        )        
    }
    let renderNextView = (onNextPress) =>  {
        return(
            <TouchableOpacity onPress={onNextPress}>
                <Text style={textStyle}>
                    Next
                </Text>
            </TouchableOpacity>
        )
    }
    let renderFinishView = (onFinishPress) =>  {
        return(
            <TouchableOpacity onPress={onFinishPress}>
                <Text style={textStyle}>
                    Finish
                </Text>
            </TouchableOpacity>
        )
    }
  return (
        <View style={viewStyle} >
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, height:60, marginBottom: 5,}}>
            {current > 0 && renderPreviousView(onPreviousPress)}
            </View>
            
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, height:60, marginBottom: 5}}>
                <Text style={textStyle}>{headerText}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, height:60, marginBottom: 5,}}>
            {questions !== undefined && current !== questions.length - 1 && current < questions.length && renderNextView(onNextPress)}
            {questions !== undefined && current === questions.length - 1  && renderFinishView(onFinishPress)}
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: blue, 
        height: 70, 
        flexDirection: 'row', 
        alignItems: 'space-between',
        position: 'relative',
        marginTop: Platform.OS === 'ios' ? 0 : 24,

    },
    textStyle : {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '900',
    }
};

export {Header};
