import * as React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";

import "hammerjs";
import { ChartProps } from "src/models/props/chart-props.";


const labelContent = (e: { category: any; value:any;}) => `${e.category}: \n (${e.value})`;

const ChartContainer = React.memo(( props: ChartProps) => ( 
  <Chart>
    <ChartSeries>
      <ChartSeriesItem
        type={props.type}
        data={props.data}
        categoryField={props.categoryField}
        field={props.field}

      >
        <ChartSeriesLabels
         position="outsideEnd"
          color={props.color}
          background={props.background}
          content={labelContent}
        
        />
      </ChartSeriesItem>
    </ChartSeries>
    <ChartLegend visible={false} />"
  </Chart>
));

export default ChartContainer; 