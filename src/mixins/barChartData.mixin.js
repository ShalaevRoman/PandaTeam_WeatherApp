export default {
  data () {
    return {
      labelsForBarChart: [],
      chartIndicators: [],
      chartName: ''
    }
  },
  computed: {
    filteredOnToday() {
      const today = new Date().toISOString().slice(0, 10)
      return this.selectedCity.list.filter(item => item.dt_txt.slice(0, 10) === today)
    },
    uniqueTemperaturesByDate() {
      const uniqueDates = [...new Set(this.selectedCity.list.map(item => item.dt_txt.slice(0, 10)))]
      return uniqueDates.map(date => {
        const temperature = this.selectedCity.list.find(item => item.dt_txt.includes(date)).main.temp
        return { dt: date, temp: temperature }
      });
    }
  },
  methods: {
    getTimeLabelsForToday(dateArray) {
      const timeArray = []
      for (let i = 0; i < dateArray.length; i++) {
        const dt = new Date(dateArray[i].dt_txt)
        const hours = dt.getHours().toString().padStart(2, '0')
        const minutes = dt.getMinutes().toString().padStart(2, '0')
        const timeString = `${hours}:${minutes}`
        timeArray.push(timeString)
      }
      return timeArray
    },
    getTemperaturesForToday(dateArray) {
      return dateArray.map(({ main }) => main.temp)
    },
    setDataForBarChartOnToday () {
      this.labelsForBarChart = this.getTimeLabelsForToday(this.filteredOnToday)
      this.chartIndicators = this.getTemperaturesForToday(this.filteredOnToday)
      this.chartName = 'Temperature for today'
    },
    setDataForBarCharOnFiveDay () {
      this.labelsForBarChart = this.uniqueTemperaturesByDate.map(item => item.dt.split('-').reverse().join('.').slice(0, -5))
      this.chartIndicators = this.uniqueTemperaturesByDate.map(item => item.temp)
      this.chartName = 'Temperature for 6 today'
    }
  }
}
