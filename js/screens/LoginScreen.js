'use strict';

var React = require('react-native');
var {
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;

var store = require('react-native-simple-store')

var styles = require('../styles')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            email: '',
            password: ''
        }
    },

    _onPressButton: function(e) {

        this.props.container.get('USERS_SERVICE').login(this.state.email, this.state.password)
        .then((response) => response.json())
        .then((responseData) => {
            store.save('token', responseData.auth_token)
            .then(() => {
                this.props.container.get('USERS_SERVICE').setToken(responseData.auth_token)
                this.props.container.get('EXPENSES_SERVICE').setToken(responseData.auth_token)
                this.props.container.get('CATEGORIES_SERVICE').setToken(responseData.auth_token)
                this.props.onLogged()
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .done()
    },

    render: function() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.field}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email} />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.field}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password} />

                <TouchableHighlight
                    onPress={this._onPressButton}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
});
