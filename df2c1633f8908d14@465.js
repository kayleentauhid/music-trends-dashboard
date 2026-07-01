import define1 from "./f3d342db2d382751@886.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";
import define3 from "./26670360aa6f343b@226.js";

function _1(md){return(
md`# Exploring Trends in Music Through Audio Attributes`
)}

function _2(md){return(
md`## Introduction
Music changes over time, but it’s not always obvious how or why. This project explores trends in music using measurable audio attributes such as tempo, loudness, key, mode, time signature, and duration. By analyzing how these attributes vary across time and differ across genres (where available), we aim to reveal patterns in the structure of songs and explain why certain musical elements become more prominent in different eras and styles.

Music is a core part of society, and artists often use musical qualities to express emotions and respond to cultural moments. Visualizing these trends helps make patterns that are often heard but hard to explain more accessible to non-experts.

**How to use this page:**  
Use the interactive controls to filter by time range and attributes. Hover to see details, and compare trends across time and groups of songs.
`
)}

function _3(md){return(
md`## Dataset & Data Integrity
**Dataset:** Million Song Dataset — **Million Song Subset (10,000 songs)**  
**Source:** http://millionsongdataset.com/faq/

For this prototype, we use the publicly available Million Song Subset (a random ~1% sample of the full MSD). The dataset provides metadata and computed audio features (like tempo, loudness, key, mode).

**Preprocessing for visualization:**  
Due to file size limits on Observable, we preprocess the subset locally and upload cleaned CSVs for visualization:
- \`msd_subset_yearly.csv\` (yearly aggregates for trend lines)
- \`msd_subset_songs.csv\` (song-level attributes for distributions and comparisons)

**Data considerations & limitations:**
- Some tracks have missing or unknown year values and are filtered for time-based analyses.
- Coverage across years is uneven, which may affect the stability of trends in sparse periods.
- Audio features are algorithmically derived and may not capture all musical nuance.

**Why this dataset is credible:**  
MSD was created by academic researchers (Columbia University’s LabROSA) in collaboration with Echo Nest and has been widely used in academic research.`
)}

function _4(md){return(
md`## Visualization 1: How Music Changes Over Time
Question: How have musical attributes (tempo, loudness, etc) changed over time?
`
)}

async function _yearly(FileAttachment){return(
await FileAttachment("msd_subset_yearly.csv").csv({typed: true})
)}

function _metric(Generators,metricInput){return(
Generators.input(metricInput)
)}

function _years(yearly){return(
yearly.map(d => d.year).filter(d => d != null)
)}

function _minYear(years){return(
Math.min(...years)
)}

function _maxYear(years){return(
Math.max(...years)
)}

function _yearStart(Generators,yearStartInput){return(
Generators.input(yearStartInput)
)}

function _yearEnd(Generators,yearEndInput){return(
Generators.input(yearEndInput)
)}

function _filtered(yearly,metric,yearStart,yearEnd){return(
yearly
  .map(d => ({...d, year: +d.year, value: +d[metric]}))
  .filter(d => Number.isFinite(d.year) && Number.isFinite(d.value))
  .filter(d => d.year >= Math.min(yearStart, yearEnd) && d.year <= Math.max(yearStart, yearEnd))
  .sort((a, b) => a.year - b.year)
)}

function _windowSize(){return(
5
)}

function _smoothed(filtered,windowSize){return(
filtered.map((d, i) => {
  const half = Math.floor(windowSize / 2);
  const slice = filtered.slice(Math.max(0, i - half), Math.min(filtered.length, i + half + 1));
  const avg = slice.reduce((s, x) => s + x.value, 0) / slice.length;
  return {...d, smooth: avg};
})
)}

function _metricInput(Inputs){return(
Inputs.select(
  new Map([
    ["Tempo (mean)", "tempo_mean"],
    ["Loudness (mean)", "loudness_mean"],
    ["Duration (mean)", "duration_mean"],
    ["Share Major Mode", "mode_share_major"],
    ["Time Signature (mean)", "time_sig_mean"],
    ["# Songs per Year", "n_songs"]
  ]),
  { label: "Attribute to plot", value: "tempo_mean" }
)
)}

function _yearStartInput(Inputs,minYear,maxYear){return(
Inputs.range([minYear, maxYear], {step: 1, label: "Start year", value: minYear})
)}

function _yearEndInput(Inputs,minYear,maxYear){return(
Inputs.range([minYear, maxYear], {step: 1, label: "End year", value: maxYear})
)}

function _18(Plot,metric,smoothed,filtered){return(
Plot.plot({
  height: 360,
  marginLeft: 60,
  x: { label: "Year" },
  y: { label: metric },
  marks: [
    Plot.line(smoothed, { x: "year", y: "value", strokeOpacity: 0.25 }),
    Plot.line(smoothed, { x: "year", y: "smooth" }),
    Plot.dot(filtered, { x: "year", y: "value", r: 2, tip: true, title: d =>
      `Year: ${d.year}\n${metric}: ${d.value.toFixed(3)}\n# Songs: ${d.n_songs}`
    })
  ]
})
)}

function _19(md){return(
md`## Visualization 2: Distribution by Era
Question: Is the change real across many songs, or driven by a few? `
)}

async function _songs(FileAttachment){return(
await FileAttachment("msd_subset_songs.csv").csv({typed: true})
)}

function _metricOptions(){return(
[
  {label: "Tempo", cols: ["tempo", "tempo_mean"]},
  {label: "Loudness", cols: ["loudness", "loudness_mean"]},
  {label: "Duration", cols: ["duration", "duration_mean"]},
  {label: "Mode (0=minor,1=major)", cols: ["mode", "mode_share_major", "mode_mean"]},
  {label: "Time Signature", cols: ["time_signature", "time_sig", "time_sig_mean"]}
]
)}

function _existing(metricOptions,songs){return(
metricOptions
  .map(opt => ({label: opt.label, col: opt.cols.find(c => songs.columns?.includes?.(c))}))
  .filter(d => d.col)
)}

function _metric2(Generators,metricInput2){return(
Generators.input(metricInput2)
)}

function _songYears(songs){return(
songs.map(d => +d.year).filter(Number.isFinite)
)}

function _minSongYear(songYears){return(
Math.min(...songYears)
)}

function _maxSongYear(songYears){return(
Math.max(...songYears)
)}

function _eraAStart(Generators,eraAStartInput){return(
Generators.input(eraAStartInput)
)}

function _eraAEnd(Generators,eraAEndInput){return(
Generators.input(eraAEndInput)
)}

function _eraBStart(Generators,eraBStartInput){return(
Generators.input(eraBStartInput)
)}

function _eraBEnd(Generators,eraBEndInput){return(
Generators.input(eraBEndInput)
)}

function _a0(eraAStart,eraAEnd){return(
Math.min(eraAStart, eraAEnd)
)}

function _a1(eraAStart,eraAEnd){return(
Math.max(eraAStart, eraAEnd)
)}

function _b0(eraBStart,eraBEnd){return(
Math.min(eraBStart, eraBEnd)
)}

function _b1(eraBStart,eraBEnd){return(
Math.max(eraBStart, eraBEnd)
)}

function _dist(songs,metric2,a0,a1,b0,b1){return(
songs
  .map(d => ({
    year: +d.year,
    value: +d[metric2]
  }))
  .filter(d => Number.isFinite(d.year) && Number.isFinite(d.value))
  .flatMap(d => {
    const inA = d.year >= a0 && d.year <= a1
    const inB = d.year >= b0 && d.year <= b1
    const out = []
    if (inA) out.push({...d, era: `Era A (${a0}–${a1})`})
    if (inB) out.push({...d, era: `Era B (${b0}–${b1})`})
    return out
  })
)}

function _metricInput2(Inputs,existing){return(
Inputs.select(
  new Map(existing.map(d => [d.label, d.col])),
  {label: "Attribute to compare", value: existing[0]?.col}
)
)}

function _eraAStartInput(Inputs,minSongYear,maxSongYear){return(
Inputs.range([minSongYear, maxSongYear], {step: 1, label: "Era A start", value: 1960})
)}

function _eraAEndInput(Inputs,minSongYear,maxSongYear){return(
Inputs.range([minSongYear, maxSongYear], {step: 1, label: "Era A end", value: 1979})
)}

function _eraBStartInput(Inputs,minSongYear,maxSongYear){return(
Inputs.range([minSongYear, maxSongYear], {step: 1, label: "Era B start", value: 2000})
)}

function _eraBEndInput(Inputs,minSongYear,maxSongYear){return(
Inputs.range([minSongYear, maxSongYear], {step: 1, label: "Era B end", value: 2010})
)}

function _41(Plot,metric2,dist){return(
Plot.plot({
  height: 380,
  marginLeft: 60,
  x: {label: ""},
  y: {label: metric2},
  marks: [
    Plot.gridY(),
    Plot.boxY(dist, {x: "era", y: "value"}),
    Plot.dot(dist, {
      x: "era",
      y: "value",
      r: 1.5,
      opacity: 0.25,
      jitter: 0.35,
      tip: true,
      title: d => `Year: ${d.year}\n${metric2}: ${d.value}`
    })
  ]
})
)}

function _42(md){return(
md`## Visualization 3: Scatter (Year-filtered) + Trendline
Question: How do two attributes relate?`
)}

function _scatterCandidates(){return(
[
  {label: "Tempo", col: "tempo"},
  {label: "Loudness", col: "loudness"},
  {label: "Duration", col: "duration"},
  {label: "Year", col: "year"},
  {label: "Mode (0/1)", col: "mode"},
  {label: "Time Signature", col: "time_signature"},
  {label: "Key", col: "key"}
]
)}

function _scatterFields(scatterCandidates,songs){return(
scatterCandidates.filter(d => songs.columns.includes(d.col))
)}

function _xMetric(Generators,xInput){return(
Generators.input(xInput)
)}

function _yMetric(Generators,yInput){return(
Generators.input(yInput)
)}

function _minY(songYears){return(
Math.min(...songYears)
)}

function _maxY(songYears){return(
Math.max(...songYears)
)}

function _showTrendInput(Inputs){return(
Inputs.toggle({label: "Show trend line", value: true})
)}

function _scatterStart(Generators,scatterStartInput){return(
Generators.input(scatterStartInput)
)}

function _scatterEnd(Generators,scatterEndInput){return(
Generators.input(scatterEndInput)
)}

function _showTrend(Generators,showTrendInput){return(
Generators.input(showTrendInput)
)}

function _maxPoints(Generators,maxPointsInput){return(
Generators.input(maxPointsInput)
)}

function _s0(scatterStart,scatterEnd){return(
Math.min(scatterStart, scatterEnd)
)}

function _s1(scatterStart,scatterEnd){return(
Math.max(scatterStart, scatterEnd)
)}

function _scatterAll(songs,xMetric,yMetric,s0,s1){return(
songs
  .map(d => ({
    year: +d.year,
    x: +d[xMetric],
    y: +d[yMetric],
    title: d.title ?? d.song_title ?? d.song ?? null,
    artist: d.artist_name ?? d.artist ?? null
  }))
  .filter(d => Number.isFinite(d.year) && d.year >= s0 && d.year <= s1)
  .filter(d => Number.isFinite(d.x) && Number.isFinite(d.y))
)}

function _scatterData(scatterAll,maxPoints){return(
scatterAll.length <= maxPoints
  ? scatterAll
  : scatterAll
      .map(d => ({...d, _r: Math.random()}))
      .sort((a, b) => a._r - b._r)
      .slice(0, maxPoints)
      .map(({_r, ...d}) => d)
)}

function _xInput(Inputs,scatterFields){return(
Inputs.select(
  new Map(scatterFields.map(d => [d.label, d.col])),
  {label: "X attribute", value: scatterFields.find(d => d.col === "loudness")?.col ?? scatterFields[0].col}
)
)}

function _yInput(Inputs,scatterFields){return(
Inputs.select(
  new Map(scatterFields.map(d => [d.label, d.col])),
  {label: "Y attribute", value: scatterFields.find(d => d.col === "tempo")?.col ?? scatterFields[0].col}
)
)}

function _scatterStartInput(Inputs,minY,maxY){return(
Inputs.range([minY, maxY], {step: 1, label: "Start year", value: 1960})
)}

function _scatterEndInput(Inputs,minY,maxY){return(
Inputs.range([minY, maxY], {step: 1, label: "End year", value: 2010})
)}

function _maxPointsInput(Inputs){return(
Inputs.range([200, 8000], {step: 100, label: "Max points to plot", value: 2000})
)}

function _63(Plot,xMetric,yMetric,scatterData,showTrend){return(
Plot.plot({
  height: 420,
  marginLeft: 60,
  marginBottom: 50,
  x: {label: xMetric},
  y: {label: yMetric},
  marks: [
    Plot.gridX(),
    Plot.gridY(),
    Plot.dot(scatterData, {
      x: "x",
      y: "y",
      r: 2,
      opacity: 0.25,
      tip: true,
      title: d => {
        const head = d.title && d.artist ? `${d.title} — ${d.artist}` : (d.artist ?? d.title ?? "Song")
        return `${head}\nYear: ${d.year}\n${xMetric}: ${d.x}\n${yMetric}: ${d.y}`
      }
    }),
    showTrend ? Plot.linearRegressionY(scatterData, {x: "x", y: "y"}) : null
  ].filter(Boolean)
})
)}

function _64(md){return(
md`## Looking at Spotify data
The data was uploaded on June 2023`
)}

function _spotifyData(FileAttachment){return(
FileAttachment("dataset.csv").csv({typed: true})
)}

function _66(md){return(
md`## How much energy/positivity do the most popular songs (of June 2023) have
Energy measures intensity and activity, and valence measures positivity`
)}

function _67(render,spotifyData){return(
render({
  data: {
    values: spotifyData
  },
  width: 500,
  height: 500,
  padding: { right: 400, bottom: 20 },   
  mark: "point",
  encoding: {
    x: {
      field: "energy",
      type: "quantitative",
      scale: {
        domain: [0,1]
      },
      axis: {title: "Energy", titleFontSize: 18}
      
    },
    y: {
      field: "valence",
      type: "quantitative",
      scale: {
        domain: [0,1]
      },
      axis: {title: "Valence", titleFontSize: 18}
    },
    tooltip: [
      {
        field: "artists",
        type: "nominative"
      },
      {
        field: "album_name",
        type: "nominative"
      },
      {
        field: "track_name",
        type: "nomanitive"
      }
    ],
    color: {
      field: "artists",
      type: "nominal",
      scale: {
        scheme: "viridis"
      },
      legend: {title: "Artists", titleFontSize: 16}
    }
  },
  transform: [
    {
      filter: "datum.popularity > 90"
    }
  ]
})
)}

function _68(md){return(
md`## Search for an Artist`
)}

function _69(render,spotifyData){return(
render({
  width: 500,
  height: 500,
  padding: { right: 400, bottom: 100 },   
  data: {
    values: spotifyData
  },
  mark: "point",
  encoding: {
    x: {
      field: "energy",
      type: "quantitative",
      scale: {
        domain: [0,1]
      },
      axis: {title: "Energy", titleFontSize: 18}
      
    },
    y: {
      field: "valence",
      type: "quantitative",
      scale: {
        domain: [0,1]
      },
      axis: {title: "Valence", titleFontSize: 18}
    },
    tooltip: [
      {
        field: "artists",
        type: "nominative"
      },
      {
        field: "album_name",
        type: "nominative"
      },
      {
        field: "track_name",
        type: "nomanitive"
      }
    ],
    color: {
      field: "artists",
      legend: {title: "Artists", titleFontSize: 16}
    }
  },
  params: [
    {
      name: "search",
      bind: {
        input: "text",
        name: "Search for an artist "
      }
    }
    
  ],
  
  transform: [
    {
      filter: "search && indexof(lower(datum.artists), lower(search)) >= 0"
    }
  ]
})
)}

function _70(md){return(
md`## Comparing major and minor songs
Major is represented by 1 and minor is represented by 0`
)}

function _71(render,spotifyData){return(
render({
  data: {
    values: spotifyData
  },

  hconcat: [
    {
      width: 300,
      mark: "boxplot",
      encoding: {
        x: {
          field: "mode",
          type: "nominal"
        },
        y: {
          field: "metric",
          type: "quantitative"
        }
      },
      
    },

    {
      title: "Minor songs",
      mark: {
        type: "bar"
      },
      encoding: {
        x: {
          field: "metric",
          type: "nominal",
          bin: {
            step: 0.1
          }
        },
        y: {
          aggregate: "count",
          type: "quantitative",
          scale: {
            domain: [0,18000]
          }
        }
      },
      transform: [
        {
          filter: "datum.mode == 0"
        }
      ]
      
    },

    {
      title: "Major songs",
      mark: {
        type: "bar"
      },
      encoding: {
        x: {
          field: "metric",
          type: "nominal",
          bin: {
            step: 0.1
          }
        },
        y: {
          aggregate: "count",
          type: "quantitative",
          scale: {
            domain: [0,18000]
          }
        }
      },
      transform: [
        {
          filter: "datum.mode == 1"
        }
      ]
      
    }
    
  ],
  
  transform: [
    {
      calculate: "datum[options]",
      as: "metric"
    }
  ],
  params: [
    {
      name: "options",
      value: "valence",
      bind: {
        input: "select",
        options: ["energy", "danceability", "valence"]
      }
    }
  ]
})
)}

function _72(render,spotifyData){return(
render({
  data: { values: spotifyData },

  hconcat: [

    {
      mark: "rect",
      encoding: {
        x: { field: "track_genre", type: "nominal" },
        y: { field: "mode", type: "nominal" },
        color: {
          aggregate: "mean",
          field: "danceability"
        }
      }
    },

    {
      mark: "point",
      encoding: {
        x: { field: "danceability", type: "quantitative" },
        y: { field: "energy", type: "quantitative" },
        color: { field: "track_genre", type: "nominal" }
      }
    }

  ]
})
)}

function _73(md){return(
md`## Takeaway

It's hard to conclude that certain qualities such as tempo and loudness change over time. There's very little correlation due to the large diversity of songs in terms of genre, instrumentation, culture, and technology. In addition, the lack of samples from earlier years leaves much to be desired, and it's hard to compare trends from older years to more recent years. For example, recent songs generally lean towards a mode of 1, a major mode, but we can't conclude anything for older years.
`
)}

function _74(md){return(
md`## Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["dataset.csv", {url: new URL("./files/d73ed1ea938eb4090c7b50a3ba55b920a2a40c02428af3f48205771dae22ebf8f2214e4f7cf49397fd7e2459ce74b0e49af88a158ae8b9772ce40a6993a042ca.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["msd_subset_songs.csv", {url: new URL("./files/71a664e8ebceb12da6fa16cca3cd6cb75fc2ebe78149fc4830e166d0f139ce2d79b7097301bc8b26da01d4180a7fc6afc0fdbdca439d74c1809a95034e6624fc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["msd_subset_yearly.csv", {url: new URL("./files/74cf1ad55774b895eeb03102332becf7abc64d192f2f8362dc120a7969ce918231a6b99c866602a1955e714c737aa60663079acd3da627ea09e07bb2f65dee30.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("yearly")).define("yearly", ["FileAttachment"], _yearly);
  main.variable(observer("metric")).define("metric", ["Generators","metricInput"], _metric);
  main.variable(observer("years")).define("years", ["yearly"], _years);
  main.variable(observer("minYear")).define("minYear", ["years"], _minYear);
  main.variable(observer("maxYear")).define("maxYear", ["years"], _maxYear);
  main.variable(observer("yearStart")).define("yearStart", ["Generators","yearStartInput"], _yearStart);
  main.variable(observer("yearEnd")).define("yearEnd", ["Generators","yearEndInput"], _yearEnd);
  main.variable(observer("filtered")).define("filtered", ["yearly","metric","yearStart","yearEnd"], _filtered);
  main.variable(observer("windowSize")).define("windowSize", _windowSize);
  main.variable(observer("smoothed")).define("smoothed", ["filtered","windowSize"], _smoothed);
  main.variable(observer("metricInput")).define("metricInput", ["Inputs"], _metricInput);
  main.variable(observer("yearStartInput")).define("yearStartInput", ["Inputs","minYear","maxYear"], _yearStartInput);
  main.variable(observer("yearEndInput")).define("yearEndInput", ["Inputs","minYear","maxYear"], _yearEndInput);
  main.variable(observer()).define(["Plot","metric","smoothed","filtered"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("songs")).define("songs", ["FileAttachment"], _songs);
  main.variable(observer("metricOptions")).define("metricOptions", _metricOptions);
  main.variable(observer("existing")).define("existing", ["metricOptions","songs"], _existing);
  main.variable(observer("metric2")).define("metric2", ["Generators","metricInput2"], _metric2);
  main.variable(observer("songYears")).define("songYears", ["songs"], _songYears);
  main.variable(observer("minSongYear")).define("minSongYear", ["songYears"], _minSongYear);
  main.variable(observer("maxSongYear")).define("maxSongYear", ["songYears"], _maxSongYear);
  main.variable(observer("eraAStart")).define("eraAStart", ["Generators","eraAStartInput"], _eraAStart);
  main.variable(observer("eraAEnd")).define("eraAEnd", ["Generators","eraAEndInput"], _eraAEnd);
  main.variable(observer("eraBStart")).define("eraBStart", ["Generators","eraBStartInput"], _eraBStart);
  main.variable(observer("eraBEnd")).define("eraBEnd", ["Generators","eraBEndInput"], _eraBEnd);
  main.variable(observer("a0")).define("a0", ["eraAStart","eraAEnd"], _a0);
  main.variable(observer("a1")).define("a1", ["eraAStart","eraAEnd"], _a1);
  main.variable(observer("b0")).define("b0", ["eraBStart","eraBEnd"], _b0);
  main.variable(observer("b1")).define("b1", ["eraBStart","eraBEnd"], _b1);
  main.variable(observer("dist")).define("dist", ["songs","metric2","a0","a1","b0","b1"], _dist);
  main.variable(observer("metricInput2")).define("metricInput2", ["Inputs","existing"], _metricInput2);
  main.variable(observer("eraAStartInput")).define("eraAStartInput", ["Inputs","minSongYear","maxSongYear"], _eraAStartInput);
  main.variable(observer("eraAEndInput")).define("eraAEndInput", ["Inputs","minSongYear","maxSongYear"], _eraAEndInput);
  main.variable(observer("eraBStartInput")).define("eraBStartInput", ["Inputs","minSongYear","maxSongYear"], _eraBStartInput);
  main.variable(observer("eraBEndInput")).define("eraBEndInput", ["Inputs","minSongYear","maxSongYear"], _eraBEndInput);
  main.variable(observer()).define(["Plot","metric2","dist"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("scatterCandidates")).define("scatterCandidates", _scatterCandidates);
  main.variable(observer("scatterFields")).define("scatterFields", ["scatterCandidates","songs"], _scatterFields);
  main.variable(observer("xMetric")).define("xMetric", ["Generators","xInput"], _xMetric);
  main.variable(observer("yMetric")).define("yMetric", ["Generators","yInput"], _yMetric);
  main.variable(observer("minY")).define("minY", ["songYears"], _minY);
  main.variable(observer("maxY")).define("maxY", ["songYears"], _maxY);
  main.variable(observer("showTrendInput")).define("showTrendInput", ["Inputs"], _showTrendInput);
  main.variable(observer("scatterStart")).define("scatterStart", ["Generators","scatterStartInput"], _scatterStart);
  main.variable(observer("scatterEnd")).define("scatterEnd", ["Generators","scatterEndInput"], _scatterEnd);
  main.variable(observer("showTrend")).define("showTrend", ["Generators","showTrendInput"], _showTrend);
  main.variable(observer("maxPoints")).define("maxPoints", ["Generators","maxPointsInput"], _maxPoints);
  main.variable(observer("s0")).define("s0", ["scatterStart","scatterEnd"], _s0);
  main.variable(observer("s1")).define("s1", ["scatterStart","scatterEnd"], _s1);
  main.variable(observer("scatterAll")).define("scatterAll", ["songs","xMetric","yMetric","s0","s1"], _scatterAll);
  main.variable(observer("scatterData")).define("scatterData", ["scatterAll","maxPoints"], _scatterData);
  main.variable(observer("xInput")).define("xInput", ["Inputs","scatterFields"], _xInput);
  main.variable(observer("yInput")).define("yInput", ["Inputs","scatterFields"], _yInput);
  main.variable(observer("scatterStartInput")).define("scatterStartInput", ["Inputs","minY","maxY"], _scatterStartInput);
  main.variable(observer("scatterEndInput")).define("scatterEndInput", ["Inputs","minY","maxY"], _scatterEndInput);
  main.variable(observer("maxPointsInput")).define("maxPointsInput", ["Inputs"], _maxPointsInput);
  main.variable(observer()).define(["Plot","xMetric","yMetric","scatterData","showTrend"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("spotifyData")).define("spotifyData", ["FileAttachment"], _spotifyData);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["render","spotifyData"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["render","spotifyData"], _69);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer()).define(["render","spotifyData"], _71);
  main.variable(observer()).define(["render","spotifyData"], _72);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer()).define(["md"], _74);
  const child1 = runtime.module(define1);
  main.import("Plot", child1);
  const child2 = runtime.module(define2);
  main.import("Inputs", child2);
  const child3 = runtime.module(define3);
  main.import("render", child3);
  const child4 = runtime.module(define3);
  main.import("vl", child4);
  return main;
}
