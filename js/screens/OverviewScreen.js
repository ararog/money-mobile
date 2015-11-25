'use strict';

var React = require('react-native');
var {
    View,
    Text,
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
                return (<View style={styles.pending_stats_box} key={index}>
                            <Text style={styles.pending_stats_amount}>{pending.total.toFixed(2)}</Text>
                            <Text style={styles.pending_stats_category}>{pending.name}</Text>
                        </View>)
            });
        }

        return (
            <View style={styles.container}>
                <View style={styles.pending_stats_container}>
                    {pendingItems}
                </View>
            </View>
        );
    }
});
