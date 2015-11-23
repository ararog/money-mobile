'use strict';

var React = require('react-native');
var {
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;

var styles = require('../styles')

module.exports = React.createClass({

    _onPressButton: function(e) {

        this.props.navigator.push({name: 'overview', openMenu: this.props.openMenu})
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
