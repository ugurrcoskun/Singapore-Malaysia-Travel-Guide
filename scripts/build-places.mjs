import fs from 'node:fs';
const seed=JSON.parse(fs.readFileSync('data/places-seed.json','utf8'));
const geocoded=JSON.parse(fs.readFileSync('data/geocode-results.json','utf8'));
const overrides={
  'Jewel Rain Vortex':[1.3603548,103.989693],
  'Sri Veeramakaliamman Temple':[1.3078878,103.85248],
  'Marina City Tourist Hub':[1.2913623,103.8584892],
  'BreadTalk Chinatown Point':[1.2853479,103.8450882],
  'FairPrice Joo Chiat Complex':[1.315507,103.8988342],
  'DAISO SingPost Centre':[1.3189418,103.8944605],
  'Haig Road Market and Food Centre':[1.3155435,103.895451],
  'Kedai Kopi Haig Road':[1.3155871,103.8961193],
  'Geylang Serai Market and Food Centre':[1.3167284,103.8982767],
  'Maxwell Food Centre':[1.2803361,103.844767]
};
const display={
  'BreadTalk Chinatown Point':'BreadTalk (Chinatown Point)',
  'DAISO SingPost Centre':'DAISO @ SingPost Centre',
  'Haig Road Market and Food Centre':'Haig Road Market & Food Centre',
  'Kedai Kopi Haig Road':'Kedai Kopi @ Haig Road',
  'Design Orchard':'DORS at Design Orchard'
};
const slug=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const places=seed.map(p=>{
  const hit=geocoded[p.name]?.[0];const coords=overrides[p.name]??(hit?[hit.lat,hit.lon]:null);
  if(!coords)throw Error(`Missing location: ${p.name}`);
  return {id:`${p.list}-${slug(p.name)}`,name:display[p.name]??p.name,list:p.list,lat:coords[0],lon:coords[1],...(p.paid?{paid:true}:{}),...(p.kind?{kind:p.kind}:{})};
});
if(places.length!==58)throw Error(`Expected 58 places, got ${places.length}`);
fs.writeFileSync('dist/places.js',`window.TRAVEL_PLACES = ${JSON.stringify(places)};\n`);
console.log(`Built ${places.length} mapped places`);
