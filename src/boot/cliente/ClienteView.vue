<template>
  <div class="q-pa-md">
    <q-table
      title="Clientes"
      :rows="clientes"
      :columns="columns"
      row-key="name"
      @row-click="rowClick"
    />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="redirectTo(0)" />
    </q-page-sticky>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const router = useRouter()

defineOptions({
  name: 'ClienteView'
})

const formatPhoneNumber = phone => {
  phone = phone || ''
  phone = phone.replace(/\D/g, '')
  phone.length === 11
    ? phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    : phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  return phone
}

const clientes = ref([])
const columns = ref([
  {
    name: 'nome',
    label: 'Nome',
    field: row => row.nome,
    align: 'left'
  },
  {
    name: 'email',
    label: 'E-mail',
    field: row => row.email,
    align: 'left'
  },
  {
    name: 'telefone',
    label: 'Telefone',
    field: row => row.telefone,
    format: val => formatPhoneNumber(val),
    align: 'left'
  },
  {
    name: 'cpf',
    label: 'CPF',
    field: row => row.cpf,
    align: 'left'
  }
])

onMounted(async () => {
  $q.loading.show()
  try {
    const response = await api.get('/cliente')
    clientes.value = response.data
  } finally {
    $q.loading.hide()
  }
})

const redirectTo = id => {
  router.push(`/cliente/edit?id=${id}`)
}

const rowClick = (_, row) => {
  redirectTo(row.id)
}
</script>
