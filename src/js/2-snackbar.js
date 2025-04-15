import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const checked = form.querySelector("[name='state']:checked").value;
  const delay = form.querySelector("[name='delay']").value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checked === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  form.reset();
  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'bottomRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'bottomRight',
      });
    });
});
