const foundBtn = document.querySelector('#foundBtn');

const foundItem = async (event) => {
  event.preventDefault();

  const isFound = foundBtn.getAttribute('data-isFound');

  const id = foundBtn.getAttribute('data-item');
  const user_id = foundBtn.getAttribute('data-user');
  const logged_in = foundBtn.getAttribute('data-isLoggedIn');

  if (logged_in) {
    const response = await fetch(`/api/items/isFound/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFound, id }),
      headers: { 'Content-Type': 'application/json' },
    });
    response.ok
      ? document.location.replace('/')
      : alert('Failed to update item');
  } else {
    alert('Please login to mark item as found');
  }
};

foundBtn.addEventListener('click', foundItem);
