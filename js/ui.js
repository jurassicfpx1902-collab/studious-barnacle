"use strict";

const UISystem = {

    screens: {},

    audioEnabled: true,

    init() {

        this.screens = {

            mainMenu:
                document.getElementById("mainMenu"),

            settings:
                document.getElementById("settingsScreen"),

            credits:
                document.getElementById("creditsScreen")

        };

        this.bindButtons();

    },

    bindButtons() {

        document
            .getElementById("startButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playConfirm();

                    this.showMessage(
                        "SISTEMA DE MISSÃO EM DESENVOLVIMENTO."
                    );

                }
            );

        document
            .getElementById("settingsButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playConfirm();

                    this.showScreen(
                        "settings"
                    );

                }
            );

        document
            .getElementById("creditsButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playConfirm();

                    this.showScreen(
                        "credits"
                    );

                }
            );

        document
            .getElementById("exitButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playCancel();

                    this.showMessage(
                        "SAÍDA SOLICITADA."
                    );

                }
            );

        document
            .getElementById("settingsBackButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playCancel();

                    this.showScreen(
                        "mainMenu"
                    );

                }
            );

        document
            .getElementById("creditsBackButton")
            .addEventListener(
                "click",
                () => {

                    AudioSystem.playCancel();

                    this.showScreen(
                        "mainMenu"
                    );

                }
            );

        document
            .getElementById("audioButton")
            .addEventListener(
                "click",
                () => {

                    this.toggleAudio();

                }
            );

    },

    showScreen(screenName) {

        Object.values(this.screens)
            .forEach(screen => {

                screen.classList.add(
                    "hidden"
                );

                screen.classList.remove(
                    "active"
                );

            });

        const target =
            this.screens[screenName];

        if (!target) {
            return;
        }

        target.classList.remove(
            "hidden"
        );

        target.classList.add(
            "active"
        );

    },

    toggleAudio() {

        this.audioEnabled =
            !this.audioEnabled;

        AudioSystem.setEnabled(
            this.audioEnabled
        );

        const button =
            document.getElementById(
                "audioButton"
            );

        button.textContent =
            this.audioEnabled
                ? "LIGADO"
                : "DESLIGADO";

        if (this.audioEnabled) {
            AudioSystem.playConfirm();
        }

    },

    showMessage(message) {

        const messageElement =
            document.getElementById(
                "systemMessage"
            );

        messageElement.textContent =
            message;

        messageElement.classList.remove(
            "hidden"
        );

        clearTimeout(
            this.messageTimer
        );

        this.messageTimer =
            setTimeout(
                () => {

                    messageElement.classList.add(
                        "hidden"
                    );

                },
                2200
            );

    }

};
