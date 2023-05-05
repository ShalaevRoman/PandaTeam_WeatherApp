<template>
  <div class="bar-wrapper">
    <Bar
      id="my-chart-id"
      :options="getChartOptions"
      :data="getChartData"
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
    },
    chartName: {
      require: true,
      type: String,
      default () {
        return 'Temperature'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    getChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.chartName,
            data: this.chartIndicators
          }
        ]
      }
    },
    getChartOptions () {
      return {
        responsive: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bar-wrapper {
  height: 250px;
}
</style>
