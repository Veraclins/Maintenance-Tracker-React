const loginData = document.forms.loginForm.elements;

function login(user, link) {
  fetchData(`${baseURL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then((data) => {
      if (data.Error) {
        const error = data.Error;
        const err = document.getElementById('loginError');

        if (data.errors) {
          const { errors } = data;
          handleValidationErrors(errors);
        }
        const e = `
            <div class="form-section">
              <div class="danger">${error}</div>
            </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'Admin') {
          window.location.href = 'admin-pending-request.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }
    });
}

function submit(e) {
  const user = {};
  e.preventDefault();
  user.email = loginData.email.value;
  user.password = loginData.password.value;

  login(user);
}
document.forms.loginForm.addEventListener('submit', submit);
