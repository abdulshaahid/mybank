document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('dashboard');
    const authForms = document.getElementById('authForms');
    const logoutBtn = document.getElementById('logoutBtn');
    const hero = document.getElementById('home');
    const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
    const notificationMessage = document.getElementById('notificationMessage');

    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationModal.show();
    }

    function checkExistingUser() {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            document.getElementById('username').textContent = userData.username;
            showNotification('Welcome back, ' + userData.username + '!');
            authForms.style.display = 'none';
            dashboard.style.display = 'block';
            logoutBtn.style.display = 'block';
            hero.style.display = 'none';
        }
    }

    checkExistingUser();

    document.getElementById('signUpLink').addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    document.getElementById('loginLink').addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('loginBtn').addEventListener('click', function() {
        const accountNumber = document.getElementById('accountNumber').value;
        const password = document.getElementById('password').value;
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            if (userData.accountNumber === accountNumber && userData.password === password) {
                document.getElementById('username').textContent = userData.username;
                authForms.style.display = 'none';
                dashboard.style.display = 'block';
                logoutBtn.style.display = 'block';
                hero.style.display = 'none';
            } else {
                showNotification('Invalid account number or password.');
            }
        } else {
            showNotification('No user found. Please register first.');
        }
    });

    document.getElementById('registerBtn').addEventListener('click', function() {
        const username = document.getElementById('regUsername').value;
        const accountNumber = document.getElementById('regAccountNumber').value;
        const password = document.getElementById('regPassword').value;
        const userData = { username, accountNumber, password };
        localStorage.setItem('user', JSON.stringify(userData));
        document.getElementById('username').textContent = username;
        showNotification('Registration successful! Welcome, ' + username + '!');
        authForms.style.display = 
'none';
        dashboard.style.display = 'block';
        logoutBtn.style.display = 'block';
        hero.style.display = 'none';
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('user');
        dashboard.style.display = 'none';
        authForms.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        logoutBtn.style.display = 'none';
        hero.style.display = 'block';
        showNotification('You have been logged out.');
    });

    document.getElementById('depositBtn').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('depositAmount').value);
        const currentBalance = parseFloat(document.getElementById('depositBalance').textContent);
        const newBalance = currentBalance + amount;
        document.getElementById('depositBalance').textContent = newBalance.toFixed(2);
        document.getElementById('withdrawBalance').textContent = newBalance.toFixed(2);
        showNotification('Deposit successful. New balance: $' + newBalance.toFixed(2));
    });

    document.getElementById('withdrawBtn').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        const currentBalance = parseFloat(document.getElementById('withdrawBalance').textContent);
        if (amount <= currentBalance) {
            const newBalance = currentBalance - amount;
            document.getElementById('withdrawBalance').textContent = newBalance.toFixed(2);
            document.getElementById('depositBalance').textContent = newBalance.toFixed(2);
            showNotification('Withdrawal successful. New balance: $' + newBalance.toFixed(2));
        } else {
            showNotification('Insufficient funds');
        }

        

    });
});