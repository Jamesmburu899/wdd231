// JavaScript for Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modalLinks = document.querySelectorAll('.modal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
  
    // Function to open a modal
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    }
  
    // Function to close a modal
    function closeModal(modal) {
      modal.style.display = 'none';
    }
  
    // Add event listeners to modal links
    modalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('href').substring(1);
        openModal(modalId);
      });
    });
  
    // Add event listeners to close buttons
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      });
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
      modals.forEach(modal => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });
  
    // Add animation class to cards after page load
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('loaded');
    });
  });