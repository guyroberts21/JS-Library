const modal = document.getElementById('modal');
const modalBtn = document.querySelector('.add-book');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
modalCloseBtn.addEventListener('click', closeModal);
// Listen for outside click (in window)
window.addEventListener('click', clickOutside);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}