const newSearchHandler = async (event) => {
    event.preventDefault();

    const search = document.querySelector('#searchfield').value.trim();

    if (search) {
        console.log(search);
        const response = await fetch(`/search`, {
        method: 'POST',
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
  .querySelector('#searchbutton')
  .addEventListener('click', newSearchHandler);