// @ts-nocheck
import React, { Component } from 'react';
import {
  View, 
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import 'moment/locale/pt-br';
import Task from '../components/Task';
import AddTask from './AddTask';
import todayImage from '../../assets/imgs/month.jpg';
import globalStyle from '../globalStyles';

export default class Agenda extends Component {


  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  }



  addTask = task => {
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: task.desc,
      estimateAt: task.date,
      doneAt: null,
    })

    this.setState({ tasks, showDoneTasks: false }, this.filterTasks);
  }



  deleteTask = id => {
    const list = [...this.state.tasks];
    const updateList = list.map(item => {
      if(item.id === id) item = null;
      return item;
    })
    const tasks = updateList.filter(item => item !== null);
    this.setState({ tasks }, this.filterTasks);
  }




  filterTasks = () => {
    let visibleTasks = null;
    if(this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({ visibleTasks });
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }



  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  }



  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('tasks');
    const tasks = JSON.parse(data) || [];
    this.setState({ tasks }, this.filterTasks);
  }



  toggleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if(task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    });

    this.setState({ tasks }, this.filterTasks);
  }


  onShow = () => {
    if(this.state.showAddTask) {
      this.setState({ showAddTask: false })
     } else {
      this.setState({ showAddTask: true });
     } 
  }




  render() {
    return (
      <SafeAreaView style={StyleSheet.container}>
        <AddTask 
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onShow={this.onShow}
        />
        <View style={styles.backgroundContainer}>
          <ImageBackground source={todayImage} style={styles.background}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.toggleFilter} style={styles.toggleFilter}>
                <Icon 
                  name={this.state.showDoneTasks ? 'eye':'eye-slash'}
                  size={20} 
                  color={globalStyle.colors.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Hoje</Text>
              <Text style={styles.subtitle}>
                {moment().locale('pt-br').format('ddd, D [de] MMMM')}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.taskContainer}>
          <FlatList 
            data={this.state.visibleTasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => 
              <Task { ...item } onToggleTask={this.toggleTask} onDelete={this.deleteTask} /> }
          />
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={() => this.setState({ showAddTask: true })}>
          <Icon name="plus" color="#FFF" size={20} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundContainer: {
    height: '30%'
  },

  background: {
    flex: 1
  },

  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  toggleFilter: {
    paddingVertical: 5,
  },

  title: {
    fontFamily: 'lato-regular',
    color: globalStyle.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10,
  },

  subtitle: {
    fontFamily: 'lato-regular',
    color: globalStyle.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },

  taskContainer: {
    // flex: 1,
    height: '70%',
    backgroundColor: '#FFF'
  },

  iconBar: {
    // flex: 1,
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  actionButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: globalStyle.colors.default,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1.23,
    elevation: 12,
  },

});

