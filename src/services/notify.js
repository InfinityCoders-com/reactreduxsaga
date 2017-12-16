
export function notify (title, text, type) {
  sweetAlert(title, text, type);
}

export function confirm (title, text, type) {
  return new Promise((resolve, reject) => {
    swal({
      title:             title,
      text:              text,
      type:              type,
      showCancelButton:  true,
      confirmButtonText: 'OK',
      closeOnConfirm:    true,
      html:              true
    },
    (isConfirm) => {
      resolve(isConfirm);
    });
  });
}
