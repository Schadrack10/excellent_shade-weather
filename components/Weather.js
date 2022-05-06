import { StyleSheet, Text, View, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { haze, rainy, snow, sunny } from '../assets/background-img/index'
// import { style } from '@mui/system'
// import { style, width } from '@mui/system'

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImg, setBackgroundImage] = useState(null)

    const {

        weather,
        name,
        main: { temp, humidity, pressure },
        wind: { speed , deg }


    } = weatherData
    const [{ main }] = weather

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main))
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        if (weather === 'Clear') return sunny

        return haze;
    }


// turning the color of the text dependant on the weather

     let textColor = backgroundImg !== sunny ? 'white' : 'black'

//convert farenheit to celcius
// let sub = temp -32 ;
// let mult = sub * 5 ;
// let celcius = mult / 9 ;
// let convertedCelcius = celcius.toFixed(2)  / 6;
// let convertedCelcius = Math.floor(celcius) ;

// convert Kelvin to celcius
let convertToCelcius = temp - 273.15

    return (
        <View style={styles.container}>

            <ImageBackground
                source={backgroundImg}
                style={styles.backgroundImg}
                resizeMode='cover'
            >

                <View style={{ alignItems: 'center', height: 250, justifyContent: 'space-between' }}>
                    <SearchBar fetchWeatherData={fetchWeatherData} />
                    <Text style={{ ...styles.headerText, color: textColor, fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.mainText, color: textColor, }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontSize:30  }}>{convertToCelcius} °C</Text>

                </View>
                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s  </Text>
                    </View>

                </View>
                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Degrees</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{deg} m/s  </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Pressure</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{pressure} m/s  </Text>
                    </View>
                </View>


            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
       
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width,
        // width: 1500
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
        fontWeight:'bold'
       

    },
    mainText:{
        fontSize: 36,
        marginTop: 10,
        fontWeight:'200'
       
    },
    extraInfo: {

        marginTop: 50,
        padding: 10,

        flexDirection: 'row'

    },
    info: {
        width: Dimensions.get('screen').width / 2.5, //mobile
        // width:100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        margin: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    }

})