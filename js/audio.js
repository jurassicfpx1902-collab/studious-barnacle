"use strict";

const AudioSystem = {

    enabled: true,

    context: null,

    init() {

        if (!this.enabled) {
            return;
        }

        if (!window.AudioContext && !window.webkitAudioContext) {
            return;
        }

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        this.context = new AudioContext();

    },

    resume() {

        if (
            this.context &&
            this.context.state === "suspended"
        ) {

            this.context.resume();

        }

    },

    playMenuMove() {

        if (!this.enabled || !this.context) {
            return;
        }

        this.resume();

        const oscillator =
            this.context.createOscillator();

        const gain =
            this.context.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            520,
            this.context.currentTime
        );

        gain.gain.setValueAtTime(
            0.025,
            this.context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime + 0.06
        );

        oscillator.connect(gain);
        gain.connect(this.context.destination);

        oscillator.start();

        oscillator.stop(
            this.context.currentTime + 0.06
        );

    },

    playConfirm() {

        if (!this.enabled || !this.context) {
            return;
        }

        this.resume();

        const oscillator =
            this.context.createOscillator();

        const gain =
            this.context.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            660,
            this.context.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            880,
            this.context.currentTime + 0.08
        );

        gain.gain.setValueAtTime(
            0.04,
            this.context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime + 0.12
        );

        oscillator.connect(gain);
        gain.connect(this.context.destination);

        oscillator.start();

        oscillator.stop(
            this.context.currentTime + 0.12
        );

    },

    playCancel() {

        if (!this.enabled || !this.context) {
            return;
        }

        this.resume();

        const oscillator =
            this.context.createOscillator();

        const gain =
            this.context.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            300,
            this.context.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            180,
            this.context.currentTime + 0.1
        );

        gain.gain.setValueAtTime(
            0.035,
            this.context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime + 0.1
        );

        oscillator.connect(gain);
        gain.connect(this.context.destination);

        oscillator.start();

        oscillator.stop(
            this.context.currentTime + 0.1
        );

    },

    setEnabled(value) {

        this.enabled = Boolean(value);

    }

};
