// icons = ['error', 'warning', 'info','question']

function showMessage({
    title = '',
    text = '',
    icon = 'info',
    confirmButtonText = 'Tamam',
    onClickConfirm = null,
}) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    }).then((result) => {
        if (result.isConfirmed && onClickConfirm) {
            onClickConfirm()
        }
    })
}

function showApprove({
    title = '',
    text = '',
    icon = 'question',
    confirmButtonText = 'Onayla',
    cancelButtonText = 'İptal Et',
    onClickConfirm = null,
    onClickDismiss = null,
}) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton: true,
        cancelButtonText,
    }).then((result) => {
        if (result.isConfirmed && onClickConfirm) {
            onClickConfirm()
        } else if (result.isDismissed && onClickDismiss) {
            onClickDismiss()
        }
    })
}

function loading({
    title = '',
    text = 'Lütfen bekleyin.',
}) {
    Swal.fire({
        title,
        html: text,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    })
}

function closeLoading() {
    Swal.close()
}

const DialogManager = {
    showMessage,
    showApprove,
    loading,
    closeLoading,
}