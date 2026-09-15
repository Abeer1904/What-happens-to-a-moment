# Canonical v2 implementation

The supplied branching design and state-machine specification are preserved in `moment-design-v2-branching.md` and `moment-state-machine-v2.md`. The standalone HTML is built with `python3 src/moment/build.py`.

## Internal state

The ten principal variables map to `vars.mob`, `vars.org`, `leg`, `vars.rel`, `vars.agn`, `vars.ind`, `perceived`, `trust`, `leverage`, and `vars.acc`. Additional state includes `breadth`, `leader`, and `space`, plus explicit access, finances, alliance scars, dependency, mobilisation uses, flags, pending construction and causal history. Scores are never rendered.

Capabilities require decisions. `BUILT_LEGAL_INFRASTRUCTURE` is the legal capability; `BUILT_CHAPTERS` is local chapters. Legal staffing and resources affect delivery rather than deleting a built team. The coalition gate checks its flag, relationship strength and unresolved rupture. Access and institutional leverage are separate. Derived mobilisation, mandate and agenda capabilities are refreshed from their prerequisite decisions and current condition.

The Widen Chain has three choices and an automatic founding disagreement. It bypasses the later narrow-path constitution choice. Membership must mature before it supplies an elected body; the Turn 8 audit determines whether its governance works. The demobilised path always receives the Government-relents bulletin. Its underlying disposition is hidden and informs later conduct.

## Interpretation and consequences

Structural effects occur before a seeded reaction draw. The six global opportunities are Turn 1 occupation, Turn 2A other protest, Turn 2B occupation, Turn 3A Government disposition, Turn 6 relabelling, and Turn 12 conversion. A particular route currently encounters four of these; this is not six mandatory random events per play. Reactions use public buffer, history and political resilience. The Turn 3A draw has no visible explanation of Government motives.

Starting conditions and Widen effects use the supplied values. Remaining scene effects are prototype values. Added competition pressure reduces relevance by 3 per main decision from Turn 4 and 5 from Turn 9, mitigated by 1 for evidence, chapters or leverage and by 3 for strong organisation. Political space remains large and increasingly crowded. This fills a missing dynamic: retaining the opening's initial relevance indefinitely made SURVIVED unreachable.

Mobilisation fatigue follows the supplied 3/7/12/18 schedule, partially mitigated by organisation. Recorded calls also consume some mobilisation. Alliance scars and personalised reliance persist. Government access used opaquely costs perceived independence.

## Diagnosis

Sequential tests: absorption, thrive, relevance, survival. Absorption uses the supplied pressure formula plus the explicit individual-conversion modifier and requires a conversion trigger. Its text distinguishes leader recruitment from loss of the coalition's independent centre. THRIVED requires three durable capabilities, independent crisis delivery and viable electoral strategy. The causal list ranks relevant history tags and direct effects rather than random-event magnitude.

## Verification and limits

`node tests/moment-v2.cjs` checks 300 complete routes, seeded replay, gates and fallbacks, ending fixtures, browser clicks, restart and desktop/mobile presentation. `node tests/moment-v2-balance.cjs` samples 15,000 complete routes without rendering. The sampled results are recorded in `output/moment/v2-balance.json`: 11,934 RELEVANT; 2,306 SURVIVED; 758 ABSORBED; 2 THRIVED. These are random-strategy coverage counts, not estimated player outcome probabilities. THRIVED is reachable but very rare; human playtesting should tune institutional investment, financial pressure and thresholds. Historical v4 tests describe a superseded architecture.

## Ending destinations revision (supersedes the earlier diagnosis section)

The latest canonical request is preserved in `moment-ending-destinations-v2.md`. The executable ending rules now live in `src/moment/endings-v2.js`, loaded after the state machine. Destinations are **Shapes / Amplifies / Exists / Transfers**, rather than an aggregate success ladder.

Absorption is tested first: explicit formal entry into an established party, or leader centricity at least 60 together with recorded migration/individual political choices and actual independence below 45. Absorption pressure still modifies the world's electoral reaction; it no longer decides the ending by itself. The receiver is described as an established mainstream party or a newer reform party, based on the recorded electoral reaction. Individual departures with retained autonomy do not automatically absorb the whole movement.

THRIVED uses the supplied pressure, narrative and change thresholds, independence at least 50, two built capabilities and a recorded delivery. Separate history flags record post-victory issue-shaping, independent outcomes, and which capability delivered. The Turn 10 evidence/chapter reports explicitly distinguish institutional commitments or repairs from visibility alone. A qualifying legal settlement or successful crisis intervention also supplies delivery evidence.

RELEVANT requires continuing campaign identity, relevance at least 55, legitimacy at least 40, insufficient organisation or leverage, and fewer than two strong capabilities. Strong capability thresholds are provisional: legal organisation+accountability at least 100; evidence organisation 45 and agenda 55; chapters organisation 50 and accountability 45; coalition alliance 65 and perceived independence 45; transparent access leverage 50.

The supplied numeric lists do not exhaust every possible state. Following its four-destination decision tree, residual independent institutions that fail both THRIVED and the specific media trajectory receive SURVIVED. Their diagnosis explicitly acknowledges continuing political weight instead of falsely claiming that all influence has disappeared. Low-breadth, organisational and campaign survival have distinct secondary forms.

Coverage for this revision is in `output/moment/v2-destinations-balance.json`: 15,000 varied-strategy routes reached all four destinations (7,145 RELEVANT, 6,221 SURVIVED, 1,633 ABSORBED, 1 THRIVED). This measures test coverage, not probabilities for human players; THRIVED remains unusually demanding. No thresholds were relaxed solely to equalise ending frequencies.

## Political world revision

The supplied four-layer design is preserved in `moment-political-world-v2.md` and implemented in `political-world-v2.js` after the ending module. Internal assets remain separate from public position (popularity, opinion on the controversy, attention, sentiment, legitimacy, breadth and perceived independence); world conditions (space, issue salience, opposition competition, threat, repression, electoral pressure); and ownership/conversion (movement ownership, party dependence, leader centricity, actual independence and derived absorption pressure).

New starting values are provisional: popularity 78, opinion 75, attention 90, sentiment 72, salience 85, competition 20, threat 75, repression 65, electoral pressure 5, ownership 85, party dependence 0. Existing variables retain their prior starts. All are hidden. State names `ownership` and `partyDependence` map to the new ownership concepts; financial/general dependency remains separate.

Specific choices and contextual reactions move these independently. Hostile coverage can increase attention while opinion/sentiment fall; outside victories can increase salience and competition while ownership falls. Turn 10 explicitly raises issue salience and competition; a substantiated comparative advantage helps retain ownership, while an unsupported claim loses it. Party-delivered protection increases dependence and shifts ownership. Public buffer now includes opinion and sentiment; repression changes how that buffer operates during occupation. Electoral pressure and valuable public reach increase recruitment pressure.

The former fixed relevance penalty is removed. An external electoral schedule and accumulating competition now affect ownership and coverage; relevance moves gradually toward a combination of ownership, attention, issue salience and institutional capacity. Space remains open even when movement relevance falls. News dispatches describe hostile attention, quiet agreement and issue adoption without movement ownership. Rendering never draws new reactions.

THRIVED additionally requires ownership at least 55. RELEVANT requires attention at least 55 alongside the earlier media conditions. Absorption requires explicit formal entry or recorded migration, independence below 45 and ownership below 45, with concentrated leadership or substantial party dependence. SURVIVED can explicitly describe successful issues inherited by other actors. These thresholds are prototype defaults, not empirical claims.

Latest varied-strategy coverage: 15,000 routes; RELEVANT 9,514, SURVIVED 4,297, ABSORBED 1,187, THRIVED 2, recorded in `output/moment/v2-world-balance.json`. All four destinations remain reachable, but human balance testing is still needed.

## Consolidated canonical documents

`design/twelve-turns-playable-text.md` and `design/state-machine-spec.md` now hold the supplied consolidated documents verbatim. They supersede the earlier raw branching/state-machine drafts; the subsequently approved political-world layer remains an extension. The opening-space curve in code is `[85,89,90,90,92,92,94,94,96,97,98,100]`; opposition competition is a separate rising variable, so crowding does not simply close the space. Widen adds four points immediately before the later world schedule resumes.

Reconciliation changes: membership's later +8 organisation arrives at Turn 8, rather than on completing the initial roll; midnight produces a founding scar without additional score deltas; the Turn 3A legal tracker grants legal capacity, not the distinct Turn 5 schools evidence register; the MLA's +4 leverage expires on entering Turn 12; campaign-by-campaign responses do not silently count as political-programme expansion; loose structure cannot access formal cross-party bargaining. Permission for individual political choices is insufficient for absorption without a recorded migration. Absorption text now names both receiving formation and capture mechanism, including strength-attracts-recruitment when warranted.

Scars in `state.scars` are relationship events used to maintain explicit rupture state, while `state.tags` and history-entry tags are diagnosis-only. This resolves the documents' simultaneous request for alliance memory to affect gates and for diagnostic tags not to do so. Regression checks that diagnostic tags cannot change option availability.

The public-opinion/media/ownership extension keeps its previously approved modifications to externality weights and ownership-sensitive endings. The consolidated document's ten-variable model is treated as the core rather than a request to remove that extension. Starting public-world values, quality cutoffs and the residual SURVIVED case remain documented prototype assumptions.

Latest 15,000-route coverage: 9,930 RELEVANT, 4,446 SURVIVED, 620 ABSORBED, 4 THRIVED. End-of-run capability reach includes 4,377 political agendas, 1,634 sustainable mobilisation capabilities and 265 representative mandates. Thus none of the three highlighted derived capabilities is mathematically unreachable. These are varied random-strategy samples, not forecasts of player outcomes.

The consolidated leader-centric migration test requires Leader Centricity at least 60; high party dependence raises reaction risk but no longer bypasses that threshold.
