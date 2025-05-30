class UserModel {
    constructor() {
        this.currentUser = {
            username: '',
            email: '',
            profileImage: null,
            isLoggedIn: false
        };
        this.listeners = [];
        this.initializeStorage();
    }

    // Initialize user storage
    initializeStorage() {
        if (!localStorage.getItem('registeredUsers')) {
            localStorage.setItem('registeredUsers', JSON.stringify([]));
        }
    }

    // Add an observer to be notified of changes
    addListener(callback) {
        this.listeners.push(callback);
    }

    // Notify all observers of changes
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentUser));
    }

    // Register a new user
    register(username, email, password, termsAccepted) {
        console.log('Registration attempt:', { username, email, termsAccepted });
        
        return new Promise((resolve, reject) => {
            // Validate input
            if (!username || !email || !password) {
                reject(new Error('Todos os campos são obrigatórios'));
                return;
            }

            if (!termsAccepted) {
                reject(new Error('Você deve aceitar os termos de uso'));
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                reject(new Error('Formato de email inválido'));
                return;
            }

            // Get existing users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Check if user already exists
            const existingUser = registeredUsers.find(user => 
                user.email.toLowerCase() === email.toLowerCase() || 
                user.username.toLowerCase() === username.toLowerCase()
            );

            if (existingUser) {
                if (existingUser.email.toLowerCase() === email.toLowerCase()) {
                    reject(new Error('Este email já está cadastrado'));
                } else {
                    reject(new Error('Este nome de usuário já está em uso'));
                }
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                username: username.trim(),
                email: email.toLowerCase().trim(),
                password: password, // In a real app, this would be hashed
                profileImage: null,
                createdAt: new Date().toISOString(),
                lastLogin: null
            };

            // Add to registered users
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            // Auto-login after registration
            this.currentUser = {
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage,
                isLoggedIn: true
            };

            // Save current session
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            // Update last login
            newUser.lastLogin = new Date().toISOString();
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            console.log('✅ Registration successful:', this.currentUser);
            this.notifyListeners();
            resolve(this.currentUser);
        });
    }

    // Login user
    login(username, email, password, remember) {
        console.log('Login attempt:', { username, email, remember });
        
        return new Promise((resolve, reject) => {
            // Validate input
            if (!email || !password) {
                reject(new Error('Email e senha são obrigatórios'));
                return;
            }

            // Get registered users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Find user by email
            const user = registeredUsers.find(user => 
                user.email.toLowerCase() === email.toLowerCase()
            );

            if (!user) {
                reject(new Error('Usuário não encontrado. Verifique seu email ou crie uma conta.'));
                return;
            }

            // Validate password
            if (user.password !== password) {
                reject(new Error('Senha incorreta'));
                return;
            }

            // Validate username if provided
            if (username && user.username !== username) {
                reject(new Error('Nome de usuário não confere com o cadastrado'));
                return;
            }

            // Login successful
            this.currentUser = {
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                isLoggedIn: true
            };

            // Save current session
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            // Update last login
            user.lastLogin = new Date().toISOString();
            const updatedUsers = registeredUsers.map(u => u.id === user.id ? user : u);
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

            console.log('✅ Login successful:', this.currentUser);
            this.notifyListeners();
            resolve(this.currentUser);
        });
    }

    // Logout user
    logout() {
        this.currentUser = {
            username: '',
            email: '',
            profileImage: null,
            isLoggedIn: false
        };
        
        // Remove from local storage
        localStorage.removeItem('currentUser');
        
        console.log('✅ Logout successful');
        this.notifyListeners();
        return Promise.resolve();
    }

    // Update profile image
    updateProfileImage(imageUrl) {
        this.currentUser.profileImage = imageUrl;
        
        // Update in local storage
        if (localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }

        // Update in registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedUsers = registeredUsers.map(user => {
            if (user.email === this.currentUser.email) {
                user.profileImage = imageUrl;
            }
            return user;
        });
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        this.notifyListeners();
    }

    // Check if user is logged in (could be from previous session)
    checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.currentUser.isLoggedIn = true;
                this.notifyListeners();
                return true;
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('currentUser');
            }
        }
        return false;
    }

    // Get current user
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                return {
                    isLoggedIn: true,
                    ...user,
                    collection: user.collection || [] // Initialize collection if it doesn't exist
                };
            } catch (e) {
                console.error('Error parsing current user data:', e);
                return { isLoggedIn: false };
            }
        }
        return { isLoggedIn: false };
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser.isLoggedIn;
    }

    // Get all registered users (for debugging)
    getAllUsers() {
        return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    }

    // Check if email exists
    emailExists(email) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Check if username exists
    usernameExists(username) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return registeredUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    // Add game to user's collection
    addToCollection(gameId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser.isLoggedIn) {
            throw new Error('User must be logged in to add games to collection');
        }
        
        // Initialize collection if it doesn't exist
        if (!currentUser.collection) {
            currentUser.collection = [];
        }
        
        // Check if game is already in collection
        if (currentUser.collection.includes(gameId)) {
            throw new Error('Game is already in your collection');
        }
        
        // Add game to collection
        currentUser.collection.push(gameId);
        
        // Save updated user data
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update registered users data as well
        const registeredUsers = this.getAllUsers();
        const userIndex = registeredUsers.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1) {
            registeredUsers[userIndex].collection = currentUser.collection;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }
        
        return currentUser.collection;
    }
    
    // Remove game from user's collection
    removeFromCollection(gameId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser.isLoggedIn) {
            throw new Error('User must be logged in to remove games from collection');
        }
        
        if (!currentUser.collection) {
            throw new Error('No collection found');
        }
        
        const gameIndex = currentUser.collection.indexOf(gameId);
        if (gameIndex === -1) {
            throw new Error('Game not found in collection');
        }
        
        // Remove game from collection
        currentUser.collection.splice(gameIndex, 1);
        
        // Save updated user data
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update registered users data as well
        const registeredUsers = this.getAllUsers();
        const userIndex = registeredUsers.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1) {
            registeredUsers[userIndex].collection = currentUser.collection;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }
        
        return currentUser.collection;
    }
    
    // Check if game is in user's collection
    isGameInCollection(gameId) {
        const currentUser = this.getCurrentUser();
        if (!currentUser.isLoggedIn || !currentUser.collection) {
            return false;
        }
        
        return currentUser.collection.includes(gameId);
    }
    
    // Get user's collection
    getUserCollection() {
        const currentUser = this.getCurrentUser();
        if (!currentUser.isLoggedIn) {
            return [];
        }
        
        return currentUser.collection || [];
    }
    
    // Get collection size
    getCollectionSize() {
        const collection = this.getUserCollection();
        return collection.length;
    }
}

// Export as singleton
export default new UserModel(); 