'use strict';

var React = require('react-native');
var {
    ActivityIndicatorIOS,
    ListView,
    Platform,
    ProgressBarAndroid,
    Text,
    TouchableHighlight,
    StyleSheet,
    View,
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
        if(! this.state.isLoading && this._hasMore())
            this._paginate(this.state.activePage + 1)
    },

    _paginate(page) {

        this.setState({isLoading: true})

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
        var description = expense.description
        if(description.length > 50)
            description = description.substring(0, 50)

        return (
            <TouchableHighlight onPress={() => this._onItemClicked(expense)}>
                <View>
                    <View style={localStyles.row}>
                        <Text style={localStyles.description_label}>
                            {description}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={localStyles.category_label}>
                                {expense.category_id}
                            </Text>
                            <Text style={localStyles.amount_label}>
                                {expense.amount}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    },

    _onItemClicked: function(expense: Object) {
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

var localStyles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 60,
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    category_label: {
        flex: 1,
        fontSize: 12,
        color: 'gray',
        justifyContent: 'flex-start',
    },
    amount_label: {
        flex: 1,
        fontSize: 12,
        color: 'green',
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    description_label: {
        flex: 1,
        fontSize: 14,
        color: 'black'
    }
});
