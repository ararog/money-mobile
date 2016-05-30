import React, { Component } from 'react'
import React, {
    ActivityIndicatorIOS,
    ListView,
    Platform,
    ProgressBarAndroid,
    Text,
    TouchableHighlight,
    View
} from 'react-native'

import ExpenseDetails from './ExpenseDetails'

import * as expensesActions from '../actions/expenses'

import styles from '../styles'

const localStyles = {
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
}

class Expenses extends Component {

    constructor(props) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this._updateDataSource(nextProps.expenses.items)
        })
    }

    componentDidMount() {
        this._paginate(1)
    }

    _hasMore() {
        const { expenses } = this.props
        const { page, total } = expenses
        let currentSize = page * 10;
        return currentSize < total
    }

    _onEndReached() {
        const { expenses } = this.props
        if(! expenses.fetchingData && this._hasMore())
            this._paginate(expenses.page + 1)
    }

    _paginate(page) {
        this.props.loadExpenses(page)
    }

    _updateDataSource(expenses) {
        return this.state.dataSource.cloneWithRows(expenses)
    }

    _renderRow(expense, sectionID, rowID) {
        let description = expense.description
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
    }

    _onItemClicked(expense: Object) {
        const { navigator } = this.props
        if (Platform.OS === 'ios') {
            navigator.push({
                title: 'Expense Details',
                component: ExpenseDetails,
                passProps: {expense: expense},
            });
        }
        else {
            navigator.push({
                name: 'expense_details',
                expense: expense,
            });
        }
    }

    render() {
        let newDs = this.state.dataSource
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this._onEndReached}
                    renderRow={this._renderRow} />
            </View>
        )
    }
}

function stateToProps(state) {
  let { expenses } = state
  return { expenses }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, expensesActions)
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(Expenses)
