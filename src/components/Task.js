import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import globalStyle from '../globalStyles';


export default (props) => {

  let check = null;
  if(props.doneAt !== null) {
    check = (
      <View style={styles.done}>
        <Icon name="check" size={20} color={globalStyle.colors.secondary} />
      </View>
    )
  } else {
    check = <View style={styles.pending} />
  }



  const descStyle = props.doneAt !== null ? { ...styles.decription, textDecorationLine: 'line-through', color: '#555' } : {}
  

  const leftContent = [
    <TouchableOpacity 
      style={[styles.exclude, { justifyContent: 'flex-end' }]}
      onPress={() => props.onDelete(props.id)} >
      <Icon name="trash" size={20} style={{right: 10}} color="#FFF" />
      <Text style={styles.excludeText}>Excluir</Text>
    </TouchableOpacity>,
  ]

  const rightContent = [
    <TouchableOpacity 
      style={[styles.exclude, { justifyContent: 'flex-start', padding: 20 }]}
      onPress={() => props.onDelete(props.id)} >
      <Icon name="trash" size={25} style={{left: 7}} color="#FFF" />
    </TouchableOpacity>,
  ]



  return (
    <Swipeable
      leftContent={leftContent[0]}
      leftActionActivationDistance={200}
      onLeftActionActivate={() => props.onDelete(props.id)}
      rightButtons={rightContent}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>{check}</View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.decription, descStyle]} >
            {props.desc}
          </Text>
          <Text style={styles.date}>{moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#AAA'
  },

  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },

  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: '#555',
  },

  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },

  decription: {
    fontFamily: 'lato-regular',
    color: globalStyle.colors.mainText,
    fontSize: 15,
  },

  date: {
    fontFamily: 'lato-regular',
    color: globalStyle.colors.subText,
    fontSize: 12,
  },

  exclude: {
    flex: 1,
    backgroundColor: globalStyle.colors.default,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  excludeText: {
    color: '#FFF',
    fontSize: 20,
    margin: 10,
    right: 10
  },


});
