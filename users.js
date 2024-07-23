document.addEventListener("DOMContentLoaded", async () => {
    const apiURL = "https://jsonplaceholder.typicode.com/users";
    const userCardsContainer = document.getElementById("user-cards");
    const userModal = document.getElementById("userModal");
    const modalDetails = document.getElementById("modal-details");
    const closeModal = document.getElementsByClassName("close")[0];
    const searchInput = document.getElementById("search-input");

    try {
        const response = await fetch(apiURL);
        const users = await response.json();

        const renderUserCards = (filteredUsers) => {
            userCardsContainer.innerHTML = "";
            filteredUsers.forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");

                userCard.innerHTML = `
                    <h2><i class="fas fa-user icon"></i> ${user.name}</h2>
                    <div class="section">
                        <h3><i class="fas fa-id-badge icon"></i> Temel Bilgiler</h3>
                        <p><i class="fas fa-user icon"></i> Kullanıcı Adı: ${user.username}</p>
                        <p><i class="fas fa-envelope icon"></i> Email: ${user.email}</p>
                    </div>
                    <div class="section">
                        <h3><i class="fas fa-location-dot icon"></i> Adres Bilgileri</h3>
                        <p><i class="fas fa-road icon"></i> Sokak: ${user.address.street}</p>
                        <p><i class="fas fa-city icon"></i> Şehir: ${user.address.city}</p>
                        <p><i class="fas fa-map-pin icon"></i> Posta Kodu: ${user.address.zipcode}</p>
                    </div>
                    <div class="section">
                        <h3><i class="fas fa-building icon"></i> Şirket Bilgileri</h3>
                        <p><i class="fas fa-briefcase icon"></i> Şirket: ${user.company.name}</p>
                        <p><i class="fas fa-bullhorn icon"></i> Slogan: ${user.company.catchPhrase}</p>
                        <p><i class="fas fa-tasks icon"></i> İş Alanı: ${user.company.bs}</p>
                    </div>
                    <div class="section">
                        <h3><i class="fas fa-phone icon"></i> İletişim Bilgileri</h3>
                        <p><i class="fas fa-phone icon"></i> Telefon: ${user.phone}</p>
                        <p><i class="fas fa-globe icon"></i> Website: ${user.website}</p>
                    </div>
                `;

                // Kart tıklandığında modal penceresini açma
                userCard.addEventListener("click", () => {
                    modalDetails.innerHTML = `
                        <h2><i class="fas fa-user icon"></i> ${user.name}</h2>
                        <div class="section">
                            <h3><i class="fas fa-id-badge icon"></i> Temel Bilgiler</h3>
                            <p><i class="fas fa-user icon"></i> Kullanıcı Adı: ${user.username}</p>
                            <p><i class="fas fa-envelope icon"></i> Email: ${user.email}</p>
                        </div>
                        <div class="section">
                            <h3><i class="fas fa-location-dot icon"></i> Adres Bilgileri</h3>
                            <p><i class="fas fa-road icon"></i> Sokak: ${user.address.street}</p>
                            <p><i class="fas fa-city icon"></i> Şehir: ${user.address.city}</p>
                            <p><i class="fas fa-map-pin icon"></i> Posta Kodu: ${user.address.zipcode}</p>
                            <p><i class="fas fa-building icon"></i> Bina: ${user.address.suite}</p>
                        </div>
                        <div class="section">
                            <h3><i class="fas fa-building icon"></i> Şirket Bilgileri</h3>
                            <p><i class="fas fa-briefcase icon"></i> Şirket: ${user.company.name}</p>
                            <p><i class="fas fa-bullhorn icon"></i> Slogan: ${user.company.catchPhrase}</p>
                            <p><i class="fas fa-tasks icon"></i> İş Alanı: ${user.company.bs}</p>
                        </div>
                        <div class="section">
                            <h3><i class="fas fa-phone icon"></i> İletişim Bilgileri</h3>
                            <p><i class="fas fa-phone icon"></i> Telefon: ${user.phone}</p>
                            <p><i class="fas fa-globe icon"></i> Website: ${user.website}</p>
                        </div>
                    `;
                    userModal.classList.add("show");
                    setTimeout(() => {
                        userModal.style.opacity = "1";
                    }, 10);  // Slight delay to trigger CSS transition
                });

                userCardsContainer.appendChild(userCard);
            });
        };

        renderUserCards(users);

        // Arama fonksiyonu
        searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
            renderUserCards(filteredUsers);
        });

        // Modal kapatma işlemi
        closeModal.addEventListener("click", () => {
            userModal.style.opacity = "0";
            setTimeout(() => {
                userModal.classList.remove("show");
            }, 300); // Wait for the fade-out effect to complete
        });

        // Modal dışında bir yere tıklanırsa modalı kapatma
        window.addEventListener("click", (event) => {
            if (event.target == userModal) {
                userModal.style.opacity = "0";
                setTimeout(() => {
                    userModal.classList.remove("show");
                }, 300); // Wait for the fade-out effect to complete
            }
        });
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        userCardsContainer.innerHTML = "<p>Veri yüklenemedi. Lütfen sayfayı yeniden yükleyin.</p>";
    }
});
