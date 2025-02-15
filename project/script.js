document.addEventListener('DOMContentLoaded', () => {
  // current year, time, and last modified date
    const currentYearElement = document.getElementById("current-year");
    const currentTimeElement = document.getElementById("current-time");

    const updateTime = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentTime = now.toLocaleTimeString();
        
        if (currentYearElement) {
            currentYearElement.textContent = currentYear;
        }
        
        if (currentTimeElement) {
            currentTimeElement.textContent = currentTime;
        }
    };
    
    setInterval(updateTime, 1000);
    updateTime();

    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        const lastModifiedDate = new Date(document.lastModified);
        const formattedDate = lastModifiedDate.toLocaleString();
        lastModifiedElement.textContent = formattedDate;
    }

    // for search functionality
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');

    if (searchInput && searchButton) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        };

        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // for product reviews
    const submitButtons = document.querySelectorAll('.submit-review');

    submitButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.getAttribute('data-product');
            const reviewText = document.querySelector(`#review-text-${product}`).value;

            if (reviewText) {
                let reviews = JSON.parse(localStorage.getItem(`reviews-${product}`)) || [];
                reviews.push(reviewText);
                localStorage.setItem(`reviews-${product}`, JSON.stringify(reviews));

                const reviewsContainer = document.querySelector(`#reviews-${product}`);
                reviewsContainer.innerHTML = reviews.map(review => `<p>${review}</p>`).join('');

                document.querySelector(`#review-text-${product}`).value = '';
            } else {
                alert('Please write a review before submitting.');
            }
        });
    });

    const productContainers = document.querySelectorAll('[id^="reviews-"]');
    productContainers.forEach(container => {
        const product = container.id.replace('reviews-', '');
        const reviews = JSON.parse(localStorage.getItem(`reviews-${product}`)) || [];
        container.innerHTML = reviews.map(review => `<p>${review}</p>`).join('');
    });

    //  for rendering products
    const products = [
        // Your product data here...
    ];

    const productContainer = document.getElementById("product-list");

    products.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p><strong>Eco Benefit:</strong> ${product.ecoBenefit}</p>
                <a href="${product.buyLink}" target="_blank" class="buy-button">Buy Now</a>
                <h4>User Reviews</h4>
                <div id="${product.reviewsContainer}"></div>
                <textarea id="${product.reviewText}" placeholder="Write a review..."></textarea>
                <button class="submit-review" data-product="${product.productId}">Submit Review</button>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    const reviewButtons = document.querySelectorAll(".submit-review");

    reviewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.dataset.product;
            const reviewText = document.getElementById(`review-text-${productId}`).value;
            
            if (reviewText) {
                const reviewsContainer = document.getElementById(`reviews-${productId}`);
                const newReview = document.createElement("div");
                newReview.classList.add("review");
                newReview.textContent = reviewText;
                reviewsContainer.appendChild(newReview);
                
                document.getElementById(`review-text-${productId}`).value = "";
            }
        });
    });

    // Star Rating System
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            ratingValue.value = value; // Set the hidden input value

            // Highlight selected stars
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const value = star.getAttribute('data-value');

            // Highlight stars on hover
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            // Remove hover effect
            stars.forEach(s => s.classList.remove('hover'));
        });
    });

    //  Feedback Form Submission
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Validate rating
            if (!ratingValue.value) {
                alert('Please select a rating before submitting.');
                return;
            }

            // Validate feedback text
            const feedbackText = document.getElementById('feedback-text').value.trim();
            if (!feedbackText) {
                alert('Please write your feedback before submitting.');
                return;
            }

            // Simulate form submission 
            setTimeout(() => {
                feedbackForm.reset(); // Reset form
                stars.forEach(star => star.classList.remove('selected')); // Reset stars
                thankYouMessage.style.display = 'block'; // Show thank you message
            }, 1000);
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.id = 'success-message';
    successMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
    successMessage.style.display = 'none';
    successMessage.style.textAlign = 'center';
    successMessage.style.marginTop = '20px';
    successMessage.style.color = '#2c8f5d';
    successMessage.style.fontSize = '18px';
    contactForm.insertAdjacentElement('afterend', successMessage);

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form fields
            if (!name || !email || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission 
            setTimeout(() => {
                contactForm.reset(); // Reset form
                successMessage.style.display = 'block'; // Show success message
            }, 1000);
        });
    }
});
