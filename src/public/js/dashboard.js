const user = JSON.parse(localStorage.getItem('user'));

document.getElementById('welcome').innerHTML = `${user.firstName}, welcome to your dashboard`;
const admin = document.getElementById('admin');
if (user.role !== 'Admin') admin.style.display = 'none';

function getUserRequests() {
  const token = localStorage.getItem('token');
  fetchData(`${baseURL}/users/requests`, {
    method: 'GET',
    token,
  })
    .then(data => displayRequests(data, 'userRequests', 'user'));
}

function getRequest(id) {
  const token = localStorage.getItem('token');
  fetchData(`${baseURL}/users/requests/${id}`, {
    method: 'GET',
    token,
  })
    .then((request) => {
      localStorage.setItem('request', JSON.stringify(request));
      window.location.href = 'request-details.html';
    });
}

