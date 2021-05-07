const foundBtn = document.querySelector('#foundBtn');

const foundItem = async (event) => {
  event.preventDefault();

  const isFound = foundBtn.getAttribute('data-isFound');
  const id = foundBtn.getAttribute('data-item');
  const found_user = foundBtn.getAttribute('data-current');
  const item_owner = foundBtn.getAttribute('data-user');
  const logged_in = foundBtn.getAttribute('data-isLoggedIn');

  if (logged_in) {
    const responseUpdate = await fetch(`/api/items/isFound/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFound }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responsePost = await fetch(`/api/notifications`, {
      method: 'POST',
      body: JSON.stringify({ item_owner, id, found_user }),
      headers: { 'Content-Type': 'application/json' },
    });

    responseUpdate.ok && responsePost.ok
      ? document.location.replace('/')
      : alert('Failed to update item');
  } else {
    alert('Please login to mark item as found');
  }
};

foundBtn.addEventListener('click', foundItem);
