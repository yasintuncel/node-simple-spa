function showMessage({
    title = '',
    text = '',
    type = 'warning', // alert, success, warning, error, info/information

}) {
    new Noty({
        text: `<strong>${title}</strong><br>${text}`,
        type,
        layout: 'bottomRight',
        theme: 'relax', // Temalar: mint, sunset, relax, nest, metroui, semanticui, light, bootstrap-v3, bootstrap-v4
        timeout: 2000,
        progressBar: false,
        // closeWith: ['click'] // Bildirimi kapatmak için tıklama özelliği ekler (opsiyonel)
    }).show();
}

const NotifyManager = {
    showMessage,
};