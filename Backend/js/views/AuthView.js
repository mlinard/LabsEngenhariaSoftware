class AuthView {
    constructor() {
        this.loginModal = document.getElementById('login-modal');
        this.registerModal = document.getElementById('register-modal');
        this.loginBtn = document.getElementById('login-btn');
        this.registerBtn = document.getElementById('register-btn');
        this.logoutBtn = document.getElementById('logout-btn');
        this.userProfile = document.querySelector('.user-profile');
        
        this.showRegisterLink = document.getElementById('show-register');
        this.showLoginLink = document.getElementById('show-login');
        
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        
        this.closeModalButtons = document.querySelectorAll('.close-modal');
        
        // Set up event listeners for modal opening/closing
        this.setupModalListeners();
    }
    
    // Setup event listeners for modals
    setupModalListeners() {
        // Open login modal
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', () => this.openLoginModal());
        }
        
        // Open register modal
        if (this.registerBtn) {
            this.registerBtn.addEventListener('click', () => this.openRegisterModal());
        }
        
        // Switch to register modal
        if (this.showRegisterLink) {
            this.showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openRegisterModal();
            });
        }
        
        // Switch to login modal
        if (this.showLoginLink) {
            this.showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLoginModal();
            });
        }
        
        // Close modals when clicking X button
        this.closeModalButtons.forEach(button => {
            button.addEventListener('click', () => this.closeModals());
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.loginModal || e.target === this.registerModal) {
                this.closeModals();
            }
        });
    }
    
    // Open login modal
    openLoginModal() {
        if (this.loginModal) {
            this.loginModal.style.display = 'flex';
        }
        if (this.registerModal) {
            this.registerModal.style.display = 'none';
        }
    }
    
    // Open register modal
    openRegisterModal() {
        if (this.registerModal) {
            this.registerModal.style.display = 'flex';
        }
        if (this.loginModal) {
            this.loginModal.style.display = 'none';
        }
    }
    
    // Close all modals
    closeModals() {
        if (this.loginModal) {
            this.loginModal.style.display = 'none';
        }
        if (this.registerModal) {
            this.registerModal.style.display = 'none';
        }
    }
    
    // Setup login form submission
    setupLoginForm(loginCallback) {
        if (!this.loginForm) return;
        
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Enhanced validation
            if (!email || !password) {
                alert('❌ Email e senha são obrigatórios!');
                return;
            }
            
            // Call the login callback
            if (loginCallback && typeof loginCallback === 'function') {
                loginCallback(username, email, password, remember);
            }
        });
    }
    
    // Setup register form submission
    setupRegisterForm(registerCallback) {
        if (!this.registerForm) return;
        
        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('register-email').value.trim().toLowerCase();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Enhanced validation
            if (!username || !email || !password) {
                alert('❌ Todos os campos são obrigatórios!');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('❌ Formato de email inválido!');
                return;
            }
            
            if (password.length < 6) {
                alert('❌ A senha deve ter pelo menos 6 caracteres!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('❌ As senhas não coincidem!');
                return;
            }
            
            if (!termsAccepted) {
                alert('❌ Você precisa aceitar os termos de uso e a política de privacidade.');
                return;
            }
            
            // Call the register callback
            if (registerCallback && typeof registerCallback === 'function') {
                registerCallback(username, email, password, termsAccepted);
            }
        });
    }
    
    // Setup logout button
    setupLogoutButton(logoutCallback) {
        if (!this.logoutBtn) return;
        
        this.logoutBtn.addEventListener('click', () => {
            if (logoutCallback && typeof logoutCallback === 'function') {
                logoutCallback();
            }
        });
    }
    
    // Update UI based on authentication state
    updateAuthUI(isLoggedIn, user = null) {
        if (isLoggedIn && user) {
            // Hide login/register buttons, show logout
            if (this.loginBtn) this.loginBtn.style.display = 'none';
            if (this.registerBtn) this.registerBtn.style.display = 'none';
            if (this.logoutBtn) this.logoutBtn.style.display = 'block';
            
            // Update user profile avatar
            if (this.userProfile) {
                this.userProfile.style.display = 'flex';
                
                if (user.profileImage) {
                    this.userProfile.innerHTML = `<img src="${user.profileImage}" alt="${user.username}" class="header-avatar-img">`;
                } else {
                    this.userProfile.textContent = user.username.charAt(0).toUpperCase();
                }
            }
        } else {
            // Show login/register buttons, hide logout
            if (this.loginBtn) this.loginBtn.style.display = 'block';
            if (this.registerBtn) this.registerBtn.style.display = 'block';
            if (this.logoutBtn) this.logoutBtn.style.display = 'none';
            
            // Hide user profile avatar
            if (this.userProfile) {
                this.userProfile.style.display = 'none';
                this.userProfile.textContent = 'U';
            }
        }
    }
}

export default AuthView; 