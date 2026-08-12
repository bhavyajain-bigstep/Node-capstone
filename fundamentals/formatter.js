export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatOrderRow(order) {
  const total = order.items.reduce((s, i) => s + (i?.price ?? 0), 0);
  return `| ${order.id} | ${order.customer?.name ?? "Guest"} | ${order.status} | ${formatCurrency(total)} |`;
}

export default function formatReport({ title, threshold, orders }) {
  const completed = orders.filter((o) => o.status === "completed");

  const totalRevenue = completed.reduce((sum, o) => {
    const orderTotal = o.items.reduce((s, i) => s + (i?.price ?? 0), 0);
    return sum + orderTotal;
  }, 0);

  const aboveThreshold = completed.filter((o) => {
    const orderTotal = o.items.reduce((s, i) => s + (i?.price ?? 0), 0);
    return orderTotal >= threshold;
  });

  const rows = orders.map((o) => formatOrderRow(o)).join("\n");

  return `# ${title}

===Summary===
Total Revenue (completed orders): ${formatCurrency(totalRevenue)}
Completed Orders: ${completed.length}
Orders Above Threshold ($${threshold}): ${aboveThreshold.length}

--------------------------------

===Order Details===
| ID | Customer | Status | Total |
|----|----------|--------|-------|
${rows}
`;
}