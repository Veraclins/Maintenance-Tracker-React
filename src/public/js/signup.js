const signUpData = document.forms.signUpForm.elements;

function signUp(user) {
  fetchData(`${baseURL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then((data) => {
      if (data.Error) {
        const err = document.getElementById('signupError');

        if (data.errors) {
          const { errors } = data;
          handleValidationErrors(errors);
        }
        const e = `
            <div class="form-section">
              <p class="danger">${data.Error}</p>
            </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      }
    });
}

function submit(event) {
  const user = {};
  event.preventDefault();
  user.firstName = signUpData.firstName.value;
  user.lastName = signUpData.lastName.value;
  user.email = signUpData.email.value;
  user.password = signUpData.password.value;
  user.passwordConfirmation = signUpData.passwordConfirmation.value;

  signUp(user);
}
document.forms.signUpForm.addEventListener('submit', submit);
