// ==UserScript==
// @name         QuickBase Return To Table Home Page
// @namespace    QuickBaseReturnToTableHomePage
// @version      0.1
// @description  Redirect from table settings to table home page regardless of origin
// @author       SimonH
// @match        ://*.quickbase.com/db/*a=TableSettingsHome*
// @match        ://*.quickbase.com/db/*a=listfields*
// @match        ://*.quickbase.com/db/*a=Relationships*
// @match        ://*.quickbase.com/db/*a=KeyProps*
// @match        ://*.quickbase.com/db/*a=tablehomepagesettings*
// @match        ://*.quickbase.com/db/*a=reportList*
// @match        ://*.quickbase.com/db/*a=dformList*
// @match        ://*.quickbase.com/db/*a=EmailList*
// @match        ://*.quickbase.com/db/*a=TablePermissions*
// @match        ://*.quickbase.com/db/*a=WebhookList*
// @match        ://*.quickbase.com/db/*a=QuickBaseActionList*
// @grant        none
// @updateURL    https://github.com/shmurf/QuickBaseTamperMonkey/raw/master/QuickBaseTableHomePage.user.js
// ==/UserScript==

let $ = window.jQuery;
let exitSettings = document.getElementById("pageNavBarExitSettingsAction");

// download button
let homeButton = document.createElement("a");
homeButton.classList.add("Settings");
homeButton.onclick = tableHome;
homeButton.href = "#";
homeButton.innerHTML = '<span class="Icon Icon16 GoBack"></span><span>Table Home Page</span>';

exitSettings.appendChild(homeButton);

function tableHome() {
  window.location.search = "a=td";
    }
