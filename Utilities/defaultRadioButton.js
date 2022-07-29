function defaultRadio(selector, defaultInputText) {
    if (document.querySelectorAll(selector) != null) {
        document.querySelectorAll(selector).forEach((item) => {
            if (item.closest('table').querySelectorAll('tr') != null) {
                item.closest('table').querySelectorAll('tr').forEach((row) => {
                    if (row.textContent == defaultInputText) {
                        row.querySelector('input').click();
                    }
                });
            }
        });
    }
}
