const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#item-name').value.trim();
  const description = document.querySelector('#item-desc').value.trim();
  const reward = document.querySelector('#item-reward').value.trim();

  if (name && description && reward) {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify({ name, description, reward }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete item');
    }
  }
};

document
  .querySelector('#new-item-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.item-list')
  .addEventListener('click', delButtonHandler);
