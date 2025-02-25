let notify = document.getElementById('notify-bar');
let notifytext = document.getElementById('notify-text');
let notifyicon = document.getElementById('notify-icon');

function spawnnotify(message="", status='info', time=3000) {
  notify.style.backgroundColor = '#020d57';
  notifyicon.classList.remove('fa-check-circle', 'fa-circle-xmark', 'fa-exclamation-triangle');
  notifyicon.classList.add('fa-bell');

  switch (status) {
    case 'info':
    case 'default':
      notify.style.backgroundColor = '#020d57';
      break;
    case 'success':
      notify.style.backgroundColor = '#28a745';
      notifyicon.classList.remove('fa-bell');
      notifyicon.classList.add('fa-check-circle');
      break;
    case 'error':
      notify.style.backgroundColor = '#cd0b28';
      notifyicon.classList.remove('fa-bell');
      notifyicon.classList.add('fa-circle-xmark');
      break;
    case 'warning':
      notify.style.backgroundColor = '#ffc107';
      notifyicon.classList.remove('fa-bell');
      notifyicon.classList.add('fa-exclamation-triangle');
      break;
    default:
      console.error('Invalid status provided');
      return;
  }

  if (message.trim() === '') {
    console.error('No message provided for notification');
    return "Error occurred, please check console";
  }

  notifytext.textContent = message;
  notify.classList.add('open');

  setTimeout(function() {
    notify.classList.remove('open');
    notifytext.textContent = '';
  }, time);
  return "Notification spawned";
}
