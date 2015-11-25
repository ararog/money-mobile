var { StyleSheet, PixelRatio } = require('react-native')

module.exports = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: 'black',
    },
    navigator: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#a9a9a9',
        height: 56,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    button: {
        flexDirection: 'column',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
    },
    field: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    text: {
        flex: 1,
    },
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
});
