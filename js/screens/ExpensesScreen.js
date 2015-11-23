'use strict';

var React = require('react-native');
var {
    View,
    ListView,
    Text,
    TouchableHighlight,
} = React;

var styles = require('../styles')

module.exports = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                Expenses
                </Text>
            </View>
        );
    }
});
