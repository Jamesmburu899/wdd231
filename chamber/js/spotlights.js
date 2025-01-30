const members = [
    {
      name: 'Eaagads Ltd.',
      address: '123 Coffee Lane, Ruiru, Kenya',
      phone: '+254-700-111-111',
      website: 'https://eaagads.co.ke',
      image: 'images/eaagads.jpg',
      membershipLevel: 1
    },
    {
      name: 'Kapchorua Tea Kenya Plc.',
      address: '456 Tea Estate Road, Kericho, Kenya',
      phone: '+254-711-222-222',
      website: 'https://kapchoruatea.co.ke',
      image: 'images/kapchorua-tea.jpg',
      membershipLevel: 2
    },
    {
      name: 'Kakuzi Plc.',
      address: '789 Plantation Avenue, Thika, Kenya',
      phone: '+254-722-333-333',
      website: 'https://kakuzi.co.ke',
      image: 'images/kakuzi.jpg',
      membershipLevel: 3
    },
    {
      name: 'Car & General (K) Ltd.',
      address: '321 General Motors Road, Nairobi, Kenya',
      phone: '+254-733-444-444',
      website: 'https://cargen.com',
      image: 'images/car-general.jpg',
      membershipLevel: 1
    },
    {
      name: 'ABSA Bank Kenya Plc.',
      address: '901 Bank Street, Nairobi, Kenya',
      phone: '+254-744-555-555',
      website: 'https://absabank.co.ke',
      image: 'images/absa-bank.jpg',
      membershipLevel: 2
    },
    {
      name: 'Stanbic Holdings Ltd.',
      address: '234 Financial District, Nairobi, Kenya',
      phone: '+254-755-666-666',
      website: 'https://stanbicbank.co.ke',
      image: 'images/stanbic.jpg',
      membershipLevel: 3
    },
    {
      name: 'Kenya Airways Ltd.',
      address: '567 Airport Road, Nairobi, Kenya',
      phone: '+254-766-777-777',
      website: 'https://kenya-airways.com',
      image: 'images/kenya-airways.jpg',
      membershipLevel: 1
    }
  ];
  
  const goldSilverMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
  const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  const spotlightCards = randomMembers.map(member => `
    <div class="spotlight-card">
      <img src="${member.image}" alt="${member.name} Logo">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p>Membership Level: ${member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
    </div>
  `).join('');
  
  document.getElementById('spotlight-cards').innerHTML = spotlightCards;