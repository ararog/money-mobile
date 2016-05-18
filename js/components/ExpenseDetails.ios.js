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

import * as expensesActions from '../actions/expenses'
import * as categoriesActions from '../actions/categories'

import styles from '../styles'

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

class ExpenseDetails extends Component {

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
        this.props.loadCategories()
    }

    _onSaveClicked(e) {
        const { expense } = this.props
        const {
            category_id,
            description,
            comment,
            amount,
            done
        } = this.state

        let data = {
            category_id: category_id,
            description: description,
            amount: amount,
            comment: comment,
            done: done
        }

        if(expense)
            this.props.updateExpense(expense.id, data)
        else
            this.props.addExpense(data)

        this.props.navigator.pop()
    }

    _onDeleteClicked(e) {

        this.props.deleteExpense(this.props.expense.id)

        this.props.navigator.pop()
    }

    _onPickerItemSelected(category_id) {

        this.setState({category_id: category_id, showPicker: false})
    }

    _renderPicker() {
        const { showPicker, category_id } = this.state
        const { categories } = this.props

        if(showPicker) {
            let items = categories.items.map((category) => {
                  return <PickerItemIOS
                              key={category.id}
                              value={category.id}
                              label={category.name} />
            })

            return  <PickerIOS
                        style={localStyles.picker}
                        selectedValue={category_id}
                        onValueChange={this._onPickerItemSelected}>
                        {items}
                     </PickerIOS>
        }
        else {
            return
        }
    }

    render() {
        const { description, amount, comment, done } = this.state
        const { expense } = this.props

        let save_button = <TouchableHighlight
                            style={styles.button}
                            onPress={this._onSaveClicked}>
                            <Text style={localStyles.buttonText}>
                                Save
                            </Text>
                        </TouchableHighlight>

        let delete_button
        if(expense) {
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
                    value={description} />

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
                    value={amount} />

                <Text style={styles.label}>Comment</Text>
                <TextInput
                    keyboardType='default'
                    style={styles.field}
                    onChangeText={(text) => this.setState({comment: text})}
                    value={comment} />

                <Text style={styles.label}>Done</Text>
                <View style={localStyles.switch}>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({done: value})}
                        value={done} />
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

function stateToProps(state) {
  let { expenses, categories } = state
  return { expenses, categories }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, expensesActions, categoriesActions)
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(ExpenseDetails)
