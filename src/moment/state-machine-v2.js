// Canonical state-machine v2. All numerical state is private to the simulation.
TURNS[0].choices[0].effect={leg:15,perceived:8,mob:-15,trust:-4};
TURNS[0].choices[1].effect={mob:8,trust:4,rel:4};
TURNS[0].choices[2].effect={mob:15,rel:8,leg:-4};
const charterEffects={education:{agn:15,leg:8},rights:{agn:8,breadth:4},youth:{agn:4,breadth:15,leg:-4},democracy:{agn:8,breadth:8,leg:-8}};
const builderEffects={cjp:{org:8,trust:-4,ind:8,perceived:4,leader:8},existing:{org:8,trust:15,ind:-4,perceived:-8,leader:-4},open:{org:4,trust:8,perceived:-4,leader:-4},assembly:{org:4,trust:8,ind:4,perceived:8,leader:-8}};
const structureEffects={central:{org:12,acc:-4,mob:4,leader:15},federated:{org:10,acc:4,mob:8,trust:4,leader:-4},membership:{org:6,acc:15,mob:-4,trust:4,leader:-10},council:{org:12,acc:8,trust:15,leader:-8},open:{org:-4,acc:-12,mob:12,leader:4}};
MINI.charter.choices.forEach(c=>c.effect=charterEffects[c.id]);
MINI.participants.choices.forEach(c=>c.effect=builderEffects[c.id]);
MINI.structure.choices.forEach(c=>c.effect=structureEffects[c.id]);
// Completing an agreed constitution does not grant unpurchased legal teams or chapters.
completeStructure=function(){
 if(state.governance===state.structure)return;
 if(state.structure==='open')return;
 if(state.structure==='council'&&!allied())return;
 state.governance=state.structure;state.mandate='ratified';
 if(state.structure==='membership'){state.flags.add('MEMBERSHIP_ROLL_COMPLETE');}
 if(state.structure==='federated')state.flags.add('BUILT_CHAPTERS');
 refreshCapabilities();
};
function refreshCapabilities(){
 const v=state.vars;
 if(state.access>0)state.flags.add('GOVERNMENT_ACCESS');else state.flags.delete('GOVERNMENT_ACCESS');
 for(const [flag,on] of Object.entries({MOBILISATION_MACHINE:v.mob>=60&&v.org>=45,POLITICAL_AGENDA:v.agn>=60&&has('POLITICAL_EXPANSION'),REPRESENTATIVE_MANDATE:['membership','federated'].includes(state.governance)&&v.acc>=55,MEMBERSHIP_GOVERNANCE:state.governance==='membership'&&has('GOVERNANCE_PASSED')}))on?state.flags.add(flag):state.flags.delete(flag);
}
function publicBuffer(){return .5*state.leg+.3*state.perceived+.2*state.breadth;}
function politicalResilience(){return .4*state.vars.org+.3*state.vars.acc+.3*state.vars.ind;}
function mobilisationEffectiveness(){const penalties=[0,0,3,7,12,18];return Math.max(0,state.vars.mob-penalties[Math.min(5,state.mobilisationUses)]*(1-state.vars.org/150));}
function absorptionPressure(){const v=state.vars;return clamp(.25*state.leader+.2*(100-v.ind)+.15*(100-v.acc)+.15*Math.max(0,v.rel-v.org)+.15*state.dependency+.1*state.allianceDependency+state.absorptionBonus);}
function decisionTags(c,x){
 const tags=[];if(!x.mini&&x.turn===0)tags.push(c.id==='a'?'PRESERVED_MORAL_HIGH_GROUND':c.id==='c'?'WIDENED':'HELD_GROUND');
 if(x.mini&&x.key==='structure')tags.push(c.id==='central'?'PERSONALISED_MOVEMENT':c.id==='open'?'EXPANDED_WITHOUT_GOVERNANCE':'BUILT_DISTRIBUTED_LEADERSHIP');
 if(!x.mini&&x.turn===2&&state.branch==='leave')tags.push({a:'RELIED_ON_REPEATED_MOBILISATION',b:'BUILT_ENFORCEMENT_CAPACITY',c:'ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS',d:'BECAME_GOVERNMENT_INTERLOCUTOR'}[c.id]);
 if(!x.mini&&x.turn===4)tags.push({a:'AMPLIFIED_WITHOUT_LOCAL_ROOTS',b:'BUILT_EVIDENCE_CAPACITY',c:'BUILT_LOCAL_ROOTS',d:'BUILT_CAPACITY_BETWEEN_CRISES'}[c.id]);
 if(!x.mini&&x.turn===8)tags.push(c.id==='c'?'BUILT_TRANSPARENT_ACCESS':c.id==='b'?'PERSONALISED_MOVEMENT':'RETAINED_NEGOTIATING_BOUNDARIES');
 if(!x.mini&&x.turn===10)tags.push(c.id==='e'?'ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS':has('CRISIS_DELIVERED')?'INSTITUTION_DELIVERED':'CAPABILITY_STRUGGLED');
 if(!x.mini&&x.turn===11)tags.push(c.id==='d'?'INDIVIDUAL_ELECTORAL_CONVERSION':'RETAINED_COLLECTIVE_STRATEGY');
 return tags;
}
function recordDecision(c,x){
 const f=state.flags;
 if(c.effect?.access>0)change({leverage:c.effect.access*12});
 if(x.mini){
  if(x.key==='participants'){f.add({cjp:'CJP_EXPANSION',existing:'STANDING_ALLIANCE',open:'OPEN_COALITION',assembly:'PROTEST_ASSEMBLY'}[c.id]);state.allianceState=c.id==='existing'?'PROGRAMMATIC':'INFORMAL';if(c.id==='existing')change({allianceDependency:15});}
  if(x.key==='structure'){if(c.id==='council')state.allianceState='INSTITUTIONALISED';}
  if(x.key==='funding'&&['political','donor'].includes(c.id))change({dependency:c.id==='political'?30:10});
 }else{
  if(x.turn===0){for(const flag of c.id==='a'?['DEMOBILISED','GOVT_ASSURANCE_DEPENDENCY','ORIGINAL_MASS_DISPERSED']:c.id==='b'?['HELD_GROUND','SETTLEMENT_UNRESOLVED']:['WIDENED'])f.add(flag);if(c.id==='a')state.allianceState='DEMOBILISED';}
  if((x.turn===2&&state.branch==='leave'&&c.id==='a')||(x.turn===3&&state.branch==='leave'&&c.id==='a')||(x.turn===10&&c.id==='d')){state.mobilisationUses++;change({mob:-(state.mobilisationUses>=4?6:3)});}
  if(x.turn===2&&state.branch==='leave'&&c.id==='b')change({leverage:15,leader:-8});
  if(x.turn===2&&state.branch==='leave'&&c.id==='c'){change({dependency:20,leader:8,allianceDependency:10});state.scars.push('ALLY_USED_FOR_CONTACTS');}
  if(x.turn===1&&state.branch==='leave'&&c.id==='a'||x.turn===4&&c.id==='a')change({leader:4});
  if(x.turn===4&&c.id==='c')change({leader:-6});
  if(x.turn===4&&['b','d'].includes(c.id))change({leverage:12});
  if(x.turn===6&&['b','c'].includes(c.id))f.add('POLITICAL_EXPANSION');
  if(x.turn===3&&state.branch==='stay'&&c.id==='a'){state.scars.push('ALLY_EXCLUDED_FROM_GOVT_MEETING');change({leader:8,allianceDependency:10});}
  if(x.turn===7&&state.governance==='membership'&&!has('MEMBERSHIP_LATER_INVESTMENT')){change({org:8});f.add('MEMBERSHIP_LATER_INVESTMENT');}
  if(x.turn===8&&c.id==='b'){change({leader:8});state.scars.push('ALLY_EXCLUDED_FROM_GOVT_MEETING');}
  if(x.turn===8&&c.id==='c'){f.add('FORMALISED_GOVT_RELATIONSHIP');f.add('TRANSPARENT_ACCESS');}
  if(x.turn===8&&c.id==='d'){state.scars.push('ALLY_SHARED_CREDIT');change({leader:-6});}
  if(x.turn===10&&c.id==='e'){f.add('TEMP_MLA_LEVERAGE');f.add('OUTCOME_DELIVERED_BY_ESTABLISHED_POLITICS');change({dependency:25});}
  if(x.turn===11&&c.id==='d'){f.add('TURN12_D_INDIVIDUAL_CHOICES');change({leader:8,ind:-8,absorptionBonus:15});}
 }
 if(state.scars.filter(s=>['ALLY_OVERRULED','ALLY_EXCLUDED_FROM_GOVT_MEETING','ALLY_ABANDONED'].includes(s)).length>=3)f.add('SEVERE_ALLIANCE_RUPTURE');
 state.tags.push(...decisionTags(c,x));
}
// Turn 8 audits the mechanism that exists; quality is checked before effects.
const v2GovernanceScene=governanceScene;
governanceScene=function(){const sc=v2GovernanceScene();sc.choices.forEach(c=>{
 const quality=()=>({a:state.vars.org>=55,b:state.vars.acc>=55,c:has('MEMBERSHIP_ROLL_COMPLETE')&&state.vars.org>=50&&state.vars.acc>=55,d:allied()&&state.vars.acc>=50}[c.id]||false);
 const good={a:'The executive settles the dispute and coordinators follow its instruction. The authority is effective, but still concentrated in the founders.',b:'Chapters apply the agreed procedure. National leadership accepts the result, including the parts it opposed.',c:'The completed roll supports a contested vote. Representatives implement the result under the agreed rules.',d:'Mandated partners agree a common position and carry it back to their organisations.'};
 const bad={a:'Senior figures issue conflicting instructions. The executive exists, but cannot make its own decision stick.',b:'Chapters invoke autonomy selectively. The common procedure cannot settle the dispute.',c:'Turnout is low and the roll is disputed. The defeated faction contests the vote.',d:'Delegates cannot secure their partners’ agreement. The council has a meeting, but no common decision.'};
 if(c.id!=='e'){c.quality=quality;c.out=()=>quality()?good[c.id]:bad[c.id];c.set=()=>{if(state.decisionQuality)state.flags.add('GOVERNANCE_PASSED');else{state.flags.add('GOVERNANCE_FAILED');change({acc:-8,agn:-4});}};}
 });return sc;};
const claims=[()=>state.vars.mob>=60&&mobilisationEffectiveness()>=50,()=>has('EVIDENCE_CAPACITY')&&state.vars.agn>=55,()=>has('BUILT_CHAPTERS')&&state.vars.org>=50,()=>state.leverage>=55&&(has('REPRESENTATIVE_MANDATE')||allied())];
TURNS[9].choices.forEach((c,i)=>{delete c.need;const yes=['People turn out in numbers your organisers can coordinate. Mobilisation remains a credible claim.','The evidence record gives your agenda a basis others have to answer.','Local organisers continue the work without waiting for a national campaign.','Institutions respond to representatives with an established mandate and working leverage.'];c.out=()=>claims[i]()?yes[i]:'You say this is your strength. Your own record says otherwise. The claim does not supply the people, records or relationships needed to act on it.';c.set=()=>{state.flags.add(state.decisionQuality?'CLAIM_SUPPORTED':'CLAIM_UNSUPPORTED');if(!state.decisionQuality)change({acc:-4,rel:-4});};});
const protection=TURNS[10].choices;
const crisisQuality=[()=>state.vars.org+state.vars.acc>=110,()=>state.trust>=65&&state.perceived>=50,()=>state.leverage>=55,()=>mobilisationEffectiveness()>=50];
protection.forEach((c,i)=>{const prior=c.set;c.set=()=>{prior?.();if(i<4&&state.decisionQuality)state.flags.add('CRISIS_DELIVERED');};});
protection[0].need=legal;protection[0].why='You never built a legal team that could take this case.';
protection[0].out=()=>crisisQuality[0]()?'Your lawyers reach the station with a complete file and secure release. The team can act without waiting for the founders.':'The legal team exists, but missing documents and a thin rota slow the petition. Families wait while the team assembles the case.';
protection[1].need=allied;
protection[1].out=()=>crisisQuality[1]()?'Partners coordinate lawyers and public pressure. The reciprocal network secures release.':'Partners respond, but coordination and public suspicion slow the intervention. A working relationship is not an instant result.';
protection[2].need=()=>has('GOVERNMENT_ACCESS');
protection[2].out=()=>crisisQuality[2]()?'Your established contact secures institutional action and the students are released.':'Your contact takes the call but cannot secure immediate action. Access has not yet become dependable leverage.';
const contactSet=protection[2].set;protection[2].set=()=>{contactSet();if(!has('TRANSPARENT_ACCESS'))change({perceived:-8});};
protection[3].out=()=>crisisQuality[3]()?'Organisers bring out a crowd large enough to force a response. The release comes after another mobilisation.':'The call goes out, but turnout is thin. Families are still waiting. Another appeal cannot replace exhausted organisers.';
protection[4].effect={leverage:4,ind:-8,perceived:-8,leader:4};
TURNS[11].choices[0].need=()=>state.vars.org>=65&&state.vars.mob>=55&&state.vars.agn>=60&&state.vars.ind>=60&&!!state.governance&&state.governance!=='open'&&has('GOVERNANCE_PASSED');
TURNS[11].choices[1].need=()=>state.structure!=='open'&&has('EVIDENCE_CAPACITY')&&state.leverage>=50&&state.vars.ind>=55;
TURNS[11].choices[2].need=()=>state.vars.rel>=45&&state.leg>=50;
TURNS[11].choices[2].why='Too few people still follow the movement, or trust it, to sustain a national issue campaign.';
TURNS[11].choices[3].effect={};
// Interpretation is weighted; resilience changes the damage after the draw.
drawExternal=function(c,slot){
 if(slot==='relents'){
  const weights=[20+(state.vars.mob>=60?35:0),20+(legal()||state.pending.some(p=>p.flag==='BUILT_LEGAL_INFRASTRUCTURE')?40:0),20+(state.vars.ind>=65&&state.dependency<20?35:0)];
  let roll=random()*weights.reduce((a,b)=>a+b,0),i=0;while(i<2&&(roll-=weights[i])>=0)i++;
  state.flags.add(['GOVT_SEES_THREAT','GOVT_SEES_NEGOTIABLE_ACTOR','GOVT_SEES_USEFUL_INDEPENDENT_ACTOR'][i]);
  if(state.dependency>=20)state.flags.add('GOVT_SEES_OPPOSITION_ADJACENT_THREAT');
  const event={turn:state.turn,slot,type:'hidden',text:'',weights};state.events.push(event);return event;
 }
 if(!slot){if(state.turn===0){if(c.id==='a')return null;slot='occupation';}else if(state.turn===1)slot=state.branch==='stay'?'occupation':({a:'leaveAmplifier',b:'leaveSupport',c:'leaveEducation',d:'leaveAlliance'}[c.id]);else if(state.turn===5)slot='label';else if(state.turn===11)slot='election';else return null;}
 const buffer=publicBuffer(),resilience=politicalResilience();let weights=[30+(buffer-50)*.5,30-(buffer-50)*.4,40];
 if(slot==='occupation'){if(has('CLEAR_SETTLEMENT'))weights[0]+=15;if(state.charter==='youth'&&!state.governance)weights[1]+=12;if(allied())weights[0]+=8;}
 if(slot==='label'){if(has('EVIDENCE_CAPACITY')||has('BUILT_CHAPTERS'))weights[0]+=10;if(state.vars.agn<45)weights[1]+=10;}
 if(slot==='election'){weights[1]+=absorptionPressure()*.5;if(has('GOVT_SEES_USEFUL_INDEPENDENT_ACTOR'))weights[1]+=8;if(has('GOVT_SEES_NEGOTIABLE_ACTOR')&&has('TRANSPARENT_ACCESS'))weights[0]+=8;}
 weights=weights.map(w=>Math.max(5,w));let roll=random()*weights.reduce((a,b)=>a+b,0),i=0;while(i<2&&(roll-=weights[i])>=0)i++;
 let text=reactionPools[slot][0][i];
 if(slot==='occupation'){change(i===0?{leg:8,mob:4}:i===1?{leg:-12,breadth:-8}:{mob:8,breadth:-8});}
 else if(slot.startsWith('leave')){
  // The other protest's trajectory is external. CJP's chosen role determines exposure.
  const worlds=['A student protest elsewhere wins a settlement.','A student protest elsewhere ends in clashes without a settlement.','An established party intervenes in another student protest and receives the public credit.'];
  text=worlds[i]+' '+({leaveAmplifier:['Local organisers credit your coverage.','Your amplification places your name beside images you did not control.','Your posts spread the news, but the political representative owns the result.'],leaveSupport:['Your desk handles referrals after the settlement.','Your desk faces urgent requests beyond its staffed capacity.','Your team handles referrals alongside a larger established network.'],leaveEducation:['Your education work continues outside that campaign.','Your team remains focused on its education mandate and is not directing the protest.','Organisers have little reason to call an education team about the wider settlement.'],leaveAlliance:['Partners share the organising credit.','Partners ask one another for legal and practical support.','The coalition assisted, but the politician dominates the coverage.']}[slot][i]);
  change(slot==='leaveEducation'?{rel:i===0?2:-2}:i===0?{rel:8,trust:4}:i===1?{leg:-6,rel:-4}:{rel:-5,trust:2});
 }else if(slot==='label'){
  if(i===0){text='Most families and unaffiliated students reject the hostile framing. It fails to displace their experience of the movement.';change({leg:4});if(c.id==='a'){change({breadth:-4});text+=' Your decision to repeat the label gives it a new round of coverage.';}}
  else if(i===1){change({leg:-8,breadth:-12});if(c.id==='b')change({breadth:4});}
  else change({mob:8,breadth:-8});
  if(c.id==='c'&&(has('EVIDENCE_CAPACITY')||has('BUILT_CHAPTERS')))change({leg:8,breadth:4});
 }else{
  if(i===1){change({ind:-8,org:-5});if(state.leader>=60){state.flags.add('LEADERS_JOIN_PARTIES');state.flags.add('LEADERS_RECRUITED');}else state.flags.add('ORGANISERS_MIGRATED');}
  if(i===0&&c.id!=='d')state.flags.add('VIABLE_ELECTORAL_STRATEGY');
  if(i===2&&c.id!=='d'&&resilience>=45)state.flags.add('VIABLE_ELECTORAL_STRATEGY');
  if(i===1&&resilience<40)state.flags.add('ELECTORAL_GOVERNANCE_COLLAPSE');
 }
 if(i===1&&resilience<40){change({org:-4,acc:-4});text+=' The small coordinating team struggles to contain the fallout.';}
 const event={turn:state.turn,slot,type:['positive','negative','mixed'][i],text,weights:weights.map(w=>w/weights.reduce((a,b)=>a+b,0)),resilience};state.events.push(event);return event;
};
const canonicalBulletin=enterBulletin;
enterBulletin=function(kind){canonicalBulletin(kind);if(kind==='midnight'){const scar={central:'FOUNDING_DECISION_OVERRULED_ALLIES',federated:'FIRST_DECISION_FRAGMENTED',membership:'MEMBERSHIP_PROCESS_BYPASSED',council:'ALLIANCE_MEMBER_EXITED',open:'DUELLING_PRESS_CONFERENCES'}[state.structure];state.flags.add(scar);if(state.structure==='central')state.scars.push('ALLY_OVERRULED');}};
calculateEnding=function(){
 refreshCapabilities();const v=state.vars,pressure=absorptionPressure();
 const converted=has('LEADERS_JOIN_PARTIES')||has('TURN12_D_INDIVIDUAL_CHOICES')||state.dependency>=50||v.ind<40||has('ELECTORAL_GOVERNANCE_COLLAPSE');
 const absorbed=pressure>=70&&converted;
 const durable=[legal(),has('EVIDENCE_CAPACITY'),has('BUILT_CHAPTERS'),allied(),has('TRANSPARENT_ACCESS'),has('REPRESENTATIVE_MANDATE'),has('MOBILISATION_MACHINE')].filter(Boolean).length;
 const thrive=state.structure!=='open'&&v.org>=60&&state.leg>=50&&v.ind>=55&&v.agn>=55&&v.acc>=50&&durable>=3&&has('CRISIS_DELIVERED')&&has('VIABLE_ELECTORAL_STRATEGY');
 const relevant=v.rel>=50&&(state.leg>=55||v.mob>=50||has('EVIDENCE_CAPACITY')||state.leverage>=45||allied());
 const last=state.history.findLast(h=>!h.mini&&h.turn===11);
 const future=absorbed?'absorption':last?.choiceId==='a'?'party':has('EVIDENCE_CAPACITY')||legal()||allied()?'lobby':'social';
 return {future,endState:thrive?'THRIVE':relevant?'RELEVANCE':'SURVIVAL',pressure,durable,mechanism:absorbed?(state.leader>=60||has('LEADERS_JOIN_PARTIES')?'leaders':'alliance'):null};
};
const previousDiagnosis=movementDiagnosis;
movementDiagnosis=function(e){const d=previousDiagnosis(e);if(e.future==='absorption')d.text=e.mechanism==='leaders'?'You built recognisable leaders faster than you built an institution capable of holding them. When elections arrived, established parties did not need to defeat the movement. They recruited from it. The political capital survived, but the independent movement did not.':'You built a powerful network but never established where the movement ended and its political partners began. The constituency, demands and many organisers remained. The independent centre did not.';else if(d.state==='SURVIVED'){if(state.breadth<40)d.text='Your core became more committed while the cost of joining became too high for everyone else. The organisation remains, but fewer people can see a place for themselves in it.';else if(state.mobilisationUses>=4)d.text='Repeated confrontations kept the name alive. Each call required more effort from a thinner organising base. Other organisations became better at delivering between protests.';else if(e.future==='social')d.text='The account can still produce sparks. But the organisation behind it never developed enough independent capacity to turn attention into outcomes. Other actors now organise the constituency more effectively.';}return d;};
endingCauses=function(e){const priorities=e.future==='absorption'?['PERSONALISED_MOVEMENT','ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS','INDIVIDUAL_ELECTORAL_CONVERSION','EXPANDED_WITHOUT_GOVERNANCE']:e.endState==='THRIVE'?['BUILT_DISTRIBUTED_LEADERSHIP','BUILT_ENFORCEMENT_CAPACITY','BUILT_EVIDENCE_CAPACITY','BUILT_LOCAL_ROOTS','BUILT_TRANSPARENT_ACCESS','INSTITUTION_DELIVERED']:['EXPANDED_WITHOUT_GOVERNANCE','AMPLIFIED_WITHOUT_LOCAL_ROOTS','CAPABILITY_STRUGGLED','PRESERVED_MORAL_HIGH_GROUND','ESTABLISHED_POLITICS_DELIVERED_FOR_MEMBERS','BUILT_EVIDENCE_CAPACITY'];return state.history.filter(h=>!h.automatic).map((h,i)=>({h,i,weight:(h.tags||[]).filter(t=>priorities.includes(t)).length*30+Object.values(h.directImpact||h.impact).reduce((a,b)=>a+Math.abs(b),0)*.1})).sort((a,b)=>b.weight-a.weight).slice(0,4).sort((a,b)=>a.i-b.i).map(x=>x.h);};

TURNS[9].choices.forEach((c,i)=>c.quality=claims[i]);
TURNS[10].choices.forEach((c,i)=>c.quality=i<4?crisisQuality[i]:()=>false);
// Observable institutional conduct can reflect a hidden disposition; motives stay hidden.
const originalGovernmentReport=govtResponse;
govtResponse=function(){originalGovernmentReport();if(state.turn===8){if(has('GOVT_SEES_THREAT'))state.govtNote+=' The invitation asks delegates to specify the next planned mobilisation.';else if(has('GOVT_SEES_NEGOTIABLE_ACTOR'))state.govtNote+=' Officials ask the team to submit a case file before the meeting.';else if(has('GOVT_SEES_USEFUL_INDEPENDENT_ACTOR'))state.govtNote+=' The office offers a separate appointment rather than a joint meeting with other organisations.';}};
const governanceWithScars=governanceScene;
governanceScene=function(){const sc=governanceWithScars(),report=typeof sc.report==='function'?sc.report():sc.report;const scar=has('FOUNDING_DECISION_OVERRULED_ALLIES')?'Partners refer back to the founding decision that overruled them.':has('FIRST_DECISION_FRAGMENTED')?'Reporters recall the conflicting statements from the movement’s first night.':has('MEMBERSHIP_PROCESS_BYPASSED')?'Members ask whether the procedure bypassed on the first night will be followed now.':has('ALLIANCE_MEMBER_EXITED')?'Delegates recall the partner who left during the first disagreement.':has('DUELLING_PRESS_CONFERENCES')?'Journalists recall the two competing press conferences at the movement’s founding.':'';return {...sc,report:report+(scar?'\n\n'+scar:'')};};
