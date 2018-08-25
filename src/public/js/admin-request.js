const unAuthorized = () => {
  const page = document.getElementById('adminErr');
  const content = `
  <section class="card medium-card">
  <div class="card-head centered danger" >
      You are not authorized to view this page.
  </div>
  <div class="card-body">
    <div><a href="dashboard.html">Go back to your dashboard</a></div>
  </div>
</section>`;
  page.innerHTML = content;
};
function showAdminReq(status) {
  if (isAdmin()) {
    const data = JSON.parse(localStorage.getItem('adminRequests'));
    const request = [];
    const pageId = `${status}Requests`;

    data.forEach((element) => {
      if (element.status === status) request.push(element);
    });
    displayRequests(request, pageId, 'admin');
  } else {
    unAuthorized();
  }
}

function adminReqDetails() {
  if (isAdmin()) {
    const el = document.getElementById('adminDetail');
    const request = JSON.parse(localStorage.getItem('request'));
    let button1 = '';
    let button2 = '';
    if (request.status === 'pending') {
      button1 = `<a href="#!" onclick="adminUpdate(${request.id}, 'approve')" class="button info">Approve</a>`;
      button2 = `<a href="#!" onclick="adminUpdate(${request.id}, 'disapprove')" class="button danger">Disapprove</a>`;
    } else if (request.status === 'approved') {
      button1 = `<a href="#!" onclick="adminUpdate(${request.id}, 'resolve')" class="button primary">Resolve</a>`;
      button2 = `<a href="#!" onclick="adminUpdate(${request.id}, 'disapprove')" class="button info">Disapprove</a>`;
    } else if (request.status === 'disapproved') {
      button1 = `<a href="#!" onclick="adminUpdate(${request.id}, 'approve')" class="button info">Approve</a>`;
    }
    const detail = `
      <div class="card-head">
        <h4>${request.title}</h4>
      </div>
  
      <div class="card-body">
        <div><strong>Status: </strong>${request.status}</div>
        <div><strong>Date Created: </strong>${new Date(request.created_at).toDateString()}</div>
        <div><strong>Date Updated: </strong>${new Date(request.updated_at).toDateString()}</div>
        <div><strong>Device: </strong>${request.device} </div>
        <div><strong>Description: </strong>${request.description}</div>
        <div class="columns">
        ${button1}
        ${button2}
      </div>`;
    el.innerHTML = detail;
    stopLoader();
  } else {
    unAuthorized();
  }
}

function adminReq(id) {
  startLoader();
  const requests = JSON.parse(localStorage.getItem('adminRequests'));
  let request = {};
  requests.forEach((element) => {
    if (element.id === id) request = element;
  });
  localStorage.setItem('request', JSON.stringify(request));
  window.location.href = 'admin-request-details.html';
}

function showAllAdminReq() {
  if (isAdmin()) {
    const data = JSON.parse(localStorage.getItem('adminRequests'));
    displayRequests(data, 'allRequests', 'admin');
  } else {
    unAuthorized();
  }
}

function getAdminRequests() {
  if (isAdmin()) {
    const token = localStorage.getItem('token');
    fetchData(`${baseURL}/requests`, {
      method: 'GET',
      token,
    })
      .then((data) => {
        localStorage.setItem('adminRequests', JSON.stringify(data));
        showAdminReq('pending');
      });
  } else {
    unAuthorized();
  }
}

function adminUpdate(requestId, action) {
  const token = localStorage.getItem('token');
  fetchData(`${baseURL}/requests/${requestId}/${action}`, {
    method: 'PUT',
    token,
  })
    .then((data) => {
      if (data.Error) {
        const err = document.getElementById('updError');

        const e = `
            <div class="form-section">
              <div class="danger">${data.Error}</div>
            </div>`;
        err.innerHTML = e;
      } else {
        window.location.href = 'admin-pending-request.html';
      }
    });
}
