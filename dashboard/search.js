// script.js

// API Endpoint and Key (replace with your actual key if required)
const API_URL = 'https://zylalabs.com/api/3139/predictive+search+api/3336/autocomplete';
const API_KEY = 'your-api-key-here'; // Replace with the actual key if needed

// Function to fetch suggestions dynamically
async function fetchSuggestions(query) {
  const suggestionsList = document.getElementById('suggestions');

  // Clear previous suggestions if the query is empty
  if (!query.trim()) {
    suggestionsList.innerHTML = '';
    return;
  }

  try {
    // Fetch suggestions from the API
    const response = await fetch(`${API_URL}?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // Include if API requires authentication
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Assuming the API response contains a 'suggestions' array
    renderSuggestions(data.suggestions || []);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}

// Function to render suggestions
function renderSuggestions(suggestions) {
  const suggestionsList = document.getElementById('suggestions');
  suggestionsList.innerHTML = '';

  // Add suggestions to the list
  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    li.onclick = () => selectSuggestion(suggestion);
    suggestionsList.appendChild(li);
  });
}

// Function to handle suggestion click
function selectSuggestion(value) {
  const searchBar = document.getElementById('search-bar');
  searchBar.value = value;

  // Clear suggestions after selection
  const suggestionsList = document.getElementById('suggestions');
  suggestionsList.innerHTML = '';
}
