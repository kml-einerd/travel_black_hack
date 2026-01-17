---
description: Spreadsheet manipulation with formulas, charts, and data transformations using openpyxl and pandas
---

# XLSX - Excel Spreadsheet Processing

Create, read, and manipulate Excel spreadsheets.

## Libraries

```bash
pip install openpyxl pandas
```

## Read Spreadsheet

### With openpyxl
```python
from openpyxl import load_workbook

wb = load_workbook("spreadsheet.xlsx")
ws = wb.active

# Read cell
print(ws['A1'].value)

# Read row
for row in ws.iter_rows(min_row=1, max_row=5, values_only=True):
    print(row)
```

### With pandas
```python
import pandas as pd

df = pd.read_excel("spreadsheet.xlsx")
print(df.head())

# Read specific sheet
df = pd.read_excel("spreadsheet.xlsx", sheet_name="Sheet2")
```

## Create Spreadsheet

### With openpyxl
```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "Data"

# Write data
ws['A1'] = "Name"
ws['B1'] = "Value"
ws['A2'] = "Item 1"
ws['B2'] = 100

# Write row
ws.append(["Item 2", 200])
ws.append(["Item 3", 300])

wb.save("output.xlsx")
```

### With pandas
```python
import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [50000, 60000, 70000]
})

df.to_excel("output.xlsx", index=False)
```

## Formulas

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active

ws['A1'] = 10
ws['A2'] = 20
ws['A3'] = 30
ws['A4'] = '=SUM(A1:A3)'
ws['A5'] = '=AVERAGE(A1:A3)'

wb.save("formulas.xlsx")
```

## Styling

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side

wb = Workbook()
ws = wb.active

# Bold header
ws['A1'] = "Header"
ws['A1'].font = Font(bold=True, size=14)

# Background color
ws['A1'].fill = PatternFill(start_color="FFFF00", fill_type="solid")

# Border
thin = Side(style='thin')
ws['A1'].border = Border(left=thin, right=thin, top=thin, bottom=thin)

wb.save("styled.xlsx")
```

## Charts

```python
from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference

wb = Workbook()
ws = wb.active

# Data
data = [('Category', 'Value'), ('A', 10), ('B', 20), ('C', 30)]
for row in data:
    ws.append(row)

# Create chart
chart = BarChart()
data = Reference(ws, min_col=2, min_row=1, max_row=4)
categories = Reference(ws, min_col=1, min_row=2, max_row=4)
chart.add_data(data, titles_from_data=True)
chart.set_categories(categories)
chart.title = "Sample Chart"

ws.add_chart(chart, "D1")
wb.save("chart.xlsx")
```

## Multiple Sheets

```python
# Write to multiple sheets
with pd.ExcelWriter("multi_sheet.xlsx") as writer:
    df1.to_excel(writer, sheet_name="Sheet1")
    df2.to_excel(writer, sheet_name="Sheet2")
```
