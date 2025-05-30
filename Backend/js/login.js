document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Get button elements
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const heroLoginBtn = document.getElementById('hero-login-btn');
    const heroRegisterBtn = document.getElementById('hero-register-btn');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Get page elements for navigation
    const homeContent = document.getElementById('home-content');
    const feedContent = document.getElementById('feed-content');
    const profileContent = document.getElementById('profile-content');
    const userProfile = document.querySelector('.user-profile');
    const navItems = document.querySelector('nav ul');
    const searchBar = document.querySelector('.search-bar');
    
    // Store current user information
    let currentUser = {
        username: '',
        email: '',
        profileImage: null
    };
    
    // Open login modal
    function openLoginModal() {
        loginModal.style.display = 'flex';
        registerModal.style.display = 'none';
    }
    
    // Open register modal
    function openRegisterModal() {
        registerModal.style.display = 'flex';
        loginModal.style.display = 'none';
    }
    
    // Close all modals
    function closeModals() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
    
    // Update profile page with user info
    function updateProfilePage() {
        // Update username display
        const profileUsername = document.querySelector('.profile-info h2');
        if (profileUsername) {
            profileUsername.textContent = currentUser.username;
        }
        
        // Update profile avatar initial
        const profileAvatar = document.querySelector('.profile-avatar');
        const headerAvatar = document.querySelector('.user-profile');
        if (profileAvatar) {
            if (currentUser.profileImage) {
                // If user has set a profile image
                profileAvatar.innerHTML = `<img src="${currentUser.profileImage}" alt="${currentUser.username}" class="profile-avatar-img">`;
                if (headerAvatar) {
                    headerAvatar.innerHTML = `<img src="${currentUser.profileImage}" alt="${currentUser.username}" class="header-avatar-img">`;
                }
            } else {
                // Display initial of username
                const initial = currentUser.username.charAt(0).toUpperCase();
                profileAvatar.textContent = initial;
                if (headerAvatar) {
                    headerAvatar.textContent = initial;
                }
            }
        }
    }
    
    // Logout function
    function logout() {
        // Reset current user
        currentUser = {
            username: '',
            email: '',
            profileImage: null
        };
        
        // Show login/register buttons, hide logout
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        
        // Reset user profile avatar
        const headerAvatar = document.querySelector('.user-profile');
        if (headerAvatar) {
            headerAvatar.textContent = 'U';
            headerAvatar.style.display = 'none';
        }
        
        // Return to home page
        showHomePage();
        
        // Alert
        alert('Logout realizado com sucesso!');
    }
    
    // Show home page (initial state)
    function showHomePage() {
        homeContent.style.display = 'block';
        feedContent.style.display = 'none';
        profileContent.style.display = 'none';
        userProfile.style.display = 'none';
        navItems.style.display = 'none';
        searchBar.style.display = 'none';
    }
    
    // Show feed page after login
    function showFeedPage() {
        homeContent.style.display = 'none';
        feedContent.style.display = 'block';
        profileContent.style.display = 'none';
        userProfile.style.display = 'flex';
        navItems.style.display = 'flex';
        searchBar.style.display = 'block';
        
        // Make sure the home link is shown for navigation back to home
        document.getElementById('home-link').style.display = 'block';
        
        // Hide login and register buttons after successful login
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        
        // Show logout button
        logoutBtn.style.display = 'block';
        
        // Update profile information
        updateProfilePage();
    }
    
    // Event listeners for opening modals
    loginBtn.addEventListener('click', openLoginModal);
    registerBtn.addEventListener('click', openRegisterModal);
    heroLoginBtn.addEventListener('click', openLoginModal);
    heroRegisterBtn.addEventListener('click', openRegisterModal);
    
    // Event listener for logout
    logoutBtn.addEventListener('click', logout);
    
    // Event listeners for switching between modals
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        openRegisterModal();
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        openLoginModal();
    });
    
    // Event listeners for closing modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === registerModal) {
            closeModals();
        }
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Store user information
        currentUser = {
            username: username,
            email: email,
            profileImage: null
        };
        
        // Here you would typically send a request to your backend
        console.log('Login attempt:', { username, email, password, remember });
        
        // For demo purposes, simulate a successful login
        alert('Login bem-sucedido! Redirecionando para a página de avaliações...');
        
        // Close the login modal
        closeModals();
        
        // Short delay before showing feed page
        setTimeout(() => {
            showFeedPage();
        }, 500);
    });
    
    // Handle register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Simple validation
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (!termsAccepted) {
            alert('Você precisa aceitar os termos de uso e a política de privacidade.');
            return;
        }
        
        // Store user information
        currentUser = {
            username: username,
            email: email,
            profileImage: null
        };
        
        // Here you would typically send a request to your backend
        console.log('Registration attempt:', { username, email, password, termsAccepted });
        
        // For demo purposes, simulate a successful registration
        alert('Registro bem-sucedido! Redirecionando para a página de avaliações...');
        
        // Close the register modal
        closeModals();
        
        // Short delay before showing feed page
        setTimeout(() => {
            showFeedPage();
        }, 500);
    });
    
    // Social login buttons (for demo)
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Autenticação social não implementada nesta versão de demonstração.');
        });
    });
    
    // Expose currentUser to global scope for other scripts
    window.currentUser = currentUser;
}); 