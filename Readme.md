# 🎅 Secret Santa Game

## 📝 Overview
The **Secret Santa Game** is a web application that automates the process of assigning Secret Santa participants in a company. Employees are randomly assigned a recipient for gift-giving while ensuring fairness and preventing duplicate pairings from previous years.

## 📌 Features
- 📂 **Upload CSV File**: Easily upload employee data.
- 🔄 **Randomized Assignments**: Ensures each employee gets a unique secret child.
- 🚫 **No Repetitions**: Prevents pairing the same recipient as last year.
- 📥 **Downloadable Results**: Generates and downloads assignments as a CSV file.
- 💡 **Lightweight & Fast**: Built with **React (Vite) + Node.js (Express)**.

---

## 🏗 Tech Stack
### **Frontend (React + Vite)**
- ⚡ Fast development with **Vite**
- 🎨 UI built with **React.js**
- 📁 CSV file handling using **papaparse**

### **Backend (Node.js + Express)**
- 🚀 API powered by **Express.js**
- 🔀 Randomization logic using **JavaScript**
- 📁 File handling with **fs & csv-parser**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/secret-santa-game.git
cd secret-santa-game
```

### 2️⃣ Install Dependencies
#### Frontend:
```sh
cd fe  # Navigate to React app folder
npm install 
```

#### Backend:
```sh
cd be  # Navigate to backend folder
npm install
```

### 3️⃣ Run the Application
#### Start Backend Server:
```sh
cd be
npm run dev
```

#### Start Frontend (React + Vite):
```sh
cd fe
npm run dev
```

Your app should now be running at **http://localhost:5173** 🚀

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|------------|--------------------------------|
| `POST` | `/upload-employees` | Uploads employee CSV file.|
| `GET`  | `/upload-previous-assignments` | Uploads last year's Secret Santa pairings. |
| `GET`  | `/generate-assignments` | Generates new Secret Santa assignments. |
| `GET`  | `/download-assignments` | Downloads the new pairings as a CSV file. |

---


## ✅ To-Do & Future Enhancements
- 📧 **Email Notifications** (Send assignments via email)
- 📊 **Admin Dashboard** (Track pairings & history)
- 🔄 **Persistent Storage** (Use a database instead of CSV files)

---

## 📜 License
This project is open-source and licensed under the **MIT License**.

---

## 🎁 Contributing
Feel free to fork this repo and submit a PR! Any contributions to improve the project are welcome. 🚀

---

## 📬 Contact
For questions or suggestions, reach out via GitHub Issues or email **pavankapoor31@gmail.com**. 🚀

