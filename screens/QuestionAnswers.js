import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Loading from 'react-native-whc-loading';
import { Question, Header } from '../components';
import { blue } from '../utils/constants';

export default class QuestionAnswers extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      current: 0,
      answer: {}
    }
  }

  handleNext = (count, isNext) => {
    const { current,answer } = this.state;
    if(isNext && !answer[current]) return false;
    this.setState((state) => ({current: state.current + count}));
  }

  handleChange = (option, i) => {
      this.setState((state) => ({answer: {...state.answer, [i]: option}}));
  }

  shuffle = (options) => {
    let ctr = options.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = options[ctr];
        options[ctr] = options[index];
        options[index] = temp;
    }
    return options;
}

  getRandomOptions(allQuetions) {
      return allQuetions.map(q => ({
        question: q.question,
        options: this.shuffle([...q.incorrect_answers, q.correct_answer]),
        correct_answer: q.correct_answer
      }));
  }

  getQuestions() {
    this.refs.loading.show();
    axios("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple").then(response => {
      this.refs.loading.close();
      this.setState({questions: this.getRandomOptions(response.data.results)});
    }).catch(error =>{
      this.refs.loading.close();
    });
  }

  componentDidMount(){
    this.getQuestions();
  }

  playAgian() {
    this.setState({questions: [], current: 0, answer: {}}, () => {
      this.getQuestions();
    });
  }

  getResult = () => {
    const {answer, questions, current} = this.state;
    if(!answer[current]) return false;
    let count = 0;
    questions.forEach((question, i) => {
      if(question.correct_answer === answer[i]) {
        count = count + 1;
      }
    })
    this.props.navigation.navigate('ResultScreen',{totalQuestion: questions.length, correctAnswer: count, onGoBack: () => this.playAgian()});
  }

  renderQuestions = () => {
    const { questions, current, answer } = this.state;
    return questions.map((q, i) => (
      current === i ? 
        <Question 
          key = {i}
          question={q} 
          totalQuestion={questions.length} 
          currentIndex={i} 
          handleChange={(a) => this.handleChange(a, i)} 
          selected={answer[i]} 
          questions = {questions}
          current = {current}
          onPreviousPress= {() => this.handleNext(-1)}
          onNextPress= {() => this.handleNext(1, true)}
          onFinishPress = {() => this.getResult}
        /> : 
        null
    ))
  }
  render() {
    const { questions, current, answer } = this.state;
    console.log("current :: ", current);
    
    return (
      <View style={styles.container}>
        <Header 
          headerText = {current + 1 + ' OF ' + questions.length} 
          questions = {questions}
          current = {current}
          onPreviousPress= {() => this.handleNext(-1)}
          onNextPress= {() => this.handleNext(1, true)}
          onFinishPress = {() => this.getResult()}
        />
        {this.renderQuestions()}
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nextPrevButtonStyle:{
    flex:1, 
    justifyContent: 'center', 
    alignItems:'center', 
    height:50,
    backgroundColor: blue,
    margin: 10,
    borderRadius: 10
  },
  nextPrevButtonTextStyle:{
    color: 'white',
    fontWeight:'900', 
    fontSize:18,
  }
});
