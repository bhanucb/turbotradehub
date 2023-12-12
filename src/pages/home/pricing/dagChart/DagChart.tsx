import { FC } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChartsContainer = styled(Box)`
  height: 100%;

  .chart {
    height: 600px;
  }
`;

const DagChart: FC = () => {
  const {
    typography,
    palette: { mode, background, text },
  } = useTheme();

  const { lineHeight, ...titleStyles } = typography.h6;
  const defaultOption: EChartsOption = {
    title: {
      show: true,
      textStyle: {
        ...titleStyles,
      },
    },
    backgroundColor: [background.paper],
  };

  const nodes = [
    {
      name: "WTRLOO 3.4 10/15/30",
      value: [1918339200000, 4.558],
      category: "WTRLOO",
      label: {
        show: "true",
        color: text.primary,
      },
    },
    {
      name: "CAN 3 1/2 03/01/28",
      value: [1835568000000, 3.769],
      category: "CAN",
    },
    {
      name: "CAN 2 3/4 06/01/33",
      value: [2001283200000, 3.367],
      category: "CAN",
    },
    { name: "CAN 5 06/01/37", value: [2127513600000, 3.386], category: "CAN" },
    {
      name: "CAN 1 3/4 12/01/53",
      value: [2648246400000, 3.232],
      category: "CAN",
    },
    { name: "CAN 1 06/01/27", value: [1811894400000, 3.785], category: "CAN" },
    {
      name: "CAN 2 3/4 12/01/48",
      value: [2490480000000, 3.276],
      category: "CAN",
    },
    {
      name: "ONT 5.6 06/02/35",
      value: [2064441600000, 4.196],
      category: "ONT",
    },
    {
      name: "CAN 3 1/2 12/01/45",
      value: [2395785600000, 3.327],
      category: "CAN",
    },
    {
      name: "ONT 4.7 06/02/37",
      value: [2127600000000, 4.266],
      category: "ONT",
    },
    { name: "CAN 4 06/01/41", value: [2253744000000, 3.375], category: "CAN" },
    {
      name: "CurveDateInterp|TRNTBox|2030-10-15",
      value: [1918339200000, 4.358],
      category: "CurveDateInterp|TRNTBox",
    },
    { name: "CAN 2 12/01/51", value: [2585088000000, 3.257], category: "CAN" },
    { name: "ONT 2.6 06/02/27", value: [1811980800000, 4.27], category: "ONT" },
    {
      name: "ONT 4.6 06/02/39",
      value: [2190672000000, 4.296],
      category: "ONT",
    },
    {
      name: "TRNT 2.4 06/07/27",
      value: [1812412800000, 4.33],
      category: "TRNT",
    },
    {
      name: "TRNT 2.95 04/28/35",
      value: [2061417600000, 4.396],
      category: "TRNT",
    },
  ];
  const links = [
    {
      source: "CurveDateInterp|TRNTBox|2030-10-15",
      target: "WTRLOO 3.4 10/15/30",
      value: "20.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 4 06/01/41",
      target: "CAN 5 06/01/37",
      value: "1.1",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 2 3/4 06/01/33",
      target: "CAN 1 3/4 12/01/53",
      value: "-13.5",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 3 1/2 03/01/28",
      target: "CAN 1 06/01/27",
      value: "1.6",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 2 12/01/51",
      target: "CAN 2 3/4 12/01/48",
      value: "1.9",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "ONT 4.7 06/02/37",
      target: "ONT 5.6 06/02/35",
      value: "-7.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 2 3/4 12/01/48",
      target: "CAN 3 1/2 12/01/45",
      value: "5.1",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "ONT 4.6 06/02/39",
      target: "ONT 4.7 06/02/37",
      value: "-3.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 3 1/2 12/01/45",
      target: "CAN 4 06/01/41",
      value: "4.8",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "TRNT 2.4 06/07/27",
      target: "CurveDateInterp|TRNTBox|2030-10-15",
      value: "43%",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "TRNT 2.95 04/28/35",
      target: "CurveDateInterp|TRNTBox|2030-10-15",
      value: "57%",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 1 3/4 12/01/53",
      target: "CAN 2 12/01/51",
      value: "2.5",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 1 06/01/27",
      target: "ONT 2.6 06/02/27",
      value: "48.5",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "CAN 5 06/01/37",
      target: "ONT 4.6 06/02/39",
      value: "91.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "ONT 2.6 06/02/27",
      target: "TRNT 2.4 06/07/27",
      value: "6.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
    {
      source: "ONT 5.6 06/02/35",
      target: "TRNT 2.95 04/28/35",
      value: "20.0",
      label: { show: "true", formatter: "{c}", color: text.primary },
    },
  ];
  const nodeCategories = [
    { name: "WTRLOO" },
    { name: "CAN" },
    { name: "ONT" },
    { name: "CurveDateInterp|TRNTBox" },
    { name: "TRNT" },
    "TRNTBox",
  ];
  const legendData = [
    { name: "WTRLOO" },
    { name: "CAN" },
    { name: "ONT" },
    { name: "CurveDateInterp|TRNTBox" },
    { name: "TRNT" },
    "TRNTBox",
  ];
  const curveData = [
    {
      name: "TRNTBox",
      data: [
        [1696032000000, 4.988],
        [1716336000000, 5.187],
        [1782345600000, 4.555],
        [1812412800000, 4.33],
        [2061417600000, 4.396],
        [2096064000000, 4.456],
        [2222208000000, 4.546],
        [2254521600000, 4.57],
        [2290118400000, 4.58],
        [2302128000000, 4.58],
        [2302214400000, 4.58],
        [2341267200000, 4.558],
        [2413497600000, 4.546],
        [2479939200000, 4.516],
      ],
    },
  ];
  const dataZoomRange = {
    xSliderStartValue: 1811894400000,
    xSliderEndValue: 2648246400000,
    ySliderStartValue: 3.232,
    ySliderEndValue: 4.558,
  };

  const option: EChartsOption = {
    ...defaultOption,
    tooltip: {},
    toolbox: {
      left: "right",
      itemSize: 25,
      feature: {
        dataZoom: {},
      },
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        filterMode: "none",
        startValue: dataZoomRange.xSliderStartValue,
        endValue: dataZoomRange.xSliderEndValue,
      },
      {
        type: "inside",
        yAxisIndex: [0],
        filterMode: "none",
        startValue: dataZoomRange.ySliderStartValue,
        endValue: dataZoomRange.ySliderEndValue,
      },
    ],
    legend: [
      {
        data: legendData,
      },
    ],
    xAxis: {
      type: "time",
      name: "Maturity",
      nameLocation: "middle",
    },
    yAxis: {
      type: "value",
      name: "Yield",
      nameLocation: "middle",
    },
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        labelLayout: function () {
          return {
            // x: myChart.getWidth() - 130,
            moveOverlap: "shiftY",
          };
        },
        labelLine: {
          show: true,
          length2: 5,
          lineStyle: {
            opacity: 0.5,
          },
        },
        label: {
          show: false,
          position: "right",
          minMargin: 2,
        },
        categories: nodeCategories,
        edgeSymbol: ["none", "arrow"],
        data: nodes,
        links: links,
        lineStyle: {
          curveness: 0.1,
        },
        zlevel: 2,
      },
      {
        type: "line",
        data: curveData[0].data,
        name: curveData[0].name,
        zlevel: 1,
        showSymbol: false,
        lineStyle: { opacity: 0.3 },
      },
    ],
  };

  return (
    <StyledChartsContainer>
      <ReactECharts style={{ height: "100%" }} option={option} theme={mode} />
    </StyledChartsContainer>
  );
};

export default DagChart;
