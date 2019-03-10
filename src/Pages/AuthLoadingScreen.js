import React from 'react';
import { AsyncStorage, View, Text } from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(){
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userRole = await AsyncStorage.getItem('userRole');

        if( userToken ) {
            if( userRole === "register" ){
                this.props.navigation.navigate( 'Register' );
            } else if( userRole === "food") {
                this.props.navigation.navigate( 'Food' );
            } else {
                this.props.navigation.navigate( 'Networking' );
            }
        } else {
            this.props.navigation.navigate( 'Auth' );
        }   
    }
    render(){
        return <View><Text>Loading</Text></View>
    }
}

export default AuthLoadingScreen;