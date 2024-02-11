# RV - A simple route visualizer

RV is a simple route visualizer that allows you to easily visualize routes.

## Features

* Pass locations in the URL - opening the link will render the map
* Pass additional attributes (metadata) via POST
* Render routes based on additional attributes

## Usage

[https://rv.libklein.com/lng1,lat1|lng2,lat2|lng3,lat3;\[route_color\]/lng1,lat1|...|lngn,latn;\[route_color\]/](https://rv.libklein.com/lng1,lat1|lng2,lat2|lng3,lat,3/lng1,lat1|...|lngn,latn/)

### Page slug structure

Routes are separated by `/`, coordinates of individual locations by `|`.
Routes can optionally be colored.

* lng1,lat1

### Query parameters

Query parameters can 

## Advanced usage

```bash 
https https://rv.libklein.com/render/
```

* Metadata
