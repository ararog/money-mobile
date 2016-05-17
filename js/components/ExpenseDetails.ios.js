'use strict';

import React, {
    PickerIOS,
    Platform,
    SwitchIOS,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'

var PickerItemIOS = PickerIOS.Item

import Dropdown = from 'react-native-dropdown-android'

import styles from '../styles'

export default class ExpenseDetails extends Component {

    constructor(props) {

        var state = {
            showPicker: false,
            description: '',
            amount: '',
            comment: '',
            done: false,
            category_id: '',
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

        return state
    },

    componentDidMount() {
        this.props.loadAll()

        this.setState({
            categories: responseData
        })
    }

    _onSaveClicked(e) {

        let data = {
            category_id: this.state.category_id,
            description: this.state.description,
            amount: this.state.amount,
            comment: this.state.comment,
            done: this.state.done
        }

        let c = this.props.container

        let promisse;
        if(this.props.expense)
            promisse = c.get('EXPENSES_SERVICE').update(
                this.props.expense.id, data)
        else
            promisse = c.get('EXPENSES_SERVICE').add(data)

        promisse.then((response) => {
            this.props.navigator.pop()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _onDeleteClicked(e) {

        this.props.container.get('EXPENSES_SERVICE')
        .delete(this.props.expense.id)
        .then((response) => {
            this.props.navigator.pop()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _onPickerItemSelected(category_id) {

        this.setState({category_id: category_id, showPicker: false})
    }

    _renderPicker() {
        if(this.state.showPicker) {
            let items = this.state.categories.map((category) => {
                  return <PickerItemIOS
                              key={category.id}
                              value={category.id}
                              label={category.name} />
            })

            return  <PickerIOS
                        style={localStyles.picker}
                        selectedValue={this.state.category_id}
                        onValueChange={this._onPickerItemSelected}>
                        {items}
                     </PickerIOS>
        }
        else {
            return
        }
    }

    render() {

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

        return (
            <View style={localStyles.container}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    keyboardType='default'
                    style={styles.field}
                    onChangeText={(text) => this.setState({description: text})}
                    value={this.state.description} />

                <Text style={styles.label}>Category</Text>
                <TouchableHighlight
                    style={{height: 40, flexDirection:'row', alignItems: 'center'}}
                    onPress={() => this.setState({showPicker: true})}>
                    <Text style={{textAlign: 'left', color: 'black'}}>
                        Choose a Category
                    </Text>
                </TouchableHighlight>

                <Text style={styles.label}>Amount</Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.field}
                    onChangeText={(text) => this.setState({amount: text})}
                    value={this.state.amount} />

                <Text style={styles.label}>Comment</Text>
                <TextInput
                    keyboardType='default'
                    style={styles.field}
                    onChangeText={(text) => this.setState({comment: text})}
                    value={this.state.comment} />

                <Text style={styles.label}>Done</Text>
                <View style={localStyles.switch}>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({done: value})}
                        value={this.state.done} />
                </View>

                <View style={{flexDirection: 'row', height: 30}}>
                    {save_button}
                    {delete_button}
                </View>

                {this._renderPicker()}
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
    picker: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 100,
        height: 100,
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
