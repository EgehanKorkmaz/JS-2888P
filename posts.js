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
    }

    // Kullanıcı bilgilerini çekme ve gösterme
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');
            userInfo.innerHTML = `
                <h2>Kullanıcı Bilgileri</h2>
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            userInfoContainer.appendChild(userInfo);
        })
        .catch(error => console.error('Error:', error));

    // Postları çekme ve gösterme
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                postCard.addEventListener('click', () => openModal(post));
                postsContainer.appendChild(postCard);
            });
        })
        .catch(error => console.error('Error:', error));

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
        setTimeout(() => {
            postModal.style.display = "none";
        }, 300); // 300ms, transition süresine eşit olmalı
    }

    window.onclick = function(event) {
        if (event.target == postModal) {
            postModal.classList.remove('show');
            setTimeout(() => {
                postModal.style.display = "none";
            }, 300); // 300ms, transition süresine eşit olmalı
        }
    }
});
