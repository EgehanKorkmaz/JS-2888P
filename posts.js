document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById('posts-container');
    const userInfoContainer = document.getElementById('user-info');
    const postModal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const commentsList = document.getElementById('commentsList');
    const closeModal = document.getElementsByClassName('close')[0];

    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('userId');

    if (!userId) {
        userId = prompt("Please enter a user ID (1-10):");
        if (!userId || isNaN(userId) || userId < 1 || userId > 10) {
            alert("Invalid user ID. Please enter a number between 1 and 10.");
            throw new Error("Invalid user ID");
        }
        window.history.replaceState(null, null, `?userId=${userId}`);
    }

    // Kullanıcı bilgilerini çekme ve gösterme
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            showUserInfo(user);
        })
        .catch(error => console.error('Error:', error));

    // Postları çekme ve gösterme
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Önceki postları temizle
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card', 'col-md-2'); // Add Bootstrap column class for proper grid layout
                postCard.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                postCard.addEventListener('click', () => openModal(post));
                postsContainer.appendChild(postCard);
            });
        })
        .catch(error => console.error('Error:', error));
    
    function showUserInfo(user) {
        userInfoContainer.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2>Kullanıcı Bilgileri</h2>
                </div>
                <div class="card-body">
                    <p><i class="fas fa-id-badge"></i> <strong>ID:</strong> ${user.id}</p>
                    <p><i class="fas fa-user"></i> <strong>Name:</strong> ${user.name}</p>
                    <p><i class="fas fa-user-tag"></i> <strong>Username:</strong> ${user.username}</p>
                    <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${user.email}</p>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                    <p><i class="fas fa-phone"></i> <strong>Phone:</strong> ${user.phone}</p>
                    <p><i class="fas fa-globe"></i> <strong>Website:</strong> ${user.website}</p>
                    <p><i class="fas fa-building"></i> <strong>Company:</strong> ${user.company.name}</p>
                </div>
            </div>
        `;
    }
    
    function openModal(post) {
        modalTitle.textContent = post.title;
        modalBody.textContent = post.body;
        commentsList.innerHTML = '';

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.textContent = `${comment.name}: ${comment.body}`;
                    commentsList.appendChild(commentItem);
                });
            })
            .catch(error => console.error('Error:', error));

        postModal.classList.add('show');
    }

    closeModal.onclick = function() {
        postModal.classList.remove('show');
    }

    window.onclick = function(event) {
        if (event.target == postModal) {
            postModal.classList.remove('show');
        }
    }
});
