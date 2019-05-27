import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from './../components/';
import { blue } from "../utils/constants";
import { SafeAreaView } from "react-navigation";

export default class StartScreen extends React.Component {

    playAgain = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.navigate('QuestionAnswers');
    }

    render(){
        const {correctAnswer, totalQuestion} = this.props.navigation.state.params;
        return(
            <SafeAreaView style={{ flex:1, backgroundColor:'#F5FCFF', }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ color: blue, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Total Questions: {totalQuestion} </Text>
                    <Text style={{ color: blue, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Correct Answers: {correctAnswer}</Text>
                    <Text style={{ color: blue, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Percentage: {(correctAnswer*100)/totalQuestion}%</Text>
                </View>
                <Button text='Play Again'
                    onPress={() => this.playAgain()}
                    cardStyle={styles.enterButtonCardStyle}
                    btnStyle={styles.enterButtonStyle}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    enterButtonCardStyle: {
        backgroundColor: blue,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 25,
        elevation: 0
    },
    enterButtonStyle: {
        color: 'white',
        fontSize: 18,
    },
  });