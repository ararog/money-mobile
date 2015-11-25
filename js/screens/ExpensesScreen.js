'use strict';

var React = require('react-native');
var {
    View,
    ListView,
    Platform,
    Text,
    TouchableHighlight,
} = React;

var ExpenseDetailsScreen = require('./ExpenseDetailsScreen')

var styles = require('../styles')

module.exports = React.createClass({

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            activePage: 1,
            itemCount: 0,
            isLoading: false,
            dataSource: ds
        }
    },

    componentDidMount: function() {
        this._paginate(1)
    },

    _hasMore: function(): boolean {
        var currentSize = this.state.activePage * 10;
        return currentSize < this.state.itemCount
    },

    _onEndReached: function() {
        if(! this.state.isLoading && this._hasMore()) {
            this.setState({isLoading: true})
            this._paginate(this.state.activePage + 1)
        }
    },

    _paginate(page) {
        this.props.container.get('EXPENSES_SERVICE')
        .loadExpenses(page)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                activePage: page,
                itemCount: responseData.total,
                isLoading: false,
                dataSource: this._updateDataSource(responseData.items)
            })
        })
        .catch((error) => {
            console.log(error)
        });
    },

    _updateDataSource: function(expenses: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(expenses)
    },

    _renderRow: function(expense: Object, sectionID: number, rowID: number) {
        return (
            <TouchableHighlight onPress={() => this._pressRow(expense)}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {expense.description}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    },

    _pressRow: function(expense: Object) {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({
                title: 'Expense Details',
                component: ExpenseDetailsScreen,
                passProps: {expense: expense},
            });
        }
        else {
            this.props.navigator.push({
                name: 'expense_details',
                expense: expense,
            });
        }
    },

    render: function() {
        var newDs = this.state.dataSource
        console.log(newDs.getRowCount())
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this._onEndReached}
                    renderRow={this._renderRow} />
            </View>
        );
    }
});
