import { StyleSheet, Dimensions } from 'react-native';
const { height: viewportHeight, width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }, 
    ontopcontainer: {
        position: 'relative',
        top: 0, 
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 5,
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    qrcode: {
        position: 'absolute',
        zIndex: -5,
        height: '100%', 
        width: '100%'  
    }, 
    idlescreen: {
        position: 'absolute',
        zIndex: -5,
        height: '100%', 
        width: '100%', 
        backgroundColor: '#000' 
    },
    kittitle: {
        opacity: 0.8,
        color: '#ffffff',
        fontSize: 21,
        fontStyle: 'italic',
        fontFamily: 'Poppins-MediumItalic'
    }, 
    topcontainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: viewportHeight * 0.05
    }, 
    topleftcorner: {
        height: viewportHeight * 0.03, 
        width: viewportHeight * 0.03,
        borderWidth: 1, 
        borderTopColor: 'white', 
        borderLeftColor: 'white',
        borderBottomColor: 'transparent', 
        borderRightColor: 'transparent'
    },
    toprightcorner: {
        height: viewportHeight * 0.03, 
        width: viewportHeight * 0.03,
        borderWidth: 1, 
        borderTopColor: 'white', 
        borderRightColor: 'white',
        borderBottomColor: 'transparent', 
        borderLeftColor: 'transparent'
    }, 
    bottomcontainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: viewportHeight * 0.3
    }, 
    bottomleftcorner: {
        height: viewportHeight * 0.03, 
        width: viewportHeight * 0.03,
        borderWidth: 1, 
        borderBottomColor: 'white', 
        borderLeftColor: 'white', 
        borderRightColor: 'transparent', 
        borderTopColor: 'transparent'
    },
    bottomrightcorner: {
        height: viewportHeight * 0.03, 
        width: viewportHeight * 0.03,
        borderWidth: 1,
        borderBottomColor: 'white', 
        borderRightColor: 'white', 
        borderTopColor: 'transparent', 
        borderLeftColor: 'transparent'
    }, 
    scanbtn: {
        borderRadius: 9,
        borderColor: '#707070',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#f7931d',
        opacity: 0.57,
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 10, 
        paddingBottom: 10,
        marginTop: viewportHeight * 0.05
    }, 
    scanbtntext: {
        color: '#ffffff',
        fontSize: 17,
        fontFamily: 'Poppins-MediumItalic',
        fontStyle: 'italic',
    }, 
    mymodal: { 
        backgroundColor: '#15191c',
    }, 
    modalcontainer: {
        alignItems: 'center'
    }, 
    modalcard: {
        padding: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 15, 
        maxWidth: '60%'
    }, 
    modalcardtext: {
        paddingBottom: 10,
        color: '#000000',
        fontFamily: 'Poppins-MediumItalic', 
        fontSize: 20,
        letterSpacing: -0.49,
        textAlign: 'center'
    }, 
    modalcardtext2: {
        marginTop: 10, 
        color: '#ffffff',
        fontSize: 17,
        fontFamily: 'Poppins-Bold'
    }, 
    modaluserdetails: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'baseline'
    }, 
    modaluserdetailslabel: {
        color: '#f7931d',
        textDecorationLine: 'underline',  
        fontSize: 22,
        fontFamily: 'Poppins'
    }, 
    modaluserdetailsvalue: {
        color: '#ffffff',
        fontFamily: 'Poppins',
        fontSize: 18,
        letterSpacing: -0.44,
        paddingLeft: 10, 
        width: '60%'
    }, 
    scananotherbtn: {
        borderRadius: 9,
        marginTop: 20
    }, 
    scananotherbtntext: {
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingBottom: 10, 
        paddingTop: 10, 
        color: '#ffffff',
        fontSize: 13,
        fontFamily: 'Poppins-LightItalic',
    }
});

export default styles ; 