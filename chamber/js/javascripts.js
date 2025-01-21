// Revised JavaScript for handling directory data

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

  // Check if members array is empty
  if (!members.length) {
      console.error('No members found');
      const directory = document.getElementById('directory');
      directory.innerHTML = '<p>No members to display.</p>';
      return;
  }

  const directory = document.getElementById('directory');
  directory.innerHTML = ''; // Clear any existing content

  members.forEach((member) => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      // Member card content
      memberCard.innerHTML = `
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">${member.website}</a></p>
          <img src="images/${member.image}" alt="${member.name}">
      `;

      directory.appendChild(memberCard);
  });
}

// Initialize the directory display
displayMembers();


