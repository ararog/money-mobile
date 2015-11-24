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

        store.save('token', 'blah').then(() => {
                this.props.onLogged()
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
