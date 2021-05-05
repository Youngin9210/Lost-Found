const newSearchHandler = async (event) => {
    event.preventDefault();

    const search = document.querySelector('.searchfield');


    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/items/${id}`, {
        method: 'GET',
        body: JSON.stringify({ search }),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
            document.location.replace('/search');
        } else {
            alert('Failed to search');
        }
    }
}

document
  .querySelector('.searchbutton')
  .addEventListener('click', newSearchHandler);