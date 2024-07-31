<template>
  <div class="login-container">
    <div class="login-form">
      <q-input label="E-mail" v-model="email" />
      <q-input label="Senha" type="password" v-model="password" />
      <q-btn type="positive" label="Login" @click="entrar" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const entrar = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form q-input {
  margin-bottom: 15px;
}

.login-form q-btn {
  margin-top: 10px;
}
</style>
