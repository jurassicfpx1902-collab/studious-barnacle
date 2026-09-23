class UIManager {
    constructor() {
        this.screens = {};
        this.currentScreen = null;
    }

    init() {
        document.querySelectorAll(".screen").forEach(screen => {
            this.screens[screen.id] = screen;
        });
    }

    showScreen(id) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove("active");
        });

        const screen = this.screens[id];

        if (!screen) return;

        screen.classList.add("active");
        this.currentScreen = id;
    }

    updateText(id, text) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = text;
        }
    }

    showSystemMessage(text, duration = 1800) {
        const message = document.getElementById("system-message");

        if (!message) return;

        message.textContent = text;
        message.classList.add("visible");

        clearTimeout(this.messageTimer);

        this.messageTimer = setTimeout(() => {
            message.classList.remove("visible");
        }, duration);
    }

    setMissionText(text) {
        this.updateText("mission-objective", text);
    }
}

window.uiManager = new UIManager();
