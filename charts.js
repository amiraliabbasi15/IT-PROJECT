// charts.js - summary cards, three charts and a short explanation under each chart
// It uses "data" (from data.js) and "categoryColors" (from table.js).

// ---------- Step 1: calculate the numbers for each category ----------
const stats = {};   // example: { Bearings: { items: 12, units: 3000, low: 2 } }

data.forEach(function (item) {
  if (stats[item.category] === undefined) {
    stats[item.category] = { items: 0, units: 0, low: 0 };
  }
  stats[item.category].items += 1;          // count the item types
  stats[item.category].units += item.stock; // add up the units in stock
  if (item.stock < item.min_stock) {
    stats[item.category].low += 1;          // count the low-stock items
  }
});

const categories = Object.keys(stats);

// Get one statistic ("items", "units" or "low") for every category, in the same order
function listOf(field) {
  return categories.map(function (name) { return stats[name][field]; });
}

// Find the category with the highest (or lowest) value of a statistic
function pickCategory(field, wantHighest) {
  let best = categories[0];
  categories.forEach(function (name) {
    const better = wantHighest ? stats[name][field] > stats[best][field]
                               : stats[name][field] < stats[best][field];
    if (better) { best = name; }
  });
  return { name: best, value: stats[best][field] };
}

// One color per category, in the same order as the labels
const barColors = categories.map(function (name) {
  return categoryColors[name] || "#6b7a8a";
});

// ---------- Step 2: summary cards ----------
const totalUnits = listOf("units").reduce(function (a, b) { return a + b; }, 0);
const totalLow = listOf("low").reduce(function (a, b) { return a + b; }, 0);

const cards = [
  { value: data.length,      label: "Item types",        color: "#2f6f9f" },
  { value: totalUnits,       label: "Units in stock",    color: "#2e8b73" },
  { value: totalLow,         label: "Low-stock items",   color: "#c8473d" },
  { value: categories.length, label: "Categories",       color: "#7b5ea7" }
];

const summary = document.getElementById("summary");
cards.forEach(function (card) {
  const box = document.createElement("div");
  box.className = "stat";
  box.style.borderTopColor = card.color;

  const number = document.createElement("div");
  number.className = "stat-value";
  number.textContent = card.value.toLocaleString("en-US");

  const label = document.createElement("div");
  label.className = "stat-label";
  label.textContent = card.label;

  box.appendChild(number);
  box.appendChild(label);
  summary.appendChild(box);
});

// ---------- Step 3: sentences that explain each chart ----------
const mostItems = pickCategory("items", true);
const fewestItems = pickCategory("items", false);
const mostUnits = pickCategory("units", true);
const mostLow = pickCategory("low", true);

document.getElementById("insight1").textContent =
  mostItems.name + " has the most item types (" + mostItems.value + "), and " +
  fewestItems.name + " has the fewest (" + fewestItems.value + ").";

document.getElementById("insight2").textContent =
  mostUnits.name + " holds the most units in stock (" + mostUnits.value.toLocaleString("en-US") +
  " units out of " + totalUnits.toLocaleString("en-US") + ").";

document.getElementById("insight3").textContent =
  totalLow === 0
    ? "No item is below its minimum stock level."
    : totalLow + " items are below their minimum level. " + mostLow.name +
      " has the most (" + mostLow.value + "), so it is a good place to start reordering.";

// ---------- Step 4: draw the charts (only if the Chart.js library was loaded) ----------
if (typeof Chart === "undefined") {
  document.querySelectorAll(".chart-box").forEach(function (box) {
    box.textContent = "The chart could not load. Check your internet connection and refresh the page.";
  });
} else {
  // Make chart text readable in light and dark mode
  const rootStyle = getComputedStyle(document.documentElement);
  Chart.defaults.color = rootStyle.getPropertyValue("--ink").trim();
  Chart.defaults.borderColor = rootStyle.getPropertyValue("--line").trim();
  Chart.defaults.font.family = '"Segoe UI", system-ui, sans-serif';

  // A helper that draws one bar chart, so we do not repeat the same code three times
  function drawBarChart(canvasId, values, colors, axisTitle, horizontal) {
    const valueAxis = {
      beginAtZero: true,
      ticks: { precision: 0 },
      title: { display: true, text: axisTitle }
    };
    new Chart(document.getElementById(canvasId), {
      type: "bar",
      data: {
        labels: categories,
        datasets: [{ data: values, backgroundColor: colors, borderRadius: 4 }]
      },
      options: {
        indexAxis: horizontal ? "y" : "x",   // "y" makes the bars horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: horizontal ? { x: valueAxis } : { y: valueAxis }
      }
    });
  }

  drawBarChart("categoryChart", listOf("items"), barColors, "Item types", false);
  drawBarChart("stockChart", listOf("units"), barColors, "Units in stock", true);
  drawBarChart("lowChart", listOf("low"), "#d9553f", "Low-stock items", false);
}
