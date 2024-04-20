import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle, { Candle as CandleModel } from "./Candle";

export const { width: size } = Dimensions.get("window");

import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ChartProps {
  candles: CandleModel[];
  domain: [number, number];
}

export default ({ candles, domain }: any) => {
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



  return (
    <Animated.View ref={animatedRef} style={{ ...styles.box, height: altura }} >


      <Svg width={size} height={size}>
        {candles.map((candle: any, index: any) => (
          // <TouchableOpacity key={candle.date} onPress={() => console.log('testecandle', candle.date)} >

          <Candle
            key={candle.date}
            {...{ candle, index, width, scaleY, scaleBody }}
          />
          // </TouchableOpacity>
        ))}
      </Svg>
    </Animated.View>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  box: {
    height: 100,
    // width: 400,

  },
  label: {
    fontSize: 24,
    marginVertical: 16,
    color: '#b58df1',
  },
});
