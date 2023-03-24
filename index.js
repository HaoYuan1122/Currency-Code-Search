// Fetch the currency data from the API
fetch('https://api.coinbase.com/v2/currencies')
.then(response => response.json())
.then(obj => {
    // Get the currency list and search input elements
    const currencyList = document.getElementById('currency-list');
    const searchInput = document.getElementById('search-input');

    // Loop through each currency and add a row to the table
    obj.data.forEach(currency => {
        const row = document.createElement('tr');
        const codeCell = document.createElement('td');
        const nameCell = document.createElement('td');
        codeCell.textContent = currency.id;
        nameCell.textContent = currency.name;
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        currencyList.appendChild(row);
        row.addEventListener('mouseover',()=>{
            row.classList='bg-secondary'
            
        })
        row.addEventListener('mouseout',()=>{
            row.classList=''
        })
    });

    // Add event listener to search input to filter table rows
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        currencyList.querySelectorAll('tr').forEach(row => {
            const code = row.querySelector('td:first-child').textContent.toLowerCase();
            const name = row.querySelector('td:last-child').textContent.toLowerCase();
            if (code.includes(searchTerm) || name.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
})
.catch(error => console.error(error));

// Add event listener to mode toggle button
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
const body = document.querySelector('body');
body.classList.toggle('dark-mode');
modeToggle.innerText = body.classList.contains('dark-mode') ? 'Dark Mode On' : 'Light Mode On'
});