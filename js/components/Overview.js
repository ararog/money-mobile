'use strict';

var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} = React;

var styles = require('../styles')

module.exports = React.createClass({

    getInitialState: function() {
        return {
            pending: [],
            lastMonths: []
        }
    },

    componentDidMount: function() {
        this.props.container.get('EXPENSES_SERVICE')
        .loadOverview()
        .then((response) => response.json())
        .then((responseData) => {
            this.setState(
                { pending: responseData.pending, lastMonths: responseData.lastMonths })
            })
        .catch((error) => {
            console.log(error);
        });
    },

    render: function() {
        var pendingItems

        if(this.state.pending) {
            var index = 0
            pendingItems = this.state.pending.map(pending => {
                index++
                return (<View style={localStyles.pending_stats_box} key={index}>
                            <Text style={localStyles.pending_stats_amount}>{pending.total.toFixed(2)}</Text>
                            <Text style={localStyles.pending_stats_category}>{pending.name}</Text>
                        </View>)
            });
        }

        return (
            <View style={styles.container}>
                <View style={localStyles.pending_stats_container}>
                    {pendingItems}
                </View>
            </View>
        );
    }
});

var localStyles = StyleSheet.create({
    pending_stats_container: {
        margin: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        width: 440,
    },
    pending_stats_box: {
        width: 100,
        margin: 5
    },
    pending_stats_amount: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    pending_stats_category: {
        fontSize: 14,
        textAlign: 'center'
    }
});
