import React from "react";
import { ScaleLinear } from "d3-scale";
import { Line, Rect } from "react-native-svg";

import { Text, View } from "react-native";
import { ICandle } from "@/models/CandleModel";


const MARGIN = 2;

// export interface Candle {
//   date: string;
//   day: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

interface CandleProps {
  candle: ICandle;
  index: number;
  width: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
}

export default ({ candle, index, width, scaleY, scaleBody }: CandleProps) => {
  const { close, open, high, low, color } = candle;
  const fill = close > open ? "#4AFA9A" : "#E33F64";


  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  return (


    <>
      {

        color != 'undetermined' &&
        <>
          <Line
            x1={x + width / 2}
            y1={scaleY(low)}
            x2={x + width / 2}
            y2={scaleY(high)}
            stroke={fill}
            strokeWidth={1}
          />
          <Rect
            x={x + MARGIN}
            y={scaleY(max)}
            width={width - MARGIN * 2}
            height={scaleBody(max - min)}
            {...{ fill }}
          />
        </>

      }
    </>



  );
};
