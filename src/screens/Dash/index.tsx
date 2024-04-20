import React from 'react';
import { View } from 'react-native';
import Chart, { size } from "./Chart";
import data from "./data.json";


// import { onGestureEvent, useValues } from 'react-native-redash';
// import { State } from 'react-native-gesture-handler';


export function Dash() {


  // const [x, y, state] = useValues(0, 0, State.UNDETERMINED);



  const candles = data.slice(0, 20);

  const getDomain = (rows: any) => {
    const values = rows.map(({ high, low }: any) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = getDomain(candles);


  return (
    <View className="flex-1 flex pt-12 pb-12 h-full items-center justify-center bg-main-50">



      <Chart {...{ candles, domain }} />
    </View>
  );
}

