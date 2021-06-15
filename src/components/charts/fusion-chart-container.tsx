import React from "react";
import { ChartProps } from "src/models/props/chart-props.";

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import theme from 'fusioncharts/themes/fusioncharts.theme.fusion';

charts(FusionCharts);
theme(FusionCharts)
const FustionChartContainer = React.memo((props: ChartProps) => (
  <ReactFusioncharts
    type="doughnut2d"
    width="100%"
    height="100%"
    dataFormat="JSON"
    
    dataSource={{
      chart: {
        caption: `Top ${props.selectedFilter?.Top} Contracts By Client`,
        subcaption: `For year ${props.selectedFilter?.Year}`,
        showpercentvalues: "1",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext:
          "<b>$percentValue</b> of our contracts was for <b>$label</b>",
        centerlabel: "# Contract Amount: $value",
        theme: "fusion",
      },
      data: props.data.map((d) => {
        return { label: d[props.categoryField], value: d[props.field] };
      }),
    }}
  />
));

export default FustionChartContainer;
