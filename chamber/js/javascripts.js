// Function to fetch members.json and handle errors
async function getMembers() {
  try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
  } catch (error) {
      console.error('Error fetching members:', error);
      return []; // Return an empty array if an error occurs
  }
}

// Function to display members in the directory
async function displayMembers() {
  const members = await getMembers();

  const directory = document.getElementById('directory');
  directory.innerHTML = ''; // Clear any existing content

  if (!members.length) {
      directory.innerHTML = '<p>No members to display.</p>';
      return;
  }

  members.forEach((member) => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      memberCard.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      `;

      directory.appendChild(memberCard);
  });
}

// Toggle view between grid and list
function setupViewToggle() {
  const gridViewButton = document.getElementById('grid-view');
  const listViewButton = document.getElementById('list-view');
  const directory = document.getElementById('directory');

  gridViewButton.addEventListener('click', () => {
      directory.classList.remove('list');
      directory.classList.add('grid');
  });

  listViewButton.addEventListener('click', () => {
      directory.classList.remove('grid');
      directory.classList.add('list');
  });
}

// Initialize the directory display
displayMembers();
setupViewToggle();
