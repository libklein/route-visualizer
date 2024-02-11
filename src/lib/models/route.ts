import maplibregl from 'maplibre-gl';

export interface LngLat {
  lng: number,
  lat: number
}

export interface Drop {
  location: LngLat
  style: object
  metadata?: object
}

export interface Route {
  drops: Drop[],
  style: {
    paint: maplibregl.LineLayerSpecification['paint'];
    layout: maplibregl.LineLayerSpecification['layout'] | undefined;
  },
  metadata?: object
}
