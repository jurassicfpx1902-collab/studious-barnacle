export class MusicSystem {

    constructor() {

        this.enabled = true;

        this.menuMusic = null;
        this.missionMusic = null;
    }

    async initialize() {

        /*
         * The actual Suno music files can be added later.
         *
         * Suggested paths:
         *
         * assets/music/menu.mp3
         * assets/music/no-dark.mp3
         */

        this.menuMusic = this.createAudio(
            "assets/music/menu.mp3"
        );

        this.missionMusic = this.createAudio(
            "assets/music/no-dark.mp3"
        );

        if (this.menuMusic) {
            this.menuMusic.loop = true;
        }

        if (this.missionMusic) {
            this.missionMusic.loop = true;
        }
    }

    createAudio(source) {

        const audio = new Audio(source);

        audio.volume = 0.28;

        audio.addEventListener(
            "error",
            () => {
                console.info(
                    `Music file not available yet: ${source}`
                );
            }
        );

        return audio;
    }

    stopAll() {

        this.stop(this.menuMusic);
        this.stop(this.missionMusic);
    }

    stop(audio) {

        if (!audio) {
            return;
        }

        audio.pause();
        audio.currentTime = 0;
    }

    playMenu() {

        if (!this.enabled || !this.menuMusic) {
            return;
        }

        this.stop(this.missionMusic);

        this.menuMusic
            .play()
            .catch(() => {});
    }

    playMission() {

        if (!this.enabled || !this.missionMusic) {
            return;
        }

        this.stop(this.menuMusic);

        this.missionMusic
            .play()
            .catch(() => {});
    }

    setEnabled(enabled) {

        this.enabled = enabled;

        if (!enabled) {
            this.stopAll();
        }
    }
}
