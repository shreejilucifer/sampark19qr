import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import loginbg from '../../assets/loginbg.png';
import Config from '../Config';
import axios from 'axios';

const { height: viewportHeight, width: viewportWidth } = Dimensions.get('window');

class SignInScreen extends React.Component {
    
    state = {
        fontLoaded: false,
        mobileNumber: "", 
        password: "", 
        error: "", 
        loading: false
    }

    static navigationOptions = {
        header: null,
    };

    async componentDidMount(){
        await Font.loadAsync({
          'Poppins': require('../../assets/Fonts/Poppins-Regular.ttf'), 
          'Poppins-Medium': require('../../assets/Fonts/Poppins-Medium.ttf'),  
          'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
      }

    onChangeLoginForm = (value, type) => {
        switch( type ) {
            case 'mobilenumber': this.setState({ mobileNumber: value }); 
            break;
            case 'password': this.setState({ password: value });
            break;
            default: console.log( "Invalid onChangeLoginForm" ); 
        }
    }

    onSubmitLoginForm = () => {
        if( this.state.mobileNumber === "" ){
            this.setState({ error: "Mobile Number Cannot Be Empty !" });
        } else if( this.state.password === "" ) {
            this.setState({ error: "Password Cannot Be Empty !" });
        } else if( this.state.mobileNumber.length !== 10 ) {
            this.setState({ error: "Invalid Mobile Number !" });
        } else {

            this.setState({ loading: true });

            var settings = {
                "url": Config.api + "/qrapp/auth/login",
                "method": "POST",
                "headers": {
                  "Content-Type": "application/json",
                },
                "data": {
                  "phone": this.state.mobileNumber,
                  "password": this.state.password
                }
              }

              axios( settings )
              .then( async (res) => {
                if( res.data.login === false ) {
                    this.setState({
                        error: "Invalid Username Or Password !", 
                        loading: false
                    })
                } else {

                    await AsyncStorage.setItem('userToken', res.data.token );
                    await AsyncStorage.setItem('userRole', res.data.role );
                    if( res.data.role === "register" ) {
                        await this.setState({
                            error: "", 
                            loading: false
                        });
                        this.props.navigation.navigate('Register', { token: res.data.token });
                    } else if( res.data.role === "food") {
                        await this.setState({
                            error: "", 
                            loading: false
                        });
                        this.props.navigation.navigate('Food', { token: res.data.token });
                    } else {
                        await this.setState({
                            error: "", 
                            loading: false
                        });
                        this.props.navigation.navigate('Networking', { token: res.data.token });
                    }
                }
              })
              .catch( (err) => {
                  this.setState({ error: "Cannot Login ! Try Again Later !", loading: false });
              });

        }
        
    }

    render(){
        if( this.state.fontLoaded ) 
        return (
            <ImageBackground source={loginbg} style={styles.container}>
                <View style={styles.maincontainer}>
                    <Text style={styles.spectrumtitle}>
                        Sampark '19
                    </Text>
                    <View style={styles.loginformcontainer}>
                        <Text style={styles.loginformtitle}>Organiser Login</Text>
                        <View style={styles.forminputgroup}>
                            <Text style={styles.loginformlabel}>Mobile No</Text>
                            <TextInput 
                                style={styles.loginforminput}
                                keyboardType='numeric'
                                onChangeText={(text) => this.onChangeLoginForm(text, 'mobilenumber')}
                                value={this.state.mobileNumber}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.forminputgroup}>
                            <Text style={styles.loginformlabel}>Password</Text>
                            <TextInput 
                                secureTextEntry={true}
                                style={styles.loginforminput}
                                keyboardType='default'
                                onChangeText={(text) => this.onChangeLoginForm(text, 'password')}
                                value={this.state.password}
                            />
                        </View>
                    </View>
                    <Text style={styles.errormessage}>{this.state.error}</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.loginbtn}
                        onPress={()=>this.onSubmitLoginForm()}
                    >
                        <Text style={styles.loginbtntext}>
                        {
                            (this.state.loading)? "Loading..." : "Login"
                        }
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        ); else return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }, 
    maincontainer: { 
        flex: 1,  
        marginTop: viewportHeight * 0.1, 
        marginLeft: viewportWidth * 0.1,
        marginRight: viewportWidth * 0.1,
        alignItems: 'center'
    }, 
    spectrumtitle: {
        fontSize: 38,
        color: '#ffffff',
        fontFamily: 'Poppins-Bold',
    }, 
    loginformcontainer: {
        marginTop: viewportHeight * 0.1,
        paddingBottom: viewportHeight * 0.1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderStyle: 'solid',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        alignItems: 'center'
    }, 
    loginformtitle: {
        color: '#006592',
        fontFamily: 'Poppins-Medium', 
        fontSize: 22,
        marginTop: viewportHeight * 0.02,
    }, 
    forminputgroup: {
        width: '100%',
        paddingLeft: viewportWidth * 0.05, 
        paddingRight: viewportWidth * 0.05, 
        marginTop: viewportHeight * 0.05,
        alignItems: 'flex-start',
    }, 
    loginformlabel: {
        color: '#875d5d',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    }, 
    loginforminput: {
        fontSize: 20, 
        borderBottomColor: '#707070', 
        fontFamily: 'Poppins',
        borderStyle: 'solid',
        borderBottomWidth: 1, 
        width: '100%', 
        color: '#808080',
        marginTop: viewportHeight * 0.01,
    }, 
    loginbtn: {
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#0f2434',
        paddingTop: viewportHeight * 0.01,
        paddingBottom: viewportHeight * 0.01
    }, 
    loginbtntext: {
        color: '#ffffff',
        fontFamily: 'Poppins',
        fontSize: 24,
        letterSpacing: -0.59, 
    }, 
    errormessage: {
        color: '#0000FF', 
        paddingTop: 5, 
        paddingBottom: 5
    }
})

export default SignInScreen;