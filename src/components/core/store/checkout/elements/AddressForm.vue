<script lang="ts">
const countryData = ['United States', 'Canada', 'United Kingdom', 'France', 'Italy', 'Spain', 'Germany']
const stateData = {
  'United States': [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'Armed Forces Americas',
    'Armed Forces Europe',
    'Armed Forces Pacific',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'U.S. Outlying Islands',
    'U.S. Virgin Islands',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ],
  Canada: [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon Territory',
  ],
  'United Kingdom': ['England', 'Northern Ireland', 'Scotland', 'Wales'],
  France: [
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté',
    'Brittany',
    'Centre-Val de Loire',
    'Corsica',
    'Grand Est',
    'Hauts-de-France',
    'Île-de-France',
    'Normandy',
    'Nouvelle-Aquitaine',
    'Occitanie',
    'Pays de la Loire',
    "Provence-Alpes-Côte d'Azur",
  ],
  Italy: [
    'Abruzzo',
    'Aosta Valley',
    'Apulia',
    'Basilicata',
    'Calabria',
    'Campania',
    'Emilia-Romagna',
    'Friuli–Venezia Giulia',
    'Lazio',
    'Liguria',
    'Lombardy',
    'Marche',
    'Molise',
    'Piedmont',
    'Sardinia',
    'Sicily',
    'Trentino-Alto Adige',
    'Tuscany',
    'Umbria',
    'Veneto',
  ],
  Spain: [
    'Andalusia',
    'Aragon',
    'Asturias',
    'Balearic Islands',
    'Basque Country',
    'Canary Islands',
    'Cantabria',
    'Castile and León',
    'Castilla-La Mancha',
    'Catalonia',
    'Extremadura',
    'Galicia',
    'La Rioja',
    'Community of Madrid',
    'Region of Murcia',
    'Navarre',
    'Valencian Community',
  ],
  Germany: [
    'Baden-Württemberg',
    'Bavaria',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hesse',
    'Lower Saxony',
    'Mecklenburg-Vorpommern',
    'North Rhine-Westphalia',
    'Rhineland-Palatinate',
    'Saarland',
    'Saxony',
    'Saxony-Anhalt',
    'Schleswig-Holstein',
    'Thuringia',
  ],
}
export default defineComponent({
  setup() {
    const validateMessages = {
      required: '${label} is required!',
      // types: {
      //   email: '${label} is not a valid email!',
      //   number: '${label} is not a valid number!',
      // },
    }

    const formState = reactive({
      address: {
        title: '',
        firstName: '',
        lastName: '',
        company: '',
        vatNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postcode: '',
        country: '',
        state: '',
      },
    })

    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const country = countryData[0]
    const state = reactive({
      country,
      countryData,
      stateData,
      state: stateData[country][0],
    })
    const states = computed(() => {
      return stateData[formState.address.country] || []
    })
    watch(
      () => formState.address.country,
      (val) => {
        state.state = state.stateData[val][0]
      },
    )
    return {
      ...toRefs(state),
      states,
      validateMessages,
      formState,
      onFinish,
    }
  },
})
</script>

<template>
  <a-form
    :model="formState"
    :label-wrap="true"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <div class="flex justify-between space-x-4">
      <a-form-item :name="['address', 'title']" label="Alias" :label-col="{ span: 24, offset: 0 }" class="w-full">
        <a-input v-model:value="formState.address.title" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        :has-feedback="true"
        :name="['address', 'firstName']"
        :rules="[{ required: true }]"
        label="First name"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.firstName" />
      </a-form-item>
      <a-form-item
        :name="['address', 'lastName']"
        label="Last name"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.lastName" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        :has-feedback="true"
        :name="['address', 'firstName']"
        label="Contact email"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.firstName" />
      </a-form-item>
      <a-form-item
        :name="['address', 'lastName']"
        label="Contact phone"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.lastName" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item :name="['address', 'company']" label="Company" :label-col="{ span: 24, offset: 0 }" class="w-full">
        <a-input v-model:value="formState.address.email" />
      </a-form-item>
      <a-form-item
        :name="['address', 'vatNumber']"
        label="Vat number"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.vatNumber" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        :name="['address', 'addressLine1']"
        label="Address line 1"
        :label-col="{ span: 24, offset: 0 }"
        :rules="[{ required: true }]"
        class="w-full"
      >
        <a-input v-model:value="formState.address.addressLine1" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        :name="['address', 'addressLine2']"
        label="Address line 2"
        :label-col="{ span: 24, offset: 0 }"
        class="w-full"
      >
        <a-input v-model:value="formState.address.addressLine2" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        :name="['address', 'city']"
        label="City"
        :label-col="{ span: 24, offset: 0 }"
        :rules="[{ required: true }]"
        class="w-full"
      >
        <a-input v-model:value="formState.address.city" />
      </a-form-item>
      <a-form-item
        :name="['address', 'postcode']"
        label="Zip / Postal Code"
        :label-col="{ span: 24, offset: 0 }"
        :rules="[{ required: true }]"
        class="w-full"
      >
        <a-input v-model:value="formState.address.postcode" />
      </a-form-item>
    </div>
    <div class="flex justify-between space-x-4">
      <a-form-item
        has-feedback
        :name="['address', 'country']"
        label="Country"
        :label-col="{ span: 24, offset: 0 }"
        :rules="[{ required: true, message: 'Please select your country!' }]"
        class="w-full"
      >
        <a-select
          v-model:value="formState.address.country"
          :options="countryData.map((state) => ({ value: state }))"
          placeholder="Please select a country"
        ></a-select>
      </a-form-item>
      <a-form-item :name="['address', 'state']" label="State" :label-col="{ span: 24, offset: 0 }" class="w-full">
        <a-select v-model:value="formState.address.state" :options="states.map((city) => ({ value: city }))"></a-select>
      </a-form-item>
    </div>
  </a-form>
</template>

<style>
.ant-form-item-label {
  padding: 0;
}
.ant-form-item-control-input-content {
  padding: 0;
}
.ant-modal-root .ant-form-item-label > label {
  @apply text-xs;
}
.ant-modal-root .ant-form-item {
  @apply mb-0;
}
.ant-modal-root .ant-col-24.ant-form-item-label {
  @apply pb-0;
}
</style>
