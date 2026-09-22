class AudioSystem {
    constructor() {
        this.enabled = true;
        this.music = null;
        this.audioContext = null;
        this.masterGain = null;
        this.intensity = "normal";
    }

    init() {
        if (this.music) return;

        this.music = new Audio("audio/the-dark-jewel.m4a");
        this.music.loop = true;
        this.music.preload = "auto";
        this.music.volume = 0.20;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.20;
            this.masterGain.connect(this.audioContext.destination);
        } catch (error) {
            this.audioContext = null;
        }
    }

    resume() {
        if (!this.enabled) return;

        this.init();

        if (this.audioContext && this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }
    }

    startMusic() {
        if (!this.enabled) return;

        this.init();
        this.resume();

        if (this.music) {
            this.music.play().catch(() => {});
        }
    }

    stopMusic() {
        if (!this.music) return;

        this.music.pause();
        this.music.currentTime = 0;
    }

    setEnabled(value) {
        this.enabled = value;

        if (!value) {
            this.stopMusic();
        }
    }

    setIntensity(level) {
        this.intensity = level;

        if (!this.music || !this.enabled) return;

        const volumes = {
            normal: 0.18,
            suspicious: 0.21,
            alert: 0.25,
            danger: 0.30,
            extraction: 0.23
        };

        this.music.volume = volumes[level] ?? 0.20;
    }

    tone(frequency, duration, type = "sine", volume = 0.08) {
        if (!this.enabled || !this.audioContext || !this.masterGain) return;

        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            volume,
            this.audioContext.currentTime + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            this.audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(this.masterGain);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration + 0.02);
    }

    playMenuMove() {
        this.tone(620, 0.055, "square", 0.035);
    }

    playConfirm() {
        this.tone(760, 0.08, "square", 0.05);

        setTimeout(() => {
            this.tone(980, 0.08, "square", 0.04);
        }, 60);
    }

    playCancel() {
        this.tone(330, 0.10, "square", 0.04);
    }

    playRadioConnect() {
        this.tone(180, 0.12, "sine", 0.04);

        setTimeout(() => {
            this.tone(440, 0.08, "square", 0.035);
        }, 90);
    }

    playRadioStatic() {
        this.tone(95, 0.07, "sawtooth", 0.025);
    }

    playMissionStart() {
        this.playRadioConnect();
        this.setIntensity("normal");
    }

    playObjective() {
        this.tone(880, 0.09, "square", 0.045);
    }

    playAlert() {
        this.tone(520, 0.10, "square", 0.055);

        setTimeout(() => {
            this.tone(360, 0.10, "square", 0.045);
        }, 100);
    }

    playNeutralize() {
        this.tone(190, 0.13, "sine", 0.045);
    }

    playExtraction() {
        this.tone(680, 0.12, "square", 0.05);

        setTimeout(() => {
            this.tone(920, 0.15, "square", 0.05);
        }, 100);
    }

    playGameOver() {
        this.tone(220, 0.25, "sawtooth", 0.045);
    }
}

window.audioSystem = new AudioSystem();
