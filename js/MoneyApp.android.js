import React, { Component } from 'react'
import {
    AppRegistry,
    ToolbarAndroid,
    BackAndroid,
    Navigator,
    Text,
    View
} from 'react-native'

import Drawer from 'react-native-drawer'
import store from 'react-native-simple-store'

import Startup from './js/screens/Startup'
import Login from './js/screens/Login'
import Overview from './js/screens/Overview'
import Expenses from './js/screens/Expenses'
import ExpenseDetails from './js/screens/ExpenseDetails'
import Menu from './js/screens/Menu'

import styles from './js/styles'

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

const RouteMapper = function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations
    if (route.name === 'overview') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('./img/menu_button.png')}
                    onIconClicked={route.openMenu}
                    style={styles.toolbar}
                    titleColor="white"
                    title="Overview" />
                <Overview
                    style={{flex: 1}}
                    navigator={navigationOperations} />
            </View>
        );
    }
    else if (route.name === 'expenses') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('./img/menu_button.png')}
                    onIconClicked={route.openMenu}
                    style={styles.toolbar}
                    titleColor='white'
                    title='Expenses' />
                <Expenses
                    style={{flex: 1}}
                    navigator={navigationOperations} />
            </View>
        );
    }
    else if (route.name === 'expense_details') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    navIcon={require('./img/nav_bar_back_arrow.png')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor='white'
                    title='Expense Details' />
                <ExpenseDetails
                    style={{flex: 1}}
                    expense={route.expense}
                    navigator={navigationOperations} />
            </View>
        );
    }
};

class MoneyApp extends Component {

    constructor(props) {

    }

    componentDidMount() {

    }

    onLogged() {

    }

    closeMenu(){
        this.refs.drawer.close()
    }

    openMenu(){
        this.refs.drawer.open()
    }

    navigate(route) {
        _navigator.push({name: route, openMenu: this.openMenu})
        this.refs.drawer.close()
    }

    render() {
        const { user, autoRehydrated } = this.props

        if(! autoRehydrated)
            return <Startup />

        let menu = <Menu onItemClick={this.navigate} />
        let component = <Login onLogged={this.onLogged} />

        if(user.isLogged) {
            let initialRoute = {name: 'overview', openMenu: this.openMenu}
            component = <Drawer ref='drawer'
                            openDrawerOffset='.25'
                            content={menu}>
                            <Navigator
                                style={styles.navigator}
                                initialRoute={initialRoute}
                                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                                renderScene={RouteMapper} />
                        </Drawer>
        }

        return component
    }
}

function stateToProps(state) {
  let { users, autoRehydrated } = state
  return { users, autoRehydrated }
}
export default connect(stateToProps, null)(MoneyApp)
