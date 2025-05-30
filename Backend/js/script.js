// Script simples para alternar entre Feed e Perfil
document.addEventListener('DOMContentLoaded', function () {
    const feedContent = document.getElementById('feed-content');
    const profileContent = document.getElementById('profile-content');
    const homeLink = document.getElementById('home-link');
    const profileLink = document.getElementById('profile-link');

    homeLink.addEventListener('click', function (e) {
        e.preventDefault();
        feedContent.style.display = 'flex';
        profileContent.style.display = 'none';
    });

    profileLink.addEventListener('click', function (e) {
        e.preventDefault();
        feedContent.style.display = 'none';
        profileContent.style.display = 'block';
    });

    // Profile image change functionality
    const profileAvatar = document.getElementById('profile-avatar');
    const profileImageInput = document.getElementById('profile-image-input');

    if (profileAvatar && profileImageInput) {
        // Open file dialog when profile avatar is clicked
        profileAvatar.addEventListener('click', function() {
            profileImageInput.click();
        });
        
        // Handle file selection
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    
                    // Update current user object (defined in login.js)
                    if (typeof currentUser !== 'undefined') {
                        currentUser.profileImage = imageUrl;
                    }
                    
                    // Update profile avatar display
                    profileAvatar.innerHTML = `<img src="${imageUrl}" alt="Profile" class="profile-avatar-img">`;
                    
                    // Update header avatar if it exists
                    const headerAvatar = document.querySelector('.user-profile');
                    if (headerAvatar) {
                        headerAvatar.innerHTML = `<img src="${imageUrl}" alt="Profile" class="header-avatar-img">`;
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos DOM
    const ratingModal = document.getElementById('rating-modal');
    const closeModal = document.querySelector('.close-modal');
    const stars = document.querySelectorAll('.stars-input .star');
    const ratingValueDisplay = document.getElementById('rating-value-display');
    const submitRatingBtn = document.getElementById('submit-rating');
    const userReviewInput = document.getElementById('user-review');

    // Guardar referência ao botão e jogo atual
    let currentGameCard = null;
    let currentRating = 0;

    // Adicionar evento a todos os botões de avaliação
    const ratingButtons = document.querySelectorAll('.game-info .btn-primary');
    ratingButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Guardar referência ao card do jogo atual
            currentGameCard = this.closest('.game-card');

            // Preencher informações do jogo no modal
            const gameImage = currentGameCard.querySelector('.game-image').src;
            const gameTitle = currentGameCard.querySelector('.game-title').textContent;
            const gamePlatform = currentGameCard.querySelector('.game-platform').textContent;

            document.getElementById('game-rating-image').src = gameImage;
            document.getElementById('game-rating-title').textContent = gameTitle;
            document.getElementById('game-rating-platform').textContent = gamePlatform;

            // Resetar avaliação
            resetRating();

            // Exibir modal
            ratingModal.style.display = 'flex';
        });
    });

    // Fechar modal
    closeModal.addEventListener('click', function () {
        ratingModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (event.target === ratingModal) {
            ratingModal.style.display = 'none';
        }
    });

    // Sistema de estrelas
    stars.forEach(star => {
        // Evento hover para mostrar prévia da classificação
        star.addEventListener('mouseover', function () {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            highlightStars(ratingValue);
        });

        // Remover destaque ao tirar o mouse
        star.addEventListener('mouseout', function () {
            highlightStars(currentRating);
        });

        // Selecionar classificação
        star.addEventListener('click', function () {
            currentRating = parseInt(this.getAttribute('data-value'));
            highlightStars(currentRating);
            ratingValueDisplay.textContent = currentRating + '/5';
        });
    });

    // Função para destacar estrelas até um valor específico
    function highlightStars(count) {
        stars.forEach((star, index) => {
            if (index < count) {
                star.textContent = '★'; // Estrela preenchida
                star.classList.add('active');
            } else {
                star.textContent = '☆'; // Estrela vazia
                star.classList.remove('active');
            }
        });
    }

    // Função para resetar avaliação
    function resetRating() {
        currentRating = 0;
        highlightStars(0);
        ratingValueDisplay.textContent = '0/5';
        userReviewInput.value = '';
    }

    // Enviar avaliação
    submitRatingBtn.addEventListener('click', function () {
        if (currentRating === 0) {
            alert('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
            return;
        }

        // Atualizar interface após avaliação
        updateGameCardWithUserReview(currentGameCard, currentRating, userReviewInput.value);

        // Fechar modal
        ratingModal.style.display = 'none';

        // Mensagem de agradecimento
        alert('Sua avaliação foi enviada com sucesso! Obrigado por contribuir.');
    });

    // Função para atualizar o card do jogo com a avaliação do usuário
    function updateGameCardWithUserReview(gameCard, rating, reviewText) {
        // Verificar se o card já tem uma avaliação de usuário
        let userReviewSection = gameCard.querySelector('.user-review');

        // Se já existe um user-review, vamos atualizá-lo
        if (userReviewSection) {
            const starsElement = gameCard.querySelector('.stars');
            const ratingValueElement = gameCard.querySelector('.rating-value');
            const reviewTextElement = gameCard.querySelector('.review-text');

            // Atualizar os elementos
            starsElement.textContent = '★'.repeat(rating);
            ratingValueElement.textContent = (rating * 2) + '/10';
            reviewTextElement.textContent = reviewText;
        }
        // Se não existe, criamos um novo
        else {
            // Criar elementos para a nova review
            userReviewSection = document.createElement('div');
            userReviewSection.className = 'user-review';

            // Avatar do usuário
            const userAvatar = document.createElement('div');
            userAvatar.className = 'user-avatar';
            
            // Use current user's initial or image if available
            if (typeof currentUser !== 'undefined') {
                if (currentUser.profileImage) {
                    userAvatar.innerHTML = `<img src="${currentUser.profileImage}" alt="${currentUser.username}" class="header-avatar-img">`;
                } else {
                    userAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
                }
            } else {
                userAvatar.textContent = 'U';
            }

            // Conteúdo da review
            const reviewContent = document.createElement('div');
            reviewContent.className = 'review-content';

            // Nome do usuário
            const userName = document.createElement('p');
            userName.className = 'user-name';
            
            // Use current user's username if available
            if (typeof currentUser !== 'undefined' && currentUser.username) {
                userName.textContent = currentUser.username;
            } else {
                userName.textContent = 'Usuário GameRate';
            }

            // Texto da review
            const reviewTextElement = document.createElement('p');
            reviewTextElement.className = 'review-text';
            reviewTextElement.textContent = reviewText || 'Jogo avaliado!';

            // Montar estrutura
            reviewContent.appendChild(userName);
            reviewContent.appendChild(reviewTextElement);
            userReviewSection.appendChild(userAvatar);
            userReviewSection.appendChild(reviewContent);

            // Adicionar ao card do jogo
            gameCard.appendChild(userReviewSection);

            // Atualizar estrelas e valor da avaliação no card original
            const starsElement = gameCard.querySelector('.stars');
            const ratingValueElement = gameCard.querySelector('.rating-value');

            if (starsElement && ratingValueElement) {
                // Converter para escala de 10
                const ratingOutOf10 = (rating * 2);
                starsElement.textContent = '★'.repeat(Math.min(5, Math.ceil(rating)));
                ratingValueElement.textContent = ratingOutOf10 + '/10';
            }
        }

        // Mudar o botão "Avaliar" para "Editar Avaliação"
        const rateButton = gameCard.querySelector('.btn-primary');
        rateButton.textContent = 'Editar Avaliação';
    }
});
