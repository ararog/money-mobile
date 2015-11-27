'use strict';

var React = require('react-native');
var {
    StyleSheet,
    SwitchIOS,
    SwitchAndroid,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;

var Dropdown = require('react-native-dropdown-android')

var styles = require('../styles')

module.exports = React.createClass({

    getInitialState: function() {

        var state = {
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

            state = {
                description: this.props.expense.description,
                amount: amount,
                comment: this.props.expense.comment,
            }
        }

        return state
    },

    _onSaveClicked: function(e) {

        var data = {
            description: this.state.description,
            amount: this.state.amount,
            comment: this.state.comment,
        }

        var c = this.props.container

        var promisse;
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
    },

    _onDeleteClicked: function(e) {

        this.props.container.get('EXPENSES_SERVICE')
        .delete(this.props.expense.id)
        .then((response) => {
            this.props.navigator.pop()
        })
        .catch((error) => {
            console.log(error)
        });
    },

    render: function() {

        var save_button = <TouchableHighlight
                            style={styles.button}
                            onPress={this._onSaveClicked}>
                            <Text style={localStyles.buttonText}>
                                Save
                            </Text>
                        </TouchableHighlight>

        var delete_button
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

        var categoryDropdown
        if (Platform.OS === 'ios') {
            var items = this.state.categories.map((category) => {
                  return <PickerItemIOS
                              key={category.id}
                              value={category.id}
                              label={category.name} />
            })

            categoryDropdown = <PickerIOS
                                  selectedValue={this.state.carMake}
                                  onValueChange={(category_id) => this.setState({category_id: category_id})}>
                                  {items}
                                </PickerIOS>
        }
        else {
            var items = this.state.categories.map(category => {
                return category.name
            })
            .reduce((list, item) => {
                list.push(item)
            }, ['Choose a Category'])
            categoryDropdown = <Dropdown
                                    style={{ height: 20, width: 200}}
                                    values={items}
                                    selected={1}
                                    onChange={(data) => { this.setState({category_id: this.categories[dala.selected].id})}} />
        }

        var doneSwitch
        if (Platform.OS === 'ios') {
            doneSwitch = <SwitchIOS
                            onValueChange={(value) => this.setState({done: value})}
                            value={this.state.done} />
        }
        else {
            doneSwitch = <SwitchAndroid
                            onValueChange={(value) => this.setState({done: value})}
                            value={this.state.done} />
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
                {categoryDropdown}

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
                {doneSwitch}

                <View style={{flexDirection: 'row', height: 30}}>
                    {save_button}
                    {delete_button}
                </View>
            </View>
        );
    }
});

var localStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5FCFF',
    },
    buttonText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
    },
    left_button: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: 5,
        height: 30,
        backgroundColor: 'blue',
        alignSelf: 'flex-start',
    },
    right_button: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 5,
        height: 30,
        backgroundColor: 'red',
        alignSelf: 'flex-end',
    },
});
