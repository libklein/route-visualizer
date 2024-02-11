import type { PageLoad } from "./$types"
import _ from 'lodash'
import type { LngLat, Route, Solution, Drop } from '$lib'

function parse_drop_from_slug(dropSlug: string): Drop {
  const [lat, lng] = dropSlug.split(",").map(e => parseFloat(e))
  return {
    location: { lng, lat },
    style: {
      height: '1em',
      width: '1em',
      'border-radius': '50%',
      display: 'inline-block',
      'text-align': 'center',
      'vertical-align': 'middle',
      'padding': 0
    }
  }
}

function parse_route_from_slug(routeSlug: string): Route {
  const [dropsSlug, color] = routeSlug.split(";")
  const paint = color ? { "line-color": color } : {};
  return {
    drops: _.split(dropsSlug, "|").map(parse_drop_from_slug),
    style: {
      paint,
      layout: {}
    }
  }
}

function parse_slug(slug: string): Solution {
  return { routes: slug.split("/").map(parse_route_from_slug) }
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomDrop(): Drop {
  return {
    location: {
      lng: randomInRange(-0.5104, 0.3340),
      lat: randomInRange(51.2868, 51.6919),
    },
    style: {
      height: '1em',
      width: '1em',
      'background-color': 'red',
      'border-radius': '50%',
      display: 'inline-block',
      'text-align': 'center',
      'vertical-align': 'middle',
      'padding': 0
    }
  };
}

function generateRoute(): Route {
  const numberOfCoordinates = Math.floor(randomInRange(3, 9));
  const drops: Drop[] = _.range(0, numberOfCoordinates).map(generateRandomDrop);

  const colors = ['red', 'blue', 'cyan', 'green', 'violet', 'black', 'yellow']

  return {
    drops,
    style: {
      paint: {
        "line-color": _.sample(colors),
        "line-width": 2 + Math.round(Math.random() % 4)
      },
      layout: {

      }
    }, // Define as needed
    metadata: {}, // Define as needed or leave as is
  };
}

function generateSolution(numberOfRoutes: number): Solution {
  return {
    routes: _.range(0, numberOfRoutes).map(generateRoute)
  }
}

export const load: PageLoad = ({ params }) => {
  // return {
  //   solution: generateSolution(2)
  // }
  const sol = generateSolution(3)
  console.log("http://localhost:5173/" + sol.routes.map(route => route.drops.map(({ location: { lat, lng } }) => `${lat},${lng}`).join("|")).join("/"))
  return {
    solution: parse_slug(params.solution)
  }
}
