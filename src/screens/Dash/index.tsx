import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Chart, { size } from "./Chart";
import data from "./data.json";
import bg from '@assets/background.png';
// import socket from "../utils/socket";
import io from 'socket.io-client';

// import { onGestureEvent, useValues } from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { findCandles } from '@/services/findCantlesAPI';
import axios from 'axios';

// import { State } from 'react-native-gesture-handler';
export const URL = 'http://192.168.42.85:3000/candles/9'


export function Dash() {




  // const [dataT, setDataT] = useState(null)
  // const [candles, setCandles] = useState(data.slice(0, 9))
  const [candlesInital, setCandlesInital] = useState([])
  const [candles, setCandles] = useState([])

  const [numberGrid, setNumberGrid] = useState(9)


  // const findVa = async () => {

  //   const data = await findCandles()

  // console.log('data', data)


  // }


  const fetchCandles = async () => {
    try {
      // Faça a requisição para obter os candles
      const response = await axios.get(URL);

      let resposta = (response.data).reverse();

      setCandlesInital(resposta)

      setCandles(resposta)

    } catch (error) {
      console.error('Erro ao buscar candles:', error);
    }
  };
  useEffect(() => {

    fetchCandles();

  }, []);


  useEffect(() => {

    const socket = io('http://192.168.42.85:3000'); // Substitua pelo endereço da sua API

    // Exemplo de evento recebendo dados do servidor
    socket.on('newCandle', (data) => {
      console.log('New candle arrived!: ', data.finalDateTime);

      fetchCandles();


      // let novoArray = [...candlesInital, data];

      // console.log('111', novoArray.length)

      // novoArray.shift()

      // console.log('22', novoArray.length)

      // setCandles(novoArray);


      // setCandles(novoArray);
      // setCandlesInital(novoArray);


      // if (novoArray.length > 9) {
      //   const adjust = novoArray.slice(-9);
      //   console.log('333', adjust.length)

      //   setCandles(adjust);
      // } else {

      //   setCandles(novoArray);
      //   setCandlesInital(novoArray);
      // }



    });

    return () => {
      socket.disconnect();
    };


  }, []);




  const changeGrid = () => {
    console.log(numberGrid)
    console.log('lenchtcandlesInital', candlesInital.length)
    console.log('lencht', candles.length)

    if (!candles) {
      return
    }

    if (numberGrid === 9) {
      setNumberGrid(3)

      setCandles(candlesInital?.slice(-3));

      return
    }


    if (numberGrid === 3) {
      setNumberGrid(6)

      setCandles(candlesInital?.slice(-6));

      return
    }


    if (numberGrid === 6) {
      setNumberGrid(9)

      // setCandles(candlesInital?.slice(0, 9))
      setCandles(candlesInital?.slice(-9));

      return
    }

    // setNumberGrid(numberGrid + 3)
    // setCandles(candlesInital?.slice(-(numberGrid + 3), numberGrid + 3))

  }


  // const [x, y, state] = useValues(0, 0, State.UNDETERMINED);


  // const gestureHandler = onGestureEvent({
  //   x,
  //   y,
  //   state,
  // });


  // const [x, y, state] = useValues(0, 0, State.UNDETERMINED);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
  });


  const getDomain = (rows: any) => {
    const values = rows?.map(({ high, low }: any) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = candles ? getDomain(candles) : null;


  return (
    <ImageBackground blurRadius={3} source={bg} defaultSource={bg} style={styles.container} resizeMode="repeat">

      <View className="flex-1 flex pt-12 pb-12 h-full ">



        {candles && <Chart {...{ candles, domain, numberGrid }} />}


        {/* <Animated.View style={{}} >


     </Animated.View> */}


        {/* <PanGestureHandler minDist={0} > */}

        {/* <Animated.View style={StyleSheet.absoluteFill}> */}
        {/* <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label y={translateY} {...{ size, domain, opacity }} /> */}
        {/* </Animated.View>
      </PanGestureHandler> */}
      </View>
      <View className='items-center justify-around flex-row mb-6 ' >

        <TouchableOpacity onPress={() => changeGrid()} >

          <Text style={{ color: '#fff' }} >Trocar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => fetchCandles()} >

          <Text style={{ color: '#fff' }} >Atualizar</Text>
        </TouchableOpacity>
      </View>


    </ImageBackground>

  );
}

