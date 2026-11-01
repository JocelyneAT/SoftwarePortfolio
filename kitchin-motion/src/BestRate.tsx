import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const teal = '#00c9ac', ink = '#0b1020', card = '#192630', muted = '#a0aab7';
export const bestRateSteps = [
  {at: 0, page: 'login', title: 'A simple\nstarting point.', caption: 'Sign in and choose a currency pair.', target: [206, 618]},
  {at: 1.6, page: 'home', title: 'Compare the\nwhole picture.', caption: 'Scroll through providers before opening a quote.', target: [206, 624]},
  {at: 6.6, page: 'details', title: 'See what\nyou’ll receive.', caption: 'Check the trend, fees and final amount below.', target: [206, 875]},
  {at: 11.6, page: 'alerts', title: 'Keep an eye\non your target.', caption: 'Scroll through alerts, then add another.', target: [358, 789]},
  {at: 16, page: 'create', title: 'Set it.\nWe’ll watch it.', caption: 'Choose a target and save a new rate alert.', target: [206, 737]},
  {at: 19, page: 'saved', title: 'A clear\nconfirmation.', caption: 'The new alert appears in the monitoring list.', target: [343, 875]},
  {at: 21.5, page: 'profile', title: 'Your settings,\nin one place.', caption: 'Scroll down to connected platforms and preferences.', target: [69, 875]},
  {at: 26.5, page: 'finish', title: 'Ready for your\nnext comparison.', caption: 'Return home with the comparison tools close by.', target: [206, 501]},
];
export const BESTRATE_SECONDS = 29;
export const demoQuote = {send: 5000000, fee: 45000, rate: .00027};
const receive = (demoQuote.send - demoQuote.fee) * demoQuote.rate;
const panel: React.CSSProperties = {background: card, border: '1px solid #36424d', borderRadius: 16, padding: 20, marginBottom: 18};
const label: React.CSSProperties = {fontSize: 12, color: muted, letterSpacing: '.03em'};
const primary: React.CSSProperties = {padding: '14px 16px', borderRadius: 12, background: teal, color: '#071b1b', textAlign: 'center', fontSize: 19, fontWeight: 700};
const row: React.CSSProperties = {display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12};
const money = (value: number) => value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

const Icon = ({name, color = 'currentColor', size = 25}: {name: string; color?: string; size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{name === 'home' ? <><path d="m3 10 9-7 9 7v11H3Z"/><path d="M9 21v-8h6v8"/></> : name === 'alerts' ? <><path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5Z"/><path d="M10 21h4"/></> : name === 'profile' ? <><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2Z"/></> : <path d="m14 5-7 7 7 7M7 12h14"/>}</svg>;

const CurrencyPair = () => <div style={{...row, marginTop: 12}}><div style={{background: '#26343f', borderRadius: 10, padding: '13px 18px', flex: 1}}>IDR <span style={{float: 'right', color: muted}}>⌄</span></div><span style={{fontSize: 22}}>⇄</span><div style={{background: '#26343f', borderRadius: 10, padding: '13px 18px', flex: 1}}>MYR <span style={{float: 'right', color: muted}}>⌄</span></div></div>;

const Home = () => <>
  <h3 style={{fontSize: 38, margin: '6px 0 8px'}}>Hello, <span style={{color: teal}}>Alex!</span></h3><p style={{color: muted, margin: '0 0 26px'}}>What would you like to compare today?</p>
  <div style={panel}><div style={{...row, ...label}}><span>From</span><span>To</span></div><CurrencyPair/><p style={{margin: '22px 0 10px'}}>You send</p><div style={{...row, background: '#26343f', borderRadius: 10, padding: 15}}><span style={{fontSize: 24}}>5,000,000</span><span style={{color: muted}}>IDR</span></div></div>
  <div style={{...row, margin: '22px 0 18px'}}><span style={{color: teal, fontWeight: 600}}>↻ Refresh rates</span><span style={{...label, fontSize: 10}}>Illustrative quotes</span></div>
  {[['Wise', money(receive), 'Best net amount', '#8fea51'], ['WorldRemit', '1,325.26', 'Fee: 55,000 IDR', '#8e62d9'], ['Remitly', '1,307.78', 'Fee: 65,000 IDR', '#647ac0'], ['Revolut', '1,291.66', 'Fee: 70,000 IDR', '#eee']].map(([name, amount, note, color], i) => <div key={name} style={{...panel, padding: 0, overflow: 'hidden', background: i === 0 ? '#08332f' : card, borderColor: i === 0 ? teal : '#36424d'}}><div style={{...row, padding: 18}}><div style={{...row, gap: 12}}><div style={{width: 40, height: 40, borderRadius: 12, background: color, color: '#102a23', display: 'grid', placeItems: 'center', fontWeight: 800}}>{name[0]}</div><div><strong>{name}</strong><div style={{...label, marginTop: 5}}>{note}</div></div></div><div style={{fontWeight: 700, color: i === 0 ? teal : '#fff', textAlign: 'right'}}>{amount}<div style={label}>MYR received</div></div></div>{i === 0 && <div style={{...primary, borderRadius: 0, padding: 12}}>See details →</div>}</div>)}
  <div style={{...panel, marginTop: 24}}><h4 style={{margin: '0 0 10px', fontSize: 19}}>Compare beyond the rate</h4><p style={{margin: 0, color: muted, fontSize: 15}}>Fees affect the final amount. Open a provider to see the full breakdown.</p></div>
</>;

const Details = () => <>
  <div style={{...row, margin: '6px 0 24px'}}><h3 style={{fontSize: 35, margin: 0}}>Wise</h3><div style={{color: teal, textAlign: 'right'}}>0.00027<div style={label}>MYR per IDR</div></div></div>
  <div style={panel}><strong>Today’s trend</strong><span style={{color: teal, float: 'right', fontSize: 13}}>Example data</span><svg viewBox="0 0 310 160" style={{width: '100%', height: 165, marginTop: 20}}><path d="M5 85 60 105 118 75 176 92 234 61 305 28" fill="none" stroke={teal} strokeWidth="3"/><circle cx="305" cy="28" r="4" fill={teal}/>{['7 AM','10 AM','1 PM','4 PM','7 PM'].map((time,i)=><text key={time} x={i*65+3} y="150" fill={muted} fontSize="12">{time}</text>)}</svg></div>
  <div style={panel}><h4 style={{margin: '0 0 24px', fontSize: 20}}>Cost breakdown</h4>{[['Amount sent', '5,000,000 IDR'],['Exchange rate', '0.00027 MYR / IDR'],['Before fees', '1,350.00 MYR'],['Transfer fee', '45,000 IDR']].map(([name,value])=><div key={name} style={{...row, margin: '20px 0', fontSize: 15}}><span style={{color: muted}}>{name}</span><strong>{value}</strong></div>)}<div style={{marginTop: 26, paddingTop: 20, borderTop: '1px solid #36424d'}}><p style={{color: muted, margin: 0}}>You receive</p><div style={{fontSize: 37, color: teal, fontWeight: 700}}>{money(receive)} MYR</div></div></div>
  <div style={panel}><h4 style={{margin: '0 0 16px', fontSize: 20}}>Before you continue</h4><div style={{...row, fontSize: 15}}><span style={{color: muted}}>Estimated delivery</span><strong>Within 1 business day</strong></div><p style={{color: muted, fontSize: 14, margin: '18px 0 0'}}>You would continue on the provider’s app to review the final quote and arrange a transfer.</p></div><div style={primary}>Continue to provider ↗</div><p style={{fontSize: 12, color: muted, textAlign: 'center', margin: '18px 0'}}>Demo only · no transfer is made</p>
</>;

const Alerts = ({saved = false}: {saved?: boolean}) => <>
  <h3 style={{fontSize: 34, margin: '8px 0'}}>Get notified</h3><p style={{color: muted, marginBottom: 26}}>When a rate reaches your target.</p>
  {saved && <div style={{...panel, borderColor: teal, color: teal, fontWeight: 600}}>✓ Your new alert is ready</div>}
  <div style={{...label, color: teal, marginBottom: 18}}>{saved ? '3' : '2'} active alerts</div>
  {(saved ? [['IDR → MYR','0.00028','0.00027'],['KRW → MYR','0.0032','0.0030'],['CNY → MYR','0.64','0.61']] : [['IDR → MYR','0.00028','0.00027'],['KRW → MYR','0.0032','0.0030'],['CNY → MYR','0.64','0.61']]).map(([pair,target,current],i)=><div key={pair} style={{...panel, opacity: !saved && i===2 ? .6 : 1}}><h4 style={{fontSize: 26, margin: '0 0 28px'}}>{pair}</h4><div style={row}><div><p style={label}>Target rate</p><strong style={{fontSize: 30, color: teal}}>{target}</strong></div><div><p style={label}>Current rate</p><strong style={{fontSize: 30}}>{current}</strong></div></div><div style={{...row, marginTop: 24, fontSize: 13, color: muted}}><span>{!saved && i===2 ? 'Paused' : '● Monitoring market'}</span><div style={{width: 38, height: 22, borderRadius: 20, background: !saved && i===2 ? '#46535c' : teal, padding: 3}}><div style={{width: 16, height: 16, background: ink, borderRadius: '50%', marginLeft: !saved && i===2 ? 0 : 16}}/></div></div></div>)}
  <p style={{color: muted, fontSize: 14, padding: '4px 0 24px'}}>Pause an alert whenever you no longer need it.</p>
</>;

const Profile = () => <>
  <div style={{textAlign: 'center', padding: '12px 0 30px'}}><div style={{width: 90, height: 90, borderRadius: '50%', background: '#172b3c', margin: '0 auto 18px', display: 'grid', placeItems: 'center', fontSize: 32, fontWeight: 700}}>AM</div><h3 style={{fontSize: 30, margin: 0}}>Alex Morgan</h3><p style={{color: muted, margin: '8px 0 0'}}>alex@example.test</p></div>
  {[['Account','Personal information','Security and privacy'],['App preferences','Language','Appearance','Notifications'],['Connected platforms','Wise','Revolut','Remitly','WorldRemit'],['Support','Help centre','About BestRate']].map(([heading,...items])=><div key={heading}><p style={{...label, margin: '24px 0 12px'}}>{heading}</p><div style={panel}>{items.map((item,i)=><div key={item} style={{...row, padding: '13px 0', borderTop: i ? '1px solid #36424d' : 'none', fontSize: 16}}><span>{item}</span>{heading==='Connected platforms' ? <span style={{fontSize: 12, color: i < 2 ? teal : muted}}>{i<2?'Connected':'Connect'}</span>:<span style={{color: muted}}>›</span>}</div>)}</div></div>)}<p style={{color: muted, fontSize: 12, textAlign: 'center', padding: '8px 0 20px'}}>BestRate / Design concept</p>
</>;

const Login = () => <div style={{paddingTop: 65}}><h3 style={{fontSize: 48, textAlign: 'center', margin: '0 0 8px'}}><span style={{color: teal}}>Best</span>Rate</h3><p style={{color: muted, textAlign: 'center', marginBottom: 48}}>Find the best rate, every time.</p><div style={panel}><p>Email address</p><div style={{padding: 15, background: '#26343f', borderRadius: 10, color: muted}}>alex@example.test</div><p style={{marginTop: 24}}>Password</p><div style={{padding: 15, background: '#26343f', borderRadius: 10}}>••••••••••</div><p style={{color: teal, fontSize: 13, textAlign: 'right', margin: '18px 0 24px'}}>Forgot password?</p><div style={primary}>Log in</div></div><p style={{textAlign: 'center', color: muted, fontSize: 14, marginTop: 28}}>New here? <span style={{color: teal}}>Create account</span></p></div>;

const CreateAlert = () => <><h3 style={{fontSize: 32, margin: '12px 0'}}>Create an alert</h3><p style={{color: muted, marginBottom: 26}}>Choose a rate worth waiting for.</p><div style={panel}><p style={label}>Currency pair</p><CurrencyPair/><p style={{marginTop: 30}}>Target rate</p><div style={{background:'#26343f',padding:18,borderRadius:10,fontSize:28,color:teal}}>0.00028 <span style={{fontSize:12,color:muted}}>MYR per IDR</span></div><p style={{color:muted,fontSize:13}}>Current example: 0.00027 MYR per IDR</p></div><div style={panel}><strong>Notify me by</strong><div style={{...row,marginTop:22}}><span>Push notification</span><span style={{color:teal}}>✓</span></div><div style={{...row,marginTop:20,color:muted}}><span>Email</span><span>○</span></div></div><div style={{...primary,marginTop:34}}>Save alert</div></>;

const BestRatePhone = () => {
  const frame=useCurrentFrame(), {fps}=useVideoConfig(), seconds=frame/fps;
  const index=bestRateSteps.reduce((n,step,i)=>seconds>=step.at?i:n,0), step=bestRateSteps[index], local=seconds-step.at;
  const active=step.page==='saved' || step.page==='create' ? 'alerts' : step.page==='finish' ? 'home' : step.page;
  const scrollMax=step.page==='create'?0:active==='home'?270:active==='details'?245:active==='alerts'?255:active==='profile'?350:0;
  const scroll=interpolate(local,[.7,1.9,3.1,4.1],[0,scrollMax,scrollMax,active==='home'?0:scrollMax],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
  const nextAt=bestRateSteps[index+1]?.at??BESTRATE_SECONDS, tapAge=seconds-(nextAt-.22);
  const move=interpolate(seconds,[nextAt-.75,nextAt-.28],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
  const x=345+(step.target[0]-345)*move,y=720+(step.target[1]-720)*move;
  const enter=interpolate(local,[0,.2],[24,0],{extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  return <div data-ui="bestrate-prototype" data-bestrate-page={step.page} style={{width:436,height:941,padding:12,borderRadius:53,background:'#272d36',boxShadow:'0 24px 65px #09172730,inset 0 0 0 3px #737d88'}}><div className="bestrate-screen" style={{position:'relative',width:412,height:917,borderRadius:42,overflow:'hidden',background:ink,color:'#f4f6f9',fontFamily:'Geist,Arial,sans-serif',fontSize:17,lineHeight:1.35}}>
    <style>{'.bestrate-screen p,.bestrate-screen h3,.bestrate-screen h4{margin:0}'}</style>
    <div style={{...row,position:'absolute',zIndex:5,top:0,left:0,right:0,height:46,padding:'10px 25px',fontSize:13,background:ink}}><span>9:41</span><div style={{height:17,width:76,background:'#000',borderRadius:20}}/><span>▰</span></div>
    <div style={{...row,position:'absolute',zIndex:4,top:46,left:0,right:0,height:56,padding:'0 26px',background:'#10182a'}}><span style={{color:teal,fontSize:20}}>{active==='home'?'BestRate':'←'}</span><strong style={{fontSize:14,color:active==='home'?teal:muted}}>{active==='home'?'Compare':active==='details'?'Provider details':active==='alerts'?'Rate alerts':active==='profile'?'Profile':''}</strong></div>
    <div style={{position:'absolute',top:102,bottom:step.page==='login'?0:70,left:0,right:0,overflow:'hidden'}}><div data-app-scroll={Math.round(scroll)} style={{padding:'24px 26px 28px',translate:`${enter}px ${-scroll}px`}}>{step.page==='login'?<Login/>:step.page==='create'?<CreateAlert/>:active==='home'?<Home/>:active==='details'?<Details/>:active==='alerts'?<Alerts saved={step.page==='saved'}/>:<Profile/>}</div></div>
    {scrollMax>0 && <div style={{position:'absolute',right:4,top:120+scroll*.9,width:3,height:90,borderRadius:4,background:'#65717e70'}}/>}
    {step.page!=='login' && <div style={{...row,position:'absolute',zIndex:5,bottom:0,left:0,right:0,height:70,padding:'9px 35px',background:'#10182a'}}>{['home','alerts','profile'].map(item=><div key={item} style={{textAlign:'center',color:active===item || active==='details'&&item==='home'?teal:'#c4ccd6'}}><Icon name={item}/><div style={{fontSize:10,marginTop:2}}>{item[0].toUpperCase()+item.slice(1)}</div></div>)}</div>}
    {active==='alerts' && step.page!=='create' && <div style={{position:'absolute',right:26,bottom:100,width:56,height:56,borderRadius:'50%',background:teal,color:ink,fontSize:40,textAlign:'center',lineHeight:'52px'}}>+</div>}
    {index<bestRateSteps.length-1 && <><svg width="32" height="38" viewBox="0 0 38 44" style={{position:'absolute',zIndex:7,left:x,top:y,opacity:local>.4?1:0,filter:'drop-shadow(0 2px 3px #0008)',scale:tapAge>0&&tapAge<.1?.85:1}}><path d="M3 2L5 34L14 26L21 41L28 37L20 23L33 22Z" fill="#fff" stroke="#143c38" strokeWidth="2.5" strokeLinejoin="round"/></svg>{tapAge>0&&tapAge<.22&&<div style={{position:'absolute',zIndex:6,left:x-23,top:y-23,width:46,height:46,border:`3px solid ${teal}`,borderRadius:'50%',scale:1+tapAge*4,opacity:1-tapAge/.22}}/>}</>}
  </div></div>;
};

export const BestRateWalkthrough:React.FC<{compact?:boolean}>=({compact=false})=>{
  const frame=useCurrentFrame(),{fps}=useVideoConfig(),seconds=frame/fps;
  const step=bestRateSteps[bestRateSteps.reduce((n,s,i)=>seconds>=s.at?i:n,0)];
  return <AbsoluteFill style={{background:'#e6eeef',color:'#172d35',fontFamily:'Geist,Arial,sans-serif'}}><div style={{position:'absolute',top:compact?44:100,left:compact?48:90,fontSize:30}}>BestRate / App in motion</div><div style={{position:'absolute',left:compact?48:90,top:compact?820:245,width:compact?624:610}}><div style={{fontFamily:'"Instrument Serif",Georgia,serif',fontSize:compact?56:80,lineHeight:1.04,letterSpacing:'-.04em',whiteSpace:'pre-line'}}>{compact?step.title.replace('\n',' '):step.title}</div><div style={{fontSize:compact?25:28,lineHeight:1.5,marginTop:28,maxWidth:490,color:'#425c65'}}>{step.caption}</div></div><div style={{position:'absolute',left:compact?207:860,top:compact?118:70,scale:compact?'.70':'.81',translate:`0 ${Math.sin(seconds*.8)*5}px`,rotate:`${Math.sin(seconds*.5)*.5}deg`,transformOrigin:'top left'}}><BestRatePhone/></div></AbsoluteFill>;
};
