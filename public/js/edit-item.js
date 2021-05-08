const updateItem = async (event) => {
  const name = document.querySelector('#item-name').value;
  const description = document.querySelector('#item-desc').value;
  const reward = document.querySelector('#item-reward').value;
  const id = document.querySelector('#update-item').getAttribute('data-item');

  if (name && description && reward) {
    console.log(name, description, reward, id);
    const response = await fetch(`/profile/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description, reward, id }),
      headers: { 'Content-Type': 'application/json' },
    });
    response.ok ? document.location.reload() : alert('Failed to update item');
  }
};

document
  .querySelector('#edit-item-form')
  .addEventListener('submit', updateItem);
