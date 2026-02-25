const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// مقداردهی اولیه فایل داده
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// توابع کمکی برای کار با فایل
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// مسیر دریافت لیست
app.get('/api/entries', (req, res) => {
    try {
        res.json(readData());
    } catch (err) {
        res.status(500).json({ error: "خطا در خواندن فایل" });
    }
});

// مسیر افزودن داده جدید
app.post('/api/entries', (req, res) => {
    try {
        const { type, dayNumber, relative } = req.body;
        const data = readData();
        const dayNum = Number(dayNumber);

        // جلوگیری از تکرار
        if (data.some(x => x.type === type && x.dayNumber === dayNum)) {
            return res.status(400).json({ error: "این زمان قبلاً ثبت شده است" });
        }

        data.push({ type, dayNumber: dayNum, relative });
        writeData(data);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "خطا در ذخیره‌سازی" });
    }
});

// مسیر حذف داده
app.delete('/api/entries', (req, res) => {
    try {
        const { type, dayNumber } = req.body;
        const data = readData().filter(x => !(x.type === type && x.dayNumber === Number(dayNumber)));
        writeData(data);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "خطا در حذف" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});