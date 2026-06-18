// ISO 3166-1 alpha-3 codes for map polygons (null = no territory on map)
var COUNTRY_ISO3 = {
  eu:null, kr:"KOR", cn:"CHN", us:"USA", jp:"JPN", sg:"SGP", uk:"GBR", br:"BRA", ca:"CAN", au:"AUS",
  in:"IND", ae:"ARE", cl:"CHL", ke:"KEN", au2:null, ru:"RUS", fr:"FRA", de:"DEU", mx:"MEX", th:"THA",
  id:"IDN", za:"ZAF", sa:"SAU", tw:"TWN", no:"NOR", nz:"NZL", se:"SWE", co:"COL", eg:"EGY", il:"ISR",
  oecd:null, asean:null, vn:"VNM", my:"MYS", ph:"PHL", pk:"PAK", bd:"BGD", lk:"LKA", np:"NPL",
  it:"ITA", es:"ESP", nl:"NLD", pl:"POL", ie:"IRL", ch:"CHE", at:"AUT", fi:"FIN", dk:"DNK", pt:"PRT",
  be:"BEL", ee:"EST", ua:"UKR", tr:"TUR", ng:"NGA", gh:"GHA", ma:"MAR", tn:"TUN", rw:"RWA", et:"ETH",
  mu:"MUS", ar:"ARG", pe:"PER", uy:"URY", ec:"ECU", cr:"CRI", qa:"QAT", bh:"BHR", jo:"JOR", ir:"IRN",
  kz:"KAZ", uz:"UZB", unesco:null, cz:"CZE", gr:"GRC", ro:"ROU", hu:"HUN", ao:"AGO", kh:"KHM", la:"LAO"
};

var ISO3_TO_COUNTRY_ID = {};
var mapFeatureCache = [];
var mapStripePattern = null;
var mapProjection = null;
var worldLandGeo = null;
var MAP_OCEAN = "#0E1A2B";
var MAP_GREY = "#4A5568";
var MAP_GREY_DIM = "#3A4555";

function buildCountryIsoMaps() {
  ISO3_TO_COUNTRY_ID = {};
  for (var i = 0; i < countries.length; i++) {
    var iso = COUNTRY_ISO3[countries[i].id];
    if (iso) ISO3_TO_COUNTRY_ID[iso] = countries[i].id;
  }
}

function countryById(id) {
  for (var i = 0; i < countries.length; i++) {
    if (countries[i].id === id) return countries[i];
  }
  return null;
}

function ringCrossesDateline(ring) {
  for (var i = 1; i < ring.length; i++) {
    var d = ring[i][0] - ring[i - 1][0];
    if (d > 180 || d < -180) return true;
  }
  return false;
}

function splitExteriorRing(ring) {
  var out = [], cur = [];
  for (var i = 0; i < ring.length; i++) {
    if (cur.length && i > 0) {
      var d = ring[i][0] - ring[i - 1][0];
      if (d > 180 || d < -180) {
        if (cur.length >= 4) out.push(cur);
        cur = [];
      }
    }
    cur.push(ring[i]);
  }
  if (cur.length >= 4) out.push(cur);
  return out.length ? out : [ring];
}

function isEastDatelineShard(ring) {
  return ring.every(function(p) { return p[0] < -90; });
}

// Bridge across the dateline on the +180° meridian instead of wrapping around
// the whole globe (which distorts Russia's northeast coastline).
function stitchRingAtDateline(ring) {
  var result = [];
  var i = 0;
  while (i < ring.length) {
    var p = ring[i];
    if (result.length > 0) {
      var prev = result[result.length - 1];
      var d = p[0] - prev[0];
      if (d > 180 || d < -180) {
        while (i < ring.length && ring[i][0] < 0) i++;
        if (i >= ring.length) break;
        var next = ring[i];
        var nextLon = next[0] >= 180 ? 179.99 : next[0];
        result.push([179.99, prev[1]]);
        result.push([179.99, next[1]]);
        result.push([nextLon, next[1]]);
        i++;
        continue;
      }
    }
    if (p[0] < 0) { i++; continue; }
    result.push([p[0] >= 180 ? 179.99 : p[0], p[1]]);
    i++;
  }
  return result;
}

// Split antimeridian-crossing rings so canvas paths don't wrap across the whole map.
function fixCountryGeometry(f) {
  var geom = f.t === "P"
    ? { type: "Polygon", coordinates: f.g }
    : { type: "MultiPolygon", coordinates: f.g };
  if (f.id !== "RUS" && f.id !== "GRL" && f.id !== "FJI" && f.id !== "ATA") return geom;
  if (geom.type === "Polygon") geom = { type: "MultiPolygon", coordinates: [geom.coordinates] };
  var newPolys = [];
  for (var pi = 0; pi < geom.coordinates.length; pi++) {
    var poly = geom.coordinates[pi];
    var exterior = poly[0];
    if (f.id === "RUS") {
      if (ringCrossesDateline(exterior)) exterior = stitchRingAtDateline(exterior);
      if (exterior.length >= 4) newPolys.push([exterior].concat(poly.slice(1)));
      continue;
    }
    if (!ringCrossesDateline(exterior)) {
      newPolys.push(poly);
      continue;
    }
    var parts = splitExteriorRing(exterior);
    for (var j = 0; j < parts.length; j++) {
      if (isEastDatelineShard(parts[j])) continue;
      newPolys.push([parts[j]].concat(poly.slice(1)));
    }
  }
  if (!newPolys.length) return geom;
  if (newPolys.length === 1) return { type: "Polygon", coordinates: newPolys[0] };
  return { type: "MultiPolygon", coordinates: newPolys };
}

function compactToFeature(f) {
  return {
    type: "Feature",
    id: f.id,
    properties: { name: f.n || f.id },
    geometry: fixCountryGeometry(f)
  };
}

function getWorldLandGeo() {
  if (!worldLandGeo && typeof WORLD_GEO !== "undefined") {
    worldLandGeo = {
      type: "FeatureCollection",
      features: WORLD_GEO.features.map(compactToFeature)
    };
  }
  return worldLandGeo;
}

function updateMapProjection() {
  if (typeof d3 === "undefined" || !d3.geoEquirectangular) return null;
  var padTop = 52, padBot = 28;
  var innerH = Math.max(80, H - padTop - padBot);
  // Standard Atlantic-centered world map. Fixed scale — never fitExtent on land.
  mapProjection = d3.geoEquirectangular()
    .rotate([0, 0])
    .scale(W / (2 * Math.PI))
    .translate([W / 2, padTop + innerH / 2]);
  if (d3.geoClipRectangle) {
    mapProjection.postclip(d3.geoClipRectangle(0, padTop, W, H - padBot));
  }
  return mapProjection;
}

function ensureMapStripePattern() {
  if (mapStripePattern) return mapStripePattern;
  var sc = document.createElement("canvas");
  sc.width = 8; sc.height = 8;
  var sx = sc.getContext("2d");
  sx.strokeStyle = "rgba(255,255,255,0.65)";
  sx.lineWidth = 2;
  sx.beginPath();
  sx.moveTo(-2, 8);
  sx.lineTo(8, -2);
  sx.stroke();
  mapStripePattern = ctx.createPattern(sc, "repeat");
  return mapStripePattern;
}

function getMapCountryStyle(c, emphasized) {
  if (c.start && currentYear < c.start) {
    return { fill: MAP_GREY_DIM, alpha: 0.35, striped: false };
  }
  var col = groupColor[c.group] || "#888";
  return { fill: col, alpha: emphasized ? 1 : 0.9, striped: !c.documented };
}

function drawFeaturePath(feature, style) {
  if (!mapProjection) return;
  var path = d3.geoPath(mapProjection, ctx);
  ctx.beginPath();
  path(feature);
  ctx.fillStyle = style.fill;
  ctx.globalAlpha = style.alpha;
  ctx.fill();
  ctx.globalAlpha = 1;

  if (style.striped) {
    ctx.save();
    ctx.beginPath();
    path(feature);
    ctx.clip();
    ctx.fillStyle = ensureMapStripePattern();
    ctx.globalAlpha = style.emphasized ? 0.5 : 0.38;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  ctx.beginPath();
  path(feature);
  ctx.strokeStyle = style.emphasized ? "#FFFFFF" : "rgba(255,255,255,0.28)";
  ctx.lineWidth = style.emphasized ? 1.5 : 0.55;
  ctx.globalAlpha = style.emphasized ? 1 : 0.85;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawMapLegend() {
  var isJa = currentLang === "ja";
  var items = [
    { color: "rgba(255,255,255,0.85)", label: isJa ? "文書化済み（単色）" : "Documented (solid)" },
    { color: "rgba(255,255,255,0.85)", label: isJa ? "暫定スコア（ストライプ）" : "Preliminary (striped)", striped: true },
    { color: MAP_GREY, label: isJa ? "未収録" : "Not in index" }
  ];
  var x = 28, y = 62;
  ctx.font = "500 9px Inter,sans-serif";
  ctx.textAlign = "left";
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    ctx.fillStyle = it.color;
    ctx.globalAlpha = i === 2 ? 1 : 0.22;
    ctx.fillRect(x, y + i * 16, 12, 10);
    if (it.striped) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y + i * 16, 12, 10);
      ctx.clip();
      ctx.fillStyle = ensureMapStripePattern();
      ctx.globalAlpha = 0.55;
      ctx.fillRect(x, y + i * 16, 12, 10);
      ctx.restore();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 0.75;
    ctx.globalAlpha = 1;
    ctx.strokeRect(x + 0.5, y + i * 16 + 0.5, 11, 9);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(it.label, x + 16, y + i * 16 + 9);
  }
  ctx.globalAlpha = 1;
}

function drawWorldMap() {
  if (typeof WORLD_GEO === "undefined" || typeof d3 === "undefined") return;
  updateMapProjection();
  if (!mapProjection) return;

  mapFeatureCache = [];
  ensureMapStripePattern();

  ctx.fillStyle = MAP_OCEAN;
  ctx.fillRect(0, 0, W, H);

  var land = getWorldLandGeo();
  for (var fi = 0; fi < land.features.length; fi++) {
    var feature = land.features[fi];
    var countryId = ISO3_TO_COUNTRY_ID[feature.id];
    var c = countryId ? countryById(countryId) : null;
    var isH = c && hoveredCountry && hoveredCountry.id === c.id;
    var isS = c && selectedCountry && selectedCountry.id === c.id;
    var isCmp = c && compareList.some(function(cc) { return cc.id === c.id; });
    var isHL = c && highlightedCountry && highlightedCountry.id === c.id;
    var emphasized = !!(c && (isH || isS || isCmp || isHL));
    var baseStyle = c ? getMapCountryStyle(c, emphasized) : { fill: MAP_GREY, alpha: 0.55, striped: false };
    var style = {
      fill: baseStyle.fill,
      alpha: baseStyle.alpha,
      striped: baseStyle.striped,
      emphasized: emphasized
    };

    drawFeaturePath(feature, style);
    mapFeatureCache.push({ iso: feature.id, country: c, feature: feature });
  }

  drawMapLegend();

  var isJa = currentLang === "ja";
  ctx.font = "600 11px Inter,sans-serif";
  ctx.fillStyle = "rgba(255,200,80,0.95)";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 4;
  ctx.fillText(isJa ? currentYear + "年時点のスナップショット" : currentYear + " snapshot", W / 2, H - 8);
  ctx.shadowBlur = 0;
}

function getCountryAtMap(x, y) {
  if (!mapProjection || typeof d3 === "undefined") return null;
  var lonlat = mapProjection.invert([x, y]);
  if (!lonlat) return null;
  for (var i = mapFeatureCache.length - 1; i >= 0; i--) {
    var item = mapFeatureCache[i];
    if (!item.country) continue;
    if (item.country.start && currentYear < item.country.start) continue;
    if (d3.geoContains(item.feature, lonlat)) return item.country;
  }
  return null;
}
