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

function getMapLayout() {
  var padX = 16, padTop = 14, padBot = 22;
  var w = Math.max(80, W - padX * 2);
  var h = Math.max(60, H - padTop - padBot);
  return {
    padX: padX, padTop: padTop, w: w, h: h,
    project: function(lon, lat) {
      return [padX + (lon + 180) / 360 * w, padTop + (90 - lat) / 180 * h];
    }
  };
}

function pointInRing(x, y, ring) {
  var inside = false;
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var xi = ring[i][0], yi = ring[i][1];
    var xj = ring[j][0], yj = ring[j][1];
    var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInFeature(x, y, rings) {
  // Even-odd fill rule parity test (works for holes too).
  var inside = false;
  for (var i = 0; i < rings.length; i++) {
    if (pointInRing(x, y, rings[i])) inside = !inside;
  }
  return inside;
}

function normLon(lon) {
  // Normalize to [-180, 180)
  lon = ((lon + 180) % 360 + 360) % 360 - 180;
  return lon;
}

function splitRingAtDateline(ring) {
  // Split a lon/lat ring into segments so no edge crosses the antimeridian.
  // This prevents huge "bands" across the map when filling.
  if (!ring || ring.length < 2) return [];
  var segs = [];
  var cur = [];

  function pushPoint(arr, p) { arr.push([p[0], p[1]]); }

  var p0 = [normLon(ring[0][0]), ring[0][1]];
  pushPoint(cur, p0);
  var prev = p0;

  for (var i = 1; i < ring.length; i++) {
    var raw = [normLon(ring[i][0]), ring[i][1]];
    var lon1 = prev[0], lat1 = prev[1];
    var lon2 = raw[0], lat2 = raw[1];
    var d = lon2 - lon1;

    if (Math.abs(d) > 180) {
      // Crossing dateline. Compute intersection at ±180 and split.
      var crossLon = lon1 > 0 ? 180 : -180;
      var lon2Adj = lon2 + (lon1 > 0 ? 360 : -360);
      var t = (crossLon - lon1) / (lon2Adj - lon1 + 1e-12);
      var crossLat = lat1 + t * (lat2 - lat1);

      pushPoint(cur, [crossLon, crossLat]);
      segs.push(cur);
      cur = [];
      pushPoint(cur, [-crossLon, crossLat]);
      pushPoint(cur, raw);
    } else {
      pushPoint(cur, raw);
    }
    prev = raw;
  }

  if (cur.length) segs.push(cur);
  return segs;
}

function projectRings(coords, type, L) {
  var rings = [];
  if (type === "P") {
    for (var i = 0; i < coords.length; i++) {
      var segs = splitRingAtDateline(coords[i]);
      for (var si = 0; si < segs.length; si++) {
        rings.push(segs[si].map(function(p) { return L.project(p[0], p[1]); }));
      }
    }
  } else {
    for (var p = 0; p < coords.length; p++) {
      for (var i = 0; i < coords[p].length; i++) {
        var segs = splitRingAtDateline(coords[p][i]);
        for (var si = 0; si < segs.length; si++) {
          rings.push(segs[si].map(function(pt) { return L.project(pt[0], pt[1]); }));
        }
      }
    }
  }
  return rings;
}

function traceRings(rings) {
  ctx.beginPath();
  for (var i = 0; i < rings.length; i++) {
    var ring = rings[i];
    if (!ring.length) continue;
    ctx.moveTo(ring[0][0], ring[0][1]);
    for (var j = 1; j < ring.length; j++) ctx.lineTo(ring[j][0], ring[j][1]);
    ctx.closePath();
  }
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

function drawMapLegend(L) {
  var isJa = currentLang === "ja";
  var items = [
    { color: "rgba(255,255,255,0.85)", label: isJa ? "文書化済み（単色）" : "Documented (solid)" },
    { color: "rgba(255,255,255,0.85)", label: isJa ? "暫定スコア（ストライプ）" : "Preliminary (striped)", striped: true },
    { color: MAP_GREY, label: isJa ? "未収録" : "Not in index" }
  ];
  var x = L.padX + 10, y = L.padTop + 10;
  ctx.font = "500 9px Inter,sans-serif";
  ctx.textAlign = "left";
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    // Use neutral swatches so the legend explains pattern semantics, not a model color.
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
  if (typeof WORLD_GEO === "undefined") return;
  var L = getMapLayout();
  mapFeatureCache = [];
  ensureMapStripePattern();

  ctx.fillStyle = MAP_OCEAN;
  ctx.fillRect(0, 0, W, H);

  for (var fi = 0; fi < WORLD_GEO.features.length; fi++) {
    var f = WORLD_GEO.features[fi];
    var rings = projectRings(f.g, f.t, L);
    if (!rings.length) continue;

    var countryId = ISO3_TO_COUNTRY_ID[f.id];
    var c = countryId ? countryById(countryId) : null;
    var isH = c && hoveredCountry && hoveredCountry.id === c.id;
    var isS = c && selectedCountry && selectedCountry.id === c.id;
    var isCmp = c && compareList.some(function(cc) { return cc.id === c.id; });
    var isHL = c && highlightedCountry && highlightedCountry.id === c.id;
    var emphasized = c && (isH || isS || isCmp || isHL);
    var style = c ? getMapCountryStyle(c, emphasized) : { fill: MAP_GREY, alpha: 0.55, striped: false };

    traceRings(rings);
    ctx.fillStyle = style.fill;
    ctx.globalAlpha = style.alpha;
    ctx.fill("evenodd");
    ctx.globalAlpha = 1;

    if (style.striped) {
      ctx.save();
      traceRings(rings);
      ctx.clip("evenodd");
      ctx.fillStyle = ensureMapStripePattern();
      ctx.globalAlpha = emphasized ? 0.5 : 0.38;
      ctx.fillRect(L.padX, L.padTop, L.w, L.h);
      ctx.restore();
    }

    ctx.strokeStyle = emphasized ? "#FFFFFF" : "rgba(255,255,255,0.28)";
    ctx.lineWidth = emphasized ? 1.5 : 0.55;
    ctx.globalAlpha = emphasized ? 1 : 0.85;
    traceRings(rings);
    ctx.stroke();
    ctx.globalAlpha = 1;

    mapFeatureCache.push({ iso: f.id, country: c, rings: rings });
  }

  drawMapLegend(L);

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
  for (var i = mapFeatureCache.length - 1; i >= 0; i--) {
    var item = mapFeatureCache[i];
    if (!item.country) continue;
    if (item.country.start && currentYear < item.country.start) continue;
    if (pointInFeature(x, y, item.rings)) return item.country;
  }
  return null;
}
