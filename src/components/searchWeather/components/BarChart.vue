<template>
  <div class="bar-wrapper">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    labels: {
      require: true,
      type: Array,
      default () {
        return []
      },
    },
    chartIndicators: {
      require: true,
      type: Array,
      default () {
        return []
      },
    }
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: 'Temperature',
            data: this.chartIndicators
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
