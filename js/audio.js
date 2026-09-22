export class AudioSystem {

    constructor() {
        this.enabled = true;
        this.context = null;
    }

    initialize() {

        if (this.context) {
            return;
        }

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        this.context = new AudioContext();
    }

    resume() {

        if (this.context?.state === "suspended") {
            this.context.resume();
        }
    }

    playTone(frequency, duration = 0.06, type = "square") {

        if (!this.enabled || !this.context) {
            return;
        }

        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(
            0.035,
            this.context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(this.context.destination);

        oscillator.start();
        oscillator.stop(
            this.context.currentTime + duration
        );
    }

    playMenuMove() {
        this.playTone(420, 0.045);
    }

    playConfirm() {
        this.playTone(720, 0.09);
    }

    playCancel() {
        this.playTone(220, 0.1);
    }

    playRadio() {
        this.playTone(540, 0.12, "sine");
    }

    playAlert() {
        this.playTone(160, 0.18, "sawtooth");
    }

    playObjective() {
        this.playTone(620, 0.08, "sine");
    }

    setEnabled(enabled) {

        this.enabled = enabled;
    }
}
