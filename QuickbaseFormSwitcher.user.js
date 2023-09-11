// ==UserScript==
// @name         Quickbase Form Switcher
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  adds a toggle in the menu bar with all forms for the current table
// @author       SimonH
// @match        ://*.quickbase.com/db/*a=dr*
// @match        ://*.quickbase.com/db/*a=er*
// @icon         https://www.quickbase.com/favicon-32x32.png
// @grant        none
// @run-at      document-idle
// @updateURL    https://github.com/shmurf/QuickBaseTamperMonkey/raw/master/QuickbaseFormSwitcher.user.js

// ==/UserScript==

(async function () {
    var currentFid = (typeof gDFID !== 'undefined') ? gDFID : JSON.parse(resourceId).formId;;

    console.log(currentFid)

    function formRedirect() {
        var fid = switcher.value;
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("dfid", fid);
        window.location.search = searchParams.toString();
    }

    let containerDiv = document.getElementById('pageNavBarActions');
    let switcher = document.createElement("select");
    var opt = document.createElement('option');
    opt.disabled = true;
    opt.innerHTML = "Choose a Form";
    switcher.appendChild(opt);

    switcher.onchange = formRedirect;

    containerDiv.prepend(switcher);
    const oldForms = await fetch(`https://${gRealmName}.ui.quickbase.com/ui/api/db/${gReqDBID}?a=JBI_GetForms`, { credentials: "include" })
    const ofJson = await oldForms.json()
    ofJson.forms.forEach((f) => {
        var opt = document.createElement('option');
        opt.value = f.id;
        opt.innerHTML = f.name + (currentFid == f.id ? " (Current)" : " (Old Style)");
        switcher.appendChild(opt);
    } )

    const newForms = await fetch("https://services.quickbase.com/api/forms/graphql", {
        "headers": {
            "accept": "*/*",
            "apollographql-client-name": "forms-list",
            "content-type": "application/json",
            "qb-should-resolve-errors": "true",
            "x-qb-app-id": gReqAppDBID,
            "x-qb-table-id": gReqDBID
        },
        "body": "{\"operationName\":\"ListForms\",\"variables\":{},\"query\":\"query ListForms {\\n  listForms {\\n    forms {\\n      id\\n      name\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const nfJson = await newForms.json()
    nfJson.data.listForms.forms.forEach((f) => {
        var opt = document.createElement('option');
        opt.value = f.id;
        opt.innerHTML = f.name + (currentFid === f.id ? " (Current)" : " (New Style)");
        switcher.appendChild(opt);
    } )
    switcher.value = currentFid;


    // Your code here...
})();
