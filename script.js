// script.js
// Selecting DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];

// Global chart variable
let expenseChart;

// Function to add an expense
const addExpense = () => {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const category = categoryInput.value;

    if (description === '' || isNaN(amount) || date === '' || category === '') {
        alert('Please fill all fields');
        return;
    }

    const expense = {
        description,
        amount,
        category,
        date
    };

    expenses.push(expense);
    displayExpenses();
    calculateTotal();
    updateChart(); // Update chart after each expense

    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
};

// Function to display expenses
const displayExpenses = () => {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.category} - ${expense.date}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
};

// Function to calculate total amount
const calculateTotal = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.innerText = total.toFixed(2);
};

// Function to delete an expense
const deleteExpense = (index) => {
    expenses.splice(index, 1);
    displayExpenses();
    calculateTotal();
    updateChart(); // Update chart after deleting
};

// Function to update the chart
const updateChart = () => {
    const categoryTotals = {
        "Food": 0,
        "House Rent": 0,
        "House Maintenance": 0,
        "Travel": 0,
        "Shopping": 0,
        "Others": 0
    };

    expenses.forEach(expense => {
        categoryTotals[expense.category] += expense.amount;
    });

    const data = Object.values(categoryTotals);
    const labels = Object.keys(categoryTotals);

    if (expenseChart) {
        expenseChart.data.datasets[0].data = data;
        expenseChart.update();
    } else {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }
};

// Add event listener to the "Add Expense" button
addExpenseBtn.addEventListener('click', addExpense);

// Initial call to update the chart with empty data
updateChart();
