#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const topojson = require("topojson-client");
const isoCountries = require("i18n-iso-countries");

const root = path.join(__dirname, "..");
const topo = JSON.parse(fs.readFileSync(path.join(root, "package/countries-110m.json"), "utf8"));
const geo = topojson.feature(topo, topo.objects.countries);

function roundCoord(n) {
  return Math.round(n * 100) / 100;
}

function compactGeometry(geom) {
  if (geom.type === "Polygon") {
    return { t: "P", g: geom.coordinates.map(function(ring) {
      return ring.map(function(p) { return [roundCoord(p[0]), roundCoord(p[1])]; });
    })};
  }
  if (geom.type === "MultiPolygon") {
    return { t: "M", g: geom.coordinates.map(function(poly) {
      return poly.map(function(ring) {
        return ring.map(function(p) { return [roundCoord(p[0]), roundCoord(p[1])]; });
      });
    })};
  }
  return null;
}

var features = [];
for (var i = 0; i < geo.features.length; i++) {
  var f = geo.features[i];
  var iso3 = isoCountries.numericToAlpha3(f.id);
  if (!iso3) continue;
  var compact = compactGeometry(f.geometry);
  if (!compact) continue;
  features.push({
    id: iso3,
    n: f.properties && f.properties.name ? f.properties.name : iso3,
    t: compact.t,
    g: compact.g
  });
}

features.sort(function(a, b) { return a.id < b.id ? -1 : 1; });

var out = "var WORLD_GEO=" + JSON.stringify({ type: "FeatureCollection", features: features }) + ";\n";
fs.writeFileSync(path.join(root, "world-map-geo.js"), out);
console.log("Wrote", features.length, "features to world-map-geo.js (", Math.round(out.length / 1024), "KB)");
