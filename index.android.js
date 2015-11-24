/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    ToolbarAndroid,
    BackAndroid,
    Navigator,
    StyleSheet,
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

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
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
                <OverviewScreen
                    style={{flex: 1}}
                    container={container}
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
                <ExpensesScreen
                    style={{flex: 1}}
                    container={container}
                    navigator={navigationOperations} />
            </View>
        );
    }
};

var Money = React.createClass({

    containerDidMount: function() {
        this.props.container.get('USERS_SERVICE').updateToken()
        this.props.container.get('EXPENSES_SERVICE').updateToken()
        this.props.container.get('CATEGORIES_SERVICE').updateToken()
    },

    getInitialState: function() {
        return { logged: false }
    },

    onLogged: function() {
        this.props.container.get('USERS_SERVICE').updateToken()
        this.props.container.get('EXPENSES_SERVICE').updateToken()
        this.props.container.get('CATEGORIES_SERVICE').updateToken()
        this.setState({ logged: true })
    },

    closeMenu: function(){
        this.refs.drawer.close()
    },

    openMenu: function(){
        this.refs.drawer.open()
    },

    navigate: function(route) {
        _navigator.push({name: route, openMenu: this.openMenu})
        this.refs.drawer.close()
    },

    render: function() {

        var menu = <MenuScreen onItemClick={this.navigate} />
        var component = <LoginScreen
                            container={container}
                            onLogged={this.onLogged} />

        if(this.state.logged) {
            var initialRoute = {name: 'overview', openMenu: this.openMenu}
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
});

AppRegistry.registerComponent('Money', () => Money);
