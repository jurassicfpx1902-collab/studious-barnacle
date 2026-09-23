class InteractionSystem {
    constructor() {
        this.actionButton =
            document.getElementById("action-button");
    }

    init() {
        if (!this.actionButton) return;

        this.actionButton.addEventListener(
            "click",
            () => this.performAction()
        );
    }

    performAction() {
        const target = this.findNeutralizableEnemy();

        if (!target) {
            return;
        }

        target.neutralize();

        uiManager.showSystemMessage(
            "INIMIGO NEUTRALIZADO"
        );
    }

    findNeutralizableEnemy() {
        let closest = null;
        let closestDistance = Infinity;

        for (const enemy of gameController.enemies) {
            if (enemy.neutralized) continue;

            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 48 && distance < closestDistance) {
                closest = enemy;
                closestDistance = distance;
            }
        }

        return closest;
    }

    updateHint() {
        const hint =
            document.getElementById("interaction-hint");

        if (!hint) return;

        const target = this.findNeutralizableEnemy();

        hint.textContent = target
            ? "NEUTRALIZAR"
            : "";
    }
}

window.interactionSystem = new InteractionSystem();
