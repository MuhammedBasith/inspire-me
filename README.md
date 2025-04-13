# 📱 InspireMe – A Random Quotes App

InspireMe is a simple yet elegant **React Native** app that fetches random quotes and displays them with beautiful background images. It’s built using the **bare React Native CLI** (not Expo) and designed to demonstrate key concepts such as navigation, API integration, state management, local storage, and component organization.

---

## ✨ Features

- 🔀 Fetches a **random quote** from an external API
- 🎨 Displays the quote with a **random background image**
- ❤️ Allows users to **save favorite quotes** to local storage (AsyncStorage)
- 📚 Favorites screen to view all saved quotes
- 🚀 Built with **React Navigation**, **AsyncStorage**, and core RN components

---

## 🧱 Tech Stack

| Technology      | Purpose                              |
|-----------------|--------------------------------------|
| React Native    | Core framework                       |
| React Navigation| Screen-to-screen navigation          |
| AsyncStorage    | Local data persistence               |
| Bare CLI Setup  | More control vs Expo                 |

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/MuhammedBasith/InspireMe.git
cd InspireMe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Navigation & Async Storage

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npx pod-install ios  # if you're on macOS
```

### 4. Add Assets

Place 2–4 background images inside the `assets/` folder:
```
assets/
  ├── bg1.jpg
  ├── bg2.jpg
  └── bg3.jpg
```

### 5. Run the App

```bash
npm run android   # or
npm run ios
```

---

## 🧠 Concepts Covered

| Concept                  | Where it’s used                              |
|--------------------------|-----------------------------------------------|
| API Fetching             | `HomeScreen.js` – Fetch random quote         |
| Navigation Stack         | `App.js` – Stack-based navigation setup      |
| Local Images             | `QuoteScreen.js` – Random background display |
| Memoization              | `useMemo` – Lock background image per quote  |
| AsyncStorage             | `QuoteScreen.js` + `FavoritesScreen.js`      |
| FlatList Rendering       | `FavoritesScreen.js`                         |
| `useFocusEffect`         | Ensures data is reloaded on screen focus     |

---

## 📚 File Structure

```
InspireMe/
├── App.js
├── assets/
│   └── bg1.jpg, bg2.jpg, ...
├── screens/
│   ├── HomeScreen.js
│   ├── QuoteScreen.js
│   └── FavoritesScreen.js
```

---

## 📡 API Used

[DummyJSON Quotes API](https://dummyjson.com/quotes)  
We fetch a single quote by random ID:
```bash
GET https://dummyjson.com/quotes/{id}  // where id ∈ [1, 30]
```

---

## 🏁 How it Works

1. **HomeScreen** has two buttons: "Get Inspired" and "View Favorites"
2. "Get Inspired" fetches a random quote by ID and navigates to `QuoteScreen`
3. `QuoteScreen`:
   - Displays the quote and author
   - Picks a random image using `useMemo`
   - Offers a button to **save to favorites**
4. "View Favorites" opens `FavoritesScreen`
5. `FavoritesScreen`:
   - Loads from AsyncStorage
   - Shows saved quotes in a list

---

## 📝 License

MIT – free to use for educational or personal projects.
