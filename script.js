document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username-input').value.trim(); 
    const profileDiv = document.getElementById('profile');
    const nameEl = document.getElementById('name');
    const avatarEl = document.getElementById('avatar');
    const bioEl = document.getElementById('bio');
    const followersEl = document.getElementById('followers');
    const followingEl = document.getElementById('following');
    const profileLinkEl = document.getElementById('profile-link');

    
    nameEl.textContent = "";
    avatarEl.src = "";
    bioEl.textContent = "";
    followersEl.textContent = "";
    followingEl.textContent = "";
    profileLinkEl.href = "#";

    if (username === "") {
        profileDiv.style.display = 'none'; 
        alert("Please enter a GitHub username");
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            // Update profile details
            nameEl.textContent = data.name || data.login; 
            avatarEl.src = data.avatar_url;
            avatarEl.alt = `${data.login}'s avatar`;
            bioEl.textContent = data.bio || "No bio available.";
            followersEl.textContent = data.followers;
            followingEl.textContent = data.following;
            profileLinkEl.href = data.html_url;
            profileLinkEl.textContent = "View GitHub Profile";

            // Show the profile section after fetching data
            profileDiv.style.display = 'block';
        })
        .catch(error => {
            profileDiv.style.display = 'block';
            nameEl.textContent = error.message;
        });
});
