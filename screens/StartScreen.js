import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Header, Button } from './../components/';
import {blue} from '../utils/constants';
import QuestionAnswers from './QuestionAnswers';
import ResultScreen from './ResultScreen';

class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
    render() {
        return (
        <View style={styles.container}>
            <Header  headerText='Trivia Quiz'/>
            <SafeAreaView style={{ flex:1, justifyContent: 'flex-end' }}>
                <Button text='START'
                    onPress={() => this.props.navigation.navigate('QuestionAnswers')}
                    cardStyle={styles.enterButtonCardStyle}
                    btnStyle={styles.enterButtonStyle}
                />
            </SafeAreaView>
        </View>
        );
    }
}

const AppNavigator = createStackNavigator({
  Home: StartScreen,
  QuestionAnswers: QuestionAnswers,
  ResultScreen: ResultScreen
},{
    initialRouteName: "Home",
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);

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