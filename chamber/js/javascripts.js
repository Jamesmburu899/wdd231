// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get current year
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.innerHTML = currentYear;
  }

  // Get last modified date
  const lastModified = document.lastModified;
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = lastModified;
  }

  // JSON data for attractions
  const attractions = [
    {
      name: "Timbuktu Market",
      address: "123 Market St, Timbuktu",
      description: "A bustling marketplace offering local crafts, spices, and goods.",
      image: "images/market.webp",
      width: 400, // Explicit width
      height: 300 // Explicit height
    },
    {
      name: "Sankore Mosque",
      address: "456 Mosque Rd, Timbuktu",
      description: "A historic mosque and center of Islamic learning.",
      image: "images/mosque.webp",
      width: 400,
      height: 300
    },
    {
      name: "Timbuktu Library",
      address: "789 Knowledge Ave, Timbuktu",
      description: "Home to ancient manuscripts and scholarly works.",
      image: "images/library.webp",
      width: 400,
      height: 300
    },
    {
      name: "Desert Oasis",
      address: "101 Oasis Dr, Timbuktu",
      description: "A serene escape with natural springs and palm trees.",
      image: "images/oasis.webp",
      width: 400,
      height: 300
    },
    {
      name: "Cultural Museum",
      address: "202 Heritage Ln, Timbuktu",
      description: "Explore the rich history and culture of Timbuktu.",
      image: "images/museum.webp",
      width: 400,
      height: 300
    },
    {
      name: "Festival Grounds",
      address: "303 Celebration Blvd, Timbuktu",
      description: "Host to annual cultural festivals and events.",
      image: "images/festival.webp",
      width: 400,
      height: 300
    },
    {
      name: "Artisan Village",
      address: "404 Craft St, Timbuktu",
      description: "Discover handmade crafts and traditional art.",
      image: "images/artisan.webp",
      width: 400,
      height: 300
    },
    {
      name: "Sunset Dunes",
      address: "505 Dune Rd, Timbuktu",
      description: "Experience breathtaking sunsets over the Sahara.",
      image: "images/dunes.webp",
      width: 400,
      height: 300
    }
  ];

  // Function to create cards dynamically for attractions
  function createCards() {
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
      gridContainer.style.minHeight = "800px"; // Reserve space for cards
      attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = attraction.name;

        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = attraction.image;
        image.alt = attraction.name;
        image.width = attraction.width; // Explicit width
        image.height = attraction.height; // Explicit height
        image.loading = "lazy"; // Lazy load below-the-fold images
        figure.appendChild(image);

        const address = document.createElement('address');
        address.textContent = attraction.address;

        const description = document.createElement('p');
        description.textContent = attraction.description;

        const button = document.createElement('button');
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        gridContainer.appendChild(card);
      });
    }
  }

  // Call function to create attraction cards
  createCards();

  // Fetch member data from JSON file
  async function getMembers() {
    try {
      const response = await fetch('Data/members.json');
      const members = await response.json();
      return members;
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }

  // Display member cards
  async function displayMembers() {
    const members = await getMembers();
    const directory = document.getElementById('directory');
    if (directory) {
      directory.innerHTML = '';
      members.forEach((member) => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">${member.website}</a></p>
          <img src="images/${member.image}" alt="${member.name}" width="100" height="100">
        `;
        directory.appendChild(memberCard);
      });
    }
  }

  // Toggle view between grid and list
  const gridViewButton = document.getElementById('grid-view');
  const listViewButton = document.getElementById('list-view');

  if (gridViewButton && listViewButton) {
    gridViewButton.addEventListener('click', () => {
      const directory = document.getElementById('directory');
      if (directory) {
        directory.classList.add('grid');
        directory.classList.remove('list');
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
      }
    });

    listViewButton.addEventListener('click', () => {
      const directory = document.getElementById('directory');
      if (directory) {
        directory.classList.add('list');
        directory.classList.remove('grid');
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
      }
    });
  }

  // Initialize the display of members
  displayMembers();

  // Display form data on the thank you page
  const urlParams = new URLSearchParams(window.location.search);
  const formData = {
    'First Name': urlParams.get('first-name'),
    'Last Name': urlParams.get('last-name'),
    'Email': urlParams.get('email'),
    'Phone': urlParams.get('phone'),
    'Business Name': urlParams.get('business-name'),
    'Date Submitted': urlParams.get('timestamp')
  };

  const thankYouInfo = document.getElementById('thank-you-info');
  if (thankYouInfo) {
    let infoHTML = '';
    for (const key in formData) {
      infoHTML += `<p><strong>${key}:</strong> ${formData[key]}</p>`;
    }
    thankYouInfo.innerHTML = infoHTML;
  }

  // Populate timestamp hidden field
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal functionality to open and close modals
  document.querySelectorAll('.modal-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = this.getAttribute('href').substring(1);
      var modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  // Close modal
  document.querySelectorAll('.close').forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Add animation class to cards after page load
  document.querySelectorAll('.card').forEach(function (card) {
    card.classList.add('loaded');
  });
});