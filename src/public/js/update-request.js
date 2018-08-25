
const data = document.forms.updateForm.elements;


function updateRequest(request) {
  const oldRequest = JSON.parse(localStorage.getItem('request'));
  const token = localStorage.getItem('token');
  fetchData(`${baseURL}/users/requests/${oldRequest.id}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(request),
  })
    .then((data) => {
      if (data.Error) {
        const err = document.getElementById('updateError');

        if (data.errors) {
          const { errors } = data;
          handleValidationErrors(errors);
        }

        const e = `
              <div class="form-section">
                <div class="danger">${data.Error}</div>
              </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('request', JSON.stringify(data));
        window.location.href = 'dashboard.html';
      }
    });
}

function populate() {
  const request = JSON.parse(localStorage.getItem('request'));
  data.title.value = request.title;
  data.device.value = request.device;
  data.description.value = request.description;
}
function submit(event) {
  event.preventDefault();
  const request = {};
  request.title = data.title.value;
  request.device = data.device.value;
  request.description = data.description.value;

  updateRequest(request);
}
document.forms.updateForm.addEventListener('submit', submit);
