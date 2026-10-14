// 1. Select DOM elements
const loadUsersBtn = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusEl = document.getElementById('status');
const usersListEl = document.getElementById('users-list');

// Array to store the loaded users
let allUsers = [];

// 2. The loadUsers function (async/await, try/catch/finally)
async function loadUsers() {
    // Disable button and show loading message
    loadUsersBtn.disabled = true;
    statusEl.textContent = 'Loading users...';
    usersListEl.innerHTML = ''; // Clear previous list

    try {
        // Fetch the data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Check if response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse JSON and store in our array
        allUsers = await response.json();
        
        // Show success message and render the users
        statusEl.textContent = 'Success! Users loaded.';
        renderUsers(allUsers);

    } catch (error) {
        // Show error message
        statusEl.textContent = `Error: ${error.message}`;
    } finally {
        // Re-enable the button no matter what happens
        loadUsersBtn.disabled = false;
    }
}

// 3. The renderUsers function (uses createElement and textContent)
function renderUsers(list) {
    // Clear the current list
    usersListEl.innerHTML = '';

    // Check if the filtered list is empty
    if (list.length === 0) {
        statusEl.textContent = 'No users match your filter.';
        return; // Stop executing if empty
    }

    // If we had the "no match" message previously but now have results, restore success message
    if (statusEl.textContent === 'No users match your filter.') {
        statusEl.textContent = 'Success! Users loaded.';
    }

    // Loop through the list and create DOM elements
    list.forEach(user => {
        const li = document.createElement('li');
        
        const nameEl = document.createElement('p');
        nameEl.textContent = `Name: ${user.name}`;
        
        const emailEl = document.createElement('p');
        emailEl.textContent = `Email: ${user.email}`;
        
        const cityEl = document.createElement('p');
        cityEl.textContent = `City: ${user.address.city}`;
        
        const companyEl = document.createElement('p');
        companyEl.textContent = `Company: ${user.company.name}`;
        
        // Append details to the list item, and list item to the ul
        li.appendChild(nameEl);
        li.appendChild(emailEl);
        li.appendChild(cityEl);
        li.appendChild(companyEl);
        usersListEl.appendChild(li);
    });
}

// 4. Event Listeners
// Listen for the button click to load users
loadUsersBtn.addEventListener('click', loadUsers);

// Listen for the input event on the filter box
filterInput.addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    
    // Filter the stored array (case-insensitive)
    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchText)
    );
    
    // Render the filtered results (no new network request is made)
    renderUsers(filteredUsers);
});