const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to register user
app.post('/register', (req, res) => {
    const { username, password, name, phone, country, state, email } = req.body;

    // Create or read the existing Excel file
    const filePath = 'user_data.xlsx';
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
    }

    // Prepare user data
    const userData = [[username, password, name, phone, country, state, email]];
    const worksheet = xlsx.utils.aoa_to_sheet(userData);

    // Append to the existing sheet or create a new one
    if (!workbook.Sheets['Users']) {
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
    } else {
        xlsx.utils.sheet_add_aoa(workbook.Sheets['Users'], userData, { origin: -1 });
    }

    // Save the workbook
    xlsx.writeFile(workbook, filePath);
    res.send('User registered successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
