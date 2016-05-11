'use strict';

import React, {
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

export default class MoneyApp extends Component {

    constructor(props) {
        this.state = { logged: false, started: false}
    }

    componentDidMount() {
        store.get('token').then((token) => {
            if(token) {
                container.get('USERS_SERVICE').setToken(token)
                container.get('EXPENSES_SERVICE').setToken(token)
                container.get('CATEGORIES_SERVICE').setToken(token)
            }
            this.setState({started: true})
        });
    }

    onLogged() {
        this.setState({ logged: true })
    }

    closeMenu(){
        this.refs.drawer.close()
    }

    openMenu(){
        this.refs.drawer.open()
    }

    navigate(route) {
        if(route == 'overview')
            this.refs.navigator.push({
                title: 'Overview',
                passProps: {container: container},
                component: Overview,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        if(route == 'expenses')
            this.refs.navigator.push({
                title: 'Expenses',
                passProps: {container: container},
                component: Expenses,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        this.refs.drawer.close()
    },

    render() {

        if(! this.state.started)
            return <Startup />

        let menu = <Menu onItemClick={this.navigate} />
        let component = <Login
                            container={container}
                            onLogged={this.onLogged} />

        if(container.get('USERS_SERVICE').isLogged()) {
            let initialRoute = {
                title: 'Overview',
                passProps: {container: container},
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
