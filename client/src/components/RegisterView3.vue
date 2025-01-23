<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadModules } from 'esri-loader';
// @ts-expect-error: Type definitions for esri are not available
import type * as __esri from 'esri';

const mapViewRef = ref<__esri.MapView | null>(null);

const loadMap = async () => {
  try {
    const [ArcGISMap, MapView] = await loadModules(
      ['esri/Map', 'esri/views/MapView'],
      { css: true }
    );

    const map = new ArcGISMap({
      basemap: 'topo-vector',
    });

    const view = new MapView({
      container: 'mapContainer', // ID do container onde o mapa será renderizado
      map: map,
      center: [-118, 34],
      zoom: 8,
    });

    mapViewRef.value = view;
  } catch (error) {
    console.error('Failed to load ArcGIS modules:', error);
  }
};

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
            <!-- Adicione aqui o div com o ID 'mapContainer' -->
            <div
              id="mapContainer"
              class="w-full h-[402px]"
            />
          </v-card>
        </div>
      </div>
    </div>
  </section>
  <FormFooter />
</template>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
