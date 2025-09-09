// Default users for each role
const defaultUsers = [
    // Owners
    { username: 'owner1', password: 'ownerpass1', role: 'owner' },
    { username: 'owner2', password: 'ownerpass2', role: 'owner' },
    { username: 'owner3', password: 'ownerpass3', role: 'owner' },
    { username: 'owner4', password: 'ownerpass4', role: 'owner' },
    { username: 'owner5', password: 'ownerpass5', role: 'owner' },
    // Hospitals
    { username: 'hospital1', password: 'hospass1', role: 'hospital' },
    { username: 'hospital2', password: 'hospass2', role: 'hospital' },
    { username: 'hospital3', password: 'hospass3', role: 'hospital' },
    { username: 'hospital4', password: 'hospass4', role: 'hospital' },
    { username: 'hospital5', password: 'hospass5', role: 'hospital' },
    // Doctors
    { username: 'doctor1', password: 'docpass1', role: 'doctor' },
    { username: 'doctor2', password: 'docpass2', role: 'doctor' },
    { username: 'doctor3', password: 'docpass3', role: 'doctor' },
    { username: 'doctor4', password: 'docpass4', role: 'doctor' },
    { username: 'doctor5', password: 'docpass5', role: 'doctor' },
    // Health Centers
    { username: 'center1', password: 'centpass1', role: 'healthcenter' },
    { username: 'center2', password: 'centpass2', role: 'healthcenter' },
    { username: 'center3', password: 'centpass3', role: 'healthcenter' },
    { username: 'center4', password: 'centpass4', role: 'healthcenter' },
    { username: 'center5', password: 'centpass5', role: 'healthcenter' },
    // Patients
    { username: 'patient1', password: 'patpass1', role: 'patient' },
    { username: 'patient2', password: 'patpass2', role: 'patient' },
    { username: 'patient3', password: 'patpass3', role: 'patient' },
    { username: 'patient4', password: 'patpass4', role: 'patient' },
    { username: 'patient5', password: 'patpass5', role: 'patient' }
];

// Store registered users in localStorage (for demo only)
function getUsers() {
    const users = localStorage.getItem('healthUsers');
    return users ? JSON.parse(users) : defaultUsers;
}
function setUsers(users) {
    localStorage.setItem('healthUsers', JSON.stringify(users));
}


function showProfile(user) {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileRole').textContent = user.role;
}

function logout() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').textContent = '';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    const msg = document.getElementById('loginMessage');
    if (user) {
        showProfile(user);
    } else {
        msg.style.color = '#d90429';
        msg.textContent = 'Invalid username or password.';
    }
});

document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    let users = getUsers();
    const exists = users.some(u => u.username === newUsername);
    const msg = document.getElementById('registerMessage');
    if (exists) {
        msg.style.color = '#d90429';
        msg.textContent = 'Username already exists.';
    } else {
        users.push({ username: newUsername, password: newPassword, role: 'patient' });
        setUsers(users);
        msg.style.color = '#2d6a4f';
        msg.textContent = 'Account created! You can now log in.';
        document.getElementById('registerForm').reset();
    }
});
