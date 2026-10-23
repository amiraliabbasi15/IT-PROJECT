// table.js - builds the table from the "data" array and filters it live

// One color for each category. charts.js uses this list too, so the colors match everywhere.
const categoryColors = {
  "Bearings": "#2f6f9f",
  "Fasteners": "#d9822b",
  "Lubricants": "#c9a227",
  "Electrical": "#7b5ea7",
  "Tools": "#2e8b73",
  "Safety (PPE)": "#c8473d",
  "Pipes & Fittings": "#4d8f3a",
  "Belts & Chains": "#6b7a8a"
};

// Get the HTML elements we need to work with
const searchBox = document.getElementById("searchBox");
const dataTable = document.getElementById("dataTable");
const resultCount = document.getElementById("resultCount");

// The column names are the keys of the first item (sku, item_name, ...)
const columns = Object.keys(data[0]);

// Turn "item_name" into "Item name" so the header looks nicer
function prettyName(key) {
  const text = key.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Build the header row once
function buildHeader() {
  const headRow = document.createElement("tr");
  columns.forEach(function (key) {
    const th = document.createElement("th");
    th.textContent = prettyName(key);
    headRow.appendChild(th);
  });
  dataTable.querySelector("thead").appendChild(headRow);
}

// Draw the body rows for the list of items we pass in
function renderRows(items) {
  const tbody = dataTable.querySelector("tbody");
  tbody.innerHTML = ""; // remove the old rows first

  items.forEach(function (item) {
    const tr = document.createElement("tr");
    const isLow = item.stock < item.min_stock;

    // Mark the row if the stock is below the minimum level
    if (isLow) {
      tr.classList.add("low-stock");
    }

    columns.forEach(function (key) {
      const td = document.createElement("td");

      if (key === "category") {
        // A small colored dot, then the category name
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.style.background = categoryColors[item.category] || "#6b7a8a";
        td.appendChild(dot);
        td.appendChild(document.createTextNode(item.category));
      } else {
        td.textContent = item[key];
      }

      if (key === "stock") {
        td.classList.add("stock-cell");
        if (isLow) {
          // Add a small "Low" label next to the number
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = "Low";
          td.appendChild(badge);
        }
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  resultCount.textContent = "Showing " + items.length + " of " + data.length + " items.";
}

// Keep only the items where any column contains the search text
function filterData() {
  const query = searchBox.value.trim().toLowerCase();

  const matches = data.filter(function (item) {
    // Join all values of the item into one text and look for the query in it
    const text = Object.values(item).join(" ").toLowerCase();
    return text.includes(query);
  });

  renderRows(matches);
}

// Start: build the header, show all rows, and listen to typing
buildHeader();
renderRows(data);
searchBox.addEventListener("input", filterData);
