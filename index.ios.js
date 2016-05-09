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

var Startup = require('./js/s/Startup')
var Login = require('./js/s/Login')
var Overview = require('./js/s/Overview')
var Expenses = require('./js/s/Expenses')
var Menu = require('./js/s/Menu')

var { container } = require('./js/container')
var styles = require('./js/styles')

var Money = React.createClass({

    getInitialState: function() {
        return { logged: false, started: false}
    },

    componentDidMount: function() {
        store.get('token').then((token) => {
            if(token) {
                container.get('USERS_SERVICE').setToken(token)
                container.get('EXPENSES_SERVICE').setToken(token)
                container.get('CATEGORIES_SERVICE').setToken(token)
            }
            this.setState({started: true})
        });
    },

    onLogged: function() {
        this.setState({ logged: true })
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

    render: function() {

        if(! this.state.started)
            return <Startup />

        var menu = <Menu onItemClick={this.navigate} />
        var component = <Login
                            container={container}
                            onLogged={this.onLogged} />

        if(container.get('USERS_SERVICE').isLogged()) {
            var initialRoute = {
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
});

AppRegistry.registerComponent('Money', () => Money);
