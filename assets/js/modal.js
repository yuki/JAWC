// esto es otra guarrada. Debería hacerse por typescript

function show_modal() {
  let modal = new bootstrap.Modal(document.getElementById('alertModal'));
  modal.toggle();
}

function hide_modal() {
  let b = document.getElementById('closeModal');
  b.click();
}
