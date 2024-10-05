document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username-input').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').textContent = data.name || 'No name found';
            document.getElementById('bio').textContent = data.bio || 'No bio available';
            document.getElementById('followers').textContent = data.followers;
            document.getElementById('following').textContent = data.following;
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('profile-link').href = data.html_url;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('GitHub user not found!');
        });
});
