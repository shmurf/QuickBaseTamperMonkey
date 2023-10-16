// ==UserScript==
// @name         HideAllTablesForRole
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Individually hide each table for a role
// @author       SimonH
// @match        https://*.quickbase.com/db/*?a=RoleUserInterface&roleID=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quickbase.com
// @grant        GM_addStyle
// ==/UserScript==

(function ($) {
    'use strict';
    GM_addStyle('.Vibrant.Primary.TableButton { margin: 0; padding:1px; }');
    let searchParams = new URLSearchParams(window.location.search);

    const roleId = searchParams.get("roleID");

    let hideTableButton = document.createElement("div");
    hideTableButton.classList.add("Vibrant");
    hideTableButton.classList.add("Primary");
    hideTableButton.classList.add("Secondary");
    hideTableButton.classList.add("TableButton");
    hideTableButton.classList.add("hideTableButton");
    hideTableButton.innerText = "Hide";
    jQuery('#_all a').first().before(hideTableButton);

    let unhideTableButton = document.createElement("div");
    unhideTableButton.classList.add("Vibrant");
    unhideTableButton.classList.add("Primary");
    unhideTableButton.classList.add("Secondary");
    unhideTableButton.classList.add("TableButton");
    unhideTableButton.classList.add("unhideTableButton");
    unhideTableButton.innerText = "Unhide";
    jQuery('#_all a').first().after(unhideTableButton);

    jQuery('.hideTableButton').on('click', hideTables);
    jQuery('.unhideTableButton').on('click', unhideTables);

    function hideTables(){
        toggleTables(0)
    }
    function unhideTables(){
        toggleTables(1)
    }

    async function toggleTables(c) {
        jQuery(`tr[ID!="_all"] > td[aria-describedby="TableUIOptionsTable_hideTable"] a[data-checked="${c}"]`).trigger('click');
        //location.reload();
    }
})();