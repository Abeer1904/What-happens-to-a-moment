Yes. At the moment the state machine is too internally focused. It tracks what the movement builds, but politics also depends on what is happening outside the movement: whether people like it, whether the media covers it, whether its issues are salient, and whether other actors are occupying the same space.

I would separate the variables into four layers.

1. Movement capacity: what can you actually do?

These are the movement’s internal assets.

Variable	Measures
Mobilisation	Can you get people to act, protest, volunteer or participate?
Organisation	Can you coordinate people and execute decisions?
Institutional Leverage	Can you make Government, courts, universities or administrations respond?
Alliance Strength	Can you draw on other organisations’ people, lawyers, networks and political access?
Accountability	Can the movement govern itself and resolve internal disputes?
Agenda Coherence	Do you know what you stand for and what belongs within your mandate?

These largely determine whether THRIVED is possible.

2. Political position: how are you perceived?

This is where we need the additions you’re describing.

Variable	Measures
POPULARITY	How many people broadly like/support the movement?
PUBLIC_OPINION	Whether the public thinks the movement is right on the current controversy
MEDIA_ATTENTION	How much coverage/attention the movement currently receives
MEDIA_SENTIMENT	Whether coverage is broadly sympathetic, neutral or hostile
RELEVANCE	Whether what the movement says and does still matters politically
BREADTH	How wide a constituency feels comfortable participating
PERCEIVED_INDEPENDENCE	Whether people think the movement speaks for itself rather than a party
MORAL_LEGITIMACY	Whether people believe it has a legitimate right to make the demands it is making

And these shouldn’t collapse into one another.

A movement could have:

Popularity 72 / Public Opinion 35 / Media Attention 90 / Media Sentiment 25 / Relevance 85

That is a major political crisis. Everyone is talking about you, you still have supporters, but on this particular confrontation the public thinks you’re wrong and the media environment has turned hostile.

Alternatively:

Popularity 45 / Public Opinion 78 / Media Attention 35 / Relevance 40

People broadly agree with you, but you are no longer the organisation through which that agreement is politically expressed.

That’s exactly the kind of situation that could lead to SURVIVED.

3. Political environment: what is happening to the space around you?

These should largely be world variables, not player attributes.

Variable	Measures
POLITICAL_SPACE	How open the wider environment is to youth protest and political participation
ISSUE_SALIENCE	How politically important the movement’s issues currently are
OPPOSITION_COMPETITION	How effectively Opposition actors are occupying this political constituency
GOVERNMENT_PRESSURE	How threatened the Government currently feels by the movement
REPRESSION	Degree of coercive/state pressure being applied
ELECTORAL_PRESSURE	How strongly elections are pulling actors towards parties and candidates

This fixes something important in the narrative.

After Turn 1, Political Space should be extremely high. The movement has helped open it.

But by Turn 10:

POLITICAL_SPACE = 90

could coexist with:

CJP_RELEVANCE = 42

because everybody else has entered the space.

That is precisely the political phenomenon we’re trying to simulate.

4. Political ownership: where is the capital accumulating?

I’d add a final small set of hidden variables:

LEADER_CENTRICITY
Is political capital accumulating in individuals or the institution?

MOVEMENT_OWNERSHIP
When people think of the political issues the movement opened, do they still associate those issues with the movement?

PARTY_DEPENDENCE
How much does the movement rely on established parties to produce actual outcomes?

ABSORPTION_PRESSURE
How attractive and vulnerable the movement is to being incorporated into established electoral politics.

MOVEMENT_OWNERSHIP is particularly useful. It solves the Turn 10 problem.

Imagine:

Issue Salience = 92
Media Attention = 85
Public Opinion = 70
Movement Ownership = 28

The movement’s issues have won. Everyone is talking about them.

But nobody is talking about the movement.

That is a very different kind of political failure from losing the argument.

⸻

I would therefore revise the full variable system to around 18 variables, but only 10–12 need to move regularly:

Internal: Mobilisation, Organisation, Institutional Leverage, Alliance Strength, Accountability, Agenda Coherence.

Public: Popularity, Public Opinion, Media Attention, Media Sentiment, Relevance, Breadth, Moral Legitimacy, Perceived Independence.

Environment: Political Space, Issue Salience, Opposition Competition, Government Pressure.

Hidden conversion variables: Leader Centricity, Movement Ownership, Party Dependence, Absorption Pressure.

Actual Independence can remain as a hidden structural variable as well.

Crucially, I would not display all of these to the player as bars. Most should operate underneath. We could perhaps expose five headline indicators and let the rest drive news bulletins, externalities and endings.

And this gives us a much more interesting ending calculation.

THRIVED requires high Movement Ownership + Relevance + meaningful organisational capability. You are not merely popular; you can pressure, frame and deliver.

RELEVANT requires high Media Attention/Relevance but comparatively weak Organisation/Institutional Leverage. You remain a social-media and campaign force.

SURVIVED occurs when Media Attention, Movement Ownership and Relevance have fallen even though some organisation/following remains. The political space is alive, but other actors own it.

ABSORBED occurs when political relevance/popularity remain valuable but Movement Ownership and Actual Independence collapse as Party Dependence and Absorption Pressure rise.

This also produces a very useful paradox for the simulation:

Issue Salience ↑↑
Public Opinion ↑
Political Space ↑
Movement Ownership ↓↓

You changed politics.

You just didn’t necessarily build the organisation that would inherit the change.

That, I think, should be one of the central mechanical ideas of the whole game.