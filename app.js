
async function getUser() {
  const username = document.getElementById("username").value.trim();
  const userDataDiv = document.getElementById("userData");
  
  if (!username) {
    userDataDiv.innerHTML = `<p style="color: #f76c6c;">Please enter a username.</p>`;
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();
    userDataDiv.innerHTML = `
      <img src="${data.avatar_url}" width="120" />
      <h3>${data.name || "No Name Provided"}</h3>
      <p><strong>@${data.login}</strong></p>
      <p>${data.bio || "No bio available."}</p>
      <p>📦 <strong>${data.public_repos}</strong> Repos</p>
      <p>👥 <strong>${data.followers}</strong> Followers | <strong>${data.following}</strong> Following</p>
      <a href="${data.html_url}" target="_blank">🔗 View GitHub Profile</a>
    `;
  } catch (error) {
    userDataDiv.innerHTML = `<p style="color: #f76c6c;">${error.message}</p>`;
  }
}
