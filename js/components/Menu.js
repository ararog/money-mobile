'use strict';

import React, {
    View,
    ListView,
    Text,
    TouchableHighlight
} from 'react-native'

import styles from '../styles'

export default class Menu extends Component {

    constructor(props) {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows()),
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow} />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)}>
                <View>
                    <View style={localStyles.row}>
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    _genRows() {
        let dataBlob = [];
        dataBlob.push('Overview');
        dataBlob.push('Expenses');
        dataBlob.push('Settings');
        return dataBlob;
    }

    _pressRow(rowID) {
        let route;
        if(rowID == 0)
            route = "overview"
        if(rowID == 1)
            route = "expenses"

        this.props.onItemClick(route)
    }
}

const localStyles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        padding: 10,
        backgroundColor: '#F6F6F6',
    }
}
