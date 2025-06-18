// Frontend JavaScript for Student Management System
const API_BASE = '/api/Students';  // API base path

document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard
  if (document.getElementById('totalCount')) {
    initDashboard();
  }
  
  // Handle form submission
  if (document.getElementById('addForm')) {
    setupAddForm();
  }
  
  // Initialize data table
  if (document.getElementById('dataTable')) {
    initDataTable();
  }
  
  // Handle login
  if (document.getElementById('loginForm')) {
    setupLoginForm();
  }
});

// ========== DASHBOARD FUNCTIONS ==========
function initDashboard() {
  updateCounts();
  renderChart();
}

function updateCounts() {
  // Fetch count from API
  fetch(`${API_BASE}/count`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('totalCount').textContent = data.count;
    })
    .catch(error => console.error('Error fetching count:', error));
}

function renderChart() {
  // Fetch stats from API
  fetch(`${API_BASE}/stats`)
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Students Distribution',
            data: data.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching chart data:', error));
}

// ========== FORM HANDLING ==========
function setupAddForm() {
  const form = document.getElementById('addForm');
  
  // Real-time validation
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => validateField(input));
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    form.querySelectorAll('input').forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    
    if (isValid) {
      const newItem = {};
      
      // Collect form data
      form.querySelectorAll('input').forEach(input => {
        newItem[input.id] = input.type === 'checkbox' ? input.checked : input.value;
      });
      
      // Send to backend API
      fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      .then(response => response.json())
      .then(data => {
        // Show success message
        const successAlert = document.getElementById('successAlert');
        successAlert.classList.remove('d-none');
        successAlert.textContent = 'Student added successfully!';
        
        // Reset form
        form.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          successAlert.classList.add('d-none');
        }, 3000);
      })
      .catch(error => {
        console.error('Error adding Student:', error);
        alert('Failed to add Student. Please try again.');
      });
    }
  });
}

function validateField(field) {
  if (field.required && !field.value.trim()) {
    field.classList.add('is-invalid');
    return false;
  }
  
  // Add additional validation as needed
  field.classList.remove('is-invalid');
  return true;
}

// ========== DATA TABLE FUNCTIONS ==========
function initDataTable() {
  renderTable();
  
  // Setup search
  document.getElementById('searchInput').addEventListener('input', renderTable);
  
  // Setup sorting
  document.getElementById('sortAZ').addEventListener('click', () => sortTable('asc'));
  document.getElementById('sortZA').addEventListener('click', () => sortTable('desc'));
}

function renderTable() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  // Fetch data from API
  fetch(API_BASE)
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm)
        )
      );
      
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';
      
      filteredData.forEach(item => {
        const row = document.createElement('tr');
        
        // Display ID and name by default - customize as needed
        // NOTE: Adjust these fields based on your attributes
        row.innerHTML = `
          <td>${item._id}</td>
          <td>${item.name || 'N/A'}</td>
          <td>${item.status || 'Active'}</td>
          <td>
            <button class="btn btn-sm btn-warning edit-btn" data-id="${item._id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${item._id}">Delete</button>
          </td>
        `;
        
        tableBody.appendChild(row);
      });
      
      // Add event listeners to action buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEdit);
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function sortTable(order) {
  fetch(API_BASE)
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => {
        const nameA = a.name?.toUpperCase() || '';
        const nameB = b.name?.toUpperCase() || '';
        
        if (order === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
      
      // Update table with sorted data
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';
      
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item._id}</td>
          <td>${item.name || 'N/A'}</td>
          <td>${item.status || 'Active'}</td>
          <td>
            <button class="btn btn-sm btn-warning edit-btn" data-id="${item._id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${item._id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error sorting data:', error));
}

function handleEdit(e) {
  const id = e.target.dataset.id;
  // Navigate to edit page or show modal
  alert(`Edit functionality would open here for ID: ${id}`);
}

function handleDelete(e) {
  const id = e.target.dataset.id;
  
  if (confirm('Are you sure you want to delete this item?')) {
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Refresh table after successful delete
        renderTable();
      } else {
        console.error('Delete failed:', response.status);
        alert('Failed to delete item. Please try again.');
      }
    })
    .catch(error => console.error('Error deleting item:', error));
  }
}

// ========== AUTHENTICATION ==========
function setupLoginForm() {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (username && password) {
      // In a real implementation, this would call your authentication API
      // For now, we'll just store in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // Redirect to dashboard
      window.location.href = 'index.html';
    } else {
      alert('Please enter both username and password');
    }
  });
}
