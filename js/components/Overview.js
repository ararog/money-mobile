import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native'

import * as expensesActions from '../actions/expenses'

import styles from '../styles'

const localStyles = {
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
}

class Overview extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadOverview()
    }

    render() {
        const { expenses } = this.props

        let pendingItems

        if(expenses.overview.pending) {
            var index = 0
            pendingItems = expenses.overview.pending.map(pending => {
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

export default connect(stateToProps, dispatchToProps)(Overview)
