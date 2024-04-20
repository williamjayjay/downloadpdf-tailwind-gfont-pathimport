import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs'

export const { width: size } = Dimensions.get("window");

import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ICandle } from "@/models/CandleModel";
import Candle from "./Candle";

interface ChartProps {
  candles: ICandle[];
  domain: [number, number];
}

export const getColor = (color: string) => {
  if (color === 'green') {
    return "#4AFA9A"; // Verde
  } else if (color === 'red') {
    return "#E33F64"; // Vermelho
  } else {
    return "#555"; // Cinza
  }
};


export default ({ candles, domain, numberGrid }: any) => {

  const [selectedCandle, setSelectedCandle] = useState(null)
  const [dataSelected, setDataSelected] = useState(null)


  const width = size / candles.length;
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);


  // ------------------

  const animatedRef = useAnimatedRef();
  const altura = useSharedValue(0);
  const [text, setText] = React.useState(altura.value);

  const measurement = measure(animatedRef);

  const handlePress = () => {
    if (altura.value >= size) {
      return;
    }
    altura.value = withTiming(altura.value + size, {}, () => {
      // highlight-next-line
      if (measurement === null) {
        return;
      }


      runOnJS(setText)(Math.floor(measurement.width));
    });
  };

  useEffect(() => {

    handlePress()
  }, [])







  useEffect(() => {

    setSelectedCandle(null)
    setDataSelected(null)

  }, [numberGrid])




  const fixMargin = width - 2 * 2

  const dateTimeSelect = dataSelected?.finalDateTime ? dayjs?.(dataSelected?.finalDateTime)?.format('YYYY/MM/DD [at] HH:mm:ss') : '-'


  return (
    <Animated.View ref={animatedRef} style={{ ...styles.box, height: altura }} >

      <View style={{
        zIndex: 999, marginBottom: 16, justifyContent: 'space-between', width: size - 2,
        alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start'

      }} >

        <View>
          <Text numberOfLines={1} className=" text-white font-semibold text-lg"  >Open: $ {dataSelected?.open || '-'}</Text>
          <Text numberOfLines={1} className=" text-white font-semibold text-lg"  >Close: $ {dataSelected?.close || '-'}</Text>
          <Text numberOfLines={1} className=" text-white  text-sm"  >Time: {dateTimeSelect}</Text>
        </View>

        <View>
          <Text numberOfLines={1} className=" text-white font-semibold text-lg"  >High: $ {dataSelected?.high || '-'}</Text>
          <Text numberOfLines={1} className=" text-white font-semibold text-lg"  >Low: $ {dataSelected?.low || '-'}</Text>
        </View>


      </View>


      <Svg width={size} height={size}>
        {candles?.map((candle: any, index: any) => {

          return (
            < Candle
              key={candle._id}
              {...{ candle, index, width, scaleY, scaleBody }}
            />
          )
        })}
      </Svg>


      <View style={{
        zIndex: 999, marginTop: 16, justifyContent: 'space-between', width: size - 2,
        alignSelf: 'center', flexDirection: 'row', alignItems: 'center'

      }} >

        {candles?.map((candle: any, index: any) => {
          let max = Math.max(candle.open, candle.close)
          let min = Math.min(candle.open, candle.close)
          let value = (scaleBody(max - min))



          return (


            <TouchableOpacity style={{
              width: fixMargin,
              alignItems: 'center',

            }} key={candle._id}

              onPress={() => {

                setSelectedCandle(selectedCandle === candle._id ? null : candle._id)
                setDataSelected(dataSelected?._id === candle._id ? null : candle)
                // alert('Preço: ' + candle.close?.toFixed(2) + 'horas: ' + candle?.date)
              }} >
              <Text numberOfLines={1} className="text-main-50  " style={{ color: getColor(candle.color) }} >{candle.close?.toFixed(2)}</Text>
              <Text numberOfLines={1} className=" " style={{ color: selectedCandle === candle._id ? "#FFBF00" : "#555" }} >{index}</Text>

              <Ionicons name={selectedCandle === candle._id ? "chevron-up" : "chevron-down"} size={20} color={selectedCandle === candle._id ? "#FFBF00" : "#555"} />
              {/* <Ionicons name="chevron-down" size={24} color="black" /> */}
            </TouchableOpacity>
          )


        })}

      </View>
    </Animated.View >

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {

    // height: 200,
    // width: 400,
    // flexDirection: 'column',
    justifyContent: "space-between",
    flex: 1,
    // alignItems: 'flex-end'

  },
  label: {
    fontSize: 24,
    marginVertical: 16,
    color: '#b58df1',
  },
});
