function getFormBody(formId) {
    var form = document.getElementById(formId)
    var formData = new FormData(form)
    return Object.fromEntries(
        Array.from(formData.keys()).map(key => [
            key, formData.getAll(key).length > 1 ?
                formData.getAll(key) : formData.get(key)
        ]))
}

function onClickTestDialog() {
    // DialogManager.showMessage({
    //     text: 'Test Aciklama', onClickConfirm: async function () {
    //         setTimeout(() => {
    //             console.log('2sn gecti')
    //         }, 2000);
    //     }
    // })

    DialogManager.showApprove({
        text: 'Test Aciklama',
        title: 'Kayit Silinecek',
        onClickConfirm: () => DialogManager.showMessage({ text: 'silindi', icon: 'success' }),
        onClickDismiss: () => DialogManager.showMessage({ text: 'iptal edildi' }),
    })

    // DialogManager.loading({})
    // setTimeout(() => {
    //     // Yüklenme tamamlandıktan sonra loading ekranını kapat
    //     DialogManager.closeLoading()

    //     // Ardından bir mesaj göster
    //     NotifyManager.showMessage({
    //         title: 'Tamamlandı!',
    //         text: 'İşleminiz başarıyla tamamlandı.',
    //         type: 'success',
    //     })
    // }, 2000) // 3 saniye bekleme süresi

}

function onClickTestNotify() {
    NotifyManager.showMessage({
        title: 'Tamamlandı!',
        text: 'İşleminiz başarıyla tamamlandı.',
        type: 'warning',
    })
}