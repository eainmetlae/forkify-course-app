export default class FormValidator {
  _form;
  _fields;
  _errorClassName;
  _validateStatus = '';

  constructor(form, fields, errorClass = '.errormsg') {
    this._form = form;
    this._fields = fields;
    this._errorClassName = errorClass;
  }

  validateOnSubmit() {
    this._resetValidateStatus();
    this._fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
      this._validateFields(input);
    });
    console.log(this._validateStatus);
    return this._validateStatus;
  }
  _deleteMessage(el) {
    el.innerText = '';
  }
  _clearErrorMessages() {
    const errorElements = document.querySelectorAll(`${this._errorClassName}`);

    errorElements.forEach(el => {
      this._deleteMessage(el);
    });
  }
  _resetValidateStatus() {
    this._validateStatus = '';
  }

  _validateFields(field) {
    //non-blank or non-space
    if (field.value.trim() === '') {
      this._setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank!`,
        'error'
      );
    }
  }
  _setStatus(field, message, validationStatus) {
    const errorMsgEl = field.nextElementSibling;
    if (validationStatus === 'error') {
      this._validateStatus =
        this._validateStatus !== 'error' ? 'error' : this._validateStatus;

      errorMsgEl.innerText = '';
      errorMsgEl.innerText = message;
    }
  }
}
