const newSearchHandler = async (event) => {
    event.preventDefault();

    let search = document.querySelector('#searchfield').value.trim();
    search = search.split(' ').join('+');
    
    if (search) {
        console.log(search);
        // const response = await fetch(`/search`, {
        // method: 'GET',
        // body: JSON.stringify({ search }),
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // });
        document.location.replace(`/search/${search}`);
        // if (response.ok) {
            
            
        // } else {
        //     alert('Failed to search');
        // }
    }
}

document
  .querySelector('#searchbutton')
  .addEventListener('click', newSearchHandler);