'use strict';

import React, {
    View,
    Text,
    TouchableHighlight
} from 'react-native'

import styles from '../styles'

export default class Overview extends Component {

    constructor(props) {
        this.state = {
            pending: [],
            lastMonths: []
        }
    }

    componentDidMount() {
        this.props.loadOverview()
        this.setState(
            { pending: responseData.pending, lastMonths: responseData.lastMonths })
        })
    }

    render() {
        let pendingItems

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
        )
    }
}

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
