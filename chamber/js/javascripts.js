// Get current year
const currentYear = new Date().getFullYear();
document.getElementById('year').innerHTML = currentYear;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById('last-modified').innerHTML = lastModified;

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
  directory.innerHTML = '';
  members.forEach((member) => {
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card');
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

// Toggle view
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('grid');
  document.getElementById('directory').classList.remove('list');
  document.getElementById('grid-view').classList.add('active');
  document.getElementById('list-view').classList.remove('active');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory').classList.add('list');
  document.getElementById('directory').classList.remove('grid');
  document.getElementById('list-view').classList.add('active');
  document.getElementById('grid-view').classList.remove('active');
});

// Initialize display
displayMembers();

