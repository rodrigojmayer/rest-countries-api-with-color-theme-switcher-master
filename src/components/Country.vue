<script setup lang="ts">
  import jsonDataCountries from './../../data.json'  
  import { watch, ref, onMounted, computed } from 'vue'; 
  import { useRoute, useRouter } from 'vue-router'  
  import type { Country } from '../types/country.ts'

const route = useRoute()
const router = useRouter()

const countries = ref<any>([]);
    const dataCountries = ref<Country[]>([]);
// const country = JSON.parse(history.state.country)
const country = ref<Country | null>(null); // reactive
// console.log('Country name:', route.params.name)
// console.log('Country:', country)
const currencyName = computed(() => {
  if (!country.value?.currencies) return 'N/A'
  const firstKey = Object.keys(country.value.currencies)[0]
  return country.value.currencies[firstKey as any].name
})
function loadCountryFromState() {
  if (history.state?.country) {
    country.value = JSON.parse(history.state.country)
  } else {
    // fallback or fetch from API using route param if no state data
    fetchCountry(route.params.name as string)
  }
}


async function fetchCountry(name: string) {
  // You can implement fetching country by name from API here
  // Then assign result to country.value
  console.log('Fetching country for:', name)
}

onMounted(() => {
  loadCountryFromState()
  loadBorderCountries()
})

watch(
  () => route.params.name,
  (newName, oldName) => {
    if (newName !== oldName) {
      loadCountryFromState()
      loadBorderCountries()
    }
  }
)


// const borderCountries = Object.values(country.borders).join(',') 
// console.log('borderCountries:', borderCountries)

function loadBorderCountries() {
  if (!country.value?.borders) return;
  const borderCountries = Object.values(country.value.borders).join(',')
  fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountries}`)
    .then((res) => res.json())
    .then((data) => {
      dataCountries.value = data.map((c: any) => ({
        name: c.name.common,
        nativeName: c.languages ? c.name.nativeName?.[Object.keys(c.languages)[0]]?.common ?? 'N/A' : 'N/A',
        flags: c.flags,
        population: c.population,
        region: c.region,
        capital: c.capital ? c.capital[0] : 'N/A',
        subregion: c.subregion,
        tld: c.tld ? c.tld[0] : 'N/A',
        currencies: c.currencies ? c.currencies : 'N/A',
        languages: c.languages ? Object.entries(c.languages).map(([code, name]) => ({
          iso639_1: code,
          name
        })) : [],
        borders: c.borders ? c.borders : 'N/A'
      }))
    })
    .catch((error) => console.error('Error loading border countries:', error))
}

  const openCountry = (nextCountry: Country) => {
      // This function can be used to navigate to a country details page or perform an action
      console.log(`2 Opening details for ${nextCountry}`);
      console.log(`2 JSON.stringify(country): ${JSON.stringify(nextCountry)}`);
      router.push({
          path: `/country/${encodeURIComponent(nextCountry.name)}`,
          state: {country: JSON.stringify(nextCountry)}
      });

  }

</script>

<template>
  
  <h1><-Back button</h1>
  <img :src="country?.flags.png" alt="Flag of {{ country.name }}" />
  <h1>{{ country?.name }}</h1> 
  <h1>Native Name: {{ country?.nativeName }}</h1> 
  <h1>Population: {{ country?.population }}</h1> 
  <h1>Region: {{ country?.region }}</h1> 
  <h1>Sub Region: {{ country?.subregion }}</h1> 
  <h1>Capital: {{ country?.capital }}</h1> 
  <h1>Top Level Domain: {{ country?.tld }}</h1> 
  <h1>Currencies: {{ currencyName }} </h1> 
  <h1>Languages: {{ country?.languages?.map((lang: any) => lang.name).join(', ') }}</h1> 
  // <!-- <h1>Border Countries: {{ borderCountries }}</h1>  -->
  <div class="border-countries">
    <h2>Border Countries:</h2>
    <div class="border-countries-list">
      <button
        v-for="(dataCountry, index) in dataCountries"
        :key="index"
        @click="openCountry(dataCountry)"
      >
        {{ dataCountry.name }}
      </button>
    </div>
    </div>
</template>