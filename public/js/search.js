const newSearchHandler = async (event) => {
    event.preventDefault();

    const search = document.querySelector('.searchfield');


    if (search) {
        const response = await fetch(`/`, {
        method: 'POST',
        body: JSON.stringify({ search }),
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
}

document
  .querySelector('.searchbutton')
  .addEventListener('click', newSearchHandler);