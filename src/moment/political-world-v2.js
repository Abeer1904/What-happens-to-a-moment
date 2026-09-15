// Four separate layers: capacity, public position, environment, ownership.
const resetBeforeWorld=resetGame;
resetGame=function(seed){resetBeforeWorld(seed);Object.assign(state,{popularity:78,publicOpinion:75,mediaAttention:90,mediaSentiment:72,issueSalience:85,oppositionCompetition:20,governmentPressure:75,repression:65,electoralPressure:5,ownership:85,partyDependence:0,worldHistory:[]});};
const changeBeforeWorld=change;
const worldKeys=['popularity','publicOpinion','mediaAttention','mediaSentiment','issueSalience','oppositionCompetition','governmentPressure','repression','electoralPressure','ownership','partyDependence'];
change=function(e={}){changeBeforeWorld(e);for(const k of worldKeys)if(k in e)state[k]=clamp(state[k]+e[k]);};
const bufferBeforeWorld=publicBuffer;
publicBuffer=function(){const base=.3*state.leg+.2*state.perceived+.15*state.breadth+.2*state.publicOpinion+.15*state.mediaSentiment;const crackdown=state.occupation&&state.repression>=65?(state.leg>=60?5:-5):0;return clamp(base+crackdown);};
const absorptionBeforeWorld=absorptionPressure;
absorptionPressure=function(){return clamp(absorptionBeforeWorld()+Math.max(0,55-state.ownership)*.2+state.electoralPressure*.06+Math.max(0,(state.popularity+state.vars.rel)/2-60)*.1);};
const recordBeforeWorld=recordDecision;
recordDecision=function(c,x){
 recordBeforeWorld(c,x);
 if(x.mini){
  if(x.key==='participants'&&c.id==='existing')change({ownership:-4,mediaSentiment:-3});
  if(x.key==='structure'&&['membership','federated'].includes(c.id))change({ownership:4});
  if(x.key==='funding'&&c.id==='political')change({ownership:-8,partyDependence:30});
  return;
 }
 if(x.turn===0){if(c.id==='c')state.space=clamp(state.space+4);if(c.id==='a')change({publicOpinion:10,popularity:4,mediaAttention:-10,governmentPressure:-18,repression:-20});else change({governmentPressure:10,repression:8,mediaAttention:6,publicOpinion:c.id==='c'?-5:0,issueSalience:c.id==='c'?5:0});}
 if(x.turn===1&&state.branch==='leave'){
  if(c.id==='a')change({mediaAttention:12,issueSalience:6,ownership:-4});
  if(c.id==='b')change({popularity:3,ownership:3});
  if(c.id==='c')change({publicOpinion:4,mediaAttention:-5});
  if(c.id==='d')change({ownership:-3,oppositionCompetition:4});
 }
 if(x.turn===2&&state.branch==='leave'&&c.id==='c')change({partyDependence:20,ownership:-6});
 if(x.turn===4){
  if(c.id==='a')change({mediaAttention:15,mediaSentiment:5,issueSalience:10,publicOpinion:5,ownership:3});
  else if(c.id==='b')change({issueSalience:6,publicOpinion:5,mediaAttention:3,ownership:5});
  else if(c.id==='c')change({popularity:5,ownership:6});
  else change({popularity:6,publicOpinion:6,ownership:5});
 }
 if(x.turn===5&&c.id==='a')change({mediaAttention:10,publicOpinion:-4});
 if(x.turn===6&&c.id==='d')change({mediaAttention:8,ownership:-4});
 if(x.turn===8&&c.id==='b')change({publicOpinion:-4,ownership:-4});
 if(x.turn===9){
  // Adoption of the issues is a world event, not automatic ownership by CJP.
  change({issueSalience:12,publicOpinion:5,oppositionCompetition:12});
  if(state.decisionQuality)change({ownership:6,mediaAttention:5});else change({ownership:-12,mediaAttention:-6});
 }
 if(x.turn===10){if(c.id==='e')change({ownership:-12,oppositionCompetition:7,popularity:2,partyDependence:25});else if(state.decisionQuality)change({ownership:8,popularity:5,publicOpinion:4,governmentPressure:5});}
 if(x.turn===11&&c.id==='d')change({ownership:-10});
 advancePoliticalWorld(x.turn);
};
function advancePoliticalWorld(turn){
 // Elections and competing organisations advance independently of the strategy.
 state.electoralPressure=[5,8,12,18,25,32,42,52,65,78,90,100][turn];
 change({oppositionCompetition:turn>=8?5:2,issueSalience:turn>=8?2:0});
 if(turn>=2){
  const institution=(state.vars.org+state.leverage+state.vars.agn)/3;
  const competition=state.oppositionCompetition/100;
  const loss=competition*(institution>=60?1:institution>=45?3:6);
  change({ownership:-loss});
  const campaign=has('CAMPAIGN_IDENTITY');
  change({mediaAttention:-(campaign?1:3)-state.electoralPressure/100});
  // Relevance is neither likes nor airtime: ownership and executable work matter.
  const target=.35*state.ownership+.25*state.mediaAttention+.2*state.issueSalience+.2*institution;
  change({rel:Math.max(-5,Math.min(2,(target-state.vars.rel)*.16))});
 }
 // Threat and coercion are distinct. Restrictions can persist after pressure falls.
 state.governmentPressure=clamp(.45*mobilisationEffectiveness()+.3*state.leverage+.25*state.ownership);
 if(!state.occupation)change({repression:-4});else if(state.governmentPressure>=60)change({repression:2});
}
const externalBeforeWorld=drawExternal;
drawExternal=function(c,slot){
 const event=externalBeforeWorld(c,slot);
 if(event&&event.type!=='hidden'){
  if(event.slot==='occupation'){
   if(event.type==='positive')change({publicOpinion:12,mediaSentiment:12,mediaAttention:8,popularity:3});
   else if(event.type==='negative')change({publicOpinion:-15,mediaSentiment:-15,mediaAttention:10,popularity:-3});
   else change({publicOpinion:-6,mediaSentiment:-4,mediaAttention:5});
  }else if(event.slot==='label'){
   change(event.type==='positive'?{publicOpinion:8,mediaSentiment:8}:event.type==='negative'?{publicOpinion:-12,mediaSentiment:-15,mediaAttention:12,popularity:-5}:{mediaAttention:8,publicOpinion:-5});
  }else if(event.slot.startsWith('leave')){
   change({issueSalience:5});
   if(event.type==='mixed')change({oppositionCompetition:7,ownership:-6});
   if(event.type==='positive')change({publicOpinion:4,mediaSentiment:3});
   if(event.type==='negative')change({mediaSentiment:-6,publicOpinion:-4});
  }else if(event.slot==='election'){
   if(event.type==='negative')change({ownership:-12,mediaAttention:5,oppositionCompetition:8});
   else if(event.type==='positive')change({ownership:5});
  }
 }
 if(state.turn>=2){const report=worldDispatch();state.govtNote+=(state.govtNote?' ':'')+report;}
 state.worldHistory.push({turn:state.turn,slot:event?.slot||null,publicOpinion:state.publicOpinion,popularity:state.popularity,mediaAttention:state.mediaAttention,mediaSentiment:state.mediaSentiment,issueSalience:state.issueSalience,ownership:state.ownership,relevance:state.vars.rel,politicalSpace:state.space,oppositionCompetition:state.oppositionCompetition});
 return event;
};
function worldDispatch(){
 if(state.issueSalience>=75&&state.ownership<45)return 'The issues lead the political debate, but coverage increasingly credits other organisations with taking them forward.';
 if(state.mediaAttention>=65&&state.publicOpinion<45)return 'Coverage is intense. On this dispute, public reaction runs against the movement even among some continuing supporters.';
 if(state.publicOpinion>=65&&state.mediaAttention<45)return 'People broadly agree with the demand, but reporters are following other organisations pursuing it.';
 if(state.turn>=8&&state.oppositionCompetition>=60)return 'Established parties are recruiting organisers and campaigning on the same youth issues. The space remains active and increasingly contested.';
 return '';
}
const endingBeforeWorld=calculateEnding;
calculateEnding=function(){
 const e=endingBeforeWorld(),v=state.vars;
 const migrated=has('LEADERS_JOIN_PARTIES')||has('ORGANISERS_MIGRATED')||has('INDIVIDUAL_MIGRATION_OCCURRED');
 const transferred=has('ENTERED_ESTABLISHED_PARTY')||(migrated&&v.ind<45&&state.ownership<45&&state.leader>=60);
 if(transferred){e.future='absorption';e.mechanism=state.leader>=60?'leaders':'alliance';e.subtype=has('MIGRATION_NEW_REFORM_PARTY')?'reform':'mainstream';return e;}
 // A migration scare cannot erase an institution that retained control of its capital.
 if(e.future==='absorption'){e.future='social';e.endState='SURVIVAL';}
 if(e.endState==='THRIVE'&&state.ownership>=55)return e;
 const caps=destinationCapabilities(),media=has('CAMPAIGN_IDENTITY')||state.structure==='open';
 if(v.rel>=55&&state.leg>=40&&state.mediaAttention>=55&&media&&(v.org<55||state.leverage<45)&&caps.filter(c=>c.strong).length<2){e.endState='RELEVANCE';e.future='social';e.subtype='media';e.residual=false;}
 else {e.endState='SURVIVAL';e.subtype=state.breadth<40?'core':state.governance||has('BUILT_CHAPTERS')?'organisational':'campaign';e.future=e.subtype==='organisational'?'lobby':'social';e.residual=!(state.ownership<45&&v.rel<55);}
 return e;
};
const diagnosisBeforeWorld=movementDiagnosis;
movementDiagnosis=function(e){const d=diagnosisBeforeWorld(e);if(d.state==='SURVIVED'&&state.issueSalience>=75&&state.ownership<45)d.text='Your issues remain politically important. People still support many of the demands, and parties campaign on them. But the constituency increasingly looks to other organisations to act. Your organisers and followers remain; ownership of the change has moved elsewhere.';if(d.state==='RELEVANT'&&state.mediaSentiment<40)d.text+=' Much of the attention is hostile. Being covered has not meant being trusted on every confrontation.';return d;};
const tagsBeforeWorld=decisionTags;
decisionTags=function(c,x){const tags=tagsBeforeWorld(c,x);if(!x.mini){if(x.turn===9&&!state.decisionQuality)tags.push('ISSUES_ADOPTED_BY_OTHER_ACTORS');if(x.turn===10&&c.id==='e')tags.push('PARTY_DELIVERY_DISPLACED_MOVEMENT');if((x.turn===1&&state.branch==='leave'&&c.id==='a')||(x.turn===4&&c.id==='a'))tags.push('BUILT_MEDIA_REACH');if(x.turn===10&&state.decisionQuality&&c.id!=='e')tags.push('RETAINED_OWNERSHIP_THROUGH_DELIVERY');}return tags;};
const causesBeforeWorld=endingCauses;
endingCauses=function(e){const base=causesBeforeWorld(e);if(state.ownership>=45)return base;const causal=state.history.filter(h=>(h.tags||[]).some(t=>['ISSUES_ADOPTED_BY_OTHER_ACTORS','PARTY_DELIVERY_DISPLACED_MOVEMENT'].includes(t)));const combined=[...new Set([...causal,...base])].slice(0,4);return combined.sort((a,b)=>state.history.indexOf(a)-state.history.indexOf(b));};
// The consolidated specification names both destination and capture mechanism.
const diagnosisBeforeConsolidation=movementDiagnosis;
movementDiagnosis=function(e){const d=diagnosisBeforeConsolidation(e);if(d.state==='ABSORBED'){
 const boundary=state.allianceDependency>=25||state.partyDependence>=40;
 d.text+=' '+(boundary?'You built a powerful alliance but never established where the movement ended and its political partners began. The independent centre did not survive the transition.':'You built recognisable leaders faster than you built an institution capable of holding them. Parties recruited the people carrying its political capital.');
 if(state.vars.rel>=60&&state.vars.mob>=55)d.text+=' You did not disappear because you became irrelevant. You became valuable enough to recruit from.';
 }return d;};
