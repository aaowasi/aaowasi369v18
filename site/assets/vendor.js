export const fields=[['critical_service','Supports a critical service'],['personal_data','Processes personal data'],['dpa_signed','Signed processor agreement available'],['subprocessors_authorized','Subprocessors authorized'],['training_opt_out','Training use excluded for intended data']];
export function evaluateVendor(v,now=new Date()){
 const missing=fields.filter(([k])=>typeof v[k]!=='boolean').map(([,label])=>label);
 const reasons=[];let score=0;
 if(v.critical_service===true)score+=25;if(v.personal_data===true)score+=15;
 if(v.personal_data!==false&&v.dpa_signed!==true){reasons.push('Obtain a signed processor agreement before personal-data processing.');score+=20;}
 if(v.personal_data!==false&&v.subprocessors_authorized!==true){reasons.push('Resolve subprocessor authorization.');score+=15;}
 if(v.training_opt_out!==true){reasons.push('Resolve training use for the intended data.');score+=15;}
 const observed=new Date(v.security_evidence_date+'T00:00:00Z');const age=Math.floor((Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate())-observed.getTime())/86400000);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(v.security_evidence_date||'')||!Number.isFinite(age)||observed.toISOString().slice(0,10)!==v.security_evidence_date||age<0||age>365){reasons.push('Supply valid security evidence dated within the last 365 days.');score+=10;}
 if(missing.length)reasons.push('Confirm unknown answers: '+missing.join(', ')+'.');
 return {rule_version:'2.0.0',decision:reasons.length?'hold':'ready_for_human_review',score:Math.min(100,score),tier:v.critical_service===true?1:v.personal_data===true?2:3,reasons,missing,inputs:v,evaluated_at:now.toISOString(),human_approval_required:true,scope:'Intake assertions evaluated locally; reviewer verifies evidence and approves.'};
}
