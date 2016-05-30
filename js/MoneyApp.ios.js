import React, { Component } from 'react'
import {
    AppRegistry,
    NavigatorIOS,
    Text,
    View
} from 'react-native'

import Drawer from 'react-native-drawer'
import store from 'react-native-simple-store'

import Startup from './js/s/Startup'
import Login from './js/s/Login'
import Overview from './js/s/Overview'
import Expenses from './js/s/Expenses'
import Menu from './js/s/Menu'

import styles from './js/styles'

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
        const { navigator, drawer } = this.refs
        if(route == 'overview')
            navigator.push({
                title: 'Overview',
                component: Overview,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        if(route == 'expenses')
            navigator.push({
                title: 'Expenses',
                component: Expenses,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        drawer.close()
    },

    render() {
        const { user, autoRehydrated } = this.props

        if(! autoRehydrated)
            return <Startup />

        let menu = <Menu onItemClick={this.navigate} />
        let component = <Login onLogged={this.onLogged} />

        if(user.isLogged) {
            let initialRoute = {
                title: 'Overview',
                component: Overview,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            }

            component = <Drawer ref='drawer'
                            openDrawerOffset='.25'
                            content={menu}>
                            <NavigatorIOS
                                ref='navigator'
                                style={styles.navigator}
                                initialRoute={initialRoute} />
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
