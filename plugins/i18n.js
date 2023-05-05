import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'uk-UA',
  messages: {
    en: {
      headerNavHome: 'Home',
      headerNavFavorite: 'Favorite',
      searchWeatherTitle: 'Choose a city and check the weather',
      inputSearchErrorText: 'City not found!',
      inputSearchPlaceholder: 'Enter the name of the city',
      cityCardTitle: 'Weather data',
      buttonDay: 'Day',
      button6Days: '6 days',
      buttonFavorites: 'Favorites',
      buttonAddBlock: 'Add block',
      buttonDelete: 'Delete',
      city: 'City:',
      population: 'Population:',
      sunrise: 'Sunrise:',
      sunset: 'Sunset:',
      footerTitle: 'Some footer'
    },
    uk: {
      headerNavHome: 'Домашня',
      headerNavFavorite: 'Вибране',
      searchWeatherTitle: 'Виберіть місто та перевірте погоду',
      inputSearchErrorText: 'Місто не знайдено!',
      inputSearchPlaceholder: 'Введіть назву міста',
      cityCardTitle: 'Дані про погоду',
      buttonDay: 'День',
      button6Days: '6 днів',
      buttonFavorites: 'У вибране',
      buttonAddBlock: 'Додати блок',
      buttonDelete: 'Видалити',
      city: 'Місто:',
      population: 'Населення:',
      sunrise: 'Схід сонця:',
      sunset: 'Захід сонця:',
      footerTitle: 'Якійсь футер'
    }
  }
})
