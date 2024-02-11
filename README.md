# RV - A simple route visualizer

RV is a simple route visualizer that allows you to easily visualize routes.
The minimal input is list of routes, which each contain a list of coordinates.
The generated html can run without a server, allowing to generate visualizations with simple curl requests.
These urls could be the, e.g., the output of an optimization algorithm.

## Features

* Pass locations in the URL - opening the link will render the map
* Pass additional attributes (metadata, styles, etc.) via POST
* Render routes based on additional attributes

## Usage

[https://rv.libklein.com/lng1,lat1|lng2,lat2|lng3,lat3;\[route_color\]/lng1,lat1|...|lngn,latn;\[route_color\]/](https://rv.libklein.com/lng1,lat1|lng2,lat2|lng3,lat,3/lng1,lat1|...|lngn,latn/)

### Page slug structure

Routes are separated by `/`, coordinates of individual locations by `|`.
Routes can optionally be colored by appending ';color' to the route.

## Advanced usage [TODO]

The server support advanced styling via POST requests. The format is outlined below.

```bash 
https https://rv.libklein.com/render/
```

```typescript
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

export interface Solution {
  routes: Route[];
}
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
