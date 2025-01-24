<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadModules } from 'esri-loader';
// @ts-expect-error: Type definitions for esri are not available
import type * as __esri from 'esri';
import { userStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();
const emit = defineEmits(['change-view']);
const useUserStore = userStore();
const { newUser } = storeToRefs(useUserStore);
const isLoading = ref(false);

const changeView = (view: number) => {
  emit('change-view', view);
};

const rewind = () => {
  emit('change-view', 2);
};

const forward = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const response = await useUserStore.createNewUser();
    if (response) {
      changeView(1);
      useUserStore.resetNewUser();
    } else {
      toaster.warning("A mensagem não corresponde ao esperado.");
    }
  } catch (error) {
    toaster.error("Erro ao tentar criar o usuário");
    console.error("Erro ao verificar o código:", error);
  } finally {
    isLoading.value = false;
  }
};

const mapViewRef = ref<__esri.MapView | null>(null);
const userLocation = ref<{ latitude: number; longitude: number } | null>(null);

const loadMap = async () => {
  try {
    const [ArcGISMap, MapView, Search, Graphic, GraphicsLayer] = await loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
      ],
      { css: true }
    );

    const map = new ArcGISMap({
      basemap: 'topo-vector',
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const view = new MapView({
      container: 'mapContainer',
      map: map,
      center: [-118, 34],
      zoom: 8,
    });

    const searchWidget = new Search({
      view: view,
      placeholder: 'Pesquisar localização ou endereço...',
    });

    view.ui.add(searchWidget, {
      position: 'top-right',
    });

    const addLocationMarker = (latitude: number, longitude: number) => {
      const point = {
        type: 'point',
        longitude,
        latitude,
      };

      const markerSymbol = {
        type: 'picture-marker',
        url: 'https://cdn.jsdelivr.net/npm/@mdi/svg/svg/map-marker.svg',
        width: '30px',
        height: '30px',
      };

      const graphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });

      graphicsLayer.removeAll();
      graphicsLayer.add(graphic);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.value = { latitude, longitude };
          view.center = [longitude, latitude];
          addLocationMarker(latitude, longitude);
        },
        (error) => {
          console.error('Erro ao obter localização do usuário:', error);
        }
      );
    }

    view.on('click', (event: __esri.ViewClickEvent) => {
      const { latitude, longitude } = event.mapPoint;
      userLocation.value = { latitude, longitude };

      console.log('Nova localização selecionada:', latitude, longitude);
      addLocationMarker(latitude, longitude);
    });

    mapViewRef.value = view;
  } catch (error) {
    console.error('Failed to load ArcGIS modules:', error);
  }
};

watch(userLocation, (newLocation) => {
  if (newLocation) {
    newUser.value.location.coordinates = [newLocation.longitude, newLocation.latitude];
    toaster.info('Localização atualizada');
  }
});

onMounted(() => {
  loadMap();
});
</script>

<template>
  <section class="px-2 mt-4 animate-in fade-in duration-500">
    <div class="h-10" />
    <div class="flex flex-col justify-center items-center gap-6 w-full h-full">
      <div class="flex flex-col gap-2 max-w-xl w-full">
        <h2 class="text-2xl font-semibold text-pretty">
          A localização está correta?
        </h2>
        <p class="text-sm sm:text-base text-gray-500">
          Verifique a localização identificada e ajuste se for necessário
        </p>
      </div>
      <div class="flex flex-col gap-8 items-center w-full">
        <div class="flex justify-center w-full">
          <v-card class="max-w-xl w-full min-h-[402px]">
            <div
              id="mapContainer"
              class="w-full h-[402px]"
            />
          </v-card>
        </div>
        <div
          v-if="userLocation"
          class="text-center"
        >
          <p class="text-sm text-gray-500">
            <strong>Coordenadas selecionadas:</strong>
          </p>
          <p class="text-sm">
            Latitude: {{ userLocation.latitude.toFixed(6) }} |
            Longitude: {{ userLocation.longitude.toFixed(6) }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <FormFooter
    @rewind="rewind()"
    @forward="forward()"
  />
</template>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
