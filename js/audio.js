class AudioSystem {
    constructor() {
        this.enabled = true;
        this.initialized = false;

        this.music = null;
        this.audioContext = null;
        this.masterGain = null;
    }

    init() {
        if (this.initialized) return;

        this.initialized = true;

        this.music = new Audio(
            "audio/the-dark-jewel.m4a"
        );

        this.music.loop = true;
        this.music.volume = 0.42;
        this.music.preload = "auto";

        this.createAudioContext();
    }

    createAudioContext() {
        try {
            this.audioContext = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

            this.masterGain =
                this.audioContext.createGain();

            this.masterGain.gain.value = 0.08;

            this.masterGain.connect(
                this.audioContext.destination
            );

        } catch (error) {
            console.warn(
                "Web Audio API unavailable.",
                error
            );
        }
    }

    async resume() {
        if (!this.initialized) {
            this.init();
        }

        if (
            this.audioContext &&
            this.audioContext.state === "suspended"
        ) {
            await this.audioContext.resume();
        }
    }

    async playMenuMusic() {
        if (!this.enabled) return;

        await this.resume();

        if (!this.music) return;

        this.music.volume = 0.42;

        try {
            await this.music.play();
        } catch (error) {
            console.warn(
                "Music playback requires user interaction."
            );
        }
    }

    stopMusic() {
        if (!this.music) return;

        this.music.pause();
        this.music.currentTime = 0;
    }

    pauseMusic() {
        if (!this.music) return;

        this.music.pause();
    }

    resumeMusic() {
        if (!this.enabled || !this.music) return;

        this.music.play().catch(() => {});
    }

    setMissionMusic() {
        if (!this.music) return;

        this.music.volume = 0.26;
    }

    setMenuMusic() {
        if (!this.music) return;

        this.music.volume = 0.42;
    }

    playMenuMove() {
        this.playTone(
            620,
            0.045,
            "square",
            0.025
        );
    }

    playConfirm() {
        this.playTone(
            880,
            0.08,
            "sine",
            0.035
        );

        setTimeout(() => {
            this.playTone(
                1200,
                0.06,
                "sine",
                0.025
            );
        }, 45);
    }

    playCancel() {
        this.playTone(
            220,
            0.09,
            "square",
            0.025
        );
    }

    playRadioConnect() {
        this.playTone(
            380,
            0.12,
            "square",
            0.025
        );

        setTimeout(() => {
            this.playTone(
                720,
                0.08,
                "square",
                0.018
            );
        }, 90);
    }

    playRadioEnd() {
        this.playTone(
            420,
            0.12,
            "square",
            0.02
        );
    }

    playAlert() {
        this.playTone(
            180,
            0.10,
            "square",
            0.04
        );

        setTimeout(() => {
            this.playTone(
                260,
                0.10,
                "square",
                0.035
            );
        }, 100);
    }

    playMissionPulse() {
        this.playTone(
            95,
            0.16,
            "sine",
            0.025
        );
    }

    playTone(
        frequency,
        duration,
        type = "sine",
        volume = 0.03
    ) {
        if (
            !this.enabled ||
            !this.audioContext ||
            !this.masterGain
        ) {
            return;
        }

        const oscillator =
            this.audioContext.createOscillator();

        const gain =
            this.audioContext.createGain();

        oscillator.type = type;

        oscillator.frequency.setValueAtTime(
            frequency,
            this.audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            volume,
            this.audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start();

        oscillator.stop(
            this.audioContext.currentTime + duration
        );
    }

    setEnabled(value) {
        this.enabled = value;

        if (!this.enabled) {
            this.pauseMusic();
        }
    }
        }
