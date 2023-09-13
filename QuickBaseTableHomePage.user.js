// ==UserScript==
// @name         QuickBase Return To Table Home Page
// @namespace    QuickBaseReturnToTableHomePage
// @version      0.1
// @description  Redirect from table settings to table home page regardless of origin
// @author       SimonH
// @match        https://*.quickbase.com/db/*?a=*
// @exclude      https://*.quickbase.com/db/*?a=*&*
// @exclude      https://*.quickbase.com/db/*?a=td*
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
homeButton.innerHTML = '<span class="Icon Icon16"></span><span>&#x2302; Table Home Page</span>';

exitSettings.appendChild(homeButton);

function tableHome() {
  window.location.search = "a=td";
    }
