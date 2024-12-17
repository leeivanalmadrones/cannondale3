// Listen for the search button click to trigger the search
document.getElementById("search-button").addEventListener("click", function() {
    let searchQuery = document.getElementById("search-input").value.trim();

    if (searchQuery.length > 0) {
        fetchSearchResults(searchQuery);
        document.getElementById("search-results").style.display = "block"; // Show the results container
    }
});

// Listen for the 'Enter' key to trigger the search
document.getElementById("search-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let searchQuery = document.getElementById("search-input").value.trim();
        if (searchQuery.length > 0) {
            fetchSearchResults(searchQuery);
            document.getElementById("search-results").style.display = "block"; // Show the results container
        }
    }
});

// Function to fetch search results from PHP
function fetchSearchResults(query) {
    fetch("php/search.php?search_query=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => console.error('Error fetching search results:', error));
}

// Function to display search results and show the close button
function displaySearchResults(products) {
    const resultsContainer = document.getElementById("search-results");
    const closeButton = document.getElementById("close-button");

    resultsContainer.innerHTML = "";  // Clear previous results

    if (products.length > 0) {
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product-card");

            productElement.innerHTML = `
                <div class="product-card-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-card-info">
                    <div class="product-card-name">${product.name}</div>
                    <div class="product-card-price">₱${product.price}</div>
                </div>
            `;
            resultsContainer.appendChild(productElement);
        });

        // Show the close button
        closeButton.style.display = "inline-block";
    } else {
        resultsContainer.innerHTML = "<p>No products found.</p>";
        closeButton.style.display = "none"; // Hide the close button if no results
    }
}

// Function to hide the search results when the close button is clicked
document.getElementById("close-button").addEventListener("click", function() {
    const resultsContainer = document.getElementById("search-results");
    const closeButton = document.getElementById("close-button");

    // Hide the results container and the close button
    resultsContainer.style.display = "none"; // Hide the search results container
    closeButton.style.display = "none"; // Hide the close button
    document.getElementById("search-input").value = ""; // Optional: clear the search input field
});
