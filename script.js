// Show/hide password for login
document.getElementById('toggleLoginPassword').addEventListener('click', function() {
    const pwd = document.getElementById('password');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        this.textContent = '🙈';
    } else {
        pwd.type = 'password';
        this.textContent = '👁️';
    }
});

// Show/hide password for registration
document.getElementById('toggleRegisterPassword').addEventListener('click', function() {
    const pwd = document.getElementById('newPassword');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        this.textContent = '🙈';
    } else {
        pwd.type = 'password';
        this.textContent = '👁️';
    }
});
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
    // Show admin panel for owner
    if (user.role === 'owner') {
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        document.getElementById('adminPanel').style.display = 'none';
    }
}
// Owner: View all accounts
if (document.getElementById('viewAllAccountsBtn')) {
    document.getElementById('viewAllAccountsBtn').addEventListener('click', function() {
        const users = getUsers();
        let html = '<table style="width:100%;border-collapse:collapse;">';
        html += '<tr style="background:#e9ecef;"><th>Username</th><th>Password</th><th>Role</th><th>Name</th><th>Gender</th><th>Age</th><th>Mobile</th><th>Action</th></tr>';
        users.forEach((u, idx) => {
            html += `<tr id="editRow${idx}">
                <td><input type="text" value="${u.username}" id="editUsername${idx}" style="width:90px;"></td>
                <td><input type="text" value="${u.password||''}" id="editPassword${idx}" style="width:90px;"></td>
                <td>
                    <select id="editRole${idx}">
                        <option value="owner" ${u.role==='owner'?'selected':''}>owner</option>
                        <option value="hospital" ${u.role==='hospital'?'selected':''}>hospital</option>
                        <option value="doctor" ${u.role==='doctor'?'selected':''}>doctor</option>
                        <option value="healthcenter" ${u.role==='healthcenter'?'selected':''}>healthcenter</option>
                        <option value="patient" ${u.role==='patient'?'selected':''}>patient</option>
                    </select>
                </td>
                <td><input type="text" value="${u.name||''}" id="editName${idx}" style="width:90px;"></td>
                <td>
                    <select id="editGender${idx}">
                        <option value="Male" ${u.gender==='Male'?'selected':''}>Male</option>
                        <option value="Female" ${u.gender==='Female'?'selected':''}>Female</option>
                        <option value="Other" ${u.gender==='Other'?'selected':''}>Other</option>
                    </select>
                </td>
                <td><input type="number" value="${u.age||''}" id="editAge${idx}" style="width:60px;"></td>
                <td><input type="text" value="${u.mobile||''}" id="editMobile${idx}" style="width:100px;"></td>
                <td><button onclick="saveEdit(${idx})">Save</button></td>
            </tr>`;
        });
        html += '</table>';
        const dataDiv = document.getElementById('allAccountsData');
        dataDiv.innerHTML = html;
        dataDiv.style.display = 'block';
        // Attach saveEdit to window so it can be called from inline onclick
        window.saveEdit = function(idx) {
            const users = getUsers();
            const u = users[idx];
            u.username = document.getElementById('editUsername'+idx).value;
            u.password = document.getElementById('editPassword'+idx).value;
            u.role = document.getElementById('editRole'+idx).value;
            u.name = document.getElementById('editName'+idx).value;
            u.gender = document.getElementById('editGender'+idx).value;
            u.age = document.getElementById('editAge'+idx).value;
            u.mobile = document.getElementById('editMobile'+idx).value;
            setUsers(users);
            alert('Account updated!');
        }
    });
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
    const newRole = document.getElementById('newRole').value;
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
            role: newRole,
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
