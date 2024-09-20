// index.js
const http = require("http");
const employees = require("./Employee"); // Importing the Employee module

console.log("Lab 03 - NodeJs");

// Define server port
const port = process.env.PORT || 8081;

// Create web server using the core Node.js API
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json"); // Set content type to JSON

    // Check if the request is GET, otherwise respond with a 405 error
    if (req.method !== 'GET') {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ "error": "Method Not Allowed" }));
    } else {
        // Main route returning a welcome message in HTML
        if (req.url === '/') {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        }

        // Route returning all employee details
        else if (req.url === '/employee') {
            res.writeHead(200);
            res.end(JSON.stringify(employees)); // Show all employee details in JSON format
        }

        // Route returning employee full names in ascending order
        else if (req.url === '/employee/names') {
            const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort(); // Concatenate names and sort
            res.writeHead(200);
            res.end(JSON.stringify(names)); // Show the names in a JSON array
        }

        // Route returning the total salary of all employees
        else if (req.url === '/employee/totalsalary') {
            const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0); // Calculate total salary
            res.writeHead(200);
            res.end(JSON.stringify({ "total_salary": totalSalary })); // Show total salary in JSON format
        }

        // Route not found, respond with a 404 error
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ "error": "Not Found" }));
        }
    }
});

// Start the server on the defined port
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
