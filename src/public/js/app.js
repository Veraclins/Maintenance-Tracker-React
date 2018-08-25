// To be loaded in every file before other scripts
const baseURL = 'https://veraclins-m-tracker.herokuapp.com/api/v1'; // Hosted app
// const baseURL = 'http://localhost:5000/api/v1'; // Local development
const loader = document.getElementById('loader-wrapper');
const mainEl = document.getElementById('main');
const footer = document.getElementById('footer');
const loggedInUser = JSON.parse(localStorage.getItem('user'));

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return user.role === 'Admin';
  return false;
};

const logger = () => {
  if (!isAdmin()) document.getElementById('admin').style.display = 'none';
  if (!loggedInUser) document.getElementById('dashboard').style.display = 'none';
};

const startLoader = () => {
  mainEl.style.display = 'none';
  footer.style.display = 'none';
  loader.style.display = 'block';
  loader.innerHTML = `
    <div>
      <h2 class="centered"><strong>Loading... Please Wait...</strong></h2>
    </div>
    <div id="loader"></div>`;
};

const stopLoader = () => {
  mainEl.style.display = 'block';
  footer.style.display = 'block';
  loader.style.display = 'none';
};

function fetchData(url, payload) {
  startLoader();
  const response = fetch(url, {
    method: payload.method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'x-access-token': payload.token,
    },
    body: payload.body,
  })
    .then(res =>
      // stopLoader();
      res.json());
  return response;
}

function displayRequests(request, pageId, type) {
  const el = document.getElementById(pageId);
  let rows = `
      <li class="columns">
        <div class="column columns">
          <h2>Requests</h2>
        </div>
        <div class="column columns">
          <h2>Date</h2>
          <h2>Status</h2>
        </div>
      </li>`;
  if (request.length === 0 && type === 'admin') {
    rows = `
        <li>
          <h2 class="centered">
            There are no requests in this category at the moment!
          </h2>                    
        </li>`;
  } else if (request.length === 0) {
    rows = `
        <li>
          <h2 class="centered">
            You do not  have any request at the moment. <a href="create-request.html">Create a Request</a>
          </h2>                    
        </li>`;
  } else if (request.Error) {
    rows = `
        <li>
          <h2 class="danger centered">
            ${request.Error}
          </h2>                    
        </li>`;
  } else {
    request.forEach((element) => {
      const createdAt = new Date(element.created_at).toDateString();
      let getReq = '';
      if (type === 'admin') {
        getReq = `adminReq(${element.id})`;
      } else {
        getReq = `getRequest(${element.id})`;
      }
      rows += `
        <li class="columns">
          <a class="column" href="#!" id="${element.id}" onclick="${getReq}">${element.title}</a>
          <div class="column columns">
            <div>${createdAt}</div>
            <div class="${element.status}">${element.status}</div>
          </div>                    
        </li>`;
    });
  }
  el.innerHTML = rows;
  stopLoader();
}

function handleValidationErrors(errors) {
  Object.entries(errors).forEach(([key, value]) => {
    const element = document.getElementById(`${key}`);
    const error = document.getElementById(`${key}Error`);
    element.style.border = '1px solid red';
    error.innerHTML = `<span class="danger">${key} <small>${value}</small></span>`;
    document.documentElement.scrollTop = 100;
  });
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
