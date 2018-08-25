const requestData = document.forms.requestForm.elements;

function createRequest(request, link) {
  const token = localStorage.getItem('token');
  fetchData(link.url, {
    method: link.method,
    token,
    body: JSON.stringify(request),
  })
    .then((data) => {
      if (data.Error) {
        const err = document.getElementById('createError');

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

function counter(element) {
  const char = document.getElementById(`${element}Counter`);
  let minChar = 0;
  // const color = '';
  let input = '';
  if (element === 'description') {
    input = requestData.description.value.length;
    minChar = 20;
  } else {
    input = requestData.title.value.length;
    minChar = 10;
  }

  // color = input < minChar ? 'danger' : 'primary';
  if (input < minChar) {
    const charLeft = minChar - input;
    char.style.display = 'block';
    char.innerHTML = `
    <small>Remaining at least: <span class="danger">${charLeft} chars</span></small>`;
  } else {
    char.style.display = 'none';
  }
}

function submit(event) {
  const link = {
    url: `${baseURL}/users/requests`,
    method: 'POST',
  };
  const request = {};
  event.preventDefault();
  request.title = requestData.title.value;
  request.device = requestData.device.value;
  request.description = requestData.description.value;

  createRequest(request, link);
}

document.forms.requestForm.addEventListener('submit', submit);

