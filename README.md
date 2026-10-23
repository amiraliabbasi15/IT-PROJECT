# Warehouse Inventory Dashboard

A simple static website that shows the stock of an industrial spare-parts warehouse. Users can search the items, see which ones are running low and read three charts that explain how the inventory is spread across categories.

Project for the course **Principles and Fundamentals of Information Technology** (Industrial Engineering).

## Live demo

https://amiraliabbasi15.github.io/IT-PROJECT/

## Team members

- Amirmahdi Saffari (امیرمهدی صفاری)
- Mohammad Erfan Sadeghi Mojarrad (محمدعرفان صادقی مجرد)
- Amirali Abbasi (امیرعلی عباسی)
- Amirali Sardashti (امیرعلی سردشتی)

## Dataset

**Source:** the dataset (`data.csv`) is **simulated** for educational purposes. Part names and specifications follow common industrial standards (for example bearing numbers and bolt sizes), but supplier names, stock levels, shelf locations and lead times are randomly generated. It does not describe a real company.

**Size:** 100 rows and 8 columns, saved as UTF-8 and converted to `data.js`.

| Column | Meaning |
|---|---|
| `sku` | Unique item code (P0001 to P0100) |
| `item_name` | Name of the part |
| `category` | One of 8 categories (Bearings, Fasteners, Lubricants, Electrical, Tools, Safety (PPE), Pipes & Fittings, Belts & Chains) |
| `stock` | Units currently in the warehouse |
| `min_stock` | Minimum level before the item should be reordered |
| `supplier` | Supplier name (fictional) |
| `location` | Aisle and shelf, for example "Aisle B - Shelf 3" |
| `lead_time_days` | Days needed to receive a new order |

## Features

- Table of all 100 items
- Live search over every column
- Rows are highlighted and get a "Low" label when `stock` is below `min_stock`
- Four summary cards (item types, units in stock, low-stock items, categories)
- Three bar charts, each with a short explanation and an automatic summary sentence
- Responsive layout and dark mode

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `style.css` | Colors and layout |
| `data.js` | The dataset as a JavaScript array |
| `table.js` | Builds the table and runs the live search |
| `charts.js` | Summary cards and charts |
| `data.csv` | The dataset in CSV format |

## Technologies

- HTML, CSS and plain JavaScript (no frameworks, no back end)
- [Chart.js](https://www.chartjs.org/) 4.4.1, loaded from the jsDelivr CDN
- GitHub and GitHub Pages for version control and hosting

## Run it locally

1. Clone or download this repository.
2. Keep all files in the same folder.
3. Open `index.html` in a web browser.

The charts need an internet connection, because Chart.js is loaded from a CDN.

## About the code

The code was written with the help of an AI assistant. All members reviewed the files and each member is responsible for explaining the files they uploaded.
