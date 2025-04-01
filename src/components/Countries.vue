<script setup lang="ts">
    import jsonDataCountries from './../../data.json'
    import { ref, onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router'
    import type { Country } from '../types/country.ts'

    const props = defineProps<{ 
        colorMode: string
        valueSearched: string 
        selectedRegionLocal: string
    }>()

    
    // interface NativeNameValue {
    // official: string
    // common: string
    // }

    const countries = ref<any>([]);
    const dataCountries = ref<Country[]>([]);
    const router = useRouter() // ✅ get router instance

    onMounted(async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders')
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            countries.value = data;

            dataCountries.value = data.map((country:any) => ({
                name: country.name.common,
                // nativeName: country.name.nativeName ? (Object.values(country.name.nativeName)[0] as any).common : 'N/A',
                nativeName: country.languages ? country.name.nativeName?.[Object.keys(country.languages)[0]]?.common ?? 'N/A' : 'N/A',
                flags: country.flags,
                population: country.population,
                region: country.region,
                capital: country.capital ? country.capital[0] : 'N/A', //
                subregion: country.subregion,
                tld: country.tld ? country.tld[0] : 'N/A',
                currencies: country.currencies ? country.currencies : 'N/A',
                // languages: country.languages ? country.languages : 'N/A',
                languages: country.languages ? Object.entries(country.languages).map(([code, name]) => ({
                    iso639_1: code,
                    name
                })) : [],
                borders: country.borders ? country.borders : 'N/A'
            }))
            // console.log('Countries fetched successfully:', dataCountries.value);
        } catch (error) {
            console.error('Fetch error:', error);
            dataCountries.value = jsonDataCountries // Fallback to local data
        }
    });

    const filteredCountries = computed(() => {
        const searchCountry = props.valueSearched.toLowerCase().trim()
        const searchRegion = props.selectedRegionLocal.toLowerCase().trim()

        return dataCountries.value.filter((country) => {
            const matchesSearch = country.name.toLowerCase().includes(searchCountry)
            const matchesRegion = 
                searchRegion === 'all' || searchRegion.toLowerCase() === '' || country.region.toLowerCase() === searchRegion

            return matchesSearch && matchesRegion
        })
    })
    
    
    const openCountry = (country: Country) => {
        // This function can be used to navigate to a country details page or perform an action
        console.log(`1 Opening details for ${country}`);
        console.log(`1 JSON.stringify(country): ${JSON.stringify(country)}`);
        router.push({
            path: `/country/${encodeURIComponent(country.name)}`,
            state: {country: JSON.stringify(country)}
            // state: {country: country as any}
        });

    }

</script>

<template>
        <v-container fluid class="pa-0" >
            <v-row class="pa-0 ma-0 mt-6"
            style="gap: 85px; justify-content: center"
            >
                <v-col
                    v-for="(country, index) in filteredCountries" 
                    :key="index"
                    cols="12"
                    sm="4"
                    md="4"
                    lg="3"
                    style="min-width: 260px; max-width: 260px"
                    class="pa-0 ma-0"
                    >

                        <!-- <v-card
                            :class="['hover-card',  `head-${colorMode}`]"
                            rounded= "lg"
                        > -->
                        <v-card
                            :class="['hover-card']"
                            rounded= "lg"
                            @click="openCountry(country)"
                        >
                            <img 
                                :src="country.flags.png"
                                :alt="country.name + ' flag'"
                                style="width: 100%; height: 170px"
                            ></img>
                                
                            <div
                                class="pa-6 pb-12 text-start"
                                style="font-size: 14px;"
                            >
                                <h3 class="mb-4"style="font-size: 18px;">{{ country.name }}</h3>
                                <b>Population:</b> {{ country.population }} <br>
                                <b>Region:</b> {{ country.region }} <br>
                                <b>Capital:</b> {{ country.capital }} <br>
                            </div>
                        </v-card>
                        
                </v-col>
            </v-row>
        </v-container>

</template>
<style scoped>
    .hover-card {
         box-shadow: 0 2px 4px hsl(0, 0%, 0%, 0.3), 0 8px 16px hsl(0, 0%, 0%, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .hover-card:hover {
        transform: translateY(-4px) scale(1.02);
        /* box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); */
         box-shadow: 0 4px 8px hsl(0, 0%, 0%, 0.3), 0 16px 32px hsl(0, 0%, 0%, 0.3);

        cursor: pointer;
    }
</style>