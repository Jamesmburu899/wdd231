// Get current year
const currentYear = new Date().getFullYear();
document.getElementById('year').innerHTML = currentYear;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById('last-modified').innerHTML = lastModified;

// Fetch member data from JSON file
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    return members;
  } catch (error) {
    console.error(error);
  }
}

// Display member cards
async function displayMembers() {
  const members = await getMembers();
  const directory = document.getElementById('directory');
  directory.innerHTML = '';
  members.forEach((member) => {
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card');
    memberCard.innerHTML = `
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p>${member.website}</p>
      <img src="images/${member.image}" alt="${member.name}">
    `;
    directory.appendChild(memberCard);
  });
}

// Toggle view
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('grid');
  document.getElementById('directory').classList.remove('list');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('list');
  document.getElementById('directory').classList.remove('grid');
});

// Initialize display
displayMembers();

