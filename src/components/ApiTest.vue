<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/apiService'

const connectionStatus = ref('testing')
const connectionMessage = ref('')
const games = ref([])

onMounted(async () => {
  try {
    const data = await apiService.getGames(10)
    games.value = data.results || []

    connectionStatus.value = 'connected'
    connectionMessage.value = `Conexión exitosa. Juegos cargados: ${games.value.length}`

    console.log('Juegos obtenidos:', games.value) 
  } catch (error) {
    connectionStatus.value = 'error'
    connectionMessage.value = `Error de conexión: ${error.message}`
    console.error('Error al obtener juegos:', error)
  }
})
</script>

<template>
  <div class="connection-test">
    <h1>Test de Conexión API</h1>

    <div :class="['status', connectionStatus]">
      <p v-if="connectionStatus === 'testing'">⏳ Probando conexión...</p>
      <p v-else-if="connectionStatus === 'connected'" class="success">✅ {{ connectionMessage }}</p>
      <p v-else class="error">❌ {{ connectionMessage }}</p>
    </div>

    <div v-if="games.length > 0" class="games-preview">
      <h2>Primeros juegos obtenidos:</h2>
      <ul>
        <li v-for="game in games" :key="game.id">
          <strong>{{ game.name }}</strong> (rating: {{ game.rating|| 'N/A' }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.connection-test {
  padding: 20px;
  text-align: center;
}

.status {
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  font-size: 18px;
}

.status.testing {
  background-color: #fff3cd;
  color: #856404;
}

.status.connected {
  background-color: #d4edda;
  color: #155724;
}

.status.error {
  background-color: #f8d7da;
  color: #721c24;
}

.games-preview {
  margin-top: 30px;
  text-align: left;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.games-preview h2 {
  color: #333;
  margin-bottom: 15px;
}

.games-preview ul {
  list-style: none;
  padding: 0;
}

.games-preview li {
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 8px;
  border-radius: 4px;
  border-left: 4px solid #4caf50;
}
</style>
