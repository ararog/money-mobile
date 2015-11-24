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

    _onPressButton: function(e) {

        const email = this.refs.email.value
        const password = this.refs.password.value

        this.props.container.get('USERS_SERVICE').login(email, password)
        .then(response => {
            store.save('token', response.body.auth_token)
            .then(() => {
                this.props.onLogged()
            });
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    render: function() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.field}
                    ref='email' />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.field}
                    ref='password' />

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
