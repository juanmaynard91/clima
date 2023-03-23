<template>
  <section class="video-container">
    <video autoplay loop muted playsinline prefetch preload="auto" loading="lazy" :src="videoSrc" ref="videoRef"></video>
  </section>

  <header>
    <h2 class="text-focus-in">Weather App</h2>
  </header>

  <main class="container">
    <!-- typeof != "undefined" para que pueda mostrar la informacion -->
    <div :class="typeof weather.main != 'undefined'">
      <div class="search-box">
        <form @submit.prevent="buscarClima">
          <input type="text" class="form-control search-bar text-focus-in" placeholder="Buscar ciudad o pais.." v-model.trim="buscar" />
        </form>
      </div>
    </div>

    <transition name="list">
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ fecha() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather">{{ weather.weather[0].description }}</div>
          <img :src="iconoClima" :alt="weather.weather[0].main" loading="lazy" />
        </div>
      </div>
    </transition>
  </main>

  <footer>
    <div class="social-links text-focus-in">
      <a href="https://www.linkedin.com/in/juan-maynard/" target="_blank" class="footer__icon"><i class="bx bxl-linkedin-square"></i></a>
      <a href="https://github.com/juanmaynard91" target="_blank" class="footer__icon"><i class="bx bxl-github"></i></a>
      <a href="https://wa.me/5492494577897" target="_blank" class="footer__icon"><i class="bx bxl-whatsapp"></i></a>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const key = ref("333d98cc99af02c7246da1e7ff0fdd56");
const url = ref("https://api.openweathermap.org/data/2.5/");
const buscar = ref("");
const weather = ref({});
const videoRef = ref(null);
const videoSrc = ref("../src/assets/background.mp4");

const fetchClima = async () => {
  try {
    const res = await fetch(`${url.value}weather?q=${buscar.value}&units=metric&APPID=${key.value}`);
    const data = await res.json();
    //console.log(data);
    weather.value = data;
  } catch (e) {
    console.log(e);
  }
};

const buscarClima = () => {
  if (buscar.value !== "") {
    fetchClima();
    buscar.value = "";
  } else {
    weather.value = {};
  }
};

const fecha = () => {
  const d = new Date();
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

const iconoClima = computed(() => {
  if (weather.value.weather[0].main === "Clear") {
    return "../src/assets/iconosClima/soleado.png";
  }
  if (weather.value.weather[0].main === "Clouds") {
    return "../src/assets/iconosClima/nublado.png";
  }
  if (weather.value.weather[0].main === "Rain") {
    return "../src/assets/iconosClima/lluvia.png";
  }
  if (weather.value.weather[0].main === "Storm") {
    return "../src/assets/iconosClima/tormenta.png";
  }
  if (
    weather.value.weather[0].main === "Fog" ||
    weather.value.weather[0].main === "Mist"
  ) {
    return "../src/assets/iconosClima/niebla.png";
  }
});

onMounted(() => {
  const cargarVideo = videoRef.value;
  // el 1 es por la velocidad del video (mas rapido)
  videoRef.value.playbackRate = 1;
  cargarVideo.load();
});
</script>

<style>
@import "./assets/estilos.css";
</style>
