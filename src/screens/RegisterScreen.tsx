import React, { useEffect } from 'react';

import { 
    KeyboardAvoidingView, 
    Platform, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Keyboard
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import WhiteLogo from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyle } from '../theme/loginTheme';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Alert } from 'react-native';


interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {

    const {signUp, errorMessage, removeError} = useContext(AuthContext);

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        Alert.alert('Registro incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }])
    }, [errorMessage])

    const onRegister = () => {
        Keyboard.dismiss();
        signUp({nombre: name, correo: email, password});
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#5856D6'}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View style={loginStyle.formContainer}>
                    {/* Keyboard avoid view */}
                    <WhiteLogo/>

                    <Text style={loginStyle.title}>Registro</Text>
                    
                    <Text style={loginStyle.label}>Nombre:</Text>
                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyle.inputField,
                            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
                        ]}
                        selectionColor='white'
                        
                        onChangeText={(value) => onChange(value, 'name') }
                        value={name}
                        onSubmitEditing={onRegister}
                        
                        autoCapitalize='words'
                        autoCorrect={false}
                        />
                    
                    <Text style={loginStyle.label}>Email:</Text>
                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyle.inputField,
                            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
                        ]}
                        selectionColor='white'
                        
                        onChangeText={(value) => onChange(value, 'email') }
                        value={email}
                        onSubmitEditing={onRegister}
                        
                        autoCapitalize='none'
                        autoCorrect={false}
                        />
                    
                    <Text style={loginStyle.label}>Password:</Text>
                    <TextInput
                        placeholder='******'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        underlineColorAndroid='white'
                        secureTextEntry
                        style={[
                            loginStyle.inputField,
                            (Platform.OS === 'ios') && loginStyle.inputFieldIOS
                        ]}
                        selectionColor='white'
                        
                        
                        onChangeText={(value) => onChange(value, 'password') }
                        value={password}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                        />

                    {/* Boton Login */}
                    <View style={ loginStyle.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyle.button}
                            onPress={ onRegister }
                            >
                            <Text style={loginStyle.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Volver al login */}
                    <View style={loginStyle.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('LoginScreen')}
                            >
                            <Text style={loginStyle.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen
 