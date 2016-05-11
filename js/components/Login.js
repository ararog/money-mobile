'use strict';

import React, {
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'

import styles from '../styles'

export default class Login extends Component {

    constructor(props) {

        this.state = {
            email: '',
            password: ''
        }
    }

    _onLoginClicked(e) {

        this.props.container.get('USERS_SERVICE').login(this.state.email, this.state.password)
        .then((response) => response.json())
        .then((responseData) => {
            store.save('token', responseData.auth_token)
            .then(() => {
                this.props.container.get('USERS_SERVICE').setToken(responseData.auth_token)
                this.props.container.get('EXPENSES_SERVICE').setToken(responseData.auth_token)
                this.props.container.get('CATEGORIES_SERVICE').setToken(responseData.auth_token)
                this.props.onLogged()
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .done()
    }

    render() {
        return (
            <View style={localStyles.container}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.field}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email} />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.field}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password} />

                <TouchableHighlight
                    onPress={this._onLoginClicked}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const localStyles = {
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    }
}
