/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React;

var Drawer = require('react-native-drawer')
var store = require('react-native-simple-store')

var LoginScreen = require('./js/screens/LoginScreen')
var OverviewScreen = require('./js/screens/OverviewScreen')
var ExpensesScreen = require('./js/screens/ExpensesScreen')
var MenuScreen = require('./js/screens/MenuScreen')

var { container } = require('./js/container')
var styles = require('./js/styles')

var Money = React.createClass({

    getInitialState: function() {
        return { logged: false, started: false}
    },

    onLogged: function() {
        store.get('token').then((token) => {
            if(token) {
                container.get('USERS_SERVICE').setToken(token)
                container.get('EXPENSES_SERVICE').setToken(token)
                container.get('CATEGORIES_SERVICE').setToken(token)
            }
            this.setState({started: true})
        });
    },

    closeMenu: function(){
        this.refs.drawer.close()
    },

    openMenu: function(){
        this.refs.drawer.open()
    },

    navigate: function(route) {
        if(route == 'overview')
            this.refs.navigator.push({
                title: 'Overview',
                passProps: {container: {container}}
                component: OverviewScreen,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        if(route == 'expenses')
            this.refs.navigator.push({
                title: 'Expenses',
                passProps: {container: {container}}
                component: ExpensesScreen,
                leftButtonIcon:require('./img/menu_button.png'),
                onLeftButtonPress: this.openMenu
            })

        this.refs.drawer.close()
    },

    render: function() {

        if(! this.state.started)
            return <StartupScreen />

        var menu = <MenuScreen onItemClick={this.navigate} />
        var component = <LoginScreen
                            container={container}
                            onLogged={this.onLogged} />

        if(container.get('USERS_SERVICE').isLogged()) {
            var initialRoute = {
                title: 'Overview',
                passProps: {container: {container}}
                component: OverviewScreen,
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
});

AppRegistry.registerComponent('Money', () => Money);
