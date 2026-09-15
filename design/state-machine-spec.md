# What Happens to a Moment: State Machine Specification (v2)

Companion to `twelve-turns-playable-text.md`. This is the mechanical layer underneath it: what changes when, what's hidden, and how the four endings actually get decided. Nothing here is shown to the player as a number. The scores exist so the political history the player creates has memory, and so the ending can be argued for rather than announced.

All starting values and deltas below are first-pass, tunable by playtesting, not fixed.

---

## 1. Core Model

Every decision can affect three different layers:

| Layer | What it represents | Example |
|---|---|---|
| **Variables** | Accumulating political condition, 0–100, always hidden | Moral Legitimacy = 68 |
| **Flags** | Something the movement has actually built or done, boolean | `BUILT_LEGAL_INFRASTRUCTURE = TRUE` |
| **History tags** | Causal memory with no direct gameplay effect, used only for later text and the end diagnosis | `DEMOBILISED_AFTER_VICTORY` |

The basic loop:

```
Decision → Certain consequence → Variables/flags change
        → Externality check, if this turn carries one
        → History tag stored
        → Later capability/credibility check reads all three layers
```

**Design notation:**

| Notation | Numerical effect |
|---|---|
| ↑↑ | +15 |
| ↑ | +8 |
| slight ↑ | +4 |
| slight ↓ | −4 |
| ↓ | −8 |
| ↓↓ | −15 |

---

## 2. Core Variables

Ten principal variables:

| Variable | Meaning | High score | Low score |
|---|---|---|---|
| `MOBILISATION` | Ability to put people into action | Threats are credible | Threats are bluffable |
| `ORGANISATION` | Ability to coordinate people, money, staff, chapters, work | Decisions become executable | Attention exceeds capacity |
| `MORAL_LEGITIMACY` | Public permission to act | Benefit of the doubt, broader participation | Seen as unreasonable, toxic, self-serving |
| `RELEVANCE` | Whether political actors and constituencies still care | Part of the political conversation | Politics moves without you |
| `AGENDA_COHERENCE` | Whether people can explain what you stand for | New issues incorporate coherently | Reactive |
| `ACTUAL_INDEPENDENCE` | Real autonomy over decisions, money, leadership | Nobody else effectively controls you | Strategic dependency |
| `PERCEIVED_INDEPENDENCE` | Whether outsiders believe that autonomy exists | Cross-partisan credibility | Seen as someone's proxy |
| `ALLIANCE_STRENGTH` | Depth of reciprocal relationships with organisations around you | Others mobilise resources for you | Relationships are episodic |
| `INSTITUTIONAL_LEVERAGE` | Ability to get institutions to act without mass mobilisation | Access, legal pressure, evidence, negotiation work | Street pressure is your only instrument |
| `ACCOUNTABILITY` | Ability to govern yourself, honour internal process | Structures survive disagreement | Leadership disputes become existential |

Three additional hidden variables:

| Variable | Purpose |
|---|---|
| `BREADTH` | How low or high the social cost of joining the movement has become |
| `LEADER_CENTRICITY` | How much political capital sits in identifiable leaders rather than the institution |
| `POLITICAL_SPACE` | The external environment: how open, crowded and politically contested the youth space is |

`POLITICAL_SPACE` is not controlled by the player. It initially explodes upward after the resignation, then becomes increasingly crowded rather than simply declining. This distinction matters mechanically: **the political space can remain enormous while the player's relevance within it falls.** [Open item, flagged at the end of this document: the exact turn-by-turn shape of this curve still needs to be specified numerically.]

---

## 3. Starting State

Immediately before Turn 1:

| Variable | Start |
|---|---|
| Mobilisation | 75 |
| Organisation | 30 |
| Moral Legitimacy | 72 |
| Relevance | 80 |
| Agenda Coherence | 55 |
| Actual Independence | 75 |
| Perceived Independence | 72 |
| Alliance Strength | 55 |
| Institutional Leverage | 20 |
| Accountability | 30 |
| Breadth | 75 |
| Leader Centricity | 45 |
| Political Space | 85 |

This is the opening condition: enormous political capital, relatively little institutional capacity. That imbalance is the game's starting problem.

---

## 4. Turn 1 State Changes

**1A. Bring the tents down**

| Variable | Effect |
|---|---|
| Moral Legitimacy | +15 |
| Perceived Independence | +8 |
| Mobilisation | −15 |
| Alliance Strength | −4 |
| Institutional Leverage | 0 |
| Organisation | 0 |

Flags: `DEMOBILISED`, `GOVT_ASSURANCE_DEPENDENCY`, `ORIGINAL_MASS_DISPERSED`.
History tag: `VICTORY_CONVERTED_TO_MORAL_CAPITAL`.

The player has not lost. They have converted one kind of power into another.

**1B. Stay for the settlement**

| Variable | Effect |
|---|---|
| Mobilisation | +8 |
| Moral Legitimacy | 0 initially |
| Alliance Strength | +4 |
| Relevance | +4 |
| Political Space | stays high |

Flags: `HELD_GROUND`, `SETTLEMENT_UNRESOLVED`. Immediately triggers Externality 3 (the occupation narrative draw).

**1C. Widen**

Base effect, before the Widen Chain modifies it further:

| Variable | Effect |
|---|---|
| Mobilisation | +15 |
| Relevance | +8 |
| Moral Legitimacy | −4 initially |
| Political Space | +4 |
| Agenda burden | increases |

Flag: `WIDENED`.

---

## 5. Widen Chain State Machine

**Charter choice**

| Charter | Agenda | Breadth | Legitimacy | Relabelling vulnerability |
|---|---|---|---|---|
| Education reform | +15 | 0 | +8 | low |
| Student rights | +8 | +4 | 0 | medium |
| Young people's lives | +4 initially | +15 | −4 | medium-high |
| Democratic accountability | +8 | +8 | −8 | high |

"Young people's lives" is the case where Breadth rises before Agenda Coherence does: the movement acquires a constituency faster than a politics.

**Who builds it**

| Choice | Organisation | Alliance | Actual Ind. | Perceived Ind. | Leader Centricity |
|---|---|---|---|---|---|
| Expand CJP | +8 | −4 | +8 | +4 | +8 |
| Existing alliance | +8 | +15 | −4 | −8 | −4 |
| Open coalition | +4 | +8 | 0 | −4 | −4 |
| Protest constitutes movement | +4 | +8 | +4 | +8 | −8 |

Flags: `CJP_EXPANSION`, `STANDING_ALLIANCE`, `OPEN_COALITION`, `PROTEST_ASSEMBLY`.

**Organisational structure**

| Structure | Organisation | Accountability | Mobilisation | Alliance | Leader Centricity |
|---|---|---|---|---|---|
| Central leadership | +12 | −4 | +4 | 0 | +15 |
| Federation | +10 | +4 | +8 | +4 | −4 |
| Membership organisation | +6 now, +8 later at Turn 8 | +15 | −4 initially | +4 | −10 |
| Alliance council | +12 | +8 | 0 | +15 | −8 |
| Loose movement | −4 | −12 | +12 | 0 | +4 |

Flag: `GOVERNANCE_MODEL = CENTRAL / FEDERAL / MEMBERSHIP / ALLIANCE_COUNCIL / LOOSE`.

**Live Test (11:40 PM):** a structure-specific scar, stored as a history tag, not a further major numerical swing: `FOUNDING_DECISION_OVERRULED_ALLIES` (central), `FIRST_DECISION_FRAGMENTED` (federal), `MEMBERSHIP_PROCESS_BYPASSED` (membership), `ALLIANCE_MEMBER_EXITED` (alliance council), `DUELLING_PRESS_CONFERENCES` (loose). These return at Turn 8.

---

## 6. Capabilities Are Not Scores

A high Organisation score does not automatically mean the movement has lawyers. Capabilities require actual decisions.

| Capability | How it gets created |
|---|---|
| `LEGAL_INFRASTRUCTURE` | Turn 3A legal tracker/team, or equivalent investment |
| `EVIDENCE_CAPACITY` | Turn 5 evidence route |
| `LOCAL_CHAPTERS` | Turn 5 local organising, or federation route strengthened later |
| `GOVERNMENT_ACCESS` | Direct negotiation / institutional pressure / Turn 9 |
| `TRANSPARENT_ACCESS` | Turn 9C |
| `COALITION_CAPACITY` | Standing alliance plus subsequent maintenance |
| `MEMBERSHIP_GOVERNANCE` | Membership route survives until Turn 8 |
| `MOBILISATION_MACHINE` | Mobilisation ≥60 and Organisation ≥45 |
| `POLITICAL_AGENDA` | Agenda Coherence ≥60 plus Turn 7 political expansion |
| `REPRESENTATIVE_MANDATE` | Membership/federal/assembly structure with Accountability ≥55 |

This is what lets Turn 11 say "you don't have lawyers" rather than "your organisation score isn't high enough to choose lawyers."

---

## 7. Capability Quality

Having a capability and having a *good* capability are different checks.

**Legal effectiveness** = Organisation + Accountability + Institutional Leverage.

| Combined quality | Result |
|---|---|
| High | Lawyers act immediately, documentation is sound |
| Medium | Works, but slowly / unevenly |
| Low | Technically built, struggles during the actual crisis |

**Chapter quality** depends on Organisation + Accountability + Agenda Coherence. Low-quality chapters produce exactly the regional-leader problem that surfaces at Turn 8. This makes earlier investment matter without hard-coding every outcome.

---

## 8. Externality Engine

Never pure 50/50. Each externality starts with three possible outcomes, positive / mixed / negative, base odds roughly 30/40/30, then earlier state modifies them.

**Public Buffer** = 0.5(Moral Legitimacy) + 0.3(Perceived Independence) + 0.2(Breadth). A strong public buffer means more benefit of the doubt.

**Political Resilience** = 0.4(Organisation) + 0.3(Accountability) + 0.3(Actual Independence). Governs whether an adverse event becomes a crisis.

So every externality resolves in two stages: how does the world interpret it, then can the organisation absorb what happened.

---

## 9. The Six Major Externality Checks

**Externality 1 — Turn 1, staying/widening.** Event: police restrictions continue while the movement remains.
*Positive:* images of blocked food dominate coverage, Government looks punitive → `Moral Legitimacy +8, Mobilisation +4`.
*Mixed:* core support intensifies, families and less-political students grow cautious → `Mobilisation +8, Breadth −8`.
*Negative:* "they already won" becomes the dominant framing → `Moral Legitimacy −12, Breadth −8`.
Positive odds rise with few concrete demands, alliance discipline, a clear settlement ask. Negative odds rise with rapid demand multiplication, leadership conflict, low perceived independence.

**Externality 2 — Turn 2A, what happens to another protest.** The player doesn't choose whether another protest succeeds; their strategy changes whether they gain or lose from it either way. The draw concerns the protest's trajectory (credits them / succeeds without them / fails / turns violent / gets captured by someone else), not whether the player's strategy "worked." Changes Relevance, Moral Legitimacy and Alliance depending on whether the player was amplifier, service network, education-focused, or coalition builder.

**Externality 3 — Turn 2B, occupation narrative.** The major moral-high-ground draw. Inputs: Moral Legitimacy, Breadth, Perceived Independence, Agenda Coherence, whether the player widened with actual structure, whether allied groups remain. Results: "crackdown" narrative / "complicated standoff" narrative / "they won't leave" narrative. Large effect by design, the player is risking the legitimacy of the original victory.

**Externality 4 — Turn 3A, why Government relents.** Hidden. Government always relents for narrative purposes; what changes is the hidden disposition generated underneath, and these are not mutually exclusive: `GOVT_SEES_THREAT`, `GOVT_SEES_NEGOTIABLE_ACTOR`, `GOVT_SEES_USEFUL_INDEPENDENT_ACTOR`.

| Prior behaviour | More likely interpretation |
|---|---|
| Strong mobilisation threat | Threat |
| Legal/institutional route | Negotiable actor |
| High independence, weak Opposition alignment | Useful independent actor |
| Strong Opposition-contact dependency | Opposition-adjacent threat |

The player is never told the answer. This disposition modifies Turn 9 invitations and Turn 12 behaviour.

**Externality 5 — Turn 6, hostile relabelling.** Depends heavily on accumulated legitimacy. *Fails to stick:* Moral Legitimacy absorbs it. *Polarises:* core mobilisation rises, breadth falls. *Sticks:* parents, moderate supporters and unaffiliated students withdraw. The player's response then interacts with the draw: reclaiming a label that failed to stick can make it more salient; rejecting one that already stuck may stabilise moderate support; service delivery works much better if `EVIDENCE_CAPACITY` or `LOCAL_CHAPTERS` actually exists.

**Externality 6 — Turn 12, electoral conversion.** Not "did your candidate win" randomness. Determines how the political ecosystem reacts to the player's electoral strategy. Inputs: Actual Independence, Perceived Independence, Organisation, Moral Legitimacy, Leader Centricity, Alliance Strength, Agenda Coherence, Relevance, and the critical danger variable, Absorption Pressure (§17).

---

## 10. Mobilisation Fatigue

Track `MOBILISATION_USES`. Major national mobilisation adds +1; the first use is the original breakthrough.

| Repeated call | Effectiveness penalty |
|---|---|
| 2nd major call | −3 |
| 3rd | −7 |
| 4th | −12 |
| 5th+ | −18 |

Organisation mitigates this: a well-built movement with chapters, organisers, communication structures and local ownership can repeatedly mobilise. A movement relying on spectacle simply exhausts the moment. This connects Turns 3A, 4A and 11 strategically.

---

## 11. Alliance Memory

`ALLIANCE_STRENGTH` carries both a number and a state: `ALLIANCE_STATE = DEMOBILISED / INFORMAL / PROGRAMMATIC / INSTITUTIONALISED`.

Relationships accumulate scars (history tags): `ALLY_OVERRULED`, `ALLY_EXCLUDED_FROM_GOVT_MEETING`, `ALLY_DEFENDED`, `ALLY_USED_FOR_CONTACTS`, `ALLY_SHARED_CREDIT`, `ALLY_ABANDONED`. Alliance Strength 70 with three unresolved betrayals is not the same as a clean 70.

`COALITION_CAPACITY available IF Alliance ≥ 55 AND no severe unresolved rupture`. Turn 9D and Turn 11 check both the number and the scar record.

---

## 12. Independence as Two Scores

`ACTUAL_INDEPENDENCE = 82` with `PERCEIVED_INDEPENDENCE = 35` (constant visible proximity to Opposition actors) is a different political problem from `ACTUAL_INDEPENDENCE = 40` with `PERCEIVED_INDEPENDENCE = 75` (dependencies that remain invisible).

Government and Opposition attacks primarily move Perceived Independence. Funding, candidate deals, reliance on party networks and leadership capture move Actual Independence. This distinction becomes decisive at Turn 12.

---

## 13. Turn 8 Governance Test

Turn 8 does not create governance. It audits what already exists. The structure determines the mechanism; the scores determine whether the mechanism survives.

**Central leadership:** Organisation ≥55 → leadership settles the dispute quickly. Organisation <55 → rival senior figures issue conflicting instructions.

**Federation:** Accountability ≥55 → chapters use the established procedure, national leadership accepts the outcome. Accountability <55 → chapters invoke autonomy selectively, the dispute fragments.

**Membership:** governance matured → members decide cleanly. Membership chosen but never invested in → low turnout, disputed rolls, the defeated faction contests legitimacy.

**Loose movement:** no legitimate mechanism exists. No score check can fix that. That is the cost of the earlier choice.

---

## 14. Turn 9 Gates

A, B, C always available. D requires `COALITION_CAPACITY = TRUE`.

Turn 9C creates `TRANSPARENT_ACCESS = TRUE` **and** `FORMALISED_GOVT_RELATIONSHIP = TRUE`. The second flag is the cost: future meetings become formal, minuted, less candid. The player gains accountability while losing informal access.

---

## 15. Turn 10 Credibility Engine

Nothing is locked. The player claims a comparative advantage; the machine tests the claim.

- **Mobilisation:** credible if `Mobilisation ≥60 AND Mobilisation effectiveness ≥50`.
- **Evidence/agenda:** credible if `EVIDENCE_CAPACITY` and `Agenda Coherence ≥55`; stronger with `TRANSPARENT_ACCESS`.
- **Local organisation:** credible if `LOCAL_CHAPTERS` and `Organisation ≥50`.
- **Political representation:** credible if `Institutional Leverage ≥55` and either `REPRESENTATIVE_MANDATE` or strong `COALITION_CAPACITY`.

An unsupported claim produces a direct outcome: *"You say this is your strength. Your own record says otherwise."* It also reduces Accountability slightly, since leadership has misdiagnosed its own institution.

---

## 16. Turn 11 Capability Engine

Hard gates, unlike Turn 10.

- **Lawyers:** available if `LEGAL_INFRASTRUCTURE`. Quality = Organisation + Accountability.
- **Coalition pressure:** available if `COALITION_CAPACITY`. Quality = Alliance Strength and Perceived Independence.
- **Government access:** available if `GOVERNMENT_ACCESS`. Quality = Institutional Leverage. Costs Perceived Independence if the relationship is opaque.
- **Street:** always available. Success depends on current Mobilisation minus fatigue.
- **Opposition MLA:** always available. Immediate result: fastest release. Effects: `Institutional Leverage +4 temporarily, Actual Independence −8, Perceived Independence −8, Leader Centricity +4 if the relationship is personalised`. Flag: `OUTCOME_DELIVERED_BY_ESTABLISHED_POLITICS = TRUE`, decisive at Turn 12.

---

## 17. Leader Centricity

Starts at 45.

| Rises through | Effect |
|---|---|
| Central leadership | +15 |
| Named leader handles repeated negotiation | +8 |
| Media consistently personalised | +4 |
| Leadership bypasses process | +4 |
| Electoral ticket offered/accepted | +15 |

| Falls through | Effect |
|---|---|
| Membership governance | −10 |
| Strong chapters | −6 |
| Collective alliance representation | −6 |
| Rotating spokespersons | −4 |
| Institutional capability independent of founders | −8 |

This is the absorption mechanism that doesn't require destroying a leader-centric movement. You recruit the leaders.

---

## 18. Absorption Pressure

Hidden composite, calculated entering Turn 12.

```
ABSORPTION_PRESSURE =
    0.25 * LeaderCentricity
  + 0.20 * (100 - ActualIndependence)
  + 0.15 * (100 - Accountability)
  + 0.15 * max(0, Relevance - Organisation)
  + 0.15 * EstablishedPoliticsDependency
  + 0.10 * AllianceDependency
```
Clamped 0–100. Rises with high Leader Centricity, low Actual Independence, heavy alliance dependence, repeated reliance on established politicians, weak Accountability, weak Organisation relative to Relevance. Falls with membership governance, strong institution, distributed leadership, clear agenda, independent institutional capabilities.

Central argument this variable exists to capture: **being politically valuable can make absorption more likely, not less.**

---

## 19. Turn 12 Gates

**A. Independent candidates:** Organisation ≥65, Mobilisation ≥55, Agenda Coherence ≥60, Actual Independence ≥60, a functioning governance structure, preferably `REPRESENTATIVE_MANDATE`. If barely qualified, allow it and make the electoral externality harsh.

**B. Negotiate with all political formations:** `EVIDENCE_CAPACITY`, Institutional Leverage ≥50, Actual Independence ≥55. Strong version requires `TRANSPARENT_ACCESS`.

**C. Issue campaigning, no endorsements:** Relevance ≥45, Moral Legitimacy ≥50. Deliberately the most accessible durable route, politically meaningful without pretending to be a party.

**D. Let individuals decide:** always available. Effects: `Leader Centricity +8, Actual Independence −8, Absorption Pressure +15`. Not automatic absorption, but usually pushes strongly toward it.

---

## 20. Ending Engine (destinations, not a ladder)

The four endings are not a quality ranking from bad to good. They are four different destinations for the political capital the original moment created. The governing question: **one year later, where does the political power created by the movement now live?**

Each ending has a verb:

| Ending | Verb | What it means |
|---|---|---|
| THRIVED | **Shapes.** | Pressures, sets narratives, produces change. |
| RELEVANT | **Amplifies.** | Campaigns, communicates, occasionally sets the conversation, but others increasingly organise and deliver. |
| SURVIVED | **Exists.** | Retains a diminished organisation or community; the political space has moved elsewhere. |
| ABSORBED | **Transfers.** | Converts its political capital into the machinery of established electoral politics. |

Two-axis summary:

| | High ability to shape politics | Low ability to shape politics |
|---|---|---|
| Independent institutional power | THRIVED | SURVIVED |
| Media/campaign power without institutional power | RELEVANT | (eventually) SURVIVED |
| Political capital transferred into party politics | ABSORBED | ABSORBED |

### 20.1 Test order

```
TURN 12
   │
   ▼
DID POLITICAL CAPITAL MIGRATE INTO AN ESTABLISHED PARTY?
   │
  YES ──────────────────────────────────► ABSORBED
   │
   NO
   ▼
CAN THE MOVEMENT CREATE PRESSURE + SET THE NARRATIVE + PRODUCE CHANGE?
   │
  YES ──────────────────────────────────► THRIVED
   │
   NO
   ▼
DOES IT STILL HAVE ENOUGH MEDIA/CAMPAIGN POWER TO SHAPE THE CONVERSATION?
   │
  YES ──────────────────────────────────► RELEVANT
   │
   NO
   ▼
DOES THE MOVEMENT STILL EXIST?
   │
  YES ──────────────────────────────────► SURVIVED
```

ABSORBED is tested first because it's about where the capital went, not how strong the movement was. This is also why ABSORBED can trigger from a position of apparent strength: high Relevance, high Mobilisation and a charismatic leadership make a movement *more* attractive to absorb, not less.

### 20.2 ABSORBED

```
Leader Centricity >= 60
AND (significant leaders accept party roles/tickets, OR Turn12D resolves to individual migration)
AND (Actual Independence < 45 OR the movement formally aligns with/enters an established formation)
```

Likelihood rises further with `OUTCOME_DELIVERED_BY_ESTABLISHED_POLITICS` (repeated), high alliance dependence, weak governance, individual leaders stronger than chapters, a broad political agenda with no electoral machinery of its own.

Not synonymous with failure. Two independent dimensions to the diagnosis, name both:

**Which formation absorbed it:**

*Established-party absorption* (an incumbent party becomes the vehicle):
> "The movement entered the political mainstream. The leaders, issues and constituency you helped create now have a route into electoral politics. But that route belongs to an established party. Your organisers campaign beside its workers, your demands appear in its programme and some of your most recognisable leaders now speak from its platforms. The political capital survived. The independent movement did not."

*Insurgent-vehicle absorption* (a newer formation positions itself as the movement's natural successor and draws its people and language into its own machinery, same closing line, different opening).

**What mechanism let it happen** (from §17, Leader Centricity):

*Leader capture:* "You built recognisable leaders faster than you built an institution capable of holding them."

*Boundary blur:* "You built a powerful alliance but never established where the movement ended and its political partners began. By the time elections arrived, the constituency remained, the issues remained and many of the organisers remained. The independent centre did not."

*Strength-attracts-absorption:* "You did not disappear because you became irrelevant. You became valuable enough to recruit from."

### 20.3 THRIVED

Does not mean becoming a political party. Means the movement has become capable of creating sustained political pressure, setting the narrative, and producing meaningful change. All three pillars required:

**Pressure:** `(Mobilisation >= 55 OR strong Coalition Capacity) AND Organisation >= 55 AND has forced at least one outcome after the original protest without relying entirely on an established party.`

**Narrative:** `Relevance >= 60 AND Agenda Coherence >= 55 AND has set or substantially shaped at least one issue after the original victory.`

**Change:** `at least two of {Legal Infrastructure, Evidence Capacity, Local Chapters, Coalition Capacity, Transparent Government Access} AND Institutional Leverage >= 50 AND at least one of those capabilities has actually delivered an outcome.`

Plus always: `Actual Independence >= 50`, and not caught by the ABSORBED test.

> "You turned a moment into political power. The movement can still create pressure, but pressure is no longer the only thing it can do. It can put issues into the political conversation, organise people around them and make institutions respond. Other political actors have entered the space you opened, but they have not made you unnecessary."

### 20.4 RELEVANT

The campaign/media trajectory. More specific than a residual middle category:

```
Relevance >= 55
AND Moral Legitimacy >= 40
AND social/campaign identity remains active
AND (Organisation < 55 OR Institutional Leverage < 45)
AND fewer than two strong durable capabilities
AND fails THRIVED
AND not ABSORBED
```

Likely pathways: the amplifier route, stories at the schools campaign, campaign-by-campaign agenda, a loose structure, issue campaigning at Turn 12, high reach with weak chapters or legal or institutional machinery.

> "You kept the account. You lost the movement. You can still make something trend. A campaign can still put an issue into the news, embarrass an institution or bring thousands of people into a conversation. But increasingly, that is where your power ends. Others organise the protests, provide the lawyers, negotiate with Government and convert the anger into political action. You remain a political media force. You did not become a durable political force."

RELEVANT can remain highly visible. It is not the same thing as SURVIVED.

### 20.5 SURVIVED

Default when nothing else fires:

```
not ABSORBED
fails THRIVED
Relevance < 55
Mobilisation < 50
Institutional Leverage < 45
no demonstrated capacity to set the national agenda
some organisational/social existence remains
```

Strongest single signal: relevance declining faster than organisation is disappearing, e.g. Organisation 50, Relevance 30. This is the giving-up-the-space ending, not "social-media CJP", that's RELEVANT. SURVIVED is what happens once even RELEVANT's agenda-setting capacity begins to fade.

> "The movement is still here. The moment isn't. You still have followers, organisers and occasional campaigns. But the political space you opened is now occupied by people with stronger organisations, clearer constituencies and greater access to power. Increasingly, they set the questions and you respond to them. You did not disappear. You became smaller than the political moment you created."

Three flavours, all should be writable: **organisational survival** (office-bearers and chapters exist, political relevance has faded), **campaign survival** (occasional actions still happen, don't shape the wider agenda), **core survival** (the committed base remains, Breadth collapsed).

### 20.6 What Moral Legitimacy is, and isn't, in this model

Legitimacy is not a fifth destination-axis. It isn't a load-bearing THRIVED condition, for instance. Its job is to set the terms under which the other four axes get interpreted: it's the Public Buffer input to the externality engine (§8), and a gating condition for RELEVANT specifically, since a movement can amplify without being trusted, but not for long. Worth keeping this distinction explicit rather than letting Legitimacy quietly become a fifth thing every decision needs to serve.

---

## 21. Ending Diagnosis System

Every significant choice adds one or more causal history tags: `PRESERVED_MORAL_HIGH_GROUND`, `DEMOBILISED_TOO_EARLY`, `BUILT_ENFORCEMENT_CAPACITY`, `RELIED_ON_REPEATED_MOBILISATION`, `BUILT_DISTRIBUTED_LEADERSHIP`, `PERSONALISED_MOVEMENT`, `FAILED_TO_DEFINE_AGENDA`, `EXPANDED_WITHOUT_GOVERNANCE`, `TRADED_OWNERSHIP_FOR_ALLIANCE_CAPACITY`, `BUILT_LOCAL_ROOTS`, `BECAME_GOVERNMENT_INTERLOCUTOR`, `LOST_PERCEIVED_INDEPENDENCE`, `ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS`, `BUILT_CAPACITY_BETWEEN_CRISES`.

At the end, select the three or four tags that most directly caused the ending. Not:

> RELEVANT. You scored highly on relevance.

But:

> **RELEVANT.** You no longer own the space, but politics still has to account for you.
>
> You protected the legitimacy of the original victory and later built a credible evidence operation around schools. But you chose amplification over local organisation, and when your own members needed institutional protection you still depended on established politicians to deliver it. Your agenda survived. Your ability to make others act survived. A political institution capable of acting by itself never quite did.

Or:

> **SURVIVED.** The movement remains, but much of the political capital it created has gone elsewhere.
>
> You kept the occupation alive and built enormous mobilisation, but never gave the wider movement a durable decision-making structure. The hostile political label narrowed participation, and repeated mobilisation became more expensive each time. By the election, you could still produce a crowd, but other organisations could provide lawyers, negotiate with institutions and convert youth anger into political action faster than you could.

Or:

> **THRIVED.** You turned the opening into durable independent political power.
>
> You widened early, but gave the widening a structure. You traded some control for an alliance capable of surviving disagreement, built legal and local capacity between protests, and entered Government consultations without allowing access to become dependence. By the election, parties could borrow your demands, but they still had to negotiate with the institution behind them.

That, rather than the numbers, is the payoff.

---

## 22. The State Machine, One View

```
                         POLITICAL MOMENT
                               │
                               ▼
                       TURN 1 BREAKTHROUGH
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
       DEMOBILISE           HOLD             WIDEN
             │                 │                 │
       moral capital ↑    mobilisation      organisation
       crowd ↓           retained           minigame
             │                 │                 │
             │                 └────────┬────────┘
             ▼                          ▼
      SPREADING PROTESTS          OCCUPATION TEST
             │                          │
      enforcement gap           governance / alliance
             │                          │
             └──────────────┬───────────┘
                            ▼
                      RECONVERGENCE
                            │
                     SCHOOLS CAMPAIGN
                     build a capability?
                            │
                            ▼
                   HOSTILE RELABELLING
                legitimacy / breadth test
                            │
                            ▼
                       ISSUE EXPANSION
                    agenda coherence test
                            │
                            ▼
                       GOVERNANCE TEST
                  did your structure work?
                            │
                            ▼
                      GOVERNMENT ACCESS
               independence / alliance test
                            │
                            ▼
                  ESTABLISHED POLITICS LEARNS
                  identity vs. capability test
                            │
                            ▼
                     MEMBER IN CRISIS
                    hard capability test
                            │
                            ▼
                         ELECTIONS
                    conversion / absorption
                            │
          ┌── capital migrated to a party? ──► ABSORBED (tested first)
          │
          ▼
    pressure+narrative+change?
          │
    ┌─────┴─────┐
    ▼           ▼
 THRIVED    still shapes the conversation?
                │
          ┌─────┴─────┐
          ▼           ▼
       RELEVANT    SURVIVED
```

**The proposition underneath all of it:** the game rewards neither moderation nor radicalism by itself. It rewards converting political moments into capabilities while retaining enough legitimacy, independence and coherence to use those capabilities later. That keeps the simulation from secretly having a correct politics. It has a theory of institution-building, political capital and conversion.

---

## Open items for implementation

- `POLITICAL_SPACE`'s curve (explodes, then crowds rather than simply declining) is specified qualitatively in §2 but not yet as a turn-by-turn function or formula. Needs one before this is codeable.
- History tags and flags are a genuinely separate system per §1, tags carry no gameplay weight, only diagnosis weight. Worth double-checking during implementation that no tag has quietly been used to gate a choice, which would collapse the distinction.
- A few capability thresholds (§6, `MOBILISATION_MACHINE`, `POLITICAL_AGENDA`, `REPRESENTATIVE_MANDATE`) are defined here for the first time and don't yet appear anywhere in the turn-by-turn deltas; whoever implements this should trace each back to confirm the referenced variables actually reach these thresholds under realistic play, rather than defining a capability that's mathematically unreachable.
- All starting values, deltas and thresholds throughout are first-pass and explicitly meant to be tuned by playtesting, not treated as final.