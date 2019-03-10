import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { BarCodeScanner, Permissions, Font, LinearGradient } from 'expo';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'; 
import styles from './Styles/ScannerKitScreenStyle';
import Config from '../Config';
import axios from 'axios';

class ScannerKitScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        fontLoaded: false, 
        qrstatus: "idle", 
        modal: false, 
        participantDetails: {}, 
        alreadyRegistered: false, 
        token: ""
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        await Font.loadAsync({
            'Poppins': require('../../assets/Fonts/Poppins-Regular.ttf'),
            'Poppins-LightItalic': require('../../assets/Fonts/Poppins-LightItalic.ttf'),
            'Poppins-MediumItalic': require('../../assets/Fonts/Poppins-MediumItalic.ttf'),
            'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        });
        const mytok = await AsyncStorage.getItem('userToken');

        this.setState({ 
            hasCameraPermission: status === 'granted', 
            fontLoaded: true, 
            token: mytok
        });
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ qrstatus: 'idle' });

        var settings = {
            "url": Config.api + "/qrapp/network",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "auth": this.state.token,
            },
            "data": {
              "qr": data.toString()
            }
        }

        axios( settings )
        .then( (res) => {
            this.setState({ 
                alreadyRegistered: res.data.alreadyRegistered,
                participantDetails: res.data.participant, 
                modal: true 
            });
        })
        .catch( (err) => {
            console.log( err ) ; 
        });
        
    }

    onClickScan = () => {
        this.setState({ qrstatus: "scanning" });
    }

    closeModal = () => {
        this.setState({ modal: false });
    }

    render(){
        const { hasCameraPermission, fontLoaded } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        if ( fontLoaded === false ) {
            return <Text>Loading Fonts</Text>
        } else
        return (
            <View style={styles.container}>
            {
                (this.state.qrstatus === "idle")?
                <View style={styles.idlescreen}></View> :
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={styles.qrcode}
                /> 
            }

            <Modal style={styles.mymodal} isVisible={this.state.modal}>
                <View style={styles.modalcontainer}>
                    {
                        (this.state.participantDetails === null)? 
                        <View style={[styles.modalcard, {backgroundColor: '#ff0000'}]}>
                            <Text style={styles.modalcardtext}>Unknown User</Text>
                            <AntDesign name={'checkcircle'} size={50} color={'#fff'} />
                            <Text style={styles.modalcardtext2}>Kick Him / Her</Text>
                        </View>
                        :
                        <>
                        {
                        (this.state.alreadyRegistered === false)?
                        <View style={[styles.modalcard, {backgroundColor: '#16bc0a'}]}>
                            <Text style={styles.modalcardtext}>User Registered Successfully</Text>
                            <AntDesign name={'checkcircle'} size={50} color={'#fff'} />
                        </View>
                        :
                        <View style={[styles.modalcard, {backgroundColor: '#ff0000'}]}>
                            <Text style={styles.modalcardtext}>User Already Registered</Text>
                            <AntDesign name={'checkcircle'} size={50} color={'#fff'} />
                        </View>
                        }
                        <View style={styles.modaluserdetails}>
                            <Text style={styles.modaluserdetailslabel}>Name:</Text>
                            <Text style={styles.modaluserdetailsvalue}>{this.state.participantDetails.name}</Text>
                        </View>
                        <View style={styles.modaluserdetails}>
                            <Text style={styles.modaluserdetailslabel}>Mobile No.:</Text>
                            <Text style={styles.modaluserdetailsvalue}>{this.state.participantDetails.phone}</Text>
                        </View>
                        <View style={styles.modaluserdetails}>
                            <Text style={styles.modaluserdetailslabel}>College:</Text>
                            <Text style={styles.modaluserdetailsvalue}>{this.state.participantDetails.college}</Text>
                        </View>    
                        </>
                    }

                    <View>
                        <TouchableOpacity
                            onPress={()=>this.closeModal()}
                        >
                        <LinearGradient
                            colors={['#155799', '#159957']}
                            start={[0,0]}
                            end={[1,0]}
                            style={styles.scananotherbtn}
                        >
                            <Text style={styles.scananotherbtntext}>Scan Another Student</Text>
                        </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
                 
                <View style={styles.ontopcontainer}>
                    <Text style={styles.kittitle}>Networking</Text>
                    <View style={styles.topcontainer}>
                        <View style={styles.topleftcorner}></View>
                        <View style={styles.toprightcorner}></View>
                    </View>
                    <View style={styles.bottomcontainer}>
                        <View style={styles.bottomleftcorner}></View>
                        <View style={styles.bottomrightcorner}></View>
                    </View>
                    {
                        (this.state.qrstatus === "scanning")? 
                        <View style={styles.scanbtn} > 
                            <Text style={styles.scanbtntext}>Scanning</Text>
                        </View> : 
                        <TouchableOpacity 
                            onPress={()=>this.onClickScan()}
                            style={styles.scanbtn}
                        >
                            <Text style={styles.scanbtntext}>
                                Scan QR
                            </Text>
                        </TouchableOpacity>
                    }
                    
                </View>
            </View>
        );
    }
}


export default ScannerKitScreen;