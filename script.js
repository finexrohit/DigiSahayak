// Show registration form when button is clicked
document.getElementById('showRegisterBtn').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'block';
    this.style.display = 'none';
});

// Hide registration form and show button after successful registration
// Default users for each role
const defaultUsers = [
    // Owners
    { username: 'owner1', password: 'ownerpass1', role: 'owner', name: 'Owner One', gender: 'Male', age: 45, mobile: '9000000001' },
    { username: 'owner2', password: 'ownerpass2', role: 'owner', name: 'Owner Two', gender: 'Female', age: 42, mobile: '9000000002' },
    { username: 'owner3', password: 'ownerpass3', role: 'owner', name: 'Owner Three', gender: 'Male', age: 50, mobile: '9000000003' },
    { username: 'owner4', password: 'ownerpass4', role: 'owner', name: 'Owner Four', gender: 'Female', age: 38, mobile: '9000000004' },
    { username: 'owner5', password: 'ownerpass5', role: 'owner', name: 'Owner Five', gender: 'Other', age: 40, mobile: '9000000005' },
    // Hospitals
    { username: 'hospital1', password: 'hospass1', role: 'hospital', name: 'Hospital One', gender: 'Other', age: 10, mobile: '9111111111' },
    { username: 'hospital2', password: 'hospass2', role: 'hospital', name: 'Hospital Two', gender: 'Other', age: 12, mobile: '9111111112' },
    { username: 'hospital3', password: 'hospass3', role: 'hospital', name: 'Hospital Three', gender: 'Other', age: 8, mobile: '9111111113' },
    { username: 'hospital4', password: 'hospass4', role: 'hospital', name: 'Hospital Four', gender: 'Other', age: 15, mobile: '9111111114' },
    { username: 'hospital5', password: 'hospass5', role: 'hospital', name: 'Hospital Five', gender: 'Other', age: 11, mobile: '9111111115' },
    // Doctors
    { username: 'doctor1', password: 'docpass1', role: 'doctor', name: 'Dr. One', gender: 'Male', age: 35, mobile: '9222222221' },
    { username: 'doctor2', password: 'docpass2', role: 'doctor', name: 'Dr. Two', gender: 'Female', age: 32, mobile: '9222222222' },
    { username: 'doctor3', password: 'docpass3', role: 'doctor', name: 'Dr. Three', gender: 'Male', age: 40, mobile: '9222222223' },
    { username: 'doctor4', password: 'docpass4', role: 'doctor', name: 'Dr. Four', gender: 'Female', age: 29, mobile: '9222222224' },
    { username: 'doctor5', password: 'docpass5', role: 'doctor', name: 'Dr. Five', gender: 'Other', age: 37, mobile: '9222222225' },
    // Health Centers
    { username: 'center1', password: 'centpass1', role: 'healthcenter', name: 'Center One', gender: 'Other', age: 5, mobile: '9333333331' },
    { username: 'center2', password: 'centpass2', role: 'healthcenter', name: 'Center Two', gender: 'Other', age: 7, mobile: '9333333332' },
    { username: 'center3', password: 'centpass3', role: 'healthcenter', name: 'Center Three', gender: 'Other', age: 6, mobile: '9333333333' },
    { username: 'center4', password: 'centpass4', role: 'healthcenter', name: 'Center Four', gender: 'Other', age: 8, mobile: '9333333334' },
    { username: 'center5', password: 'centpass5', role: 'healthcenter', name: 'Center Five', gender: 'Other', age: 9, mobile: '9333333335' },
    // Patients
    { username: 'patient1', password: 'patpass1', role: 'patient', name: 'Patient One', gender: 'Male', age: 25, mobile: '9444444441' },
    { username: 'patient2', password: 'patpass2', role: 'patient', name: 'Patient Two', gender: 'Female', age: 22, mobile: '9444444442' },
    { username: 'patient3', password: 'patpass3', role: 'patient', name: 'Patient Three', gender: 'Male', age: 30, mobile: '9444444443' },
    { username: 'patient4', password: 'patpass4', role: 'patient', name: 'Patient Four', gender: 'Female', age: 28, mobile: '9444444444' },
    { username: 'patient5', password: 'patpass5', role: 'patient', name: 'Patient Five', gender: 'Other', age: 27, mobile: '9444444445' }
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
    document.getElementById('profileName').textContent = user.name || '';
    document.getElementById('profileGender').textContent = user.gender || '';
    document.getElementById('profileAge').textContent = user.age || '';
    document.getElementById('profileMobile').textContent = user.mobile || '';
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
    const newName = document.getElementById('newName').value;
    const newGender = document.getElementById('newGender').value;
    const newAge = document.getElementById('newAge').value;
    const newMobile = document.getElementById('newMobile').value;
    let users = getUsers();
    const exists = users.some(u => u.username === newUsername);
    const msg = document.getElementById('registerMessage');
    if (exists) {
        msg.style.color = '#d90429';
        msg.textContent = 'Username already exists.';
    } else {
        users.push({
            username: newUsername,
            password: newPassword,
            role: 'patient',
            name: newName,
            gender: newGender,
            age: newAge,
            mobile: newMobile
        });
        setUsers(users);
        msg.style.color = '#2d6a4f';
        msg.textContent = 'Account created! You can now log in.';
        document.getElementById('registerForm').reset();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('showRegisterBtn').style.display = 'inline-block';
    }
});
