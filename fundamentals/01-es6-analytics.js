const orders = [
  {
    id: 1,
    items: [
      { name: "Laptop", price: 1200 },
      { name: "Mouse", price: 50 },
    ],
    customer: { name: "John Doe" },
    status: "pending",
  },
  {
    id: 2,
    items: [
      { name: "Phone", price: 800 },
      { name: "Charger", price: 20 },
    ],
    customer: null,
    status: "refunded",
  },
  {
    id: 3,
    items: [
      { name: "Tablet", price: 600 },
      { name: "Case", price: 30 },
    ],
    customer: { name: "Jane Smith" },
    status: "completed",
  },
  {
    id: 4,
    items: [
      { name: "Monitor", price: 300 },
      { name: "Stand", price: 50 },
      { name: "HDMI Cable", price: 15 },
      { name: "USB Hub", price: 25 },
      { name: "Webcam", price: 80 },
    ],
    customer: { name: "Bob Johnson" },
    status: "completed",
  },
  {
    id: 5,
    items: [
      { name: "Keyboard", price: 100 },
      { name: "Keyboard skin", price: 20 },
    ],
    customer: null,
    status: "cancelled",
  },
];

function printOrderSummary(customerName, items, totalPrice, status) {
  console.log(`Customer: ${customerName}`);
  console.log(`Items: ${items}`);
  console.log(`Total Price: $${totalPrice}`);
  console.log(`Status: ${status}`);
  console.log("-------------------------");
}

console.log("===Order Summary===");
orders.forEach((order) => {
  const { items, customer, status } = order;
  // Customer data
  const name = customer?.name ?? "Guest";
  const allItems = items.map((i) => i.name ?? "Miscleanous Item").join(", ");
  const totalPrice = items.reduce((s, e) => s + (e?.price ?? 0), 0);

  printOrderSummary(name, allItems, totalPrice, status);
});

// Revenue calculation
const orderWithTotal = orders
  .filter((order) => order.status === "completed")
  .map((order) => ({
    ...order,
    total: order.items.reduce((s, e) => s + (e?.price ?? 0), 0),
  }));

const totalRevenue = orderWithTotal.reduce((sum, o) => sum + o.total, 0);
console.log(`Total Revenue (completed orders): $${totalRevenue}`);
