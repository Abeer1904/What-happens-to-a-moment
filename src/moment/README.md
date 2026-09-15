# Revised prototype

Edit `simulation.js` for scenes and hidden game state, and `presentation.js` for the established visual layer. Run `python3 src/moment/build.py` from the project to embed these into `what-happens-to-a-moment.html`. The HTML remains portable, with its image embedded.

Current regression: `node tests/moment-v4.cjs` (local Playwright Chromium). Earlier moment test scripts target the previous sequence.

For deterministic development runs, `resetGame(123)` accepts a seed. The normal Start again button generates a fresh seed. External events are drawn once per eligible main decision and stored; rendering never draws randomness. The seed, weights and scores are not shown to players.

The authoring reference is `design/moment-sequence-v3.md`. This is a first playable interpretation, with intentionally compact ratification and staffing procedures. Pacing, probabilities and outcome balance still need human playtesting.
