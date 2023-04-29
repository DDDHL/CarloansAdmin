import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

var option: EChartsOption;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};

export const printBarChart = (chartDom: HTMLElement) => {
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}

