

function showDetails() {
  const request = JSON.parse(localStorage.getItem('request'));
  const el = document.getElementById('requestDetail');
  let button = '';
  if (request.status === 'pending' || request.status === 'disapproved') {
    button = '<a href="update-request.html" class="button info">Update</a>';
  }
  const detail = `
    <div class="card-head">
      <h4>${request.title}</h4>
    </div>
        
    <div class="card-body">               
      <div><strong>Date Created: </strong>${new Date(request.created_at).toDateString()}</div>                 
      <div><strong>Date Updated: </strong>${new Date(request.updated_at).toDateString()}</div>                 
      <div><strong>Status: </strong>${request.status}</div>                 
      <div><strong>Device: </strong>${request.device}</div>                 
      <div><strong>Description: </strong>${request.description}</div>
      ${button}
    </div>`;
  el.innerHTML = detail;
}

