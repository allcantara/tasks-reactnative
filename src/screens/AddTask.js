import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  DatePickerIOS,
  DatePickerAndroid,
  Platform
} from 'react-native';
import moment from 'moment';
import globalStyle from '../globalStyles';

const initialState = { desc: '', date: new Date() }

export default class AddTask extends Component {

  state = {...initialState}


  save = () => {
    if(!this.state.desc.trim()) {
      Alert.alert("Dados inválidos!", "Informe uma descrição para a tarefa...");
      return;
    }
    const data = {...this.state}
    this.props.onSave(data);
    this.props.onShow();
    this.setState({...initialState});
  }


  handleDatepickerAndroid = async () => {
    await DatePickerAndroid.open({
      date: this.state.date,
    }).then(event => {
      if(event.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date);
        momentDate.date(event.day);
        momentDate.month(event.month);
        momentDate.year(event.year);
        this.setState({ date: momentDate.toDate() });
      }
    })
  }



  render() {

    let datePicker = null;
    if(Platform.OS === 'ios') {
      datePicker = <DatePickerIOS mode="date" date={this.state.date} onDateChange={date => this.setState({ date })} />
    } else {
      datePicker = (
        <TouchableOpacity onPress={this.handleDatepickerAndroid}>
          <Text style={styles.date}>
            {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
          </Text>
        </TouchableOpacity>
      )
    }



    return (
      <Modal
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa!</Text>
          <TextInput
            placeholder="Descrição..."
            placeholderTextColor="#333"
            style={styles.input}
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
          />
          {datePicker}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.button} onPress={this.props.onCancel}>
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.save}>
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.offset}></View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  offset: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  button: {
    margin: 20,
    marginRight: 30,
    backgroundColor: '#FFF',
    borderColor: globalStyle.colors.default,
    borderWidth: 0.4,
    borderRadius: 6,
    paddingHorizontal: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    elevation: 7,
  },

  textButton: {
    color: globalStyle.colors.default,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  header: {
    width: '100%',
    fontFamily: 'lato-regular',
    backgroundColor: globalStyle.colors.default,
    color: globalStyle.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },

  input: {
    fontFamily: 'lato-regular',
    width: 350,
    height: 40,
    marginTop: 18,
    marginLeft: 10,
    backgroundColor: '#FFF',
    borderColor: globalStyle.colors.default,
    borderWidth: 0.6,
    borderRadius: 6,
    paddingHorizontal: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    elevation: 7,
  },

  date: {
    width: 350,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderColor: globalStyle.colors.default,
    borderWidth: 0.6,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 20,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.3,
    elevation: 7,
  }

});
