import React, { useState } from "react";
import styles from "./HierarchicalTable.module.scss";
import Toaster from "../Toaster";
import { messages } from "./messages";

export interface TableRowData {
  id: string;
  label: string;
  value: number;
  original: number;
  children?: TableRowData[];
}

const initialData: TableRowData[] = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    original: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800, original: 800 },
      { id: "laptops", label: "Laptops", value: 700, original: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    original: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300, original: 300 },
      { id: "chairs", label: "Chairs", value: 700, original: 700 },
    ],
  },
];

function calculateVariance(newVal: number, origVal: number): string {
  if (origVal === 0) return "0%";
  return (((newVal - origVal) / origVal) * 100).toFixed(2) + "%";
}

function sumChildren(children: TableRowData[]): number {
  return children.reduce((sum, c) => sum + c.value, 0);
}

function distributeToLeaves(
  children: TableRowData[],
  newTotal: number
): TableRowData[] {
  const currentTotal = sumChildren(children);
  return children.map((child) => {
    const proportion = currentTotal ? child.value / currentTotal : 0;
    const newValue = +(newTotal * proportion).toFixed(4);
    return { ...child, value: newValue };
  });
}

interface TableRowProps {
  row: TableRowData;
  level: number;
  onChange: (id: string, type: "percent" | "value", val: number) => void;
}

const TableRow: React.FC<
  TableRowProps & { showToast: (msg: string) => void }
> = ({ row, level, onChange, showToast }) => {
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(true);
  const hasChildren = row.children && row.children.length > 0;
  return (
    <>
      <tr className={styles.hierarchicalTableTr}>
        <td
          className={styles.hierarchicalTableTdLabel}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {hasChildren && (
            <button
              className={styles.table__expandBtn}
              onClick={() => setExpanded((e) => !e)}
              aria-label={expanded ? messages.collapse : messages.expand}
            >
              {expanded ? "▼" : "▶"}
            </button>
          )}
          {hasChildren ? row.label : "-- " + row.label}
        </td>
        <td className={styles.hierarchicalTableTd}>{row.value}</td>
        <td className={styles.hierarchicalTableTd}>
          <input
            className={styles.hierarchicalTableInput}
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>
        <td colSpan={2} className={styles.hierarchicalTableTd}>
          <div className={styles.hierarchicalTableButtonGroup}>
            <button
              className={styles.hierarchicalTableButton}
              onClick={() => {
                if (!input) {
                  showToast(messages.allocationPercentInput);
                  return;
                }
                const percent = parseFloat(input);
                if (!isNaN(percent)) {
                  onChange(row.id, "percent", percent);
                  setInput("");
                }
              }}
            >
              Allocation %
            </button>
            <button
              className={styles.hierarchicalTableButton}
              onClick={() => {
                if (!input) {
                  showToast(messages.allocationValueInput);
                  return;
                }
                const val = parseFloat(input);
                if (!isNaN(val)) {
                  onChange(row.id, "value", val);
                  setInput("");
                }
              }}
            >
              {messages.allocationValue}
            </button>
          </div>
        </td>
        <td className={styles.hierarchicalTableTdVariance}>
          {calculateVariance(row.value, row.original)}
        </td>
      </tr>
      {hasChildren &&
        expanded &&
        row.children!.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            level={level + 1}
            onChange={onChange}
            showToast={showToast}
          />
        ))}
    </>
  );
};

const HierarchicalTable: React.FC = () => {
  const [data, setData] = useState<TableRowData[]>(initialData);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  // Helper to update values and propagate changes
  const handleChange = (id: string, type: "percent" | "value", val: number) => {
    const updateRows = (rows: TableRowData[]): TableRowData[] =>
      rows.map((row) => {
        if (row.id === id) {
          if (type === "percent") {
            // Leaf update
            if (!row.children) {
              const newValue = +(row.value + (row.value * val) / 100).toFixed(
                4
              );
              return { ...row, value: newValue };
            } else {
              // Parent update: increase subtotal by % and distribute to leaves
              const newTotal = +(row.value + (row.value * val) / 100).toFixed(
                4
              );
              const newChildren = distributeToLeaves(row.children, newTotal);
              return {
                ...row,
                value: newTotal,
                children: newChildren,
              };
            }
          } else if (type === "value") {
            if (!row.children) {
              return { ...row, value: val };
            } else {
              // Parent update: set subtotal and distribute to leaves
              const newChildren = distributeToLeaves(row.children, val);
              return {
                ...row,
                value: val,
                children: newChildren,
              };
            }
          }
        }
        // If child, propagate update
        if (row.children) {
          const updatedChildren = updateRows(row.children);
          const newSubtotal = sumChildren(updatedChildren);
          return {
            ...row,
            value: newSubtotal,
            children: updatedChildren,
          };
        }
        return row;
      });
    setData(updateRows(data));
  };

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg });
  };

  const handleToastClose = () => {
    setToast({ show: false, message: "" });
  };

  const grandTotal = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className={styles.hierarchicalTable}>
      <Toaster
        message={toast.message}
        show={toast.show}
        onClose={handleToastClose}
      />
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        {messages.salesTableTitle}
      </h2>
      <div className={styles.hierarchicalTableCard}>
        <table className={styles.hierarchicalTableTable}>
          <thead>
            <tr className={styles.hierarchicalTableTr}>
              <th className={styles.hierarchicalTableTh}>{messages.label}</th>
              <th className={styles.hierarchicalTableTh}>{messages.value}</th>
              <th className={styles.hierarchicalTableTh}>{messages.input}</th>
              <th className={styles.hierarchicalTableTh}>
                {messages.allocationPercent}
              </th>
              <th className={styles.hierarchicalTableTh}>
                {messages.allocationValue}
              </th>
              <th className={styles.hierarchicalTableTh}>
                {messages.variancePercent}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                level={0}
                onChange={handleChange}
                showToast={showToast}
              />
            ))}
            <tr className={styles.hierarchicalTableTrGrandTotal}>
              <td>{messages.grandTotal}</td>
              <td>{grandTotal}</td>
              <td colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HierarchicalTable;
