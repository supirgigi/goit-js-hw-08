import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const textareaRef = document.querySelector('textarea');
const inputRef = document.querySelector('input[type="email"]');

formRef.addEventListener('input', throttle(onFormInputChange, 500));
formRef.addEventListener('submit', onSubmitForm);

loadStoredFormInputs();

function onFormInputChange() {
  const formData = {
    email: inputRef.value,
    message: textareaRef.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function loadStoredFormInputs() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
  inputRef.value = email;
  textareaRef.value = message;
}
