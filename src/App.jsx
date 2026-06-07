import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
];

const COUNTRY_CODES = [
  { code: "+256", country: "🇺🇬 Uganda" },
  { code: "+1", country: "🇺🇸 USA / Canada" },
  { code: "+44", country: "🇬🇧 UK" },
  { code: "+27", country: "🇿🇦 South Africa" },
  { code: "+234", country: "🇳🇬 Nigeria" },
  { code: "+254", country: "🇰🇪 Kenya" },
  { code: "+233", country: "🇬🇭 Ghana" },
  { code: "+255", country: "🇹🇿 Tanzania" },
  { code: "+250", country: "🇷🇼 Rwanda" },
  { code: "+251", country: "🇪🇹 Ethiopia" },
  { code: "+91", country: "🇮🇳 India" },
  { code: "+61", country: "🇦🇺 Australia" },
  { code: "+971", country: "🇦🇪 UAE" },
  { code: "+966", country: "🇸🇦 Saudi Arabia" },
  { code: "+49", country: "🇩🇪 Germany" },
  { code: "+33", country: "🇫🇷 France" },
];

const JOB_MATERIALS = {
  "Residential Wiring": [
    "PVC Flat Twin Cable 1.5mm (per m)","PVC Flat Twin Cable 2.5mm (per m)","PVC Flat Twin Cable 4mm (per m)","PVC Flat Twin Cable 6mm (per m)","PVC Single Core Cable 1.5mm (per m)","PVC Single Core Cable 2.5mm (per m)","Earth Cable 1.5mm Green/Yellow (per m)","Meter Tails 16mm (per m)","Single Socket Outlet (13A)","Double Socket Outlet (13A)","Single Socket Outlet with USB","Double Socket Outlet with USB","1 Gang 1 Way Switch","2 Gang 1 Way Switch","1 Gang 2 Way Switch","2 Gang 2 Way Switch","Intermediate Switch","Ceiling Rose","Batten Lamp Holder","Surface Lamp Holder","Consumer Unit 4-way","Consumer Unit 6-way","Consumer Unit 8-way","Consumer Unit 12-way","MCB 6A","MCB 10A","MCB 16A","MCB 20A","MCB 32A","MCB 40A","RCCB 63A 30mA","RCBO 16A 30mA","RCBO 20A 30mA","RCBO 32A 30mA","Surge Protection Device (SPD)","Main Switch 63A","Main Switch 100A","PVC Conduit 20mm (per m)","PVC Conduit 25mm (per m)","PVC Conduit 32mm (per m)","Conduit Bends 20mm","Conduit Couplers 20mm","Conduit Saddle Clips","PVC Trunking 25x16mm (per m)","PVC Trunking 38x25mm (per m)","PVC Trunking 50x50mm (per m)","Trunking End Caps","Trunking Angles","1 Gang Surface Box","2 Gang Surface Box","1 Gang Flush Box","2 Gang Flush Box","3 Gang Flush Box","4 Gang Flush Box","Round Junction Box 75mm","Square Junction Box","Watertight Junction Box","Meter Box (Prepaid)","Earth Rod 1.2m","Earth Rod Clamp","Earth Bar","Earth Tape (per m)","Insulation Tape (roll)","Cable Ties (pack)","Wall Plugs & Screws (pack)","Rawl Plugs (pack)"
  ],
  "Commercial Wiring": [
    "Armoured Cable (SWA) 2.5mm 3-core (per m)","Armoured Cable (SWA) 4mm 3-core (per m)","Armoured Cable (SWA) 6mm 3-core (per m)","Armoured Cable (SWA) 10mm 3-core (per m)","Armoured Cable (SWA) 16mm 4-core (per m)","Armoured Cable (SWA) 25mm 4-core (per m)","Armoured Cable (SWA) 35mm 4-core (per m)","Armoured Cable (SWA) 50mm 4-core (per m)","NYY Cable 4mm 4-core (per m)","NYY Cable 6mm 4-core (per m)","NYY Cable 10mm 4-core (per m)","Flexible Cable 1.5mm 3-core (per m)","3-Phase Distribution Board 8-way","3-Phase Distribution Board 12-way","3-Phase Distribution Board 18-way","3-Phase Distribution Board 24-way","MCCB 63A 3-phase","MCCB 100A 3-phase","MCCB 160A 3-phase","MCCB 250A 3-phase","MCB 3-phase 16A","MCB 3-phase 32A","MCB 3-phase 63A","Busbar Chamber","Neutral Link Bar","Earth Bar 3-phase","Isolator Switch 63A 3-phase","Isolator Switch 100A 3-phase","Industrial Socket 16A 3-phase","Industrial Socket 32A 3-phase","Industrial Plug 16A","Industrial Plug 32A","3-phase Energy Meter","Single Phase Energy Meter (Prepaid)","Current Transformer (CT) 100A","Current Transformer (CT) 200A","Cable Tray 100mm (per m)","Cable Tray 150mm (per m)","Cable Tray 300mm (per m)","Cable Ladder 300mm (per m)","Cable Ladder 450mm (per m)","Cable Tray Brackets","Cable Tray Couplers","Cable Tray Bends","Steel Conduit 20mm (per m)","Steel Conduit 25mm (per m)","Metal Trunking 100x50mm (per m)","Cable Glands (pack)","LED Batten 36W (4ft)","LED Batten 18W (2ft)","LED High Bay 100W","LED High Bay 150W","LED High Bay 200W","LED Floodlight 50W","LED Floodlight 100W","LED Panel Light 40W 600x600","Emergency Light Twin Spot","Exit Sign LED","PIR Sensor (ceiling)","Fire Alarm Control Panel","Smoke Detector","Heat Detector","Manual Call Point","Alarm Bell","Alarm Sounder","Safety Sign (Electrical Danger)","Warning Labels (pack)"
  ],
  "Panel Upgrade": [
    "Consumer Unit 6-way with RCD","Consumer Unit 8-way with RCD","Consumer Unit 10-way with RCD","Consumer Unit 12-way with RCD","Consumer Unit 16-way with RCD","Consumer Unit 18-way with RCD","3-Phase Distribution Board 8-way","3-Phase Distribution Board 12-way","3-Phase Distribution Board 18-way","MCB 6A Type B","MCB 10A Type B","MCB 16A Type B","MCB 20A Type B","MCB 32A Type B","MCB 40A Type B","MCB 63A Type B","MCB 16A Type C","MCB 32A Type C","MCB 63A Type C","RCCB 40A 30mA","RCCB 63A 30mA","RCCB 100A 30mA","RCBO 6A 30mA","RCBO 10A 30mA","RCBO 16A 30mA","RCBO 20A 30mA","RCBO 32A 30mA","RCBO 40A 30mA","Surge Protection Device (Type 2)","Surge Protection Device (Type 1+2)","Main Isolator Switch 63A","Main Isolator Switch 100A","Main Isolator Switch 160A","MCCB 63A","MCCB 100A","MCCB 160A","MCCB 250A","Busbar 63A","Busbar 100A","Neutral Bar","Earth Bar","DIN Rail (per m)","DIN Rail End Stops","Meter Tails 16mm Red (per m)","Meter Tails 16mm Black (per m)","Meter Tails 25mm (per m)","Earth Cable 10mm (per m)","Earth Cable 16mm (per m)","Cable 6mm Twin & Earth (per m)","Metal Enclosure Box 300x400","Metal Enclosure Box 400x600","Plastic Enclosure IP65","Weatherproof Enclosure IP67","Meter Box (Prepaid UMEME)","Meter Box (Postpaid)"
  ],
  "EV Charger Installation": [
    "EV Charger Unit 7kW (Type 2)","EV Charger Unit 11kW (Type 2)","EV Charger Unit 22kW (Type 2)","EV Charger Unit 3.6kW (Type 1)","Armoured Cable 6mm 3-core (per m)","Armoured Cable 10mm 3-core (per m)","Armoured Cable 16mm 3-core (per m)","MCB 32A Type B","MCB 40A Type B","MCB 32A Type C","MCB 40A Type C","RCCB 40A 30mA Type A","RCCB 63A 30mA Type A","Isolator Switch 40A","Isolator Switch 63A","Consumer Unit (dedicated 4-way)","Surge Protection Device","Weatherproof Enclosure IP65","Wall Mounting Bracket","PVC Conduit 32mm (per m)","Steel Conduit 25mm (per m)","Cable Trunking (per m)","Earth Rod 1.2m","Earth Cable 6mm (per m)","Cable Glands","Warning Labels","CT Clamp 100A"
  ],
  "Lighting Installation": [
    "LED Downlight 7W Recessed","LED Downlight 10W Recessed","LED Downlight 15W Recessed","LED Bulb E27 9W","LED Bulb E27 12W","LED Bulb B22 9W","LED Bulb B22 12W","LED Batten 18W 2ft","LED Batten 36W 4ft","LED Batten 20W Surface","LED Panel Light 40W 600x600","LED Panel Light 18W 300x300","LED Strip Light 5m (roll)","LED Strip Light Power Supply 60W","LED Floodlight 20W","LED Floodlight 30W","LED Floodlight 50W","LED Floodlight 100W","LED Streetlight 30W","LED Streetlight 50W","LED Streetlight 80W","LED High Bay 100W","LED High Bay 150W","Solar Street Light 30W (all-in-one)","Solar Street Light 50W","Ceiling Rose","Surface Lamp Holder B22","Batten Holder B22","Pendant Fitting","Track Light Fitting 3-circuit","Track Rail (per m)","Outdoor Bulkhead Light 20W","Wall Light Fitting","Emergency Light Twin Spot","Exit Sign LED Green","1 Gang 1 Way Switch","2 Gang 1 Way Switch","1 Gang 2 Way Switch","2 Gang 2 Way Switch","Intermediate Switch","Dimmer Switch 250W","PIR Motion Sensor (wall)","PIR Motion Sensor (ceiling)","Photocell Sensor","Timer Switch","Smart Switch WiFi","PVC Cable 1.5mm Twin & Earth (per m)","PVC Conduit 20mm (per m)","Conduit Clips","Junction Box Round 75mm","Cable Ties (pack)","Transformer 12V 60W","Transformer 24V 60W"
  ],
  "Fault Finding": [
    "MCB 6A","MCB 10A","MCB 16A","MCB 20A","MCB 32A","MCB 40A","RCCB 40A 30mA","RCCB 63A 30mA","RCBO 16A 30mA","RCBO 32A 30mA","Fuse 6A","Fuse 13A","Fuse 30A","Fuse Carrier","Single Socket Outlet 13A","Double Socket Outlet 13A","1 Gang Switch","2 Gang Switch","PVC Cable 1.5mm (per m)","PVC Cable 2.5mm (per m)","PVC Cable 4mm (per m)","Flexible Cable 1.5mm (per m)","Earth Cable 1.5mm Green/Yellow (per m)","Junction Box Round","Junction Box Square","Connector Block (strip)","Chocolate Block Connector 5A","Chocolate Block Connector 15A","Insulation Tape (roll)","Cable Clips 20mm (pack)","Earth Clamp","Earthing Compound","Cable Ties (pack)","Terminal Block Din Rail","DIN Rail (per m)","Electrical Contact Cleaner (can)","Penetrating Oil (can)","Heat Shrink Tubing (pack)","Cable Markers (pack)","Wire Ferrules (pack)","Test Leads (pair)"
  ],
  "Safety Inspection": [
    "Test Labels (pack)","Periodic Inspection Report Forms","Cable Markers (pack)","Warning Labels (pack)","Danger - Electrical Signs","Caution Signs","Earth Rod 1.2m","Earth Rod Clamp","Earth Cable 6mm (per m)","Earthing Compound","Terminal Block","Junction Box","MCB 16A (spare)","MCB 32A (spare)","Fuse 13A (pack)","Insulation Tape (roll)","Cable Ties (pack)","Socket Outlet Cover Plates","Switch Face Plates","Blanking Plates (pack)","DIN Rail End Stops","Enclosure Gaskets","IP Rated Blanks"
  ],
  "Solar Integration": [
    "Solar Panel 250W Polycrystalline","Solar Panel 330W Monocrystalline","Solar Panel 400W Monocrystalline","Solar Panel 500W Monocrystalline","Solar Panel 550W Monocrystalline Half-Cell","Solar Inverter Off-Grid 1kW","Solar Inverter Off-Grid 2kW","Solar Inverter Off-Grid 3kW","Solar Inverter Off-Grid 5kW","Solar Inverter Hybrid 3kW","Solar Inverter Hybrid 5kW","Solar Inverter Hybrid 8kW","Solar Inverter Hybrid 10kW","Solar Inverter Grid-Tie 3kW","Solar Inverter Grid-Tie 5kW","Inverter/Charger 24V 2kW","Inverter/Charger 48V 5kW","Lead Acid Battery 100Ah 12V","Lead Acid Battery 200Ah 12V","Gel Battery 100Ah 12V","Gel Battery 150Ah 12V","Lithium Battery 100Ah 12V","Lithium Battery 200Ah 24V","Lithium Battery 100Ah 48V (LiFePO4)","Battery Storage 5kWh","Battery Storage 10kWh","Solar Cable 4mm Red (per m)","Solar Cable 4mm Black (per m)","Solar Cable 6mm Red (per m)","Solar Cable 6mm Black (per m)","MC4 Male Connector","MC4 Female Connector","MC4 Branch Connector (T-type)","MC4 Crimping Tool","Solar Mounting Rail Aluminum (per m)","Mid Clamp (pair)","End Clamp (pair)","Roof Hook Mounting Bracket","Ground Mount Frame (per panel)","L-Foot Bracket","T-Bolt (pack)","Nut & Bolt Set (pack)","DC Isolator Switch 32A","DC Isolator Switch 63A","AC Isolator Switch 32A","AC Isolator Switch 63A","DC Surge Protection Device","AC Surge Protection Device","Solar Combiner Box 4-string","Solar Combiner Box 8-string","DC Circuit Breaker 10A","DC Circuit Breaker 20A","DC Circuit Breaker 32A","Battery Management System (BMS)","Solar Charge Controller MPPT 30A","Solar Charge Controller MPPT 60A","Solar Charge Controller PWM 30A","Generation Meter (bidirectional)","Energy Monitor Display","CT Clamp 100A","Battery Shunt Monitor","Cable Conduit 20mm (per m)","Cable Trunking (per m)","Earth Bonding Cable 6mm (per m)","Earth Rod 1.2m","Warning Labels Solar DC","Anti-theft Bolts (pack)"
  ],
  "Generator Installation": [
    "Petrol Generator 2kVA","Petrol Generator 3kVA","Petrol Generator 5kVA","Diesel Generator 5kVA","Diesel Generator 10kVA","Diesel Generator 15kVA","Diesel Generator 20kVA","Diesel Generator 30kVA","Diesel Generator 50kVA","Diesel Generator 100kVA","Diesel Generator 200kVA","Standby Generator 10kVA","Standby Generator 20kVA","Manual Transfer Switch 63A","Manual Transfer Switch 100A","Manual Transfer Switch 160A","Manual Transfer Switch 250A","Automatic Transfer Switch (ATS) 63A","Automatic Transfer Switch (ATS) 100A","Automatic Transfer Switch (ATS) 160A","Automatic Transfer Switch (ATS) 250A","Changeover Switch 63A","Changeover Switch 100A","Cable 6mm 4-core (per m)","Cable 10mm 4-core (per m)","Cable 16mm 4-core (per m)","Cable 25mm 4-core (per m)","Cable 35mm 4-core (per m)","Cable 50mm 4-core (per m)","Armoured Cable 10mm (per m)","Armoured Cable 16mm (per m)","Armoured Cable 25mm (per m)","Flexible Conduit 25mm (per m)","MCB 3-phase 32A","MCB 3-phase 63A","MCB 3-phase 100A","MCCB 63A","MCCB 100A","MCCB 160A","MCCB 250A","Isolator Switch 100A 3-phase","Isolator Switch 160A 3-phase","Surge Protection Device","Anti-Vibration Mounts (set)","Generator Base Frame","Exhaust Flexible Pipe 50mm","Exhaust Pipe Clamp","Fuel Tank 50L","Fuel Tank 200L","Fuel Transfer Pump","Fuel Filter","Oil Filter","Air Filter","Battery 12V 100Ah (starter)","Battery Charger 10A","Cable Glands (pack)","Earth Rod 1.2m","Earth Cable 10mm (per m)","Warning Labels (pack)","Weatherproof Enclosure","Generator Canopy / Enclosure","Hour Meter","AVR (Automatic Voltage Regulator)"
  ],
  "Other": [
    "PVC Cable 1.5mm (per m)","PVC Cable 2.5mm (per m)","PVC Cable 4mm (per m)","Single Socket Outlet","Double Socket Outlet","Light Switch","MCB 16A","MCB 32A","RCCB 63A 30mA","PVC Conduit 20mm (per m)","Cable Trunking (per m)","Junction Box","Terminal Block","Earth Rod 1.2m","Insulation Tape (roll)","Cable Clips (pack)","Cable Ties (pack)","Wall Plugs & Screws (pack)","Connector Block","Flexible Cable 1.5mm (per m)"
  ]
};

export default function VoltQuote() {
  const [step, setStep] = useState(0);
  const [screen, setScreen] = useState("home");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [viewingQuote, setViewingQuote] = useState(null);
  const [currency, setCurrency] = useState(CURRENCIES[3]);
  const [matSearch, setMatSearch] = useState("");
  const [clientCC, setClientCC] = useState("+256");
  const [yourCC, setYourCC] = useState("+256");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [job, setJob] = useState({ companyName:"", electricianName:"", phone:"", email:"", clientName:"", clientEmail:"", clientPhone:"", clientAddress:"", jobType:"", jobDescription:"", jobDate:"", validDays:"30" });
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [customMaterials, setCustomMaterials] = useState([]);
  const [labor, setLabor] = useState({ hours:"", rate:"", workers:"1" });
  const [extras, setExtras] = useState({ markup:"15", tax:"0", notes:"" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voltquote_saved");
      if (saved) setSavedQuotes(JSON.parse(saved));
    } catch {}
  }, []);

  const saveQuote = (q) => {
    const updated = [{ ...q, id: Date.now(), savedAt: new Date().toLocaleString() }, ...savedQuotes];
    setSavedQuotes(updated);
    try { localStorage.setItem("voltquote_saved", JSON.stringify(updated)); } catch {}
  };

  const deleteQuote = (id) => {
    const updated = savedQuotes.filter(q => q.id !== id);
    setSavedQuotes(updated);
    setDeleteConfirm(null);
    try { localStorage.setItem("voltquote_saved", JSON.stringify(updated)); } catch {}
  };

  const updateJob = (k, v) => { setJob(p => ({ ...p, [k]: v })); if (k === "jobType") { setSelectedMaterials({}); setMatSearch(""); } };
  const updateLabor = (k, v) => setLabor(p => ({ ...p, [k]: v }));
  const updateExtras = (k, v) => setExtras(p => ({ ...p, [k]: v }));
  const toggleMaterial = name => setSelectedMaterials(p => { if (p[name]) { const n = {...p}; delete n[name]; return n; } return {...p, [name]: {qty:1, price:0}}; });
  const updateSelMat = (name, k, v) => setSelectedMaterials(p => ({ ...p, [name]: { ...p[name], [k]: v } }));
  const addCustom = () => setCustomMaterials(p => [...p, { name:"", qty:1, unit:"pcs", price:0 }]);
  const removeCustom = i => setCustomMaterials(p => p.filter((_,idx) => idx !== i));
  const updateCustom = (i, k, v) => setCustomMaterials(p => p.map((m, idx) => idx === i ? {...m, [k]: v} : m));

  const allMats = [...Object.entries(selectedMaterials).map(([name, v]) => ({ name, qty: v.qty, unit:"pcs", price: v.price })), ...customMaterials.filter(m => m.name)];
  const matTotal = allMats.reduce((s, m) => s + (parseFloat(m.qty)||0) * (parseFloat(m.price)||0), 0);
  const laborTotal = (parseFloat(labor.hours)||0) * (parseFloat(labor.rate)||0) * (parseFloat(labor.workers)||1);
  const subtotal = matTotal + laborTotal;
  const markupAmt = subtotal * (parseFloat(extras.markup)||0) / 100;
  const taxAmt = (subtotal + markupAmt) * (parseFloat(extras.tax)||0) / 100;
  const total = subtotal + markupAmt + taxAmt;
  const fmt = (n, c) => `${(c||currency).symbol}${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const resetForm = () => {
    setStep(0); setQuote(null); setShowPDF(false);
    setSelectedMaterials({}); setCustomMaterials([]);
    setLabor({hours:"",rate:"",workers:"1"}); setExtras({markup:"15",tax:"0",notes:""});
    setJob({companyName:"",electricianName:"",phone:"",email:"",clientName:"",clientEmail:"",clientPhone:"",clientAddress:"",jobType:"",jobDescription:"",jobDate:"",validDays:"30"});
  };

  const generateQuote = async () => {
    setLoading(true);
    try {
      const prompt = `You are a professional electrical contractor assistant. Generate a formal, concise quote description (3-4 sentences) for:
Job Type: ${job.jobType}, Description: ${job.jobDescription}, Client: ${job.clientName} at ${job.clientAddress},
Materials: ${allMats.map(m=>`${m.name} x${m.qty}`).join(", ")}, Labor: ${labor.workers} worker(s) x ${labor.hours} hours, Total: ${fmt(total)}
Start with "We are pleased to provide this quote for..."`;
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user", content:prompt}] }) });
      const data = await res.json();
      const summary = data.content?.[0]?.text || "Professional electrical services as described.";
      const q = { job, materials:allMats, labor, extras, matTotal, laborTotal, subtotal, markupAmt, taxAmt, total, summary, currency, clientCC, yourCC };
      setQuote(q); saveQuote(q); setStep(4);
    } catch {
      const q = { job, materials:allMats, labor, extras, matTotal, laborTotal, subtotal, markupAmt, taxAmt, total, summary:"Professional electrical services as described in this quote.", currency, clientCC, yourCC };
      setQuote(q); saveQuote(q); setStep(4);
    }
    setLoading(false);
  };

  const sendWhatsApp = (Q) => {
    const msg = `⚡ *VOLTQUOTE — JOB QUOTE*\n\n*From:* ${Q.job.companyName}\n*Electrician:* ${Q.job.electricianName}\n*Phone:* ${Q.yourCC}${Q.job.phone}\n\n*Client:* ${Q.job.clientName}\n*Address:* ${Q.job.clientAddress}\n*Job:* ${Q.job.jobType}\n*Date:* ${Q.job.jobDate}\n\n📋 *DESCRIPTION*\n${Q.summary}\n\n🔩 *MATERIALS*\n${Q.materials.map(m=>`• ${m.name} x${m.qty} — ${Q.currency.symbol}${((parseFloat(m.qty)||0)*(parseFloat(m.price)||0)).toFixed(0)}`).join("\n")}\n\n👷 *LABOR*\n${Q.labor.workers} worker(s) × ${Q.labor.hours}hrs @ ${Q.currency.symbol}${Q.labor.rate}/hr = ${Q.currency.symbol}${Q.laborTotal.toFixed(0)}\n\n💰 *TOTAL DUE: ${Q.currency.symbol}${Q.total.toFixed(0)} ${Q.currency.code}*\n\n_Quote valid for ${Q.job.validDays} days_${Q.extras.notes?`\n📝 ${Q.extras.notes}`:""}`;
    const phone = (Q.clientCC + Q.job.clientPhone).replace(/\D/g,"");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendEmail = (Q) => {
    const subject = `Quote for ${Q.job.jobType} — ${Q.job.companyName}`;
    const body = `Dear ${Q.job.clientName},\n\nPlease find your quote below.\n\n${Q.summary}\n\nJOB: ${Q.job.jobType}\nDATE: ${Q.job.jobDate}\nADDRESS: ${Q.job.clientAddress}\n\nMATERIALS:\n${Q.materials.map(m=>`- ${m.name} x${m.qty}: ${Q.currency.symbol}${((parseFloat(m.qty)||0)*(parseFloat(m.price)||0)).toFixed(0)}`).join("\n")}\n\nLABOR: ${Q.currency.symbol}${Q.laborTotal.toFixed(0)}\nSubtotal: ${Q.currency.symbol}${Q.subtotal.toFixed(0)}\nMarkup: ${Q.currency.symbol}${Q.markupAmt.toFixed(0)}\nTax: ${Q.currency.symbol}${Q.taxAmt.toFixed(0)}\n\nTOTAL DUE: ${Q.currency.symbol}${Q.total.toFixed(0)} ${Q.currency.code}\n\nQuote valid for ${Q.job.validDays} days.\n${Q.extras.notes?`\nNotes: ${Q.extras.notes}\n`:""}\nKind regards,\n${Q.job.electricianName}\n${Q.job.companyName}\n${Q.yourCC}${Q.job.phone}`;
    window.open(`mailto:${Q.job.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  const ic = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white";
  const lc = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  const BottomNav = ({ active }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-50 shadow-lg">
      {[["🏠","Home","home"],["➕","New Quote","new"],["📋","My Quotes","history"]].map(([icon, label, key]) => (
        <button key={key} onClick={() => { if(key==="new"){resetForm();setStep(1);setScreen("new");}else{setScreen(key);} }}
          className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-bold transition-all ${active===key?"text-yellow-600":"text-gray-400"}`}>
          <span className="text-lg">{icon}</span>{label}
        </button>
      ))}
    </div>
  );

  const Header = ({ title, onBack }) => (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-3 flex items-center gap-3">
      {onBack && <button onClick={onBack} className="text-gray-800 font-black text-lg">←</button>}
      <span className="text-xl">⚡</span>
      <div className="flex-1"><h1 className="text-base font-black text-gray-900">{title || "VoltQuote"}</h1></div>
      <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full font-bold">{currency.code}</span>
    </div>
  );

  const Steps = ({ current }) => (
    <div className="flex bg-gray-50 border-b border-gray-100">
      {["Info","Materials","Labor","Quote"].map((s,i) => (
        <div key={i} onClick={() => { if(i+1 < current) setStep(i+1); }}
          className={`flex-1 py-2 text-center text-xs font-bold border-b-2 cursor-pointer ${current===i+1?"border-yellow-400 text-yellow-600":current>i+1?"border-green-400 text-green-600":"border-transparent text-gray-300"}`}>
          {current>i+1?"✓":`${i+1}`} {s}
        </div>
      ))}
    </div>
  );

  const NavBtns = ({ onBack, onNext, nextLabel="Next →", nextDisabled=false, nextAction }) => (
    <div className="flex gap-3 pb-20">
      {onBack && <button onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm">← Back</button>}
      <button onClick={nextAction||onNext} disabled={nextDisabled} className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 text-gray-900 font-black py-3 rounded-xl text-sm shadow">{nextLabel}</button>
    </div>
  );

  const PhoneInput = ({ ccVal, onCC, phoneVal, onPhone, label }) => (
    <div><label className={lc}>{label}</label>
      <div className="flex gap-2">
        <select className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white w-36" value={ccVal} onChange={e => onCC(e.target.value)}>
          {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.country} ({c.code})</option>)}
        </select>
        <input className={ic} placeholder="Phone number" value={phoneVal} onChange={e => onPhone(e.target.value)} />
      </div>
    </div>
  );

  const QuotePreview = ({ Q, compact }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gray-900 text-yellow-400 px-4 py-3 flex justify-between items-center">
        <div><p className="font-black text-sm">{Q.job.companyName||"Your Company"}</p>
          <p className="text-xs text-gray-400">{Q.job.electricianName} · {Q.yourCC}{Q.job.phone}</p></div>
        <div className="text-right"><p className="text-xs text-gray-400">{Q.savedAt||new Date().toLocaleDateString()}</p></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-xs font-bold text-gray-500 mb-1">CLIENT</p>
          <p className="font-bold text-gray-800">{Q.job.clientName}</p>
          <p className="text-sm text-gray-500">{Q.job.clientAddress}</p>
          {!compact && <><p className="text-sm text-gray-500">{Q.clientCC}{Q.job.clientPhone}</p><p className="text-sm text-gray-500">{Q.job.clientEmail}</p></>}
        </div>
        <div><p className="text-xs font-bold text-gray-500 mb-1">JOB</p>
          <p className="font-bold">{Q.job.jobType} · {Q.job.jobDate}</p></div>
        {!compact && <>
          <div><p className="text-xs font-bold text-gray-500 mb-1">SCOPE OF WORK</p>
            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg italic leading-relaxed">{Q.summary}</p></div>
          <div><p className="text-xs font-bold text-gray-500 mb-2">MATERIALS</p>
            {Q.materials.map((m,i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50">
                <span>{m.name} ×{m.qty}</span><span className="font-semibold">{fmt((parseFloat(m.qty)||0)*(parseFloat(m.price)||0), Q.currency)}</span>
              </div>
            ))}</div>
          <div><p className="text-xs font-bold text-gray-500 mb-1">LABOR</p>
            <div className="flex justify-between text-sm">
              <span>{Q.labor.workers} worker(s) × {Q.labor.hours}hrs @ {fmt(parseFloat(Q.labor.rate)||0, Q.currency)}/hr</span>
              <span className="font-semibold">{fmt(Q.laborTotal, Q.currency)}</span>
            </div></div>
        </>}
        <div className={compact?"":"border-t-2 border-gray-100 pt-3"}>
          {!compact && [["Subtotal",Q.subtotal],["Markup",Q.markupAmt],["Tax",Q.taxAmt]].map(([l,v])=>(
            <div key={l} className="flex justify-between text-sm text-gray-500"><span>{l}</span><span>{fmt(v, Q.currency)}</span></div>
          ))}
          <div className="flex justify-between font-black text-base bg-yellow-400 px-3 py-2 rounded-lg mt-2">
            <span>TOTAL DUE</span><span>{fmt(Q.total, Q.currency)} {Q.currency.code}</span>
          </div>
        </div>
        {!compact && Q.extras.notes && <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs font-bold text-gray-500 mb-1">NOTES</p><p className="text-sm text-gray-600">{Q.extras.notes}</p></div>}
        {!compact && <p className="text-center text-gray-400 text-xs">Quote valid for {Q.job.validDays} days</p>}
      </div>
    </div>
  );

  if (screen === "home") return (
    <div className="min-h-screen flex flex-col pb-16" style={{background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)"}}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl" style={{background:"linear-gradient(135deg,#f59e0b,#d97706)"}}>
            <span className="text-6xl">⚡</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-black text-white">✓</span>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight">Volt<span className="text-yellow-400">Quote</span></h1>
          <p className="text-yellow-300 text-sm font-medium mt-1 tracking-widest uppercase">Electrician Quoting App</p>
        </div>
        <p className="text-gray-300 text-base leading-relaxed max-w-xs">Generate professional electrical quotes in minutes. Built for electricians, by an electrician. 🔌</p>
        <div className="w-full max-w-xs space-y-2">
          {[["⚡","Smart job quoting in minutes"],["🔩","Materials list by job type"],["💬","Share via WhatsApp or Email"],["🌍","Multi-currency · 🇺🇬 Made in Uganda"]].map(([icon,text])=>(
            <div key={text} className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl px-4 py-2">
              <span className="text-lg">{icon}</span><span className="text-white text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
        {savedQuotes.length > 0 && (
          <div className="w-full max-w-xs bg-white bg-opacity-10 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-white text-sm">📋 Saved Quotes</span>
            <span className="bg-yellow-400 text-gray-900 font-black text-sm px-3 py-1 rounded-full">{savedQuotes.length}</span>
          </div>
        )}
      </div>
      <div className="p-6 space-y-3">
        <button onClick={() => { resetForm(); setStep(1); setScreen("new"); }}
          className="w-full py-4 rounded-2xl font-black text-gray-900 text-lg shadow-xl" style={{background:"linear-gradient(135deg,#f59e0b,#d97706)"}}>
          ⚡ Create New Quote
        </button>
        <p className="text-center text-gray-500 text-xs">VoltQuote v1.0 · Made in Uganda 🇺🇬</p>
      </div>
      <BottomNav active="home" />
    </div>
  );

  if (screen === "history") return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <Header title="My Quotes" />
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {savedQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
            <span className="text-5xl">📋</span>
            <p className="font-bold text-gray-600">No quotes yet</p>
            <p className="text-sm text-gray-400">Create your first quote and it will appear here</p>
            <button onClick={() => { resetForm(); setStep(1); setScreen("new"); }} className="bg-yellow-400 text-gray-900 font-black px-6 py-3 rounded-xl text-sm">⚡ Create Quote</button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{savedQuotes.length} Quote{savedQuotes.length!==1?"s":""} Saved</p>
            {savedQuotes.map(q => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-black text-gray-800">{q.job.clientName || "Unknown Client"}</p>
                      <p className="text-xs text-gray-500">{q.job.jobType} · {q.job.jobDate}</p>
                      <p className="text-xs text-gray-400 mt-1">Saved: {q.savedAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-yellow-600 text-base">{fmt(q.total, q.currency)}</p>
                      <p className="text-xs text-gray-400">{q.currency?.code}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setViewingQuote(q); setScreen("view"); }} className="flex-1 bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg text-xs">👁 View</button>
                    <button onClick={() => sendWhatsApp(q)} className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg text-xs">💬 WhatsApp</button>
                    <button onClick={() => setDeleteConfirm(q.id)} className="bg-red-100 text-red-500 font-bold py-2 px-3 rounded-lg text-xs">🗑</button>
                  </div>
                </div>
                {deleteConfirm === q.id && (
                  <div className="bg-red-50 px-4 py-3 flex justify-between items-center border-t border-red-100">
                    <p className="text-sm text-red-600 font-semibold">Delete this quote?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setDeleteConfirm(null)} className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg text-xs">Cancel</button>
                      <button onClick={() => deleteQuote(q.id)} className="bg-red-500 text-white font-bold px-3 py-1 rounded-lg text-xs">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <BottomNav active="history" />
    </div>
  );

  if (screen === "view" && viewingQuote) {
    const Q = viewingQuote;
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
        <Header title="Quote Details" onBack={() => setScreen("history")} />
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <QuotePreview Q={Q} compact={false} />
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <p className="font-bold text-gray-800">📤 Share Quote</p>
            <button onClick={() => sendWhatsApp(Q)} className="w-full bg-green-500 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">💬 Send via WhatsApp</button>
            <button onClick={() => sendEmail(Q)} className="w-full bg-blue-500 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">📧 Send via Email</button>
            <button onClick={() => setShowPDF(p=>!p)} className="w-full bg-gray-800 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">📄 {showPDF?"Hide":"View"} PDF Preview</button>
          </div>
          {showPDF && <PDFView Q={Q} fmt={fmt} />}
        </div>
        <BottomNav active="history" />
      </div>
    );
  }

  const jobMats = job.jobType ? JOB_MATERIALS[job.jobType]||[] : [];
  const filtered = matSearch ? jobMats.filter(m => m.toLowerCase().includes(matSearch.toLowerCase())) : jobMats;

  if (screen === "new" && step === 1) return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <Header title="New Quote" onBack={() => setScreen("home")} />
      <Steps current={1} />
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800">🔧 Your Business</h2>
          {[["companyName","Company Name"],["electricianName","Your Name"],["email","Your Email"]].map(([k,l])=>(
            <div key={k}><label className={lc}>{l}</label><input className={ic} value={job[k]} onChange={e=>updateJob(k,e.target.value)} placeholder={l} /></div>
          ))}
          <PhoneInput ccVal={yourCC} onCC={setYourCC} phoneVal={job.phone} onPhone={v=>updateJob("phone",v)} label="Your Phone" />
          <div><label className={lc}>💱 Currency</label>
            <select className={ic} value={currency.code} onChange={e=>setCurrency(CURRENCIES.find(c=>c.code===e.target.value))}>
              {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.symbol} — {c.name} ({c.code})</option>)}
            </select></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800">👤 Client Details</h2>
          {[["clientName","Client Name"],["clientEmail","Client Email"],["clientAddress","Job Address"]].map(([k,l])=>(
            <div key={k}><label className={lc}>{l}</label><input className={ic} value={job[k]} onChange={e=>updateJob(k,e.target.value)} placeholder={l} /></div>
          ))}
          <PhoneInput ccVal={clientCC} onCC={setClientCC} phoneVal={job.clientPhone} onPhone={v=>updateJob("clientPhone",v)} label="Client Phone" />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800">📋 Job Details</h2>
          <div><label className={lc}>Job Type</label>
            <select className={ic} value={job.jobType} onChange={e=>updateJob("jobType",e.target.value)}>
              <option value="">Select job type...</option>
              {Object.keys(JOB_MATERIALS).map(t=><option key={t} value={t}>{t}</option>)}
            </select></div>
          <div><label className={lc}>Job Description</label>
            <textarea className={ic} rows={3} value={job.jobDescription} onChange={e=>updateJob("jobDescription",e.target.value)} placeholder="Describe the work..." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lc}>Job Date</label><input type="date" className={ic} value={job.jobDate} onChange={e=>updateJob("jobDate",e.target.value)} /></div>
            <div><label className={lc}>Valid (days)</label><input type="number" className={ic} value={job.validDays} onChange={e=>updateJob("validDays",e.target.value)} /></div>
          </div>
        </div>
        <NavBtns onBack={()=>setScreen("home")} onNext={()=>setStep(2)} nextLabel="Next: Materials →" nextDisabled={!job.jobType} />
      </div>
      <BottomNav active="new" />
    </div>
  );

  if (screen === "new" && step === 2) return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <Header title="Materials" onBack={()=>setStep(1)} />
      <Steps current={2} />
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-800">🔩 {job.jobType}</h2>
            <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded-full">{Object.keys(selectedMaterials).length} selected</span>
          </div>
          <input className={ic+" mb-3"} placeholder="🔍 Search materials..." value={matSearch} onChange={e=>setMatSearch(e.target.value)} />
          <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
            {filtered.map(name=>(
              <div key={name}>
                <button onClick={()=>toggleMaterial(name)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedMaterials[name]?"bg-yellow-400 text-gray-900":"bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
                  {selectedMaterials[name]?"✓ ":"+ "}{name}
                </button>
                {selectedMaterials[name]&&(
                  <div className="grid grid-cols-2 gap-2 px-3 py-2 bg-yellow-50 rounded-b-lg mb-1">
                    <div><label className={lc}>Quantity</label><input type="number" className={ic} value={selectedMaterials[name].qty} onChange={e=>updateSelMat(name,"qty",e.target.value)} /></div>
                    <div><label className={lc}>Unit Price ({currency.symbol})</label><input type="number" className={ic} value={selectedMaterials[name].price} onChange={e=>updateSelMat(name,"price",e.target.value)} /></div>
                    <div className="col-span-2 text-right text-xs font-bold text-yellow-700">Line: {fmt((parseFloat(selectedMaterials[name].qty)||0)*(parseFloat(selectedMaterials[name].price)||0))}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-800">➕ Custom Materials</h2>
            <button onClick={addCustom} className="text-xs bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full">+ Add</button>
          </div>
          {customMaterials.map((m,i)=>(
            <div key={i} className="bg-gray-50 rounded-lg p-3 mb-2 space-y-2">
              <div className="flex gap-2"><input className={ic} placeholder="Material name" value={m.name} onChange={e=>updateCustom(i,"name",e.target.value)} /><button onClick={()=>removeCustom(i)} className="text-red-400 text-lg font-bold">×</button></div>
              <div className="grid grid-cols-3 gap-2">
                <div><label className={lc}>Qty</label><input type="number" className={ic} value={m.qty} onChange={e=>updateCustom(i,"qty",e.target.value)} /></div>
                <div><label className={lc}>Unit</label><select className={ic} value={m.unit} onChange={e=>updateCustom(i,"unit",e.target.value)}>{["pcs","m","ft","box","roll","set"].map(u=><option key={u}>{u}</option>)}</select></div>
                <div><label className={lc}>Price</label><input type="number" className={ic} value={m.price} onChange={e=>updateCustom(i,"price",e.target.value)} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 rounded-xl p-3 flex justify-between"><span className="font-bold text-sm text-gray-700">Materials Total</span><span className="font-black text-yellow-600">{fmt(matTotal)}</span></div>
        <NavBtns onBack={()=>setStep(1)} onNext={()=>setStep(3)} nextLabel="Next: Labor →" />
      </div>
      <BottomNav active="new" />
    </div>
  );

  if (screen === "new" && step === 3) return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <Header title="Labor & Pricing" onBack={()=>setStep(2)} />
      <Steps current={3} />
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800">👷 Labor</h2>
          <div className="grid grid-cols-3 gap-3">
            {[["workers","Workers"],["hours","Hours"],["rate","Rate/hr"]].map(([k,l])=>(
              <div key={k}><label className={lc}>{l}</label><input type="number" className={ic} value={labor[k]} onChange={e=>updateLabor(k,e.target.value)} placeholder="0" /></div>
            ))}
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-sm font-bold text-yellow-800">Labor Total: {fmt(laborTotal)}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800">💼 Pricing</h2>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lc}>Markup %</label><input type="number" className={ic} value={extras.markup} onChange={e=>updateExtras("markup",e.target.value)} /></div>
            <div><label className={lc}>Tax %</label><input type="number" className={ic} value={extras.tax} onChange={e=>updateExtras("tax",e.target.value)} /></div>
          </div>
          <div><label className={lc}>Notes</label><textarea className={ic} rows={3} value={extras.notes} onChange={e=>updateExtras("notes",e.target.value)} placeholder="Payment terms, warranty..." /></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3">🧾 Summary</h2>
          {[["Materials",matTotal],["Labor",laborTotal],["Markup",markupAmt],["Tax",taxAmt]].map(([l,v])=>(
            <div key={l} className="flex justify-between text-sm py-1 border-b border-gray-50"><span className="text-gray-500">{l}</span><span className="font-semibold">{fmt(v)}</span></div>
          ))}
          <div className="flex justify-between font-black text-lg border-t-2 border-yellow-400 pt-2 mt-2"><span>TOTAL</span><span className="text-yellow-600">{fmt(total)}</span></div>
        </div>
        <NavBtns onBack={()=>setStep(2)} nextAction={generateQuote} nextLabel={loading?"⚡ Generating...":"⚡ Generate Quote"} nextDisabled={loading} />
      </div>
      <BottomNav active="new" />
    </div>
  );

  if (screen === "new" && step === 4 && quote) {
    const Q = quote;
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
        <Header title="Quote Ready ✓" onBack={()=>setStep(3)} />
        <Steps current={4} />
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div><p className="font-bold text-green-800 text-sm">Quote saved automatically!</p>
              <p className="text-xs text-green-600">Find it anytime in My Quotes tab</p></div>
          </div>
          <QuotePreview Q={Q} compact={false} />
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <p className="font-bold text-gray-800">📤 Share Quote</p>
            <button onClick={()=>sendWhatsApp(Q)} className="w-full bg-green-500 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">💬 Send via WhatsApp</button>
            <button onClick={()=>sendEmail(Q)} className="w-full bg-blue-500 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">📧 Send via Email</button>
            <button onClick={()=>setShowPDF(p=>!p)} className="w-full bg-gray-800 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">📄 {showPDF?"Hide":"View"} PDF Preview</button>
          </div>
          {showPDF && <PDFView Q={Q} fmt={fmt} />}
          <div className="flex gap-3 pb-4">
            <button onClick={()=>setStep(1)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm">✏️ Edit</button>
            <button onClick={()=>{ resetForm(); setScreen("home"); }} className="flex-1 bg-yellow-400 text-gray-900 font-black py-3 rounded-xl text-sm">⚡ New Quote</button>
          </div>
        </div>
        <BottomNav active="new" />
      </div>
    );
  }

  return null;
}

function PDFView({ Q, fmt }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-gray-200">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
        <p className="text-xs font-bold text-gray-600">📄 PDF Preview</p>
        <p className="text-xs text-gray-400">Screenshot to save</p>
      </div>
      <div className="p-5 space-y-4" style={{fontFamily:"Arial,sans-serif"}}>
        <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg">
          <p className="text-lg font-black">⚡ VOLTQUOTE</p>
          <p className="text-sm text-gray-300 mt-1">{Q.job.companyName||"Your Company"}</p>
          <p className="text-xs text-gray-400">{Q.job.electricianName} | {Q.yourCC}{Q.job.phone} | {Q.job.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="font-black text-gray-500 mb-1">PREPARED FOR</p>
            <p className="font-bold text-gray-800">{Q.job.clientName}</p>
            <p className="text-gray-500">{Q.job.clientAddress}</p>
            <p className="text-gray-500">{Q.clientCC}{Q.job.clientPhone}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-black text-gray-500 mb-1">QUOTE DETAILS</p>
            <p className="font-bold text-gray-800">{Q.job.jobType}</p>
            <p className="text-gray-500">Date: {Q.job.jobDate}</p>
            <p className="text-gray-500">Valid: {Q.job.validDays} days</p>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
          <p className="font-black text-gray-500 mb-1 text-xs">SCOPE OF WORK</p>
          <p className="text-gray-700 leading-relaxed italic text-xs">{Q.summary}</p>
        </div>
        <div>
          <p className="font-black text-gray-700 mb-2 text-xs border-b-2 border-yellow-400 pb-1">MATERIALS</p>
          <div className="space-y-1">
            <div className="grid grid-cols-4 bg-yellow-100 rounded px-2 py-1 text-xs font-black text-gray-600">
              <span className="col-span-2">Item</span><span className="text-center">Qty</span><span className="text-right">Total</span>
            </div>
            {Q.materials.map((m,i)=>(
              <div key={i} className={`grid grid-cols-4 px-2 py-1 text-xs rounded ${i%2===0?"bg-gray-50":""}`}>
                <span className="col-span-2 text-gray-700">{m.name}</span>
                <span className="text-center text-gray-500">{m.qty}</span>
                <span className="text-right font-semibold">{fmt((parseFloat(m.qty)||0)*(parseFloat(m.price)||0), Q.currency)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-black text-gray-700 mb-2 text-xs border-b-2 border-yellow-400 pb-1">LABOR</p>
          <div className="bg-gray-50 px-3 py-2 rounded flex justify-between text-xs">
            <span className="text-gray-600">{Q.labor.workers} worker(s) × {Q.labor.hours}hrs @ {fmt(parseFloat(Q.labor.rate)||0, Q.currency)}/hr</span>
            <span className="font-black">{fmt(Q.laborTotal, Q.currency)}</span>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 pt-3 space-y-1">
          {[["Subtotal",Q.subtotal],["Markup ("+Q.extras.markup+"%)",Q.markupAmt],["Tax ("+Q.extras.tax+"%)",Q.taxAmt]].map(([l,v])=>(
            <div key={l} className="flex justify-between text-xs text-gray-500 px-2"><span>{l}</span><span>{fmt(v, Q.currency)}</span></div>
          ))}
          <div className="flex justify-between font-black text-base bg-yellow-400 px-3 py-2 rounded-lg mt-2">
            <span>TOTAL DUE</span><span>{fmt(Q.total, Q.currency)} {Q.currency.code}</span>
          </div>
        </div>
        {Q.extras.notes&&<div className="bg-gray-50 p-3 rounded-lg"><p className="font-black text-gray-500 mb-1 text-xs">NOTES</p><p className="text-gray-600 text-xs">{Q.extras.notes}</p></div>}
        <p className="text-center text-gray-400 text-xs pt-2 border-t border-gray-100">Generated by VoltQuote ⚡ | Valid {Q.job.validDays} days | Made in Uganda 🇺🇬</p>
      </div>
    </div>
  );
}
