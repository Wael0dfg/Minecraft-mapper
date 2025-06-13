# 🗺️ Minecraft Mapper

Minecraft Mapper is a simple website where users can upload their **Minecraft Bedrock world files (.zip)** and see a **map of everything they’ve built or changed**.

---

## 🌍 What It Does

- Accepts Bedrock world uploads
- Reads the `level.dat` file to get the world seed
- Uses the Cubiomes engine to generate a map from the seed
- (Planned) Adds custom changes made by the player (buildings, trees, etc.)

---

## 📁 Project Structure

```
minecraft-mapper/
├── src/
│   ├── frontend/      # React user interface (upload, view map)
│   ├── backend/       # Flask backend (upload, seed, generate map)
│   └── cubiomes/      # Cubiomes C code (map generation)
├── uploads/           # Temp storage for uploaded zip files
├── requirements.txt   # Python dependencies
├── .gitignore         # Git ignore file
└── README.md          # This file
```

---

## 🚀 How to Use It

1. Upload your Minecraft Bedrock world (.zip file)
2. The website will automatically detect the seed
3. A map will be shown (initial version based on seed only)

---

## 🧩 Technologies Used

- Frontend: **React.js**
- Backend: **Python Flask**
- Map Generator: [**Cubiomes**](https://github.com/Cubitect/cubiomes) (MIT License)

---

## ⚖️ License

This project uses the **MIT License**. It includes Cubiomes, which is also MIT licensed.

> Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.

