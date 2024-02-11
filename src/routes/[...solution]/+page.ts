import type { PageLoad } from "./$types"
import _ from 'lodash'

function parse_slug(slug: string): string[] {
  return _(slug).split("/").map(route => _.split(route, "|").map((coord) => coord.split(",").map(e => parseFloat(e)).reverse())).toArray()
}

export const load: PageLoad = ({ params }) => {
  return {
    solution: parse_slug(params.solution)
  }
}
