Below is the state machine I would put underneath the design document. The aim is not to turn the game into a visible points system. The player should never see these numbers. They exist so that the political history they create has memory.

1. Core model

Every decision can affect three different layers:

Layer	What it represents	Example
Variables	Accumulating political condition	Moral Legitimacy = 68
Flags	Something the movement has actually built or done	BUILT_LEGAL_INFRASTRUCTURE = TRUE
History tags	Causal memory used for later text/end diagnosis	DEMOBILISED_AFTER_VICTORY

The basic loop is:

Decision → Certain consequence → Variables/flags change → Externality check if applicable → History stored → Later capability/credibility check

Scores run from 0–100 and are hidden.

For design shorthand:

Design notation	Numerical effect
↑↑	+15
↑	+8
slight ↑	+4
slight ↓	-4
↓	-8
↓↓	-15

These should be starting values, not sacred numbers. Playtesting should tune them.

⸻

2. Core variables

I would use ten principal variables.

Variable	What it actually means	High score means	Low score means
MOBILISATION	Ability to put people into action	You can credibly call people out	Your mobilisation threats are bluffable
ORGANISATION	Ability to coordinate people, money, staff, chapters and work	Decisions become executable	Attention exceeds capacity
MORAL_LEGITIMACY	Public permission to act	Benefit of doubt, broader participation	Movement seen as unreasonable, toxic or self-serving
RELEVANCE	Whether political actors and constituencies still care what you do	You remain part of the political conversation	Politics can move without you
AGENDA_COHERENCE	Whether people can explain what you stand for	New issues can be incorporated coherently	Movement becomes reactive
ACTUAL_INDEPENDENCE	Real autonomy over decisions, money and leadership	Nobody else effectively controls you	Strategic dependency
PERCEIVED_INDEPENDENCE	Whether outsiders believe that autonomy exists	Cross-partisan credibility	Seen as someone’s proxy
ALLIANCE_STRENGTH	Depth of reciprocal relationships with organisations around you	Others will mobilise resources for you	Relationships are episodic
INSTITUTIONAL_LEVERAGE	Ability to get institutions to act without mass mobilisation	Access, legal pressure, evidence, negotiation work	Street pressure is your only instrument
ACCOUNTABILITY	Ability to govern yourself and honour internal processes	Structures survive disagreement	Leadership disputes become existential

There are three additional hidden variables.

Hidden variable	Purpose
BREADTH	How low or high the social cost of joining the movement has become
LEADER_CENTRICITY	How much political capital sits in identifiable leaders rather than the institution
POLITICAL_SPACE	External environment: how open, crowded and politically contested the youth space is

POLITICAL_SPACE is not controlled by the player. It initially explodes upward after the resignation. It becomes increasingly crowded rather than simply declining.

That distinction matters:

The political space can remain enormous while your relevance within it falls.

⸻

3. Starting state

Immediately before Turn 1, I would start approximately here:

Variable	Start
Mobilisation	75
Organisation	30
Moral Legitimacy	72
Relevance	80
Agenda Coherence	55
Actual Independence	75
Perceived Independence	72
Alliance Strength	55
Institutional Leverage	20
Accountability	30
Breadth	75
Leader Centricity	45
Political Space	85

This captures the opening condition:

enormous political capital, relatively little institutional capacity.

That imbalance is essentially the game’s starting problem.

⸻

4. Turn 1 state changes

1A. Bring the tents down

Change	Effect
Moral Legitimacy	+15
Perceived Independence	+8
Mobilisation	-15
Alliance Strength	-4
Institutional Leverage	0
Organisation	0

Flags:

DEMOBILISED = TRUE
GOVT_ASSURANCE_DEPENDENCY = TRUE
ORIGINAL_MASS_DISPERSED = TRUE

History tag:

VICTORY_CONVERTED_TO_MORAL_CAPITAL

The point is that the player has not “lost”. They have converted one kind of power into another.

⸻

1B. Stay for the settlement

Change	Effect
Mobilisation	+8
Moral Legitimacy	initially 0
Alliance Strength	+4
Relevance	+4
Political Space	stays high

Flags:

HELD_GROUND = TRUE
SETTLEMENT_UNRESOLVED = TRUE

This immediately triggers the first externality check: how does continued occupation get interpreted?

⸻

1C. Widen

Before scores move substantially, the Widen Chain determines what kind of growth this is.

Base effect:

Change	Effect
Mobilisation	+15
Relevance	+8
Moral Legitimacy	-4 initially
Political Space	+4
Agenda burden	increases

Flag:

WIDENED = TRUE

Then the three Widen decisions modify the state further.

⸻

5. Widen Chain state machine

Charter choice

Charter	Agenda	Breadth	Legitimacy	Relabelling vulnerability
Education reform	+15	0	+8	low
Student rights	+8	+4	0	medium
Young people’s lives	+4 initially	+15	-4	medium-high
Democratic accountability	+8	+8	-8	high

The point with “Young people’s lives” is that Breadth rises before Agenda Coherence does. The movement has acquired a constituency faster than a politics.

⸻

Who builds it

Choice	Organisation	Alliance	Actual independence	Perceived independence	Leader centricity
Expand CJP	+8	-4	+8	+4	+8
Existing alliance	+8	+15	-4	-8	-4
Open coalition	+4	+8	0	-4	-4
Protest constitutes movement	+4	+8	+4	+8	-8

Flags are created accordingly:

CJP_EXPANSION
STANDING_ALLIANCE
OPEN_COALITION
PROTEST_ASSEMBLY

⸻

Organisational structure

Structure	Organisation	Accountability	Mobilisation	Alliance	Leader centricity
Central leadership	+12	-4	+4	0	+15
Federation	+10	+4	+8	+4	-4
Membership organisation	+6 now, further +8 later	+15	-4 initially	+4	-10
Alliance council	+12	+8	0	+15	-8
Loose movement	-4	-12	+12	0	+4

And this sets the crucial structure flag:

GOVERNANCE_MODEL = CENTRAL / FEDERAL / MEMBERSHIP / ALLIANCE_COUNCIL / LOOSE

The Live Test then adds a structure-specific scar rather than another major numerical swing.

For example:

FOUNDING_DECISION_OVERRULED_ALLIES
FIRST_DECISION_FRAGMENTED
MEMBERSHIP_PROCESS_BYPASSED
ALLIANCE_MEMBER_EXITED
DUELLING_PRESS_CONFERENCES

These return later in Turn 8.

⸻

6. Capabilities are not scores

This is important.

A high Organisation score does not automatically mean you have lawyers.

Capabilities require actual decisions.

Capability	How it gets created
LEGAL_INFRASTRUCTURE	Turn 3A legal tracker/team, or equivalent investment
EVIDENCE_CAPACITY	Turn 5 evidence route
LOCAL_CHAPTERS	Turn 5 local organising, or federation route strengthened later
GOVERNMENT_ACCESS	Direct negotiation / institutional pressure / Turn 9
TRANSPARENT_ACCESS	Turn 9C
COALITION_CAPACITY	Standing alliance + subsequent maintenance
MEMBERSHIP_GOVERNANCE	Membership route survives until Turn 8
MOBILISATION_MACHINE	Mobilisation remains ≥60 and Organisation ≥45
POLITICAL_AGENDA	Agenda Coherence ≥60 plus Turn 7 political expansion
REPRESENTATIVE_MANDATE	Membership/federal/assembly structure with Accountability ≥55

So Turn 11 can genuinely say:

You don’t have lawyers.

Rather than:

Your organisation score isn’t high enough to choose lawyers.

⸻

7. Capability quality

Having a capability and having a good capability should be different.

For instance:

Legal capability effectiveness

Legal Effectiveness = Organisation + Accountability + Institutional Leverage

Rough interpretation:

Combined quality	Result
High	Lawyers act immediately, documentation is sound
Medium	Works, but slowly / unevenly
Low	You technically built it, but it struggles during the crisis

Likewise:

Chapter quality

Depends on:

Organisation + Accountability + Agenda Coherence

Low-quality chapters produce precisely the regional-leader problem that appears at Turn 8.

This makes earlier investments matter without hard-coding every outcome.

⸻

8. Externality engine

Externalities should never be pure 50/50 randomness.

Each externality begins with three possible outcomes:

Positive / Mixed / Negative

Base odds might be:

30% Positive / 40% Mixed / 30% Negative

Then earlier state modifies them.

A useful general buffer score is:

PUBLIC BUFFER = 0.5(Moral Legitimacy) + 0.3(Perceived Independence) + 0.2(Breadth)

A movement with a strong public buffer is more likely to get the benefit of the doubt.

A second measure:

POLITICAL RESILIENCE = 0.4(Organisation) + 0.3(Accountability) + 0.3(Actual Independence)

This affects whether an adverse event becomes a crisis.

So the externality has two stages:

How does the world interpret it?
then
Can the organisation absorb what happened?

⸻

9. The six major externality checks

Externality 1: Turn 1, staying/widening

Event:

Police restrictions continue while the movement remains.

Positive interpretation:

Images of food being blocked dominate coverage. Government looks punitive.

Effects:
Moral Legitimacy +8
Mobilisation +4

Mixed:

Core support intensifies, but families and less political students grow cautious.

Effects:
Mobilisation +8
Breadth -8

Negative:

“They already won” becomes dominant framing.

Effects:
Moral Legitimacy -12
Breadth -8

Positive odds increase if:
few concrete demands, alliance discipline, clear settlement ask.

Negative odds increase if:
rapid demand multiplication, leadership conflict, low perceived independence.

⸻

Externality 2: Turn 2A, what happens to another protest

The player does not choose whether another protest succeeds.

Their Turn 2A strategy changes whether they gain or lose from it.

An amplified protest could:
succeed and credit them; succeed without them; fail; become violent; get captured by somebody else.

This changes Relevance, Moral Legitimacy and Alliance depending on whether the player was amplifier, service network, education-focused or coalition builder.

The key is:

The random draw concerns the protest’s trajectory, not whether the player’s strategy “worked”.

⸻

Externality 3: Turn 2B, occupation narrative

This is the major moral-high-ground draw.

Inputs:

Moral Legitimacy
Breadth
Perceived Independence
Agenda Coherence
whether the player widened with actual structure
whether allied groups remain

Possible results:

“Crackdown” narrative
“Complicated standoff” narrative
“They won’t leave” narrative

This event should have a large effect because the player is risking the political legitimacy of the original victory.

⸻

Externality 4: Turn 3A, why Government relents

This is hidden.

The Government always relents for narrative purposes.

What changes is the hidden disposition generated underneath:

GOVT_SEES_THREAT
GOVT_SEES_NEGOTIABLE_ACTOR
GOVT_SEES_USEFUL_INDEPENDENT_ACTOR

These do not need to be mutually exclusive.

For example:

Prior behaviour	More likely Government interpretation
Strong mobilisation threat	Threat
Legal/institutional route	Negotiable actor
High independence + weak Opposition alignment	Useful independent actor
Strong Opposition contact dependency	Opposition-adjacent threat

The player is never told the answer.

This hidden disposition modifies Turn 9 invitations and Turn 12 behaviour.

⸻

Externality 5: Turn 6 hostile relabelling

Outcome depends heavily on accumulated legitimacy.

Possible result:

Label fails to stick
Moral Legitimacy absorbs it.

Label polarises
Core mobilisation rises, breadth falls.

Label sticks
Parents, moderate supporters and unaffiliated students withdraw.

The player’s response then interacts with the draw.

Reclaiming a failed label can actually make it more salient.

Rejecting a label that already stuck may stabilise moderate support.

Service delivery works much better if EVIDENCE_CAPACITY or LOCAL_CHAPTERS actually exists.

⸻

Externality 6: Turn 12 electoral conversion

This is not “did your candidate win?” randomness.

It determines how the political ecosystem reacts to your electoral strategy.

The principal inputs are:

Actual Independence
Perceived Independence
Organisation
Moral Legitimacy
Leader Centricity
Alliance Strength
Agenda Coherence
Relevance

And the critical danger variable:

ABSORPTION PRESSURE

More on that below.

⸻

10. Mobilisation fatigue

Mobilisation should not be infinitely reusable.

Create:

MOBILISATION_USES

Major national mobilisation adds +1.

The first use is the original breakthrough.

Every subsequent mass call produces a fatigue modifier:

Number of repeated calls	Penalty
2nd major call	-3 effectiveness
3rd	-7
4th	-12
5th+	-18

Organisation can mitigate this.

A well-built movement can repeatedly mobilise because it has chapters, organisers, communication structures and local ownership.

A movement relying on spectacle simply exhausts the moment.

This makes Turn 3A, 4A and 11 strategically connected.

⸻

11. Alliance memory

Alliance should have both a numerical score and a state.

ALLIANCE_STATE = DEMOBILISED / INFORMAL / PROGRAMMATIC / INSTITUTIONALISED

And relationships accumulate scars:

ALLY_OVERRULED
ALLY_EXCLUDED_FROM_GOVT_MEETING
ALLY_DEFENDED
ALLY_USED_FOR_CONTACTS
ALLY_SHARED_CREDIT
ALLY_ABANDONED

So Alliance Strength 70 with three unresolved betrayals is not the same as a clean 70.

Turn 9D and Turn 11 can check both.

For example:

COALITION_CAPACITY available IF Alliance ≥55 AND no severe unresolved rupture

⸻

12. Independence should have two scores

This remains essential.

A movement could have:

Actual Independence = 82

but

Perceived Independence = 35

because it continually appears beside Opposition actors.

Or:

Actual Independence = 40

Perceived Independence = 75

because its dependencies remain invisible.

Those produce different political problems.

Government/opposition attacks primarily affect Perceived Independence.

Funding, candidate deals, reliance on party networks and leadership capture affect Actual Independence.

This distinction becomes decisive in Turn 12.

⸻

13. Turn 8 governance test

Turn 8 should not create governance. It audits what already exists.

The structure determines the mechanism.

The scores determine whether the mechanism survives.

For example:

Central leadership

If Organisation ≥55:

leadership settles the dispute quickly.

If Organisation <55:

rival senior figures begin issuing conflicting instructions.

Federation

If Accountability ≥55:

chapters use the established procedure and national leadership accepts the outcome.

If Accountability <55:

chapters invoke autonomy selectively and the dispute fragments.

Membership

If governance has matured:

members decide.

If the player chose membership but never invested in organisation:

turnout is low, rolls disputed, defeated faction contests legitimacy.

Loose movement

No legitimate mechanism exists.

There is no score check capable of fixing that.

That is the cost of the earlier choice.

⸻

14. Turn 9 gates

Turn 9 should use soft and hard gates differently.

A, B and C remain available.

D requires:

COALITION_CAPACITY = TRUE

Turn 9C should create:

TRANSPARENT_ACCESS = TRUE

but also:

FORMALISED_GOVT_RELATIONSHIP = TRUE

That second flag is the cost.

Future meetings become formal, minuted and less candid.

The player gains accountability while losing some informal access.

⸻

15. Turn 10 credibility engine

Nothing should be locked.

The player claims their comparative advantage.

Then the machine tests the claim.

Mobilisation claim

Credible if:

Mobilisation ≥60 AND Mobilisation effectiveness ≥50

Evidence/agenda claim

Credible if:

EVIDENCE_CAPACITY = TRUE
and Agenda Coherence ≥55

Stronger if TRANSPARENT_ACCESS = TRUE.

Local organisation claim

Credible if:

LOCAL_CHAPTERS = TRUE
and Organisation ≥50

Political representation claim

Credible if:

Institutional Leverage ≥55
and either REPRESENTATIVE_MANDATE or strong COALITION_CAPACITY

An unsupported claim produces a direct outcome:

You say this is your strength. Your own record says otherwise.

It should also reduce Accountability slightly, because leadership has misdiagnosed the institution.

⸻

16. Turn 11 capability engine

This is where hard gates apply.

Lawyers

Available if LEGAL_INFRASTRUCTURE = TRUE.

Outcome quality determined by Organisation + Accountability.

Coalition pressure

Available if COALITION_CAPACITY = TRUE.

Outcome quality determined by Alliance Strength and Perceived Independence.

Government access

Available if GOVERNMENT_ACCESS = TRUE.

Outcome quality determined by Institutional Leverage.

But each use costs Perceived Independence if the relationship is opaque.

Street

Always available.

Success depends on current Mobilisation minus mobilisation fatigue.

Opposition MLA

Always available.

Immediate result: fastest release.

Effects:

Institutional Leverage +4 temporarily
Actual Independence -8
Perceived Independence -8
Leader Centricity +4 if the relationship is personalised

Flag:

OUTCOME_DELIVERED_BY_ESTABLISHED_POLITICS = TRUE

This flag is extremely important at Turn 12.

⸻

17. Leader Centricity

Start around 45.

It rises through:

Behaviour	Effect
Central leadership	+15
Named leader handles repeated negotiation	+8
Media consistently personalised	+4
Leadership bypasses process	+4
Electoral ticket offered/accepted	+15

It falls through:

Behaviour	Effect
Membership governance	-10
Strong chapters	-6
Collective alliance representation	-6
Rotating spokespersons	-4
Institutional capability independent of founders	-8

This gives us the absorption mechanism.

You don’t have to destroy a leader-centric movement.

You recruit the leaders.

⸻

18. Absorption Pressure

Calculate a hidden value entering Turn 12.

Conceptually:

Absorption Pressure rises with:

high Leader Centricity
low Actual Independence
heavy alliance dependence
repeated reliance on established politicians
weak Accountability
weak Organisation relative to Relevance

And falls with:

membership governance
strong institution
distributed leadership
clear agenda
independent institutional capabilities

A simple implementation could be:

ABSORPTION_PRESSURE =
0.25 LeaderCentricity
+ 0.20 (100 - ActualIndependence)
+ 0.15 (100 - Accountability)
+ 0.15 max(0, Relevance - Organisation)
+ 0.15 EstablishedPoliticsDependency
+ 0.10 AllianceDependency

Clamp to 0–100.

This is particularly useful because it captures a central argument of the simulation:

Being politically valuable can make absorption more likely, not less.

⸻

19. Turn 12 gates

A. Independent candidates

Hard requirements:

Organisation ≥65
Mobilisation ≥55
Agenda Coherence ≥60
Actual Independence ≥60
and a functioning governance structure.

Preferably also Representative Mandate.

If allowed but only barely qualified, the game can permit it and make the electoral externality harsh.

⸻

B. Negotiate with all political formations

Requirements:

EVIDENCE_CAPACITY = TRUE
Institutional Leverage ≥50
Actual Independence ≥55

Strong version requires TRANSPARENT_ACCESS.

⸻

C. Issue campaigning, no endorsements

Requirements:

Relevance ≥45
Moral Legitimacy ≥50

This is deliberately the most accessible durable route.

It allows a movement to be politically meaningful without pretending to be a party.

⸻

D. Let individuals decide

Always available.

Effects:

Leader Centricity +8
Actual Independence -8
Absorption Pressure +15

Not automatic absorption, but usually pushes strongly toward it.

⸻

20. Ending engine

I would not calculate four scores and simply choose the highest.

The endings are qualitatively different. They should use sequential causal tests.

The order should be:

ABSORPTION TEST → THRIVE TEST → RELEVANCE TEST → SURVIVAL

Why test absorption first?

Because a powerful movement can be absorbed. We should not accidentally classify it as THRIVED simply because it had high scores before its leaders and infrastructure migrated into established politics.

⸻

21. ABSORBED

Trigger if political capital is successfully converted into another actor’s structure.

Strong trigger:

Absorption Pressure ≥70

plus at least one:

LEADERS_JOIN_PARTIES
TURN12_D_INDIVIDUAL_CHOICES
OUTCOME_DELIVERED_BY_ESTABLISHED_POLITICS repeatedly
Actual Independence <40
Movement governance collapses during electoral entry

Possible strong movement version:

You did not disappear because you became irrelevant. You became valuable enough to recruit from.

Possible coalition version:

The constituency survived, the demands survived and many organisers survived. What disappeared was an independent centre capable of claiming them as its own.

Possible personalised version:

You built recognisable leaders faster than you built an institution capable of holding them.

Importantly, ABSORBED is not synonymous with failure.

⸻

22. THRIVED

Eligibility should be demanding.

Minimum:

Organisation ≥60
Moral Legitimacy ≥50
Actual Independence ≥55
Agenda Coherence ≥55
Accountability ≥50

Plus:

at least three durable capabilities from:

Legal infrastructure
Evidence capacity
Local chapters
Coalition capacity
Transparent institutional access
Representative mandate
Sustainable mobilisation

And the movement must have successfully passed Turn 11 using its own or institutionally embedded capacity, not only the politician fallback.

Turn 12 must also produce a viable strategy rather than organisational fragmentation.

The logic:

You can mobilise, organise, deliver and negotiate, and other actors cannot simply substitute themselves for you.

THRIVED does not require electoral candidates.

A highly capable independent pressure organisation can thrive.

⸻

23. RELEVANT

Broad conditions:

Relevance ≥50

and one of:

Moral Legitimacy ≥55
Mobilisation ≥50
Evidence Capacity
Institutional Leverage ≥45
Strong coalition

But the movement fails the THRIVED test because it lacks sufficient institutional depth, independence or accountability.

Typical paths:

high moral legitimacy + weak organisation
successful social-media amplifier
credible issue campaigner
strong education specialist
agenda setter whose ideas others implement

Ending logic:

Politics cannot ignore you, but you do not control what happens to the political space you created.

This should be a perfectly respectable outcome.

⸻

24. SURVIVED

Default if the movement still exists independently but neither Thrived nor remains strongly Relevant.

Typical conditions:

Relevance <50
or Moral Legitimacy <40
or Organisation <40
or severe mismatch between Relevance and capacity.

Different versions matter.

Marginal survival

You still have an organisation. Fewer people need it.

Toxic survival

Your core became more committed while the cost of joining became too high for everyone else.

Platform survival

The account remains influential enough to produce sparks, but the institution behind it never became much more than the account.

Permanent-opposition survival

Confrontation became the movement’s strongest skill and eventually its only one.

SURVIVED should therefore often feel worse than RELEVANT and in some paths worse than ABSORBED.

⸻

25. Ending diagnosis system

Every significant choice should also add one or more causal tags.

Examples:

PRESERVED_MORAL_HIGH_GROUND
DEMOBILISED_TOO_EARLY
BUILT_ENFORCEMENT_CAPACITY
RELIED_ON_REPEATED_MOBILISATION
BUILT_DISTRIBUTED_LEADERSHIP
PERSONALISED_MOVEMENT
FAILED_TO_DEFINE_AGENDA
EXPANDED_WITHOUT_GOVERNANCE
TRADED_OWNERSHIP_FOR_ALLIANCE_CAPACITY
BUILT_LOCAL_ROOTS
BECAME_GOVERNMENT_INTERLOCUTOR
LOST_PERCEIVED_INDEPENDENCE
ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS
BUILT_CAPACITY_BETWEEN_CRISES

At the end, the system selects the three or four tags that most directly caused the ending.

So instead of:

RELEVANT
You scored highly on relevance.

The player gets something like:

RELEVANT
You no longer own the space, but politics still has to account for you.

You protected the legitimacy of the original victory and later built a credible evidence operation around schools. But you chose amplification over local organisation, and when your own members needed institutional protection you still depended on established politicians to deliver it. Your agenda survived. Your ability to make others act survived. A political institution capable of acting by itself never quite did.

Or:

SURVIVED
The movement remains, but much of the political capital it created has gone elsewhere.

You kept the occupation alive and built enormous mobilisation, but never gave the wider movement a durable decision-making structure. The hostile political label narrowed participation, and repeated mobilisation became more expensive each time. By the election, you could still produce a crowd, but other organisations could provide lawyers, negotiate with institutions and convert youth anger into political action faster than you could.

Or:

THRIVED
You turned the opening into durable independent political power.

You widened early, but gave the widening a structure. You traded some control for an alliance capable of surviving disagreement, built legal and local capacity between protests, and entered Government consultations without allowing access to become dependence. By the election, parties could borrow your demands, but they still had to negotiate with the institution behind them.

That, rather than the numbers, is the payoff.

26. The state machine in one view

                         POLITICAL MOMENT
                               │
                               ▼
                       TURN 1 BREAKTHROUGH
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
       DEMOBILISE           HOLD             WIDEN
             │                 │                 │
       moral capital      mobilisation      organisation
       ↑                  retained          minigame
       crowd ↓                 │                 │
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
                            │
                  BUILD A CAPABILITY?
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
                  identity vs capability test
                            │
                            ▼
                     MEMBER IN CRISIS
                    hard capability test
                            │
                            ▼
                         ELECTIONS
                    conversion / absorption
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
       THRIVED           RELEVANT          SURVIVED
                            │
                         ABSORBED
                  where political capital
                     migrated elsewhere

The key mechanical proposition underneath all of this is:

The game rewards neither moderation nor radicalism by itself. It rewards converting political moments into capabilities while retaining enough legitimacy, independence and coherence to use those capabilities later.

That keeps the simulation from secretly having a “correct politics”. It has a theory of institution-building, political capital and conversion, which is much closer to the argument you’re actually making.