'use strict';

import React, {
    Platform,
    SwitchAndroid,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'

import Dropdown from 'react-native-dropdown-android'

import styles from '../styles'

export default class ExpenseDetails extends Component {

    constructor(props) {

        let state = {
            description: '',
            amount: '',
            comment: '',
            done: false,
            category_id: null,
            categories: [],
        }

        if(this.props.expense) {
            var amount
            if(this.props.expense.amount)
                amount = this.props.expense.amount.toString()

            state.description = this.props.expense.description
            state.amount = amount
            state.comment = this.props.expense.comment
            state.category_id = this.props.expense.category_id
            state.done = this.props.expense.done == 0 ? false : true
        }

        this.state = state
    }

    componentDidMount() {
        this.props.loadAll()

        this.setState({
            categories: responseData
        })
    }

    _onSaveClicked(e) {

        const {
            category_id,
            description,
            amount,
            comment,
            done
        } = this.state

        let data = {
            category_id: category_id,
            description: description,
            amount: amount,
            comment: comment,
            done: done
        }

        if(this.props.expense)
            this.props.update(this.props.expense.id, data)
        else
            this.props.add(data)

        this.props.navigator.pop()
    }

    _onDeleteClicked(e) {
        this.props.delete(this.props.expense.id)
        this.props.navigator.pop()
    }

    _onDropdownItemSelected(data) {
        if(this.state.categories[data.selected])
            this.setState({category_id: this.state.categories[data.selected].id})
    }

    render() {

        const { description, amount, comment, done } = this.state

        let save_button = <TouchableHighlight
                            style={styles.button}
                            onPress={this._onSaveClicked}>
                            <Text style={localStyles.buttonText}>
                                Save
                            </Text>
                        </TouchableHighlight>

        let delete_button
        if(this.props.expense) {
            save_button = <TouchableHighlight
                                style={localStyles.left_button}
                                onPress={this._onDeleteClicked}>
                                <Text style={localStyles.buttonText}>
                                    Save
                                </Text>
                            </TouchableHighlight>

            delete_button = <TouchableHighlight
                                style={localStyles.right_button}
                                onPress={this._onDeleteClicked}>
                                <Text style={localStyles.buttonText}>
                                    Delete
                                </Text>
                            </TouchableHighlight>
        }

        let items = this.state.categories.map((category) => {
            return category.name
        })
        .reduce((list, item) => {
            list.push(item)
            return list
        }, ['Choose a Category'])

        return (
            <View style={localStyles.container}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    keyboardType='default'
                    style={styles.field}
                    onChangeText={(text) => this.setState({description: text})}
                    value={description} />

                <Text style={styles.label}>Category</Text>
                <Dropdown values={items}
                    style={{ height: 40, width: 200, fontSize: 12}}
                    onChange={this._onDropdownItemSelected} />

                <Text style={styles.label}>Amount</Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.field}
                    onChangeText={(text) => this.setState({amount: text})}
                    value={amount} />

                <Text style={styles.label}>Comment</Text>
                <TextInput
                    keyboardType='default'
                    style={styles.field}
                    onChangeText={(text) => this.setState({comment: text})}
                    value={comment} />

                <Text style={styles.label}>Done</Text>
                <View style={localStyles.switch}>
                    <SwitchAndroid
                        onValueChange={(value) => this.setState({done: value})}
                        value={done} />
                </View>

                <View style={{flexDirection: 'row', height: 30}}>
                    {save_button}
                    {delete_button}
                </View>
            </View>
        )
    }
}

const localStyles = {
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5FCFF',
    },
    switch: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'flex-start',
    },
    buttonText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
    },
    left_button: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 5,
        height: 30,
        backgroundColor: 'blue',
        alignSelf: 'flex-start',
    },
    right_button: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
        height: 30,
        backgroundColor: 'red',
        alignSelf: 'flex-end',
    }
}
