import React from 'react';
import { View, StyleSheet } from 'react-native';
import Chart, { size } from "./Chart";
import data from "./data.json";


// import { onGestureEvent, useValues } from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

// import { State } from 'react-native-gesture-handler';


export function Dash() {

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

  const candles = data.slice(0, 10);

  const getDomain = (rows: any) => {
    const values = rows.map(({ high, low }: any) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = getDomain(candles);


  return (
    <View className="flex-1 flex pt-12 pb-12 h-full items-center justify-center bg-main-50">



      <Chart {...{ candles, domain }} />

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
  );
}

