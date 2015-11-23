'use strict';

var React = require('react-native');
var {
    View,
    Text,
    TouchableHighlight,
} = React;

var styles = require('../styles')

module.exports = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                Overview
                </Text>
            </View>
        );
    }
});
