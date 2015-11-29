'use strict';

var React = require('react-native');
var {
    Platform,
    StyleSheet,
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

            state.description = this.props.expense.description
            state.amount = amount
            state.comment = this.props.expense.comment
            state.category_id = this.props.expense.category_id
            state.done = this.props.expense.done == 0 ? false : true
        }

        return state
    },

    componentDidMount: function() {
        this.props.container.get('CATEGORIES_SERVICE')
        .loadAll()
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                categories: responseData
            })
        })
        .catch((error) => {
            console.log(error)
        });
    },

    _onSaveClicked: function(e) {

        var data = {
            category_id: this.state.category_id,
            description: this.state.description,
            amount: this.state.amount,
            comment: this.state.comment,
            done: this.state.done
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

        var items = this.state.categories.map((category) => {
            return category.name
        })
        .reduce((list, item) => {
            list.push(item)
            return list
        }, ['Choose a Category'])

        var categoryDropdown = <Dropdown
                                    style={{ height: 40, width: 200, fontSize: 12}}
                                    values={items}
                                    onChange={(data) => {
                                        if(this.state.categories[data.selected])
                                            this.setState({category_id: this.state.categories[data.selected].id})
                                    }} />

        var doneSwitch = <SwitchAndroid
                            onValueChange={(value) => this.setState({done: value})}
                            value={this.state.done} />

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
                <View style={localStyles.switch}>
                    {doneSwitch}
                </View>

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
    },
});
