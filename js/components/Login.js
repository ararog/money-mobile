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
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    _onLoginClicked(e) {
        const { email, password } = this.state
        this.props.login(email, password)
    }

    render() {
        const { email, password } = this.state
        return (
            <View style={localStyles.container}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.field}
                    onChangeText={(text) => this.setState({email: text})}
                    value={email} />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.field}
                    onChangeText={(text) => this.setState({password: text})}
                    value={password} />

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
