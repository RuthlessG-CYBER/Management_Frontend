
# Inventory & Order Fulfillment System – Web Admin Panel

This repository contains the **Web (Admin) frontend** of the **Inventory & Order Fulfillment System**.  
The admin panel is responsible for **product management, stock monitoring, order tracking, alerts, and reporting**.

---

## Project Overview

The system provides separate experiences:
- **Web Admin Panel** → Product, stock, orders, alerts, and reports
- **Mobile App (Staff)** → Order creation, status updates, stock viewing

This README focuses **only on the Web Admin panel**.

---


## Screenshots

### Home / Product Overview
<img width="1920" height="931" alt="inventry1" src="https://github.com/user-attachments/assets/16c38cb7-66df-45f3-abfc-101cdcfd7f5f" />


### Place Order Modal
<img width="1920" height="934" alt="inventry6" src="https://github.com/user-attachments/assets/df106090-8afb-44a9-95c0-6b87c325619d" />



### Dashboard Overview
<img width="1920" height="933" alt="inventry5" src="https://github.com/user-attachments/assets/16573265-c15e-45f7-8634-f837d458d236" />


### Orders Management
<img width="1920" height="934" alt="inventry4" src="https://github.com/user-attachments/assets/b48d80bd-7efa-454b-9b9b-2ad090495952" />

<img width="1920" height="932" alt="inventry8" src="https://github.com/user-attachments/assets/31c48209-7796-48b3-9d94-00b065fec5f1" />

### Add Product Modal
<img width="1920" height="933" alt="inventry3" src="https://github.com/user-attachments/assets/24450ed1-d450-4d25-b47c-cd23ccbc8881" />



### Products Management
<img width="1920" height="934" alt="inventry2" src="https://github.com/user-attachments/assets/3fd9e927-0eb8-4ac0-8154-41cb20dddd03" />


### Payment Integration
<img width="1920" height="934" alt="inventry7" src="https://github.com/user-attachments/assets/d98b4282-aed7-4620-ba79-d38e87fac80a" />


---

## Web Admin Features

### Product & Stock Management
- Add, edit, and delete products
- Manage SKU, price, stock quantity, and minimum stock level
- Automatic **low-stock detection and highlighting**

### Order Management
- View all orders created by staff
- Track order status: **Pending → Processed → Shipped**
- View stock impact per order

### Stock Alerts & Replenishment
- Low-stock products flagged automatically
- Dashboard cards for:
  - Total products
  - Low-stock items
  - Total orders
- Restocking list generation

### Reporting & Analytics
- View total orders and products sold
- Identify **top-selling** and **fastest-depleting** products
- Export reports in **CSV format**

---

## Module Breakdown

### Module 1: Product & Stock Management
- CRUD operations for products
- Real-time stock visibility
- Low-stock logic based on minimum threshold

### Module 2: Order Validation & Tracking
- Centralized order table
- Stock validation visibility
- Order lifecycle tracking

### Module 3: Stock Alerts & Notifications
- Automated low-stock alerts
- Dashboard-based monitoring
- Read-only alerts synced with staff app

### Module 4: Reporting & Analysis
- Sales and inventory reports
- Stock depletion insights
- Downloadable CSV reports

---

## Tech Stack (Web Admin)

- React
- Tailwind CSS
- Axios
- REST API (Node.js + Express)
- MongoDB

---

## Getting Started

```bash
npm install
npm start
```

---


## Project Structure

```
src/
 ├─ components/
 ├─ assets/
 ├─ lib/
 └─ types/
```

---

## Best Practices Followed

- Modular component structure
- Clean and reusable UI components
- Clear separation of concerns
- Scalable dashboard layout

---

## License
```
Created by Soumya Panda
© 2025 Inventory & Order Fulfillment System. All rights reserved.
```
