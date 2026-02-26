const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "data.json");

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
}

app.get('/api/entries', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        res.json(data);
    } catch {
        res.status(500).json({ error: "خطا در خواندن داده" });
    }
});

app.post('/api/entries', (req, res) => {
    try {
        const { type, dayNumber, relative, username } = req.body;

        if (!type || !dayNumber || !relative || !username) {
            return res.status(400).json({ error: "تمام فیلدها الزامی هستند" });
        }

        const dayNum = Number(dayNumber);
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

        if (data.some(x => x.type === type && x.dayNumber === dayNum)) {
            return res.status(400).json({ error: "این زمان قبلاً رزرو شده است" });
        }

        const newEntry = { type, dayNumber: dayNum, relative, username };
        data.push(newEntry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.json(newEntry);
    } catch {
        res.status(500).json({ error: "خطا در افزودن" });
    }
});

app.delete('/api/entries', (req, res) => {
    try {
        const { type, dayNumber, username } = req.body;
        let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

        const newData = data.filter(x => {
            const isMatch = x.type === type && x.dayNumber === Number(dayNumber);
            if (isMatch) {
                
                if (username === 'admin' || x.username === username) {
                    return false;
                }
            }
            return true; 
        });

        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "خطا در حذف" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});