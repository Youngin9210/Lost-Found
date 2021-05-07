const deleteNotification = async (event) => {
  console.log(event);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id + '===ID===');

    const response = await fetch(`/api/notifications/${id}`, {
      method: 'DELETE',
    });

    response.ok
      ? document.location.reload()
      : alert('Failed to delete notification');
  }
};

document
  .querySelector('#notificationList')
  .addEventListener('click', deleteNotification);
