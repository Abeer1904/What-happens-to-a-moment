// Destinations of political power: Shapes / Amplifies / Exists / Transfers.
// Demonstrated outcomes are remembered separately from capability possession.
const recordBeforeDestinations=recordDecision;
recordDecision=function(c,x){
 recordBeforeDestinations(c,x);
 if(x.mini)return;
 const f=state.flags;
 if((x.turn===1&&state.branch==='leave'&&c.id==='a')||(x.turn===4&&c.id==='a')||(x.turn===6&&c.id==='d')||(x.turn===11&&c.id==='c'))f.add('CAMPAIGN_IDENTITY');
 if(x.turn===4&&c.id==='a')f.add('SHAPED_POST_VICTORY_ISSUE'); // verified stories enter public debate
 if(x.turn===9&&state.decisionQuality&&['b','c'].includes(c.id))f.add('SHAPED_POST_VICTORY_ISSUE');
 if(x.turn===10&&state.decisionQuality&&c.id!=='e'){
  f.add('FORCED_INDEPENDENT_OUTCOME');
  if(c.id==='a')f.add('DELIVERED_LEGAL');
  if(c.id==='b')f.add('DELIVERED_COALITION');
  if(c.id==='c'&&has('TRANSPARENT_ACCESS'))f.add('DELIVERED_TRANSPARENT_ACCESS');
 }
};
const bulletinBeforeDestinations=enterBulletin;
enterBulletin=function(kind){bulletinBeforeDestinations(kind);if(kind==='relents'){
 const decision=state.history.findLast(h=>!h.mini&&h.turn===2);
 // The same government concession is certain; ownership depends on the route used.
 if(decision&&['a','b','d'].includes(decision.choiceId))state.flags.add('FORCED_INDEPENDENT_OUTCOME');
 if(decision?.choiceId==='b')state.flags.add('DELIVERED_LEGAL');
}};
const externalBeforeDestinations=drawExternal;
drawExternal=function(c,slot){const event=externalBeforeDestinations(c,slot);if(event?.slot==='election'&&event.type==='negative'){
 const newer=state.charter==='democracy'||(has('WIDENED_TO_YOUTH')&&has('SERVICE_CAPACITY'));
 state.flags.add(newer?'MIGRATION_NEW_REFORM_PARTY':'MIGRATION_MAINSTREAM_PARTY');
 event.text+=(newer?' A newer reform party presents itself as the electoral home of the movement’s youth and accountability programme.':' An established mainstream party offers the departing organisers roles in its campaign network.');
 }return event;};
function destinationCapabilities(){
 const v=state.vars;
 return [
  {id:'legal',built:legal(),strong:v.org+v.acc>=100,delivered:has('DELIVERED_LEGAL')},
  {id:'evidence',built:has('EVIDENCE_CAPACITY'),strong:v.org>=45&&v.agn>=55,delivered:has('DELIVERED_EVIDENCE')},
  {id:'chapters',built:has('BUILT_CHAPTERS'),strong:v.org>=50&&v.acc>=45,delivered:has('DELIVERED_CHAPTERS')},
  {id:'coalition',built:allied(),strong:state.trust>=65&&state.perceived>=45,delivered:has('DELIVERED_COALITION')},
  {id:'access',built:has('TRANSPARENT_ACCESS'),strong:state.leverage>=50,delivered:has('DELIVERED_TRANSPARENT_ACCESS')}
 ].filter(c=>c.built);
}
calculateEnding=function(){
 const v=state.vars,caps=destinationCapabilities();
 const migrated=has('LEADERS_JOIN_PARTIES')||has('ORGANISERS_MIGRATED')||has('INDIVIDUAL_MIGRATION_OCCURRED');
 const formal=has('ENTERED_ESTABLISHED_PARTY');
 const absorbed=formal||(state.leader>=60&&migrated&&v.ind<45);
 const pillars={pressure:(v.mob>=55||allied())&&v.org>=55&&has('FORCED_INDEPENDENT_OUTCOME'),narrative:v.rel>=60&&v.agn>=55&&has('SHAPED_POST_VICTORY_ISSUE'),change:caps.length>=2&&state.leverage>=50&&caps.some(c=>c.delivered)};
 const thrive=!absorbed&&v.ind>=50&&Object.values(pillars).every(Boolean);
 const media=has('CAMPAIGN_IDENTITY')||state.structure==='open';
 const relevant=!absorbed&&!thrive&&v.rel>=55&&state.leg>=40&&media&&(v.org<55||state.leverage<45)&&caps.filter(c=>c.strong).length<2;
 const endState=thrive?'THRIVE':relevant?'RELEVANCE':'SURVIVAL';
 const subtype=absorbed?(has('MIGRATION_NEW_REFORM_PARTY')?'reform':'mainstream'):thrive?'political':relevant?'media':state.breadth<40?'core':state.governance||has('BUILT_CHAPTERS')?'organisational':'campaign';
 // The four-state tree needs a residual destination for institutions that fail
 // the three pillars without fitting the specific media trajectory.
 const residual=!absorbed&&!thrive&&!relevant&&(v.rel>=55||v.mob>=50||state.leverage>=45||has('SHAPED_POST_VICTORY_ISSUE'));
 return {future:absorbed?'absorption':relevant?'social':thrive?'lobby':subtype==='organisational'?'lobby':'social',endState,subtype,residual,pillars,durable:caps.length,mechanism:absorbed?(state.leader>=60?'leaders':'alliance'):null};
};
movementDiagnosis=function(e){
 const status=e.future==='absorption'?'ABSORBED':{THRIVE:'THRIVED',RELEVANCE:'RELEVANT',SURVIVAL:'SURVIVED'}[e.endState];
 const data={
 THRIVED:{verb:'Shapes',form:'Independent Political Force',text:'The movement can still create pressure, but pressure is no longer the only thing it can do. It can put issues into the political conversation, organise people around them and make institutions respond. Other political actors have entered the space you opened, but they have not made you unnecessary.',closing:'You turned a moment into political power.'},
 RELEVANT:{verb:'Amplifies',form:'Political Media and Campaign Organisation',text:'You can still make something trend. A campaign can put an issue into the news, embarrass an institution or bring thousands of people into a conversation. But increasingly, that is where your power ends. Others organise the protests, provide the lawyers, negotiate with Government and convert the anger into political action. You remain a political media force. You did not become a durable political force.',closing:'You kept the account. You lost the movement.'},
 SURVIVED:{verb:'Exists',form:{core:'A Committed Core',organisational:'A Continuing Movement Organisation',campaign:'An Occasional Campaign Network'}[e.subtype],text:e.residual?'Parts of the movement still carry political weight. But pressure, agenda-setting and institutional delivery never became a dependable combination. You retain an independent organisation or community; it has not secured a lasting command of the space the original moment opened.':'You still have followers, organisers and occasional campaigns. But the political space you opened is now occupied by people with stronger organisations, clearer constituencies and greater access to power. Increasingly, they set the questions and you respond to them. You did not disappear. You became smaller than the political moment you created.',closing:e.residual?'The movement remains. Its political role is still unresolved.':'The movement is still here. The moment isn’t.'},
 ABSORBED:{verb:'Transfers',form:e.subtype==='reform'?'Part of a Newer Reform Party':'Part of an Established Mainstream Party',text:e.subtype==='reform'?'A newer political vehicle presents itself as the institutional home of your youth and anti-establishment politics. Organisers move into its electoral machinery, and recognisable leaders speak from its platforms. The political capital has a vehicle, but the movement no longer controls it.':'The leaders, issues and constituency you helped create now have a route into electoral politics. But that route belongs to an established party. Your organisers campaign beside its workers, your demands appear in its programme and some of your most recognisable leaders now speak from its platforms.',closing:'The political capital survived. The independent movement did not.'}
 }[status];return {state:status,...data};
};
const causesBeforeDestinations=endingCauses;
endingCauses=function(e){
 const selected=causesBeforeDestinations(e);
 // Delivery and agenda-setting, rather than raw capacity, are the thrive evidence.
 if(e.endState!=='THRIVE'||e.future==='absorption')return selected;
 const h=state.history.filter(h=>!h.automatic),rank=x=>(x.turn===10&&x.choiceId!=='e'?50:0)+(x.turn===9&&['b','c'].includes(x.choiceId)?40:0)+(x.turn===4?35:0)+(x.key==='structure'?30:0)+(x.turn===2&&x.choiceId==='b'?40:0);
 return h.map((x,i)=>({x,i,w:rank(x)})).sort((a,b)=>b.w-a.w).slice(0,4).sort((a,b)=>a.i-b.i).map(o=>o.x);
};
// A substantiated comparative advantage can produce an observable institutional
// outcome. Owning a register or naming chapters alone does not grant delivery.
const recordWithDestinationEvidence=recordDecision;
recordDecision=function(c,x){recordWithDestinationEvidence(c,x);if(x.mini||x.turn!==9||!state.decisionQuality)return;
 if(c.id==='b'&&has('TRANSPARENT_ACCESS')&&state.leverage>=50){state.flags.add('DELIVERED_EVIDENCE');state.flags.add('FORCED_INDEPENDENT_OUTCOME');}
 if(c.id==='c'&&state.vars.acc>=45&&state.leverage>=50){state.flags.add('DELIVERED_CHAPTERS');state.flags.add('FORCED_INDEPENDENT_OUTCOME');}
};
TURNS[9].choices[1].out=()=>!claims[1]()?'You say evidence is your strength. But there is no maintained record or coherent programme that institutions have to answer.':has('TRANSPARENT_ACCESS')&&state.leverage>=50?'Your published register becomes the basis of the next education hearing. Officials answer the documented cases and issue a corrective timetable. Journalists return to the issue on terms your evidence helped establish.':'Your evidence record brings the school issue back into the news. Officials face specific questions, although no corrective commitment has yet followed.';
TURNS[9].choices[2].out=()=>!claims[2]()?'You say local organisation is your strength. But the committees lack the coordination needed to sustain work beyond the national call.':state.vars.acc>=45&&state.leverage>=50?'Parent committees secure repairs through the departments they have learned to work with. Their reports bring the wider school issue back into local public meetings. Work continues without a fresh national protest.':'Local organisers keep the school issue in public meetings and continue following cases. Families still await an institutional response to the outstanding repairs.';
