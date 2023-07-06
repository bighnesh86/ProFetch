document.addEventListener("DOMContentLoaded", function(){

    const usernameForm = document.getElementById("username-form");
    const usernameInput = document.getElementById("username-input");
    const profileInfo = document.getElementById("profile-info");
    const errorMessage = document.getElementById("error-message");

    usernameForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = usernameInput.value;

        fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found")
            }
            return response.json();
        })
        .then(data => {
            profileInfo.innerHTML = `
            <div class="profile-picture">
            <img src="${data.avatar_url}" alt="Profile Picture">
          </div>
          <div class="profile-details">
            <h2 class="username">${data.login}</h2>
            <p class="bio">${data.bio || ""}</p>
            <h3>Location:</h3>
            <p class="location">${data.location || ""}</p>
            <h3>Public Repositories:</h3>
            <p class="public-repos">${data.public_repos}</p>
            <h3>Followers:</h3>
            <p class="followers">${data.followers}</p>
            <h3>Following:</h3>
            <p class="following">${data.following}</p>
            <h3>Join Date:</h3>
            <p class="join-date">${new Date(data.created_at).toLocaleDateString()}</p>
          </div>`;
          errorMessage.textContent = ""; //clear any previous error message 
        })
        .catch(error =>{
            errorMessage.textContent = error.message;
            profileInfo.innerHTML = ""; //clear the profile information
        });
    })

})