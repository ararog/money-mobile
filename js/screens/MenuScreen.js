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

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this._genRows()),
        };
    },

    render: function() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow} />
        );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    },

    _genRows: function(): Array<string> {
        var dataBlob = [];
        dataBlob.push('Overview');
        dataBlob.push('Expenses');
        dataBlob.push('Settings');
        return dataBlob;
    },

    _pressRow: function(rowID: number) {
        var route;
        if(rowID == 0)
            route = "overview"
        if(rowID == 1)
            route = "expenses"

        this.props.onItemClick(route)
    },
});
