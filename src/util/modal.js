import Swal from 'sweetalert2'
import './modal.css'

const swalButton = Swal.mixin({
  customClass: {
    confirmButton: 'btn-custom-primary',
    cancelButton: 'btn-custom-danger'
  },
  buttonsStyling: false
})

const confirm = (icon, title, text, confirmButtonText = '확인') => {
  return swalButton.fire({
    icon,
    title,
    text,
    confirmButtonText
  })
}
const sweetAlert = {
  success(title, text, buttonText) {
    return confirm('success', title, text, buttonText)
  },
  error(title, text, buttonText) {
    return confirm('error', title, text, buttonText)
  },
  warning(title, text, buttonText) {
    return confirm('warning', title, text, buttonText)
  },
  question(title, text, confirmButtonText = '네', cancelButtonText = '아니오') {
    return swalButton.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    })
  },
  prompt(title, text, input = 'text', inputPlaceholder = '', confirmButtonText = '확인') {
    return swalButton.fire({
      title,
      text,
      input,
      inputPlaceholder,
      confirmButtonText
    })
  }
}
export default sweetAlert
