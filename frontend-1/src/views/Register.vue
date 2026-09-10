<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const username = ref('')

const handleRegister = async () => {
    // Call the register API
    let response = await fetch(`${import.meta.env.VITE_API_URL}/register_instructor`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: email.value,
        password: password.value,
        username: username.value
        }),
    })
    let result = await response.json()
    if (!response.ok) {
        alert(result.message)
        return
    }
    result.role = result.role.toLowerCase()
    localStorage.setItem('token', result.token)
    localStorage.setItem('username', result.username)
    localStorage.setItem('role', result.role)
    localStorage.setItem('id', result.email.split('@')[0])
    router.push('/' + result.role)
}
</script>

<template>
