// ===============================================
// 🌌 DariCalc v2.0 Final
// Part 1 - Foundation
// ===============================================

window.addEventListener("DOMContentLoaded", () => {

    // ===========================================
    // DOM ELEMENTS
    // ===========================================

    const startup = document.getElementById("startup");

    const expression = document.getElementById("expression");
    const result = document.getElementById("result");

    const settingsBtn = document.getElementById("settingsBtn");
    const settingsPanel = document.getElementById("settingsPanel");
    const closeSettings = document.getElementById("closeSettings");

    const historyBtn = document.getElementById("historyBtn");
    const historyPanel = document.querySelector(".history-panel");

    const historyList = document.getElementById("historyList");
    const historySearch = document.getElementById("historySearch");
    const clearHistory = document.getElementById("clearHistory");

    const themeSelect = document.getElementById("themeSelect");
    const accentPicker = document.getElementById("accentPicker");

    const navItems = document.querySelectorAll(".nav-item");
    const tabPages = document.querySelectorAll(".tab-page");

    const calcButtons = document.querySelectorAll(".buttons button");

    // ===========================================
    // VARIABLES
    // ===========================================

    let current = "";

    let lastAnswer = "";

    let justCalculated = false;

    let memory = Number(localStorage.getItem("DariMemory")) || 0;

    let calcHistory =
        JSON.parse(localStorage.getItem("DariHistory")) || [];

    // ===========================================
    // STARTUP SCREEN
    // ===========================================

    function hideStartup() {

        if (!startup) return;

        startup.style.opacity = "0";
        startup.style.pointerEvents = "none";

        setTimeout(() => {

            startup.style.display = "none";

        }, 700);

    }

    window.addEventListener("load", () => {

        setTimeout(hideStartup, 1200);

    });

    // ===========================================
    // TOAST NOTIFICATIONS
    // ===========================================

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

    }

    // ===========================================
    // STORAGE
    // ===========================================

    function saveMemory() {

        localStorage.setItem("DariMemory", memory);

    }

    function saveHistory() {

        localStorage.setItem(
            "DariHistory",
            JSON.stringify(calcHistory)
        );

    }

    // ===========================================
    // DISPLAY
    // ===========================================

    function updateDisplay() {

        expression.textContent = current || "0";

        if (result.textContent === "") {

            result.textContent = "0";

        }

    }

    updateDisplay();

    // ===========================================
    // END OF PART 1
    // ===========================================

        // ===========================================
    // SETTINGS PANEL
    // ===========================================

    function openSettings() {

        historyPanel.classList.remove("open");
        settingsPanel.classList.add("show");

    }

    function closeSettingsPanel() {

        settingsPanel.classList.remove("show");

    }

    settingsBtn.addEventListener("click", (e) => {

        e.stopPropagation();
        openSettings();

    });

    closeSettings.addEventListener("click", closeSettingsPanel);

    // ===========================================
    // HISTORY PANEL
    // ===========================================

    function openHistory() {

        settingsPanel.classList.remove("show");
        historyPanel.classList.add("open");

    }

    function closeHistory() {

        historyPanel.classList.remove("open");

    }

    historyBtn.addEventListener("click", (e) => {

        e.stopPropagation();
        openHistory();

    });

    // ===========================================
    // CLICK OUTSIDE TO CLOSE
    // ===========================================

    document.addEventListener("click", (e) => {

        if (
            settingsPanel.classList.contains("show") &&
            !settingsPanel.contains(e.target) &&
            !settingsBtn.contains(e.target)
        ) {

            closeSettingsPanel();

        }

        if (
            historyPanel.classList.contains("open") &&
            !historyPanel.contains(e.target) &&
            !historyBtn.contains(e.target)
        ) {

            closeHistory();

        }

    });

    // ===========================================
    // ESC KEY
    // ===========================================

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeSettingsPanel();
            closeHistory();

        }

    });

    // ===========================================
    // SETTINGS TABS
    // ===========================================

    navItems.forEach(button => {

        button.addEventListener("click", () => {

            navItems.forEach(item =>
                item.classList.remove("active")
            );

            tabPages.forEach(page =>
                page.classList.remove("active")
            );

            button.classList.add("active");

            const page = document.getElementById(
                button.dataset.page
            );

            if (page) {

                page.classList.add("active");

            }

        });

    });

    // ===========================================
    // THEME ENGINE
    // ===========================================

    function applyTheme(theme) {

        document.body.className =
            document.body.className.replace(/theme-\S+/g, "");

        document.body.classList.add(`theme-${theme}`);

        localStorage.setItem("DariTheme", theme);

    }

    const savedTheme =
        localStorage.getItem("DariTheme") || "galaxy";

    themeSelect.value = savedTheme;

    applyTheme(savedTheme);

    themeSelect.addEventListener("change", () => {

        applyTheme(themeSelect.value);

        showToast("Theme Updated");

    });

    // ===========================================
    // ACCENT ENGINE
    // ===========================================

    function applyAccent(color) {

        document.documentElement.style
            .setProperty("--accent", color);

        localStorage.setItem(
            "DariAccent",
            color
        );

    }

    const savedAccent =
        localStorage.getItem("DariAccent") || "#5b8cff";

    accentPicker.value = savedAccent;

    applyAccent(savedAccent);

    accentPicker.addEventListener("input", () => {

        applyAccent(accentPicker.value);

    });

    accentPicker.addEventListener("change", () => {

        showToast("Accent Color Updated");

    });

    // ===========================================
    // END OF PART 2
    // ===========================================

        // ===========================================
    // CALCULATOR ENGINE
    // ===========================================

    const operators = ["+", "−", "×", "÷"];

    function evaluateExpression(exp) {

        exp = exp
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");

        return Function('"use strict"; return (' + exp + ')')();

    }

    function calculate() {

        if (current === "") return;

        try {

            const answer = evaluateExpression(current);

            lastAnswer = answer;

            calcHistory.unshift(`${current} = ${answer}`);

            if (calcHistory.length > 100) {

                calcHistory.pop();

            }

            saveHistory();

            current = String(answer);

            justCalculated = true;

            result.textContent = answer;

            renderHistory();

            updateDisplay();

        }

        catch {

            result.textContent = "Error";

            showToast("Invalid Expression");

        }

    }

    function appendNumber(value) {

        if (justCalculated) {

            current = "";

            justCalculated = false;

        }

        current += value;

        updateDisplay();

    }

    function appendOperator(op) {

        if (current === "") return;

        const last = current.slice(-1);

        if (operators.includes(last)) {

            current = current.slice(0, -1);

        }

        current += op;

        updateDisplay();

    }

    function appendDecimal() {

        const parts = current.split(/[+\-×÷]/);

        const last = parts[parts.length - 1];

        if (last.includes(".")) return;

        if (
            current === "" ||
            operators.includes(current.slice(-1))
        ) {

            current += "0.";

        }

        else {

            current += ".";

        }

        updateDisplay();

    }

    function toggleNegative() {

        if (current === "") return;

        current = String(-Number(current));

        updateDisplay();

    }

    function squareCurrent() {

        if (current === "") return;

        current = String(Number(current) ** 2);

        updateDisplay();

    }

    function sqrtCurrent() {

        if (current === "") return;

        current = String(Math.sqrt(Number(current)));

        updateDisplay();

    }

    function percentCurrent() {

        if (current === "") return;

        current = String(Number(current) / 100);

        updateDisplay();

    }

    function backspace() {

        current = current.slice(0, -1);

        updateDisplay();

    }

    function clearAll() {

        current = "";

        result.textContent = "0";

        justCalculated = false;

        updateDisplay();

    }

    // ===========================================
    // BUTTONS
    // ===========================================

    calcButtons.forEach(button => {

        button.addEventListener("click", () => {

            const text = button.innerText.trim();

            if (button.classList.contains("number")) {

                if (text === ".") {

                    appendDecimal();

                }

                else {

                    appendNumber(text);

                }

                return;

            }

            if (button.classList.contains("operator")) {

                appendOperator(text);

                return;

            }

            switch (button.dataset.action) {

                case "sqrt":

                    sqrtCurrent();

                    break;

                case "square":

                    squareCurrent();

                    break;

                case "percent":

                    percentCurrent();

                    break;

                case "negate":

                    toggleNegative();

                    break;

                case "clear":

                    clearAll();

                    break;

                case "backspace":

                    backspace();

                    break;

                case "equals":

                    calculate();

                    break;

            }

        });

    });

    // ===========================================
    // LIVE PREVIEW
    // ===========================================

    function livePreview() {

        if (current === "") {

            result.textContent = "0";

            return;

        }

        try {

            const answer = evaluateExpression(current);

            if (!isNaN(answer)) {

                result.textContent = answer;

            }

        }

        catch {}

    }

    const oldUpdateDisplay = updateDisplay;

    updateDisplay = function () {

        oldUpdateDisplay();

        livePreview();

    };

    updateDisplay();

    //PART 3 DONE

        // ===========================================
    // MEMORY ENGINE
    // ===========================================

    function memoryClear() {

        memory = 0;

        saveMemory();

        showToast("Memory Cleared");

    }

    function memoryRecall() {

        current = String(memory);

        justCalculated = false;

        updateDisplay();

        showToast("Memory Recalled");

    }

    function memoryAdd() {

        const value = Number(result.textContent);

        if (!isNaN(value)) {

            memory += value;

            saveMemory();

            showToast("Added to Memory");

        }

    }

    function memorySubtract() {

        const value = Number(result.textContent);

        if (!isNaN(value)) {

            memory -= value;

            saveMemory();

            showToast("Subtracted from Memory");

        }

    }

    // ===========================================
    // MEMORY BUTTONS
    // ===========================================

    document.querySelectorAll(".memory").forEach(button => {

        button.addEventListener("click", () => {

            switch (button.innerText.trim()) {

                case "MC":

                    memoryClear();
                    break;

                case "MR":

                    memoryRecall();
                    break;

                case "M+":

                    memoryAdd();
                    break;

                case "M-":

                    memorySubtract();
                    break;

            }

        });

    });

    // ===========================================
    // MEMORY INDICATOR
    // ===========================================

    function updateMemoryIndicator() {

        const logo = document.querySelector(".logo");

        if (!logo) return;

        if (memory !== 0) {

            logo.dataset.memory = "M";

        }

        else {

            delete logo.dataset.memory;

        }

    }

    updateMemoryIndicator();

    const originalSaveMemory = saveMemory;

    saveMemory = function () {

        originalSaveMemory();

        updateMemoryIndicator();

    };

    updateMemoryIndicator();

    // ===========================================
    // END OF PART 4
    // ===========================================

        // ===========================================
    // HISTORY ENGINE
    // ===========================================

    function renderHistory(list = calcHistory) {

        if (!historyList) return;

        historyList.innerHTML = "";

        if (list.length === 0) {

            historyList.innerHTML = `
                <div class="history-empty">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <p>No calculations yet.</p>
                </div>
            `;

            return;

        }

        list.forEach(item => {

            const div = document.createElement("div");

            div.className = "history-item";

            div.textContent = item;

            div.addEventListener("click", () => {

                current = item.split("=")[0].trim();

                justCalculated = false;

                updateDisplay();

                closeHistory();

                showToast("Expression Loaded");

            });

            historyList.appendChild(div);

        });

    }

    renderHistory();

    // ===========================================
    // CLEAR HISTORY
    // ===========================================

    if (clearHistory) {

        clearHistory.addEventListener("click", () => {

            calcHistory = [];

            saveHistory();

            renderHistory();

            showToast("History Cleared");

        });

    }

    // ===========================================
    // HISTORY SEARCH
    // ===========================================

    if (historySearch) {

        historySearch.addEventListener("input", () => {

            const search =
                historySearch.value.toLowerCase().trim();

            if (search === "") {

                renderHistory();

                return;

            }

            const filtered = calcHistory.filter(item =>
                item.toLowerCase().includes(search)
            );

            renderHistory(filtered);

        });

    }

    // ===========================================
    // EXPORT HISTORY
    // ===========================================

    function exportHistory() {

        if (calcHistory.length === 0) {

            showToast("No History");

            return;

        }

        const blob = new Blob(
            [calcHistory.join("\n")],
            { type: "text/plain" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "DariCalc_History.txt";

        a.click();

        URL.revokeObjectURL(url);

        showToast("History Exported");

    }

    // ===========================================
    // COPY LAST RESULT
    // ===========================================

    async function copyResult() {

        try {

            await navigator.clipboard.writeText(result.textContent);

            showToast("Copied");

        }

        catch {

            showToast("Couldn't Copy");

        }

    }

    // ===========================================
    // END OF PART 5
    // ===========================================

        // ===========================================
    // KEYBOARD SUPPORT
    // ===========================================

    document.addEventListener("keydown", (e) => {

        // Ignore typing inside inputs/selects
        if (
            document.activeElement.tagName === "INPUT" ||
            document.activeElement.tagName === "SELECT" ||
            document.activeElement.tagName === "TEXTAREA"
        ) {
            return;
        }

        const key = e.key;

        // ===========================
        // NUMBERS
        // ===========================

        if (/^[0-9]$/.test(key)) {

            appendNumber(key);

            return;

        }

        // ===========================
        // DECIMAL
        // ===========================

        if (key === ".") {

            appendDecimal();

            return;

        }

        // ===========================
        // OPERATORS
        // ===========================

        switch (key) {

            case "+":
                appendOperator("+");
                return;

            case "-":
                appendOperator("−");
                return;

            case "*":
                appendOperator("×");
                return;

            case "/":

                e.preventDefault();

                appendOperator("÷");

                return;

        }

        // ===========================
        // ENTER
        // ===========================

        if (key === "Enter" || key === "=") {

            e.preventDefault();

            calculate();

            return;

        }

        // ===========================
        // BACKSPACE
        // ===========================

        if (key === "Backspace") {

            e.preventDefault();

            backspace();

            return;

        }

        // ===========================
        // DELETE
        // ===========================

        if (key === "Delete") {

            clearAll();

            showToast("Cleared");

            return;

        }

        // ===========================
        // ESC
        // ===========================

        if (key === "Escape") {

            closeSettingsPanel();

            closeHistory();

            return;

        }

    });

    // ===========================================
    // RIPPLE EFFECT
    // ===========================================

    calcButtons.forEach(button => {

        button.addEventListener("pointerdown", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";

            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    // ===========================================
    // BUTTON PRESS ANIMATION
    // ===========================================

    calcButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("pressed");

            setTimeout(() => {

                button.classList.remove("pressed");

            }, 120);

        });

    });

    // ===========================================
    // END OF PART 6
    // ===========================================

           // ===========================================
    // PART 7 - SETTINGS ENGINE
    // ===========================================

    const settingInputs = document.querySelectorAll(
        ".settings-panel input, .settings-panel select"
    );

    function loadSettings() {

        settingInputs.forEach(input => {

            const key = "dari_" + (input.id || input.name);

            const value = localStorage.getItem(key);

            if (value === null) return;

            if (input.type === "checkbox") {

                input.checked = value === "true";

            } else {

                input.value = value;

            }

        });

    }

    function saveSettings() {

        settingInputs.forEach(input => {

            const key = "dari_" + (input.id || input.name);

            if (input.type === "checkbox") {

                localStorage.setItem(key, input.checked);

            } else {

                localStorage.setItem(key, input.value);

            }

        });

    }

    settingInputs.forEach(input => {

        input.addEventListener("change", saveSettings);

    });

    loadSettings();

    // ===========================================
    // ANIMATION TOGGLE
    // ===========================================

    const animationToggle =
        document.getElementById("animationToggle");

    function updateAnimations() {

        if (!animationToggle) return;

        document.body.classList.toggle(
            "animations-disabled",
            !animationToggle.checked
        );

    }

    if (animationToggle) {

        animationToggle.addEventListener("change", () => {

            updateAnimations();

            showToast(
                animationToggle.checked
                ? "Animations Enabled"
                : "Animations Disabled"
            );

        });

    }

    updateAnimations();

    // ===========================================
    // HOLIDAY ENGINE
    // ===========================================

    function applyHolidayTheme() {

        const today = new Date();

        const month = today.getMonth() + 1;
        const day = today.getDate();

        document.body.classList.remove(
            "holiday-halloween",
            "holiday-christmas",
            "holiday-newyear",
            "holiday-valentine"
        );

        if (month === 10) {

            document.body.classList.add("holiday-halloween");

        }

        else if (month === 12) {

            document.body.classList.add("holiday-christmas");

        }

        else if (month === 1 && day <= 3) {

            document.body.classList.add("holiday-newyear");

        }

        else if (month === 2 && day === 14) {

            document.body.classList.add("holiday-valentine");

        }

    }

    applyHolidayTheme();

    // ===========================================
    // AUTO SAVE
    // ===========================================

    window.addEventListener("beforeunload", () => {

        saveHistory();

        saveMemory();

        saveSettings();

    });

    // ===========================================
    // PART 7 COMPLETE
    // ===========================================

        // ===========================================
    // FINAL INITIALIZATION
    // ===========================================

    function initializeDariCalc() {

        // Load display
        updateDisplay();

        // Load history
        renderHistory();

        // Restore theme
        applyTheme(
            localStorage.getItem("DariTheme") || "galaxy"
        );

        // Restore accent
        applyAccent(
            localStorage.getItem("DariAccent") || "#5b8cff"
        );

        // Restore settings
        loadSettings();

        // Restore animation state
        updateAnimations();

        // Restore holiday theme
        applyHolidayTheme();

        // Update memory indicator
        updateMemoryIndicator();

        console.log(
            "%c🌌 DariCalc v2.0 Stable Loaded",
            "color:#5b8cff;font-size:16px;font-weight:bold;"
        );

    }

    initializeDariCalc();

    // ===========================================
    // VERSION INFO
    // ===========================================

    const DARICALC = {

        version: "2.0",

        codename: "Dari",

        developer: "Darius",

        release: "Stable"

    };

    console.table(DARICALC);

    // ==========================
// EVENT BUTTONS
// ==========================

const eventButtons = document.querySelectorAll(".event-btn");

eventButtons.forEach(button => {

    button.addEventListener("click", () => {

        eventButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

       // Stop every event first

ChristmasEvent.stop();
HalloweenEvent.stop();
ValentineEvent.stop();
NewYearEvent.stop();
EasterEvent.stop();
NaijaEvent.stop();




switch(button.dataset.event){

    case "christmas":

        ChristmasEvent.start();

        break;

    case "halloween":

        HalloweenEvent.start();

        break;

    case "valentine":

        ValentineEvent.start();

        break;

    case "newyear":

        NewYearEvent.start();

        break;

    case "easter":

     EasterEvent.start();

        break;

    case "naija":

        NaijaEvent.start();

        break;

}

        localStorage.setItem(
            "DariEvent",
            button.dataset.event
        );

    });

});

const savedEvent =
localStorage.getItem("DariEvent");

if(savedEvent){

    const btn=document.querySelector(
        `.event-btn[data-event="${savedEvent}"]`
    );

    if(btn){

        eventButtons.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

    }

}

// ==========================================
// EVENT ENGINE
// ==========================================

const eventLayer = document.getElementById("eventLayer");

let eventInterval = null;

function stopEvent(){

    clearInterval(eventInterval);

    eventLayer.innerHTML = "";

}

function startParticles(emoji,size,speed){

    stopEvent();

    eventInterval = setInterval(()=>{

        const particle = document.createElement("div");

        particle.className="event-particle";

        particle.textContent=emoji;

        particle.style.left=Math.random()*100+"vw";

        particle.style.fontSize=size+"px";

        particle.style.animationDuration=speed+Math.random()*4+"s";

        eventLayer.appendChild(particle);

        setTimeout(()=>{

            particle.remove();

        },10000);

    },350);

}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

const toast = document.getElementById("toast");

function showToast(message){

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

    // ===========================================
    // END OF SCRIPT
    // ===========================================

});