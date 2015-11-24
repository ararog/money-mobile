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

var styles = require('./js/styles')

var Money = React.createClass({

    getInitialState: function() {

        return { logged: false }
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
        if(route == "overview")
            this.refs.navigator.replacePrevious({title: "Overview", component: OverviewScreen})

        if(route == "expenses")
            this.refs.navigator.replacePrevious({title: "Expenses", component: ExpensesScreen})

        this.refs.drawer.close()
    },

    render: function() {

        var menu = <MenuScreen onItemClick={this.navigate} />
        var component = <LoginScreen
                            onLogged={this.onLogged} />

        if(this.state.logged) {
            var initialRoute = {title: 'Overview', component: OverviewScreen, passProps: {openMenu: this.openMenu}}
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
