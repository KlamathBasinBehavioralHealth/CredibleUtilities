const emp_id = parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('form[id=\'clientlist\']').parentElement.querySelector('input[id=\'client_id\'').value

function partialToolbarHide(context){
    context.querySelector('#toolbar-container').querySelectorAll('.tabToolbarButton').forEach((tbBtn) => {
        if (tbBtn.id != 'revert-ToolbarButton'){
          tbBtn.remove();
        }
    });
}

function createTableauEmbed(target, empId, reportName){
    const tableauPlaceholder = document.createElement('div');
    tableauPlaceholder.className = 'tableauPlaceholder';
    tableauPlaceholder.style.width = '1366px';
    tableauPlaceholder.style.height = '795px';

    const tableauObj = document.createElement('object');
    tableauObj.className = 'tableauViz';
    tableauObj.width = '1366';
    tableauObj.height = '795';
    tableauObj.style.display = 'none';

    let paramObj = {
        host_url: 'https%3A%2F%2Freporting.kbbh.org%3A4443%2F',
        embed_code_version: '3',
        site_root: '',
        name: reportName,
        tabs: 'no',
        toolbar: 'yes',
        showAppBanner: 'false',
        filter: 'emp_id=' + empId
    };

    for (param in paramObj){
        const tmpParam = document.createElement('param');
        tmpParam.name = param;
        tmpParam.value = paramObj[param];

        tableauObj.appendChild(tmpParam);
    }
    tableauPlaceholder.appendChild(tableauObj);
    document.querySelector(target).innerHTML = tableauPlaceholder.outerHTML;
}

createTableauEmbed('#tableauContainer', '4482', 'StaffProductivityReport&#47;StaffProductivity');

const vizScript = document.createElement('script');
vizScript.type = 'text/javascript';
vizScript.src = 'https://reporting.kbbh.org:4443/javascripts/api/viz_v1.js';
document.body.appendChild(vizScript);

const tableuFrameDocument = document.querySelector('iframe[class=\'tableauViz\']').contentWindow.document;
tableuFrameDocument.body.onload = (e) => {
    partialToolbarHide(tableuFrameDocument);
};