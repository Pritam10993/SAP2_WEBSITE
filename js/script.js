/* ══════════════════════════════════════
   SERVICE IMAGE PANEL
══════════════════════════════════════ */
let svcImgTimer = null;
function setSvcImg(url, title, sub){
  const img  = document.getElementById('svcImg');
  const tag  = document.getElementById('svcImgTag');
  const subEl= document.getElementById('svcImgSub');
  if(!img) return;
  clearTimeout(svcImgTimer);
  img.classList.add('fading');
  svcImgTimer = setTimeout(()=>{
    img.src = url;
    if(tag)  tag.textContent  = title;
    if(subEl) subEl.textContent = sub;
    img.onload = ()=> img.classList.remove('fading');
    if(img.complete) img.classList.remove('fading');
  }, 200);
}

/* ══════════════════════════════════════
   INDUSTRY IMAGE PANEL
══════════════════════════════════════ */
let indImgTimer = null;

function setIndustryImg(url, title, sub){
  const img  = document.getElementById('indImg');
  const tag  = document.getElementById('indImgTag');
  const subEl= document.getElementById('indImgSub');
  if(!img) return;

  clearTimeout(indImgTimer);

  // Fade out
  img.classList.add('fading');

  indImgTimer = setTimeout(()=>{
    // Swap source while faded
    img.src = url;
    if(tag)  tag.textContent  = title;
    if(subEl) subEl.textContent = sub;

    // Preload then fade in
    img.onload = ()=> img.classList.remove('fading');
    // Fallback in case already cached
    if(img.complete) img.classList.remove('fading');
  }, 200);
}

/* ══════════════════════════════════════
   JOB LISTINGS DATA
══════════════════════════════════════ */
const JOBS = [
  {id:1,title:'SAP S/4HANA Functional Consultant',dept:'Enterprise Application',type:'Full-time',location:'Hyderabad, India',mode:'Hybrid',exp:'3–8 years',desc:'Lead SAP S/4HANA implementations across Finance, MM, and SD modules. Work with Fortune 500 clients on digital transformation projects.'},
  {id:2,title:'SAP BTP Developer',dept:'Digital Services',type:'Full-time',location:'Bangalore, India',mode:'Remote',exp:'2–5 years',desc:'Build cloud-native extensions on SAP Business Technology Platform using CAP, UI5, and Integration Suite.'},
  {id:3,title:'SAP SuccessFactors Consultant',dept:'HR Transformation',type:'Full-time',location:'Mumbai, India',mode:'Hybrid',exp:'2–6 years',desc:'Implement SuccessFactors modules including Employee Central, Recruiting, Performance & Goals.'},
  {id:4,title:'Data Engineer — SAP Analytics',dept:'Data & Analytics',type:'Full-time',location:'Chennai, India',mode:'Onsite',exp:'3–6 years',desc:'Design data pipelines, SAP Datasphere models, and SAP Analytics Cloud dashboards for enterprise clients.'},
  {id:5,title:'Graduate SAP Consultant (S/4HANA)',dept:'Graduate Program',type:'Full-time',location:'Hyderabad, India',mode:'Onsite',exp:'0–1 years (Fresher)',desc:'Join our 6-month structured SAP training program. No prior SAP experience required. Strong analytical skills needed.'},
  {id:6,title:'SAP Project Manager',dept:'Delivery',type:'Full-time',location:'Delhi, India',mode:'Hybrid',exp:'8–12 years',desc:'Manage large-scale SAP transformation programs from discovery to go-live. PMP or Prince2 certification preferred.'},
  {id:7,title:'SAP ABAP Developer',dept:'Technical Services',type:'Full-time',location:'Pune, India',mode:'Remote',exp:'3–7 years',desc:'Develop SAP ABAP programs, BAPIs, user exits, and S/4HANA extensions using RESTful ABAP Programming Model.'},
  {id:8,title:'Cloud Infrastructure Engineer (SAP)',dept:'Cloud Engineering',type:'Full-time',location:'Bangalore, India',mode:'Remote',exp:'3–6 years',desc:'Build and manage SAP cloud infrastructure on Azure, AWS, and GCP. SAP BASIS and cloud certifications preferred.'},
  {id:9,title:'SAP Internship Program 2025',dept:'Internship',type:'Internship',location:'Hyderabad, India',mode:'Onsite',exp:'Student / Recent Graduate',desc:'12-week paid internship working on real SAP projects. Open to engineering and business students from any year.'},
  {id:10,title:'Presales SAP Solution Architect',dept:'Business Development',type:'Full-time',location:'Hyderabad, India',mode:'Hybrid',exp:'8–15 years',desc:'Support sales with SAP solution design, RFP responses, and client workshops. Deep expertise in two+ SAP product areas required.'},
];

function renderJobs(list){
  const container = document.getElementById('jobsList');
  if(!container) return;
  const count = document.getElementById('jobsCount');
  if(count) count.innerHTML = 'Showing <strong>'+list.length+'</strong> of <strong>'+JOBS.length+'</strong> open positions';
  if(list.length === 0){
    container.innerHTML = '<div class="no-jobs"><i class="bi bi-search" style="font-size:2rem;display:block;margin-bottom:0.5rem"></i>No positions match. Try different filters.</div>';
    return;
  }
  container.innerHTML = list.map(j=>`
    <div class="job-card mb-3">
      <div class="job-card-top">
        <div style="flex:1">
          <div class="job-title">${j.title}</div>
          <div class="job-dept">${j.dept}</div>
          <div class="job-tags">
            <span class="job-tag"><i class="bi bi-briefcase"></i> ${j.type}</span>
            <span class="job-tag"><i class="bi bi-geo-alt"></i> ${j.location}</span>
            <span class="job-tag"><i class="bi bi-laptop"></i> ${j.mode}</span>
            <span class="job-tag"><i class="bi bi-clock"></i> ${j.exp}</span>
          </div>
          <div class="job-desc">${j.desc}</div>
        </div>
        <div style="flex-shrink:0;margin-top:0.5rem">
          <button class="btn-apply" onclick="openApply(${j.id})"><i class="bi bi-send me-1"></i>Apply Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterJobs(){
  const q    = (document.getElementById('jobSearch')?.value||'').toLowerCase();
  const dept = document.getElementById('jobDept')?.value||'';
  const mode = document.getElementById('jobMode')?.value||'';
  const filtered = JOBS.filter(j=>{
    const matchQ    = !q    || j.title.toLowerCase().includes(q)||j.dept.toLowerCase().includes(q)||j.desc.toLowerCase().includes(q);
    const matchDept = !dept || j.dept===dept;
    const matchMode = !mode || j.mode===mode;
    return matchQ&&matchDept&&matchMode;
  });
  renderJobs(filtered);
}

function openApply(jobId){
  const job = JOBS.find(j=>j.id===jobId);
  if(!job) return;
  document.getElementById('applyJobTitle').textContent = 'Apply: '+job.title;
  document.getElementById('applyJobDept').textContent  = job.dept+' · '+job.location+' · '+job.mode;
  resetApplyForm();
  new bootstrap.Modal(document.getElementById('jobApplyModal')).show();
}

function resetApplyForm(){
  const form=document.getElementById('applyForm'), succ=document.getElementById('applySuccess');
  if(form){form.reset();form.classList.remove('d-none');}
  if(succ) succ.classList.add('d-none');
  ['af-fname','af-lname','af-email','af-phone','af-location','af-exp','af-cover','af-resume'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.classList.remove('invalid');
    const err=document.getElementById(id+'-err'); if(err) err.classList.remove('show');
  });
  const btn=document.getElementById('af-submit'),txt=document.getElementById('af-txt'),spin=document.getElementById('af-spin');
  if(btn)btn.disabled=false; if(txt)txt.classList.remove('d-none'); if(spin)spin.classList.add('d-none');
}

/* ══════════════════════════════════════
   PAGES DATA
══════════════════════════════════════ */
const pages = {
  'about-us':{tag:'Explore Us',parent:'Explore Us',title:'About SAP Platform',desc:'20+ years delivering digital excellence across 180+ countries.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>440K+</h3><p>Customers</p></div><div class="stat-box"><h3>180+</h3><p>Countries</p></div><div class="stat-box"><h3>20+</h3><p>Years</p></div><div class="stat-box"><h3>€33B+</h3><p>Revenue</p></div></div></div><div class="detail-section"><div class="detail-section-title">What Sets Us Apart</div><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-trophy-fill"></i></div><h5>Deep SAP Expertise</h5><p>Certified SAP partner with highest tier expertise across all SAP product lines.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Global Delivery</h5><p>Onshore, nearshore, and offshore delivery centers ensuring 24/7 support.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightbulb-fill"></i></div><h5>Innovation First</h5><p>Proprietary tools like KTern.AI accelerate SAP projects and reduce risk.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>People-Centric</h5><p>Over 5,000 consultants bringing passion and commitment to every engagement.</p></div></div></div>`},
  'leadership':{tag:'Explore Us',parent:'Explore Us',title:'Leadership',desc:'Visionary leaders shaping SAP Platform into a globally trusted enterprise technology partner.',body:`<div class="detail-section"><div class="detail-section-title">Executive Team</div><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-circle"></i></div><h5>Chief Executive Officer</h5><p>20+ years in enterprise technology, driving global expansion and Fortune 500 partnerships.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-circle"></i></div><h5>Chief Technology Officer</h5><p>Pioneer in SAP S/4HANA cloud migrations, leading our Centre of Excellence.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-circle"></i></div><h5>Chief Operating Officer</h5><p>Operational excellence expert managing global delivery across 180+ countries.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-circle"></i></div><h5>Chief Financial Officer</h5><p>Strategic finance leader overseeing investor relations and sustainable growth.</p></div></div></div>`},
  'awards':{tag:'Explore Us',parent:'Explore Us',title:'Awards & Achievements',desc:'Recognition from the world\'s most respected technology analysts and industry bodies.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>50+</h3><p>Industry Awards</p></div><div class="stat-box"><h3>15+</h3><p>Analyst Recognitions</p></div><div class="stat-box"><h3>8</h3><p>Consecutive Years</p></div><div class="stat-box"><h3>Top 10</h3><p>SAP Partners Global</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-award-fill"></i></div><h5>SAP Pinnacle Award 2024</h5><p>Recognized as top SAP partner for Cloud ERP implementations in Asia-Pacific.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-star-fill"></i></div><h5>Gartner Magic Quadrant</h5><p>Featured as notable vendor in SAP implementation services for five consecutive years.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-trophy-fill"></i></div><h5>Best Employer 2024</h5><p>Recognized for outstanding employee experience, benefits, and career development.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>ISO 27001 Certified</h5><p>Highest information security management certification for data protection.</p></div></div></div>`},
  'commitment':{tag:'Explore Us',parent:'Explore Us',title:'Commitment To People',desc:'Our people are our greatest asset — we invest in growth, wellbeing, and success.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-heart-fill"></i></div><h5>Wellbeing First</h5><p>Comprehensive health programs, mental wellness support, and flexible working for every employee.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Continuous Learning</h5><p>Annual learning budgets, SAP certification support, and access to 10,000+ online courses.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Career Growth</h5><p>Structured paths, mentorship programs, and internal mobility across global offices.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Inclusive Culture</h5><p>50+ nationalities, active DEI programs, and employee resource groups at every level.</p></div></div></div>`},
  'clients':{tag:'Explore Us',parent:'Explore Us',title:'How We Work With Clients',desc:'A proven, collaborative engagement model delivering measurable outcomes from day one.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-search"></i></div><h5>1. Discovery</h5><p>Deep-dive workshops to understand your business, challenges, and technology landscape.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-map-fill"></i></div><h5>2. Roadmap</h5><p>Co-create a transformation roadmap with clear milestones, KPIs, and risk strategies.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-rocket-fill"></i></div><h5>3. Agile Delivery</h5><p>Iterative sprint-based delivery ensuring early value realization and alignment.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-repeat"></i></div><h5>4. Optimize</h5><p>Post go-live optimization, hypercare support, and continuous improvement cycles.</p></div></div></div>`},
  'investors':{tag:'Explore Us',parent:'Explore Us',title:'Investor Relations',desc:'Transparent financial performance and strategic growth plans for our investors.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>€33B+</h3><p>Annual Revenue</p></div><div class="stat-box"><h3>28%</h3><p>YoY Growth</p></div><div class="stat-box"><h3>35%</h3><p>EBITDA Margin</p></div><div class="stat-box"><h3>AA</h3><p>Credit Rating</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Consistent Growth</h5><p>20+ consecutive quarters of double-digit revenue growth driven by cloud adoption.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-fill"></i></div><h5>Cloud-First Strategy</h5><p>75% of new bookings are cloud-based, driving predictable recurring revenue.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Market Expansion</h5><p>Active expansion into high-growth markets in Southeast Asia, Middle East, and Latin America.</p></div></div></div>`},
  'analyst':{tag:'Explore Us',parent:'Explore Us',title:'Analyst Recognitions',desc:'Top-tier recognition from Gartner, Forrester, IDC, and leading analyst firms.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Gartner Magic Quadrant</h5><p>Positioned as a Visionary in 2024 Gartner Magic Quadrant for SAP Implementation Services.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightning-fill"></i></div><h5>Forrester Wave</h5><p>Recognized as Strong Performer in The Forrester Wave for SAP Services Providers 2024.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-patch-check-fill"></i></div><h5>IDC MarketScape</h5><p>Named Major Player in IDC MarketScape for Worldwide SAP Implementation Services.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-star-fill"></i></div><h5>ISG Provider Lens</h5><p>Leader designation in ISG Provider Lens SAP Ecosystem Partners 2024 for APAC.</p></div></div></div>`},
  's4hana':{tag:'Enterprise Application',parent:'Services',title:'SAP S/4HANA',desc:'The intelligent ERP suite — real-time analytics, AI automation, and cloud-native architecture for the modern enterprise.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" alt="SAP S/4HANA" style="width:100%;height:320px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>60%</h3><p>Faster Financial Close</p></div><div class="stat-box"><h3>40%</h3><p>IT Cost Reduction</p></div><div class="stat-box"><h3>3×</h3><p>Faster Reporting</p></div><div class="stat-box"><h3>99.9%</h3><p>Uptime SLA</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">What is SAP S/4HANA?</div>
      <p style="color:var(--muted);font-size:0.95rem;line-height:1.8;max-width:820px">SAP S/4HANA is the world's most advanced ERP system, built on SAP's proprietary in-memory HANA database. Unlike legacy ERP systems, S/4HANA processes transactions and analytics simultaneously in real time — eliminating the need for batch jobs, data duplication, and separate reporting systems. With embedded AI (SAP Joule), predictive analytics, and a simplified data model, S/4HANA transforms how enterprises plan, run, and optimise every business process across finance, supply chain, manufacturing, HR, and customer experience.</p>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Core Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-line-fill"></i></div><h5>Finance & Accounting</h5><p>Universal journal, real-time financial close, automated period-end processes, and SAP Green Ledger for carbon accounting embedded in every transaction.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-gear-fill"></i></div><h5>Manufacturing</h5><p>Production planning, shop floor execution, quality management, and IoT-connected operations with real-time OEE dashboards and predictive maintenance triggers.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Supply Chain</h5><p>End-to-end supply chain visibility with demand sensing, inventory optimisation, and logistics coordination — all driven by embedded AI for autonomous decision-making.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-badge-fill"></i></div><h5>Human Capital Management</h5><p>Core HR, global payroll, time management, and workforce planning — natively integrated with all business processes for a single source of truth.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>Embedded AI — SAP Joule</h5><p>SAP's generative AI copilot is deeply embedded across S/4HANA modules — answering natural language queries, automating document processing, and flagging anomalies before they impact the business.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Compliance & Risk</h5><p>Built-in GRC controls, automated SOX compliance, audit trail management, and real-time regulatory reporting across 50+ countries.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Deployment Options</div>
      <div class="row g-3">
        <div class="col-md-4"><div style="background:rgba(0,112,243,0.06);border:1px solid rgba(0,112,243,0.2);border-radius:12px;padding:1.4rem">
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;margin-bottom:0.5rem;font-size:0.92rem"><i class="bi bi-cloud-fill me-2" style="color:#0070f3"></i>Public Cloud</div>
          <p style="font-size:0.8rem;color:var(--muted);line-height:1.6">SAP-managed, multi-tenant. Best practice configurations. Fastest time-to-value. Ideal for GROW with SAP.</p>
        </div></div>
        <div class="col-md-4"><div style="background:rgba(155,28,28,0.06);border:1px solid rgba(155,28,28,0.2);border-radius:12px;padding:1.4rem">
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;margin-bottom:0.5rem;font-size:0.92rem"><i class="bi bi-server me-2" style="color:#9b1c1c"></i>Private Cloud</div>
          <p style="font-size:0.8rem;color:var(--muted);line-height:1.6">SAP-managed, single-tenant on hyperscalers (AWS, Azure, GCP). More flexibility with enterprise support. Ideal for RISE with SAP.</p>
        </div></div>
        <div class="col-md-4"><div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.2);border-radius:12px;padding:1.4rem">
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;margin-bottom:0.5rem;font-size:0.92rem"><i class="bi bi-building-fill me-2" style="color:#00d4aa"></i>On-Premise</div>
          <p style="font-size:0.8rem;color:var(--muted);line-height:1.6">Customer-managed in own data centres. Maximum control, highest customisation. Suits regulated industries with strict data sovereignty requirements.</p>
        </div></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Our S/4HANA Delivery Approach</div>
      <div class="feature-checklist">
        <li><i class="bi bi-check-circle-fill"></i>SAP-certified S/4HANA consultants across all modules</li>
        <li><i class="bi bi-check-circle-fill"></i>KTern.AI-powered migration assessment and test automation</li>
        <li><i class="bi bi-check-circle-fill"></i>Agile delivery with 2-week sprints and continuous business sign-off</li>
        <li><i class="bi bi-check-circle-fill"></i>Fit-to-Standard workshops to minimise custom code</li>
        <li><i class="bi bi-check-circle-fill"></i>Hypercare support for 90 days post go-live</li>
        <li><i class="bi bi-check-circle-fill"></i>Change management and end-user training embedded in every project</li>
        <li><i class="bi bi-check-circle-fill"></i>500+ successful S/4HANA go-lives across 40+ countries</li>
        <li><i class="bi bi-check-circle-fill"></i>Average project duration 6–18 months depending on scope</li>
      </div>
    </div>`},

  'rise-sap':{tag:'Enterprise Application',parent:'Services',title:'RISE with SAP',desc:'Your complete intelligent enterprise as a service — everything you need to transform and run your SAP ERP in the cloud.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80" alt="RISE with SAP" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>1</h3><p>Contract for everything</p></div><div class="stat-box"><h3>86%</h3><p>Customers see ROI in Y1</p></div><div class="stat-box"><h3>50%</h3><p>Lower TCO vs on-premise</p></div><div class="stat-box"><h3>8 wks</h3><p>Fastest go-live possible</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">What's Included in RISE with SAP?</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-check-fill"></i></div><h5>SAP S/4HANA Cloud Private Edition</h5><p>The full power of SAP S/4HANA in a SAP-managed private cloud environment on your preferred hyperscaler — AWS, Azure, or GCP.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cpu-fill"></i></div><h5>SAP Business Technology Platform</h5><p>Integration Suite, Extension Suite, Analytics Cloud, and AI/ML services all included — extend and connect your intelligent enterprise.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>SAP Signavio Process Intelligence</h5><p>Continuous process mining to identify bottlenecks, benchmark against SAP best practices, and prioritise improvement opportunities.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-tools"></i></div><h5>SAP LeanIX & Cloud ALM</h5><p>Enterprise architecture management and cloud-based application lifecycle management tools included out of the box.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-headset"></i></div><h5>SAP Enterprise Support</h5><p>24/7 access to SAP premium support, proactive monitoring, mission-critical support, and learning hub access for all users.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-up-circle-fill"></i></div><h5>Continuous Innovation</h5><p>Quarterly cloud releases delivering new features, AI capabilities, and regulatory updates automatically — stay perpetually current.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Why Choose RISE with SAP?</div>
      <p style="color:var(--muted);font-size:0.9rem;line-height:1.75;max-width:820px">RISE with SAP removes the complexity of managing multiple vendors, contracts, and SLAs. With a single subscription, SAP takes responsibility for the infrastructure, the platform, and the application — while our team handles the implementation, change management, and ongoing optimisation. You focus on running your business; we ensure the technology never holds you back.</p>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Our RISE Delivery Methodology</div>
      <div class="feature-checklist">
        <li><i class="bi bi-check-circle-fill"></i>RISE Business Case Workshop — quantify your cloud ROI in 2 weeks</li>
        <li><i class="bi bi-check-circle-fill"></i>SAP Readiness Check to assess custom code and data migration complexity</li>
        <li><i class="bi bi-check-circle-fill"></i>SAP Activate methodology for structured, low-risk cloud migration</li>
        <li><i class="bi bi-check-circle-fill"></i>KTern.AI automated testing covering 10,000+ test cases</li>
        <li><i class="bi bi-check-circle-fill"></i>Cutover planning with zero data loss guarantee</li>
        <li><i class="bi bi-check-circle-fill"></i>Post go-live optimisation sprints every quarter</li>
      </div>
    </div>`},

  'grow-sap':{tag:'Enterprise Application',parent:'Services',title:'GROW with SAP',desc:'Fast, affordable SAP S/4HANA Cloud Public Edition for growing mid-market companies — go live in weeks, not years.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="GROW with SAP" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>8 wks</h3><p>Fastest go-live</p></div><div class="stat-box"><h3>0</h3><p>Custom code required</p></div><div class="stat-box"><h3>100%</h3><p>Cloud managed by SAP</p></div><div class="stat-box"><h3>40%</h3><p>Lower cost vs custom ERP</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Built for Mid-Market Speed</div>
      <p style="color:var(--muted);font-size:0.9rem;line-height:1.75;max-width:820px">GROW with SAP delivers the full power of SAP S/4HANA Cloud Public Edition with pre-configured best practice content for your industry — so you can start running your business on world-class ERP in weeks, not years. Our certified implementation partners guide you through the SAP Activate methodology, fitting your processes to SAP's proven standards rather than building custom solutions that slow you down and cost more to maintain.</p>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">What You Get</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-speedometer2"></i></div><h5>Pre-Configured Best Practices</h5><p>Hundreds of pre-built business processes covering finance, procurement, manufacturing, sales, and HR — ready to activate on day one.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Predictable Subscription Pricing</h5><p>Simple per-user monthly pricing with no hardware, no infrastructure costs, no surprise upgrade fees. Grow your licence as your company grows.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-check-fill"></i></div><h5>Always Current Cloud</h5><p>Quarterly updates delivered automatically by SAP — you always run the latest S/4HANA features and compliance updates without any IT effort.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>AI from Day One</h5><p>SAP Joule AI assistant and 100+ AI-powered business processes included — intelligent automation without any AI project investment.</p></div>
      </div>
    </div>`},

  'eos':{tag:'Enterprise Application',parent:'Services',title:'EOS Transformation',desc:'End-to-end Enterprise Operations Suite transformation — modernising your SAP ECC legacy landscape to S/4HANA.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="EOS Transformation" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>2027</h3><p>SAP ECC End of Support</p></div><div class="stat-box"><h3>70%</h3><p>Enterprises still on ECC</p></div><div class="stat-box"><h3>18 mo</h3><p>Avg migration duration</p></div><div class="stat-box"><h3>95%</h3><p>Our on-time delivery rate</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Why Migrate Now?</div>
      <p style="color:var(--muted);font-size:0.9rem;line-height:1.75;max-width:820px">SAP's mainstream maintenance for ECC ends in 2027. After that date, running SAP ECC means operating without security patches, regulatory updates, or new feature development — exposing your business to significant risk. Our EOS Transformation practice has migrated over 200 SAP ECC landscapes to S/4HANA, developing repeatable tools, accelerators, and delivery patterns that de-risk your migration and minimise business disruption.</p>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Our 5-Phase EOS Methodology</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-search"></i></div><h5>Phase 1 — Assess</h5><p>KTern.AI-powered discovery of your SAP landscape: custom objects, interfaces, data volumes, and technical debt. Full migration complexity scorecard in 2 weeks.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-map-fill"></i></div><h5>Phase 2 — Roadmap</h5><p>Business case, TCO analysis, deployment model selection (public/private cloud or on-premise), and phased migration roadmap with clear milestones.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-code-slash"></i></div><h5>Phase 3 — Prepare</h5><p>Custom code remediation, data cleansing, test script generation (10,000+ automated test cases via KTern.AI), and sandbox system build.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-rocket-fill"></i></div><h5>Phase 4 — Migrate</h5><p>System conversion or new implementation using SAP Activate methodology with agile sprints, continuous testing, and weekly stakeholder demos.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Phase 5 — Optimise</h5><p>Post go-live hypercare, value realisation tracking against business case, and quarterly innovation sprints adopting new S/4HANA capabilities.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Migration Tools & Accelerators</div>
      <div class="feature-checklist">
        <li><i class="bi bi-check-circle-fill"></i>KTern.AI — AI-native SAP transformation platform reducing project effort by 40%</li>
        <li><i class="bi bi-check-circle-fill"></i>Pre-built test scripts for 200+ standard SAP business scenarios</li>
        <li><i class="bi bi-check-circle-fill"></i>Custom code impact analyser identifying and classifying all ABAP objects automatically</li>
        <li><i class="bi bi-check-circle-fill"></i>SAP Readiness Check integration for automated system validation</li>
        <li><i class="bi bi-check-circle-fill"></i>Data migration templates for all standard SAP objects</li>
        <li><i class="bi bi-check-circle-fill"></i>Cut-over runbook with zero data loss validation framework</li>
      </div>
    </div>`},

  'ams':{tag:'Enterprise Application',parent:'Services',title:'Application Management Services',desc:'Keep your SAP landscape running at peak performance with 24/7 managed application support, proactive monitoring, and continuous enhancement.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80" alt="Application Management Services" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>24/7</h3><p>Global Support Coverage</p></div><div class="stat-box"><h3>99.9%</h3><p>System Uptime SLA</p></div><div class="stat-box"><h3>&lt;4 hr</h3><p>P1 Incident Response</p></div><div class="stat-box"><h3>95%</h3><p>First-Call Resolution</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Our AMS Service Tiers</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-headset"></i></div><h5>L1 — Service Desk</h5><p>Single point of contact for all SAP incidents and service requests. Triage, initial diagnosis, password resets, and user provisioning — resolved in minutes, not hours.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-wrench-adjustable-fill"></i></div><h5>L2 — Application Support</h5><p>Deep functional and technical expertise across all SAP modules. Configuration changes, minor enhancements, transport management, and root cause analysis.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-code-slash"></i></div><h5>L3 — Development & Architecture</h5><p>Senior SAP architects and ABAP developers handling complex custom development, performance optimisation, integration issues, and system architecture decisions.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Proactive Monitoring & AIOps</h5><p>AI-powered system monitoring identifying performance degradation, batch job failures, and security anomalies before they impact business operations.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-up-circle-fill"></i></div><h5>Continuous Improvement</h5><p>Monthly optimisation sprints delivering small enhancements, security patches, legal updates, and quarterly business reviews tracking value delivered.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Follow-the-Sun Model</h5><p>Delivery centres in India, Europe, and North America ensure true 24/7 coverage with native-language support in 12+ languages.</p></div>
      </div>
    </div>`},

  'supply-chain':{tag:'Operations Services',parent:'Services',title:'Supply Chain Transformation',desc:'Build a resilient, AI-driven supply chain that adapts to disruption and delivers competitive advantage at every link.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80" alt="Supply Chain" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>35%</h3><p>Inventory Cost Reduction</p></div><div class="stat-box"><h3>28%</h3><p>Forecast Accuracy Gain</p></div><div class="stat-box"><h3>20%</h3><p>Transport Cost Savings</p></div><div class="stat-box"><h3>99%</h3><p>On-Time Delivery Rate</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">End-to-End Supply Chain Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up"></i></div><h5>Demand Planning & Sensing</h5><p>SAP IBP-powered AI demand forecasting that senses real-time signals from POS data, weather, social trends, and economic indicators to improve accuracy by 28%+.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>Multi-Echelon Inventory</h5><p>Optimise stock across warehouses, distribution centres, and retail locations simultaneously — reducing carrying costs while maintaining 99%+ service levels.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Transportation Management</h5><p>SAP TM with carrier management, freight tendering, route optimisation, and real-time shipment tracking across all modes — air, ocean, rail, and road.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Warehouse Management</h5><p>SAP EWM with slotting optimisation, labour management, yard management, and robotics integration for fully automated warehouse operations.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Supplier Collaboration</h5><p>Real-time supplier portal for order management, forecast sharing, performance tracking, and risk assessment across your entire supply base.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-exclamation-triangle-fill"></i></div><h5>Supply Chain Resilience</h5><p>AI-driven disruption detection, alternative sourcing recommendations, and what-if scenario modelling to keep your supply chain running through any disruption.</p></div>
      </div>
    </div>`},

  'procurement':{tag:'Operations Services',parent:'Services',title:'Procurement Transformation',desc:'Digitise your entire source-to-pay process with SAP Ariba — reducing costs, managing risk, and unlocking supplier innovation.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80" alt="Procurement" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>12%</h3><p>Average Spend Savings</p></div><div class="stat-box"><h3>90%</h3><p>Invoice Automation Rate</p></div><div class="stat-box"><h3>6M+</h3><p>Ariba Network Suppliers</p></div><div class="stat-box"><h3>3×</h3><p>Faster PO Processing</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Source-to-Pay Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-search"></i></div><h5>Strategic Sourcing</h5><p>AI-driven spend analysis, supplier discovery across the Ariba Network, competitive e-auctions, and RFx management — finding the best suppliers at the best prices.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-text-fill"></i></div><h5>Contract Management</h5><p>Centralised contract repository with AI-powered clause analysis, automated compliance alerts, renewal management, and obligation tracking.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cart-fill"></i></div><h5>Guided Buying</h5><p>Intuitive consumer-style shopping experience for employees — guided to preferred suppliers, catalogues, and compliant purchasing channels automatically.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-receipt-cutoff"></i></div><h5>Accounts Payable Automation</h5><p>AI-powered invoice processing with 90%+ straight-through processing rates, 3-way matching, and early payment discount capture through dynamic discounting.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Supplier Risk Management</h5><p>Real-time ESG scoring, financial risk monitoring, geopolitical risk alerts, and automated supplier qualification workflows across your entire supply base.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-pie-chart-fill"></i></div><h5>Spend Analytics</h5><p>360° spend visibility across all categories, business units, and geographies — identifying savings opportunities, policy violations, and maverick spend instantly.</p></div>
      </div>
    </div>`},

  'finance-trans':{tag:'Operations Services',parent:'Services',title:'Finance Transformation',desc:'Modernise your finance function with automated processes, real-time insights, and AI-powered decision support.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80" alt="Finance Transformation" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>70%</h3><p>Faster Month-End Close</p></div><div class="stat-box"><h3>80%</h3><p>Manual Task Reduction</p></div><div class="stat-box"><h3>99%</h3><p>Forecast Accuracy</p></div><div class="stat-box"><h3>30%</h3><p>Compliance Cost Savings</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Finance Process Transformation Areas</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-calculator-fill"></i></div><h5>Record-to-Report (R2R)</h5><p>SAP S/4HANA Finance universal journal eliminates redundant data entry. Automated journal entries, intercompany reconciliation, and a financial close that runs in days not weeks.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-receipt-cutoff"></i></div><h5>Order-to-Cash (O2C)</h5><p>Intelligent billing engine, AI-powered credit management, automated collections with predictive payment scoring, and real-time cash application reducing DSO by 25%+.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cart-fill"></i></div><h5>Procure-to-Pay (P2P)</h5><p>Automated three-way matching, AI invoice extraction, supplier payment optimisation, and dynamic discounting to capture early payment discounts systematically.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>FP&A Modernisation</h5><p>Driver-based financial planning in SAP Analytics Cloud — rolling forecasts updated automatically from actuals, scenario modelling, and integrated business planning across P&L, balance sheet, and cash flow.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Treasury & Cash Management</h5><p>Centralised treasury operations, cash pooling, FX risk management, bank connectivity, and liquidity forecasting — all in real time with full audit trails.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Compliance & Controls</h5><p>Automated SOX controls testing, SAP GRC integration, IFRS/GAAP compliance workflows, and real-time regulatory reporting across 50+ country legal requirements.</p></div>
      </div>
    </div>`},

  'cloud-trans':{tag:'Digital Services',parent:'Services',title:'Cloud Transformation',desc:'Accelerate your journey to the cloud with a structured, risk-managed migration strategy delivering measurable business outcomes.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="Cloud Transformation" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>40%</h3><p>Infrastructure Cost Reduction</p></div><div class="stat-box"><h3>3×</h3><p>Deployment Speed Increase</p></div><div class="stat-box"><h3>99.99%</h3><p>Cloud Availability SLA</p></div><div class="stat-box"><h3>65%</h3><p>Faster Disaster Recovery</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Cloud Migration Strategies (The 6 Rs)</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-right-circle-fill"></i></div><h5>Rehost (Lift & Shift)</h5><p>Move existing workloads to cloud with minimal changes. Fastest time-to-cloud, immediate cost savings, with optimisation opportunities unlocked post-migration.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-wrench-adjustable-fill"></i></div><h5>Replatform</h5><p>Make targeted cloud optimisations without changing core architecture. Migrate databases to managed services, adopt container orchestration, unlock auto-scaling.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Refactor / Re-architect</h5><p>Redesign applications as cloud-native microservices to maximise agility, scalability, and resilience. Highest effort, highest long-term value.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>Repurchase (SaaS)</h5><p>Replace legacy on-premise applications with cloud-native SaaS alternatives — SAP S/4HANA Cloud, SuccessFactors, Ariba, and BTP replacing custom-built systems.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-archive-fill"></i></div><h5>Retire & Retain</h5><p>Identify applications that can be decommissioned, saving maintenance costs, and those that must remain on-premise for compliance or technical reasons.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Cloud Security by Design</h5><p>Zero-trust architecture, identity-first security, data encryption, and continuous compliance monitoring embedded throughout the migration — not bolted on after.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Supported Cloud Platforms</div>
      <div class="row g-3">
        <div class="col-md-4"><div style="background:rgba(0,112,243,0.06);border:1px solid rgba(0,112,243,0.2);border-radius:12px;padding:1.2rem;text-align:center">
          <i class="bi bi-cloud-fill" style="font-size:2rem;color:#0070f3;display:block;margin-bottom:0.5rem"></i>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;font-size:0.9rem">Microsoft Azure</div>
          <p style="font-size:0.75rem;color:var(--muted);margin-top:0.3rem">Azure certified. SAP on Azure expertise across 50+ projects.</p>
        </div></div>
        <div class="col-md-4"><div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.2);border-radius:12px;padding:1.2rem;text-align:center">
          <i class="bi bi-cloud-check-fill" style="font-size:2rem;color:#00d4aa;display:block;margin-bottom:0.5rem"></i>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;font-size:0.9rem">Amazon Web Services</div>
          <p style="font-size:0.75rem;color:var(--muted);margin-top:0.3rem">AWS Advanced Partner. SAP on AWS migrations and managed services.</p>
        </div></div>
        <div class="col-md-4"><div style="background:rgba(155,28,28,0.06);border:1px solid rgba(155,28,28,0.2);border-radius:12px;padding:1.2rem;text-align:center">
          <i class="bi bi-google" style="font-size:2rem;color:#9b1c1c;display:block;margin-bottom:0.5rem"></i>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:#fff;font-size:0.9rem">Google Cloud Platform</div>
          <p style="font-size:0.75rem;color:var(--muted);margin-top:0.3rem">GCP certified. SAP HANA on GCP optimised for BigQuery integration.</p>
        </div></div>
      </div>
    </div>`},

  'btp':{tag:'Digital Services',parent:'Services',title:'Business Technology Platform',desc:'SAP BTP is your unified platform for integration, data management, analytics, AI, and cloud-native application development.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80" alt="SAP BTP" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>1500+</h3><p>Pre-built Integrations</p></div><div class="stat-box"><h3>100+</h3><p>AI Business Services</p></div><div class="stat-box"><h3>4×</h3><p>Faster App Development</p></div><div class="stat-box"><h3>99.9%</h3><p>Platform Uptime</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">BTP Capability Pillars</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-plug-fill"></i></div><h5>Integration Suite</h5><p>1500+ pre-built connectors, API management, event-driven architecture, and B2B/EDI messaging. Connect SAP and non-SAP systems in days with no-code integration flows.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-database-fill"></i></div><h5>Data & Analytics (Datasphere)</h5><p>SAP Datasphere as the semantic data layer connecting all your enterprise data — SAP and non-SAP — with SAP Analytics Cloud delivering BI, planning, and predictive analytics on top.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>AI & Automation</h5><p>100+ AI business services including document information extraction, intelligent situation automation, machine translation, and custom ML model training — all enterprise-ready.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-code-slash"></i></div><h5>Application Development</h5><p>SAP Build (low-code/no-code) for citizen developers, SAP Build Code for professional developers on Cloud Foundry and Kyma runtime — deploy full-stack enterprise apps in days.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Security & Identity</h5><p>SAP Identity Authentication, authorisation management, audit logging, and data privacy controls embedded across all BTP services — enterprise-grade security by default.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-up-circle-fill"></i></div><h5>Side-by-Side Extensions</h5><p>Extend SAP S/4HANA, SuccessFactors, and Ariba without touching the core — build custom workflows, UIs, and processes on BTP that upgrade cleanly with every SAP release.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Common BTP Use Cases We Deliver</div>
      <div class="feature-checklist">
        <li><i class="bi bi-check-circle-fill"></i>Real-time S/4HANA to Salesforce integration with bi-directional sync</li>
        <li><i class="bi bi-check-circle-fill"></i>AI-powered document processing — invoices, purchase orders, contracts</li>
        <li><i class="bi bi-check-circle-fill"></i>Custom SAP Fiori apps extending S/4HANA standard functionality</li>
        <li><i class="bi bi-check-circle-fill"></i>Unified data lake on BTP connecting SAP and non-SAP data sources</li>
        <li><i class="bi bi-check-circle-fill"></i>SAP Build Process Automation for approval workflows and RPA</li>
        <li><i class="bi bi-check-circle-fill"></i>Customer 360 data platform integrating CRM, ERP, and marketing data</li>
        <li><i class="bi bi-check-circle-fill"></i>Real-time analytics dashboards replacing manual Excel reporting</li>
        <li><i class="bi bi-check-circle-fill"></i>IoT data ingestion from shop floor into S/4HANA for predictive maintenance</li>
      </div>
    </div>`},

  'hr-trans':{tag:'Performance Services',parent:'Services',title:'HR Transformation',desc:'Build a future-ready workforce with SAP SuccessFactors — transforming every stage of the employee lifecycle from hire to retire.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80" alt="HR Transformation" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>30%</h3><p>Reduction in Time-to-Hire</p></div><div class="stat-box"><h3>25%</h3><p>HR Admin Cost Savings</p></div><div class="stat-box"><h3>40%</h3><p>Employee Engagement Boost</p></div><div class="stat-box"><h3>99%</h3><p>Payroll Accuracy</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">SuccessFactors Modules We Implement</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-check-fill"></i></div><h5>Employee Central</h5><p>The core HR system of record — global employee data management, organisational structure, position management, and compliance for 50+ countries in one platform.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-search"></i></div><h5>Recruiting & Onboarding</h5><p>AI-powered job recommendations, intelligent candidate screening, video interviewing integration, and structured onboarding programmes that reduce new-hire time-to-productivity by 40%.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-star-fill"></i></div><h5>Performance & Goals</h5><p>Continuous feedback, OKR-style goal alignment, calibration sessions, and compensation recommendations driven by AI — creating a high-performance culture at scale.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Learning Management</h5><p>SAP SuccessFactors Learning with AI-personalised learning paths, compliance training management, external content library integration, and skills gap analysis.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Payroll & Benefits</h5><p>SAP global payroll covering 40+ countries with built-in compliance, benefits enrolment, time and attendance, and real-time payroll simulations — zero errors, on time, every time.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Workforce Analytics</h5><p>People analytics with 2000+ pre-built HR metrics, predictive attrition modelling, DEI dashboards, and workforce planning scenarios integrating HR data with financial plans.</p></div>
      </div>
    </div>`},

  'cx-trans':{tag:'Performance Services',parent:'Services',title:'CX Transformation',desc:'Reimagine every customer touchpoint with SAP\'s integrated customer experience suite — marketing, sales, service, and commerce unified.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80" alt="CX Transformation" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>35%</h3><p>Sales Conversion Increase</p></div><div class="stat-box"><h3>28%</h3><p>Customer Retention Gain</p></div><div class="stat-box"><h3>40%</h3><p>Service Cost Reduction</p></div><div class="stat-box"><h3>+25</h3><p>NPS Score Improvement</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">CX Suite Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-megaphone-fill"></i></div><h5>Marketing Cloud</h5><p>AI-powered audience segmentation, omnichannel campaign orchestration across email, SMS, social, and web — with real-time personalisation and journey analytics.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Sales Cloud & CPQ</h5><p>Intelligent opportunity management, AI-driven forecast accuracy, configure-price-quote automation eliminating quoting errors, and guided selling for complex B2B scenarios.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-chat-dots-fill"></i></div><h5>Service Cloud</h5><p>Omnichannel customer service desk, AI-powered case routing, knowledge management, field service scheduling, and customer self-service portals reducing inbound contact by 40%.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cart-fill"></i></div><h5>Commerce Cloud</h5><p>SAP Commerce Cloud for B2B and B2C — headless commerce architecture, product catalogue management, personalised storefronts, and seamless SAP ERP integration.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-heart"></i></div><h5>Customer Data Platform</h5><p>Unified customer profiles aggregating data from every touchpoint — enabling real-time personalisation, next-best-action recommendations, and privacy-compliant data management.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>CX Analytics & Insights</h5><p>End-to-end CX measurement — customer lifetime value, attribution modelling, churn prediction, and operational KPIs all in a unified SAP Analytics Cloud dashboard.</p></div>
      </div>
    </div>`},

  'data-eng':{tag:'Digiverz',parent:'Services',title:'Data Engineering & Science',desc:'Transform raw data into competitive intelligence with end-to-end data engineering, machine learning, and advanced analytics.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80" alt="Data Engineering" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>10×</h3><p>Faster Insights Delivery</p></div><div class="stat-box"><h3>60%</h3><p>Data Engineering Cost Saving</p></div><div class="stat-box"><h3>95%</h3><p>ML Model Accuracy</p></div><div class="stat-box"><h3>100%</h3><p>Real-time Data Pipelines</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Our Data Engineering Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-database-fill"></i></div><h5>Modern Data Architecture</h5><p>Design and build scalable data lakes, lakehouses, and real-time streaming architectures on Azure, AWS, or GCP — using Databricks, Snowflake, BigQuery, or SAP Datasphere.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-arrow-repeat"></i></div><h5>Data Pipeline Engineering</h5><p>High-throughput ELT/ETL pipelines using Apache Spark, dbt, Airbyte, and Apache Kafka — ingesting data from SAP, SaaS apps, IoT devices, and legacy systems reliably at scale.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>Machine Learning & AI</h5><p>End-to-end ML: feature engineering, model development in Python/R, MLflow experiment tracking, and production deployment with automated retraining pipelines via MLOps.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Advanced Analytics</h5><p>Predictive modelling, NLP, computer vision, recommendation engines, and forecasting models — deployed as APIs that feed directly into SAP S/4HANA and BTP workflows.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Data Governance & Quality</h5><p>Master data management, data cataloguing with Collibra or Alation, lineage tracking, quality scoring, and GDPR/CCPA privacy compliance frameworks built into every pipeline.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cpu-fill"></i></div><h5>Generative AI Solutions</h5><p>RAG-based enterprise search, LLM-powered document processing, AI chatbots integrated with SAP data, and custom GPT solutions built on Azure OpenAI or AWS Bedrock.</p></div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Technology Stack We Work With</div>
      <div class="feature-checklist">
        <li><i class="bi bi-check-circle-fill"></i>Cloud: Azure Synapse, AWS Glue, Google BigQuery, Databricks, Snowflake</li>
        <li><i class="bi bi-check-circle-fill"></i>Streaming: Apache Kafka, Azure Event Hubs, AWS Kinesis, Apache Flink</li>
        <li><i class="bi bi-check-circle-fill"></i>Transformation: dbt, Apache Spark, Apache Airflow, Prefect</li>
        <li><i class="bi bi-check-circle-fill"></i>ML Platforms: MLflow, Kubeflow, Azure ML, SageMaker, Vertex AI</li>
        <li><i class="bi bi-check-circle-fill"></i>Gen AI: Azure OpenAI, AWS Bedrock, Google Gemini, LangChain, LlamaIndex</li>
        <li><i class="bi bi-check-circle-fill"></i>Governance: Collibra, Alation, Apache Atlas, Microsoft Purview</li>
      </div>
    </div>`},

  'biz-analytics':{tag:'Business Platforms',parent:'Services',title:'Business Analytics',desc:'Turn your enterprise data into decisions with SAP Analytics Cloud — self-service BI, integrated planning, and predictive analytics in one platform.',body:`
    <div class="detail-section">
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" alt="Business Analytics" style="width:100%;height:300px;object-fit:cover;border-radius:14px;margin-bottom:2rem"/>
      <div class="stats-row"><div class="stat-box"><h3>80%</h3><p>Faster Report Creation</p></div><div class="stat-box"><h3>50%</h3><p>Planning Cycle Reduction</p></div><div class="stat-box"><h3>3×</h3><p>Forecast Accuracy</p></div><div class="stat-box"><h3>1000s</h3><p>Pre-built SAP Content Packages</p></div></div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">SAP Analytics Cloud Capabilities</div>
      <div class="detail-grid">
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Business Intelligence</h5><p>Drag-and-drop self-service analytics with 100+ chart types, pixel-perfect boardroom reports, and real-time connections to SAP S/4HANA, BW/4HANA, and 200+ non-SAP data sources.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-calendar-check-fill"></i></div><h5>Integrated Business Planning</h5><p>Driver-based financial planning, workforce planning, and sales & operations planning — all collaboratively in SAC, with live write-back to S/4HANA actuals.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Predictive Analytics</h5><p>No-code predictive scenarios — smart predict for forecasting, classification, and regression. Business users build and run ML models without data science expertise.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>AI-Assisted Insights</h5><p>Natural language queries ("What drove Q3 revenue variance?"), automated insight generation, and anomaly detection that proactively alerts finance teams to issues.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-phone-fill"></i></div><h5>Mobile Analytics</h5><p>Native iOS and Android apps with offline capability — executive dashboards, KPI alerts, and collaborative annotations available anywhere, on any device.</p></div>
        <div class="detail-card"><div class="detail-card-icon"><i class="bi bi-puzzle-fill"></i></div><h5>Pre-built Content</h5><p>1000+ SAP-provided content packages for S/4HANA, SuccessFactors, Ariba, and industry solutions — go live with best-practice dashboards in days, not months.</p></div>
      </div>
    </div>`},
  'dcp':{tag:'Business Platforms',parent:'Services',title:'Digital Customer Platforms',desc:'Build exceptional digital commerce and customer engagement on scalable modern platforms.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cart-fill"></i></div><h5>B2B Commerce</h5><p>SAP Commerce Cloud for complex B2B scenarios — catalog management, pricing, and self-service.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shop-window"></i></div><h5>B2C Commerce</h5><p>High-performance storefronts with AI-driven personalization and seamless checkout optimization.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-heart"></i></div><h5>Customer Data Platform</h5><p>Unified customer profiles, real-time segmentation, and AI-powered next-best-action recommendations.</p></div></div></div>`},
  'liferay':{tag:'Business Platforms',parent:'Services',title:'Liferay',desc:'Build powerful enterprise portals and digital experience platforms with SAP-integrated Liferay.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-window-fill"></i></div><h5>Enterprise Portals</h5><p>Employee, supplier, and customer portals built on Liferay DXP with deep SAP integration.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-phone-fill"></i></div><h5>Mobile-First Design</h5><p>Responsive progressive web apps delivering seamless experiences across all devices.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-plug-fill"></i></div><h5>SAP Integration</h5><p>Pre-built connectors for SAP S/4HANA, SuccessFactors, and BTP enabling real-time data surfacing.</p></div></div></div>`},
  'high-tech':{tag:'Discrete',parent:'Industries',title:'High Tech',desc:'Power your high-tech business with SAP for rapid innovation and complex supply chains.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cpu-fill"></i></div><h5>Product Lifecycle</h5><p>End-to-end PLM integration connecting engineering, manufacturing, and after-sales service.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Supply Chain Agility</h5><p>Multi-tier visibility for semiconductor, electronics, and software product companies.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Global Trade</h5><p>Trade compliance, customs management, and global trade automation for complex operations.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>R&D Innovation</h5><p>SAP PLM and innovation management tools accelerating new product development time-to-market.</p></div></div></div>`},
  'ind-mfg':{tag:'Discrete',parent:'Industries',title:'Industrial Manufacturing',desc:'Digitize your shop floor, optimize production, and deliver mass customization.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-gear-wide-connected"></i></div><h5>Smart Manufacturing</h5><p>IoT-connected shop floor, digital twin, and AI-driven production optimization for Industry 4.0.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-clipboard-check-fill"></i></div><h5>Quality Management</h5><p>Inline quality inspection, statistical process control, and defect management.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-wrench-adjustable-fill"></i></div><h5>Asset Performance</h5><p>Predictive maintenance, OEE optimization, and lifecycle management reducing downtime by 35%.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Production Planning</h5><p>Advanced planning and scheduling with real-time capacity constraints and MRP.</p></div></div></div>`},
  'aerospace':{tag:'Discrete',parent:'Industries',title:'Aerospace & Defense',desc:'Meet complex defense requirements and maintain airworthiness with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-airplane-fill"></i></div><h5>MRO Management</h5><p>Maintenance, repair, and overhaul with full traceability and airworthiness compliance.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Program Management</h5><p>Multi-year program governance, earned value management, and milestone tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-fill"></i></div><h5>Defense Compliance</h5><p>ITAR, EAR, DFARS, and AS9100 frameworks embedded throughout the platform.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>Supply Chain Visibility</h5><p>End-to-end visibility with serialized parts tracking and supplier quality management.</p></div></div></div>`},
  'automotive':{tag:'Discrete',parent:'Industries',title:'Automotive',desc:'Drive transformation across the entire automotive value chain with SAP solutions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightning-charge-fill"></i></div><h5>EV Transformation</h5><p>Support the transition to electric vehicles with battery management and new business models.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Supply Chain</h5><p>Just-in-time, just-in-sequence supply chain management for complex automotive assembly.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-tools"></i></div><h5>Dealer Management</h5><p>Integrated systems connecting manufacturer, dealer network, and end customers.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-gear-fill"></i></div><h5>Manufacturing Excellence</h5><p>Smart factory solutions enabling mass customization for modern automotive plants.</p></div></div></div>`},
  'consumer-prod':{tag:'Consumer',parent:'Industries',title:'Consumer Products',desc:'Accelerate growth and win at the shelf with SAP consumer products solutions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>Trade Promotion Management</h5><p>Plan, execute, and settle trade promotions with full visibility into spending and ROI.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shop-window"></i></div><h5>Direct-to-Consumer</h5><p>Omnichannel commerce enabling consumer goods companies to sell directly to end consumers.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Supply Chain</h5><p>Demand-driven management handling seasonal peaks, promotions, and new product launches.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>Sustainability</h5><p>Product carbon footprint tracking, sustainable packaging, and ESG reporting capabilities.</p></div></div></div>`},
  'wholesale':{tag:'Consumer',parent:'Industries',title:'Wholesale Distribution',desc:'Optimize distribution operations with real-time inventory and order management.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Warehouse Management</h5><p>Advanced warehouse operations with pick-pack-ship optimization and real-time inventory accuracy.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Transportation Management</h5><p>Multi-carrier freight management, route optimization, and real-time shipment tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Pricing & Contracts</h5><p>Complex customer-specific pricing, contract management, and rebate processing automation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Sales Analytics</h5><p>Real-time sales performance, customer profitability, and product margin analysis.</p></div></div></div>`},
  'life-science':{tag:'Consumer',parent:'Industries',title:'Life Science',desc:'Accelerate drug development and ensure compliance with SAP life science solutions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-capsule-pill"></i></div><h5>Clinical Trial Management</h5><p>Integrated clinical operations, patient data management, and regulatory submission support.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>GxP Compliance</h5><p>GMP, GLP, and GCP compliance management with full audit trails and electronic batch records.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Supply Chain</h5><p>Cold chain management, serialization, track-and-trace, and anti-counterfeiting capabilities.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Commercial Excellence</h5><p>Multi-channel sales, patient services, and key account management for pharma operations.</p></div></div></div>`},
  'retail':{tag:'Consumer',parent:'Industries',title:'Retail',desc:'Deliver personalized shopping experiences and run unified commerce operations.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shop-window"></i></div><h5>Unified Commerce</h5><p>Seamlessly connect in-store, online, and mobile channels for a consistent customer experience.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>Inventory Management</h5><p>Real-time inventory visibility across all locations reducing stockouts and overstock.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-heart"></i></div><h5>Customer Loyalty</h5><p>AI-powered personalization, loyalty program management, and targeted marketing execution.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Last-Mile Delivery</h5><p>Intelligent fulfillment, carrier management, and delivery experience optimization.</p></div></div></div>`},
  'chemicals':{tag:'Energy & Natural Resources',parent:'Industries',title:'Chemicals',desc:'Optimize chemical manufacturing and drive sustainability with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-flask-fill"></i></div><h5>Recipe Management</h5><p>Formula and recipe management for batch manufacturing with quality control built-in.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>EHS & Compliance</h5><p>Hazardous substance management, REACH compliance, and safety data sheet automation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>Sustainability</h5><p>Carbon footprint tracking, energy management, and circular economy capabilities.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>Supply Chain</h5><p>Bulk chemical logistics, tank management, and specialized supply chain operations.</p></div></div></div>`},
  'oil-gas':{tag:'Energy & Natural Resources',parent:'Industries',title:'Oil, Gas & Energy',desc:'Optimize upstream, midstream, and downstream operations with intelligent enterprise solutions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-fuel-pump-fill"></i></div><h5>Asset Management</h5><p>Predictive maintenance, asset lifecycle, and IoT-connected operations for energy infrastructure.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>Sustainability & ESG</h5><p>Carbon tracking, emissions reporting, and sustainability performance management.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Trading & Risk</h5><p>Commodity trading, price risk management, and regulatory reporting for energy operations.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Field Service</h5><p>Mobile workforce management, remote diagnostics, and intelligent scheduling for field teams.</p></div></div></div>`},
  'mill':{tag:'Energy & Natural Resources',parent:'Industries',title:'Mill Products',desc:'Drive efficiency in steel, aluminum, paper, and building materials manufacturing.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-gear-fill"></i></div><h5>Production Optimization</h5><p>Coil/slab tracking, heat management, and production scheduling for complex mill environments.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-clipboard-check-fill"></i></div><h5>Quality Management</h5><p>Material test reporting, quality certificates, and statistical process control for mill products.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Sales & Distribution</h5><p>Complex pricing, tolerance management, and multi-unit of measure handling for sales.</p></div></div></div>`},
  'utilities':{tag:'Energy & Natural Resources',parent:'Industries',title:'Utilities',desc:'Transform utility operations and accelerate the energy transition.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightning-charge-fill"></i></div><h5>Grid Management</h5><p>Smart grid operations, outage management, and distributed energy resource management.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-fill"></i></div><h5>Customer Experience</h5><p>Omnichannel customer service, self-service portals, and proactive communication.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>Energy Transition</h5><p>Renewable energy management, carbon accounting, and sustainability reporting.</p></div></div></div>`},
  'healthcare':{tag:'Public Services',parent:'Industries',title:'Healthcare',desc:'Transform patient care and optimize clinical operations with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-heart-pulse-fill"></i></div><h5>Patient Management</h5><p>End-to-end patient journey from admission to discharge with real-time clinical insights.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-capsule-pill"></i></div><h5>Supply Chain</h5><p>Medical supply management, pharmaceutical tracking, and intelligent procurement.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-medical-fill"></i></div><h5>Clinical Compliance</h5><p>HIPAA, HL7 FHIR, and local healthcare regulatory compliance built into every solution.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Healthcare Analytics</h5><p>Predictive analytics for patient outcomes, resource utilization, and operational performance.</p></div></div></div>`},
  'higher-edu':{tag:'Public Services',parent:'Industries',title:'Higher Education',desc:'Modernize campus operations and improve student experience with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Student Lifecycle</h5><p>Admissions, enrollment, academic records, and alumni management on a unified platform.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Campus Management</h5><p>Facilities management, space optimization, and energy management for modern campuses.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Finance & Grants</h5><p>Research grant management, fund accounting, and compliance reporting for institutions.</p></div></div></div>`},
  'govt':{tag:'Public Services',parent:'Industries',title:'Federal & National Government',desc:'Modernize government operations and improve citizen services with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Grants Management</h5><p>End-to-end grants lifecycle from application to disbursement with full audit trails.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Citizen Services</h5><p>Digital citizen portals, case management, and service delivery optimization.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Compliance & Audit</h5><p>Government accounting standards, audit management, and regulatory reporting.</p></div></div></div>`},
  'prof-services':{tag:'Services',parent:'Industries',title:'Professional Services',desc:'Deliver projects on time and on budget with maximum profitability.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-kanban-fill"></i></div><h5>Project Management</h5><p>End-to-end project lifecycle from opportunity to invoice with real-time profitability tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Resource Management</h5><p>Skills-based resource matching, utilization optimization, and capacity planning.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Billing & Revenue</h5><p>Complex billing models, revenue recognition, and project financials integrated with accounting.</p></div></div></div>`},
  'transport':{tag:'Services',parent:'Industries',title:'Transport & Logistics',desc:'Optimize transport and logistics operations with end-to-end visibility.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-truck-front-fill"></i></div><h5>Transportation Management</h5><p>Multi-modal transport planning, carrier management, and real-time shipment tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Warehouse Management</h5><p>Advanced warehouse operations, labor management, and robotics integration.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Global Track & Trace</h5><p>End-to-end shipment visibility across carriers, modes, and geographies.</p></div></div></div>`},
  'eco':{tag:'Services',parent:'Industries',title:'Engineering, Construction & Ops',desc:'Manage complex projects, assets, and operations with SAP solutions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Project Management</h5><p>Large-scale project planning, cost control, earned value management, and milestone tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-wrench-adjustable-fill"></i></div><h5>Asset Management</h5><p>Plant maintenance, inspection management, and reliability-centered maintenance.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Workforce Management</h5><p>Large workforce planning, skills management, and safety compliance for construction.</p></div></div></div>`},
  'travel':{tag:'Services',parent:'Industries',title:'Passenger Travel & Leisure',desc:'Deliver exceptional travel experiences and optimize operations.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-airplane-fill"></i></div><h5>Revenue Management</h5><p>Dynamic pricing, yield management, and capacity optimization for airlines and travel operators.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-heart"></i></div><h5>Passenger Experience</h5><p>Personalized services, loyalty management, and seamless booking across all channels.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-gear-fill"></i></div><h5>Operations</h5><p>Flight and trip operations, crew management, maintenance, and ground handling optimization.</p></div></div></div>`},
  'banking':{tag:'Financial Services',parent:'Industries',title:'Banking & Financial Services',desc:'Modernize core banking and enhance customer experience with SAP.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bank2"></i></div><h5>Core Banking Modernization</h5><p>Replace legacy systems with cloud-native SAP banking solutions for real-time transactions.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Regulatory Compliance</h5><p>Built-in compliance for Basel III, IFRS 9, GDPR, and regional frameworks across 50+ countries.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-check-fill"></i></div><h5>Customer Experience</h5><p>Omnichannel banking, AI-driven personalized offers, and next-generation customer service.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Risk Management</h5><p>Enterprise, credit, market, and liquidity risk management on a single integrated platform.</p></div></div></div>`},
  'insurance':{tag:'Financial Services',parent:'Industries',title:'Insurance',desc:'Transform your insurance business with SAP solutions for policy and claims management.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-text-fill"></i></div><h5>Policy Management</h5><p>End-to-end policy lifecycle from quoting to renewal with full regulatory compliance.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-clipboard-check-fill"></i></div><h5>Claims Processing</h5><p>Straight-through claims processing, fraud detection, and digital first notice of loss.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shield-check-fill"></i></div><h5>Risk & Compliance</h5><p>Solvency II, IFRS 17, and local insurance regulatory compliance management built-in.</p></div></div></div>`},
  'ktern':{tag:'Innovation',parent:'Innovation',title:'KTern.AI',desc:'The only AI-native platform purpose-built to accelerate SAP digital transformations.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>60%</h3><p>Faster Projects</p></div><div class="stat-box"><h3>40%</h3><p>Cost Reduction</p></div><div class="stat-box"><h3>95%</h3><p>Risk Reduction</p></div><div class="stat-box"><h3>300+</h3><p>Clients</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cpu-fill"></i></div><h5>Digital Maps</h5><p>AI-powered SAP landscape discovery, process analysis, and transformation roadmap generation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>Digital Labs</h5><p>Automated test case generation, execution, and defect tracking for zero-defect go-lives.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Digital Projects</h5><p>AI-driven project governance, resource management, and stakeholder collaboration.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>Digital Operations</h5><p>Proactive AMS, system health monitoring, and business process performance management.</p></div></div></div>`},
  'kebs':{tag:'Innovation',parent:'Innovation',title:'KEBS',desc:'A unified business management platform integrating all key departments for operational efficiency.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-person-badge-fill"></i></div><h5>Resource Management</h5><p>Plan, allocate, and optimize your workforce across projects, skills, and geographies.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Finance & Billing</h5><p>Automated invoicing, revenue recognition, expense management, and financial reporting.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-kanban-fill"></i></div><h5>Project Management</h5><p>Gantt charts, task boards, milestone tracking, and client portal for project delivery.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-headset"></i></div><h5>Service Desk</h5><p>Ticketing, SLA management, knowledge base, and customer satisfaction tracking.</p></div></div></div>`},
  'technologies':{tag:'Innovation',parent:'Innovation',title:'Technologies',desc:'Authorized reseller and strategic partner for world-leading enterprise technology platforms.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-fill"></i></div><h5>Microsoft Azure</h5><p>Gold Microsoft partner for Azure infrastructure, SAP on Azure, and Microsoft 365 integrations.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-google"></i></div><h5>Google Cloud</h5><p>Certified GCP partner for SAP on Google Cloud deployments and data analytics integrations.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-box-fill"></i></div><h5>AWS</h5><p>AWS Advanced Partner for SAP on AWS implementations, cloud migrations, and managed services.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-diagram-3-fill"></i></div><h5>ServiceNow</h5><p>ServiceNow Technology Partner enabling SAP-ServiceNow integration for unified IT operations.</p></div></div></div>`},
  'blog':{tag:'Knowledge Hub',parent:'Insights',title:'Blog & Articles',desc:'Expert perspectives, industry trends, and practical guidance from the SAP Platform team.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-pencil-fill"></i></div><h5>SAP Thought Leadership</h5><p>In-depth articles from SAP experts covering S/4HANA, BTP, AI, and digital transformation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightbulb-fill"></i></div><h5>Industry Perspectives</h5><p>Industry-specific insights covering manufacturing, retail, banking, healthcare, and more.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-star-fill"></i></div><h5>Best Practices</h5><p>Practical how-to guides from hundreds of successful SAP implementation projects.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-newspaper"></i></div><h5>Company News</h5><p>Latest news and announcements from SAP Platform on partnerships and innovations.</p></div></div></div>`},
  'whitepapers':{tag:'Knowledge Hub',parent:'Insights',title:'Whitepapers',desc:'Research-backed whitepapers and technical documentation for enterprise SAP decision makers.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-earmark-text-fill"></i></div><h5>SAP S/4HANA Migration Guide</h5><p>Comprehensive guide to planning and executing a successful SAP S/4HANA migration.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-earmark-text-fill"></i></div><h5>Cloud ROI Framework</h5><p>TCO analysis and ROI calculation framework for SAP cloud transformation projects.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-earmark-text-fill"></i></div><h5>AI in ERP 2025</h5><p>Research report on generative AI adoption in enterprise ERP systems and business impact.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-earmark-text-fill"></i></div><h5>Sustainability Reporting</h5><p>Guide to implementing SAP Green Ledger and meeting CSRD and ESG reporting requirements.</p></div></div></div>`},
  'case-studies':{tag:'Knowledge Hub',parent:'Insights',title:'Case Studies',desc:'Real-world success stories from SAP Platform clients across industries and geographies.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>500+</h3><p>Case Studies</p></div><div class="stat-box"><h3>40+</h3><p>Industries</p></div><div class="stat-box"><h3>180+</h3><p>Countries</p></div><div class="stat-box"><h3>98%</h3><p>Satisfaction</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Manufacturing Leader</h5><p>Global manufacturer reduced financial close by 60% and improved supply chain visibility by 40%.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bank2"></i></div><h5>Regional Bank</h5><p>Mid-size bank modernized core banking and reduced compliance costs by 30%.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-shop-window"></i></div><h5>Retail Chain</h5><p>National retailer unified 500+ stores on single SAP platform, reducing inventory costs by 35%.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-heart-pulse-fill"></i></div><h5>Healthcare System</h5><p>Hospital network streamlined procurement, saving $12M annually while improving resilience.</p></div></div></div>`},
  'research':{tag:'Knowledge Hub',parent:'Insights',title:'Research Reports',desc:'Original research on SAP adoption, digital transformation trends, and enterprise technology benchmarks.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-bar-chart-fill"></i></div><h5>SAP Adoption Benchmark 2025</h5><p>Annual benchmark covering SAP adoption rates, cloud migration progress, and ROI outcomes globally.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>AI Readiness Index</h5><p>Research measuring enterprise readiness for AI-powered ERP features across 500+ organizations.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>ESG Maturity Report</h5><p>Survey of sustainability reporting capabilities and gaps across manufacturing, energy, and retail.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-fill"></i></div><h5>Cloud Migration Survey</h5><p>Research on cloud migration timelines, costs, challenges, and success factors from 300+ projects.</p></div></div></div>`},
  'webinars':{tag:'Events & Media',parent:'Insights',title:'Webinars',desc:'Free live and on-demand webinars covering SAP topics, industry trends, and best practices.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-camera-video-fill"></i></div><h5>SAP S/4HANA Live Demo</h5><p>Monthly live demonstrations of SAP S/4HANA capabilities, new features, and migration guidance.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>AI in Business Series</h5><p>Quarterly webinar series exploring practical AI use cases in ERP, finance, HR, and supply chain.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-fill"></i></div><h5>Cloud Migration Masterclass</h5><p>Step-by-step series guiding SAP customers through cloud migration planning and execution.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-play-circle-fill"></i></div><h5>On-Demand Library</h5><p>Access 200+ recorded webinars on all SAP topics available anytime at your convenience.</p></div></div></div>`},
  'events':{tag:'Events & Media',parent:'Insights',title:'Events & Conferences',desc:'Join SAP Platform at global conferences, regional events, and executive roundtables.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-geo-alt-fill"></i></div><h5>SAP Platform Summit</h5><p>Our annual flagship conference bringing together 2,000+ SAP professionals and thought leaders.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Executive Roundtables</h5><p>Invitation-only discussions for C-suite executives on digital transformation strategy.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>SAP SAPPHIRE Presence</h5><p>Join us at SAP SAPPHIRE NOW — the world's largest SAP conference with 20,000+ attendees.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Regional Events</h5><p>Industry events across North America, Europe, APAC, and Middle East throughout the year.</p></div></div></div>`},
  'videos':{tag:'Events & Media',parent:'Insights',title:'Videos & Podcasts',desc:'Watch product demos, hear client success stories, and listen to expert SAP discussions.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-play-btn-fill"></i></div><h5>Product Demos</h5><p>Short, focused video demonstrations of SAP S/4HANA, BTP, SuccessFactors, and other products.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-trophy-fill"></i></div><h5>Client Success Stories</h5><p>Video testimonials and case study presentations from SAP Platform clients across all industries.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mic-fill"></i></div><h5>SAP Insights Podcast</h5><p>Weekly podcast featuring SAP experts, industry analysts, and client executives on transformation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Tutorial Videos</h5><p>How-to video library covering SAP configuration, administration, and end-user training topics.</p></div></div></div>`},
  'press':{tag:'Events & Media',parent:'Insights',title:'Press Releases',desc:'Official news, announcements, and press releases from SAP Platform.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-newspaper"></i></div><h5>Partnership Announcements</h5><p>Latest strategic partnership announcements expanding our global SAP ecosystem capabilities.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-award-fill"></i></div><h5>Award Announcements</h5><p>Press releases covering recent industry awards, analyst recognitions, and certifications.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>Office Expansions</h5><p>News on new office openings, geographic expansion, and market entry announcements.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Leadership Updates</h5><p>Executive appointments, leadership changes, and organizational announcements.</p></div></div></div>`},
  'gen-ai':{tag:'Trending',parent:'Insights',title:'Generative AI in ERP',desc:'How Generative AI is reshaping enterprise resource planning systems in 2025 and beyond.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-chat-text-fill"></i></div><h5>Natural Language Queries</h5><p>Ask complex business questions in plain English and receive instant insights from ERP data.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-text-fill"></i></div><h5>Document Intelligence</h5><p>Automated extraction from invoices, purchase orders, and contracts with 98%+ accuracy.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Predictive Planning</h5><p>AI-driven demand forecasting, cash flow prediction, and workforce planning with learning models.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-exclamation-triangle-fill"></i></div><h5>Exception Management</h5><p>Intelligent anomaly detection and automated escalation for disruptions and financial exceptions.</p></div></div></div>`},
  'cloud-migration':{tag:'Trending',parent:'Insights',title:'Cloud Migration Guide',desc:'A comprehensive guide to migrating your SAP landscape to the cloud with minimal risk.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-1-circle-fill"></i></div><h5>Phase 1: Assess</h5><p>SAP landscape discovery, custom code analysis, and cloud readiness evaluation.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-2-circle-fill"></i></div><h5>Phase 2: Plan</h5><p>Migration roadmap, infrastructure sizing, security architecture, and cutover planning.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-3-circle-fill"></i></div><h5>Phase 3: Migrate</h5><p>Data migration, system conversion, and cloud provisioning using automated tooling.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-4-circle-fill"></i></div><h5>Phase 4: Optimize</h5><p>Post-migration performance tuning, cost optimization, and cloud-native feature adoption.</p></div></div></div>`},
  's4hana-trends':{tag:'Trending',parent:'Insights',title:'SAP S/4HANA Trends 2025',desc:'The latest trends, innovations, and roadmap updates for SAP S/4HANA in 2025.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-robot"></i></div><h5>Embedded AI (Joule)</h5><p>SAP Joule AI assistant embedded across all S/4HANA modules delivering contextual intelligence.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-cloud-fill"></i></div><h5>GROW with SAP Expansion</h5><p>Mid-market cloud ERP adoption accelerating with new pre-configured best practice content.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>Green Ledger Integration</h5><p>Carbon accounting now natively integrated into S/4HANA finance for sustainability tracking.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-plug-fill"></i></div><h5>BTP Deep Integration</h5><p>Tighter S/4HANA and BTP integration enabling rapid business process extensions without custom code.</p></div></div></div>`},
  'sustainability':{tag:'Trending',parent:'Insights',title:'Sustainability & ESG',desc:'How enterprises use SAP to measure, manage, and report on sustainability commitments.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-leaf-fill"></i></div><h5>SAP Green Ledger</h5><p>Record and report carbon emissions with the same rigor as financial accounting.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-recycle"></i></div><h5>Circular Economy</h5><p>Track product lifecycle, material flows, and circular business model performance.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Social Responsibility</h5><p>Supplier social compliance, human rights due diligence, and community impact measurement.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-earmark-check-fill"></i></div><h5>ESG Reporting</h5><p>Automated ESG disclosures aligned with GRI, SASB, TCFD, and CSRD standards.</p></div></div></div>`},
  'life-at-sap':{tag:'Careers',parent:'Careers',title:'Life at SAP Platform',desc:'Discover what it\'s really like to work at one of the world\'s leading SAP partner companies.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-geo-alt-fill"></i></div><h5>Global Offices</h5><p>25 offices across North America, Europe, Asia-Pacific, and Middle East with modern workspaces.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-calendar-event-fill"></i></div><h5>Team Activities</h5><p>Regular team events, hackathons, innovation days, and social activities globally.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-house-fill"></i></div><h5>Flexible Working</h5><p>Hybrid and remote working options giving our people flexibility to do their best work.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Diverse Community</h5><p>40+ nationalities creating a rich, inclusive environment where every perspective is valued.</p></div></div></div>`},
  'benefits':{tag:'Careers',parent:'Careers',title:'Employee Benefits',desc:'Comprehensive benefits supporting the health, wealth, and happiness of our global team.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-heart-fill"></i></div><h5>Health & Wellness</h5><p>Comprehensive medical, dental, and vision coverage plus mental health support and wellness programs.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-piggy-bank-fill"></i></div><h5>Financial Security</h5><p>Competitive salaries, performance bonuses, retirement plans, and employee stock programs.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Learning Budget</h5><p>Annual learning budget for courses, certifications, conferences, and training programs.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-house-fill"></i></div><h5>Work-Life Balance</h5><p>Generous PTO, parental leave, sabbatical programs, and flexible working arrangements.</p></div></div></div>`},
  'diversity':{tag:'Careers',parent:'Careers',title:'Diversity & Inclusion',desc:'Building a workplace where everyone belongs and every perspective drives better outcomes.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>40+</h3><p>Nationalities</p></div><div class="stat-box"><h3>44%</h3><p>Women</p></div><div class="stat-box"><h3>12</h3><p>ERG Groups</p></div><div class="stat-box"><h3>#1</h3><p>DEI Commitment</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Inclusive Hiring</h5><p>Blind CV screening, diverse interview panels, and inclusive job descriptions to eliminate bias.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-heart-fill"></i></div><h5>Employee Resource Groups</h5><p>12 active ERGs supporting women, LGBTQ+, veterans, and underrepresented groups.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Unconscious Bias Training</h5><p>Mandatory training for all managers on creating inclusive teams and leadership.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Global Representation</h5><p>40+ nationalities, 44% women in workforce, and active programs increasing leadership diversity.</p></div></div></div>`},
  'graduate':{tag:'Careers',parent:'Careers',title:'Graduate Program',desc:'A structured 2-year program launching exceptional SAP careers for the best fresh talent.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>SAP Training</h5><p>Intensive 6-month SAP training covering S/4HANA, BTP, and industry modules with certification.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Mentorship</h5><p>Dedicated senior consultant mentor providing guidance, career advice, and support throughout.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-briefcase-fill"></i></div><h5>Real Projects</h5><p>Hands-on project experience from day one working alongside experienced SAP consultants.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Fast Track Career</h5><p>High performers advance to senior consultant roles in 18 months — faster than industry average.</p></div></div></div>`},
  'internship':{tag:'Careers',parent:'Careers',title:'Internship Program',desc:'A 12-week paid internship giving students real-world SAP experience.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-laptop-fill"></i></div><h5>Hands-On SAP Access</h5><p>Full access to SAP sandbox environments, training materials, and guided learning from day one.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Team Integration</h5><p>Interns work as full team members alongside consultants on real client projects.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-award-fill"></i></div><h5>75% Conversion Rate</h5><p>75% of interns receive full-time job offers — a direct pipeline into the graduate program.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Paid & Competitive</h5><p>Competitive internship salaries plus access to all employee benefits during the period.</p></div></div></div>`},
  'leadership-dev':{tag:'Careers',parent:'Careers',title:'Leadership Development',desc:'Grow from consultant to leader with structured development programs.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Manager Track</h5><p>Structured 12-month program developing first-time managers with coaching and assignments.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Executive Coaching</h5><p>1-on-1 executive coaching for senior leaders with certified coaches on strategic leadership.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>Global Exposure</h5><p>International rotation programs giving high-potential leaders exposure to global markets.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-mortarboard-fill"></i></div><h5>Leadership Academy</h5><p>Annual summit bringing together 200+ managers from around the world for intensive development.</p></div></div></div>`},
  'sap-cert':{tag:'Careers',parent:'Careers',title:'SAP Certification Support',desc:'Full financial and study support to help our consultants achieve SAP certifications.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-patch-check-fill"></i></div><h5>Exam Fee Coverage</h5><p>100% exam fee coverage for first attempts on all SAP certification exams across all modules.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-book-fill"></i></div><h5>Study Materials</h5><p>Access to official SAP training materials, practice exams, and internal study groups.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-calendar-check-fill"></i></div><h5>Paid Study Leave</h5><p>Paid study leave days before certification exams giving consultants time to prepare.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-trophy-fill"></i></div><h5>Certification Bonus</h5><p>Financial bonus awarded for each successful SAP certification — rewarding expertise.</p></div></div></div>`},
  'culture':{tag:'Careers',parent:'Careers',title:'Our Culture',desc:'A high-performance, people-first culture where innovation, collaboration, and growth thrive.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-check-circle-fill"></i></div><h5>Integrity</h5><p>We do what we say. Honest, transparent, and ethical in every engagement and interaction.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-lightbulb-fill"></i></div><h5>Innovation</h5><p>We challenge the status quo, experiment fearlessly, and celebrate learning from every experience.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Inclusion</h5><p>Every voice matters — we create a safe space for diverse perspectives to drive better outcomes.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Impact</h5><p>We measure success by tangible value created for clients, employees, and communities.</p></div></div></div>`},
  'learning':{tag:'Careers',parent:'Careers',title:'Learning & Growth',desc:'Continuous learning is in our DNA — we invest in your development at every career stage.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-laptop-fill"></i></div><h5>Learning Platform</h5><p>Access to 10,000+ courses on SAP, technology, leadership, and business skills.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-currency-dollar"></i></div><h5>Learning Budget</h5><p>Annual personal budget for external courses, conferences, books, and certifications.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Communities of Practice</h5><p>Internal knowledge sharing communities across SAP modules, industries, and technology domains.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-graph-up-arrow"></i></div><h5>Career Pathing</h5><p>Clear career paths from graduate to principal consultant to partner with defined milestones.</p></div></div></div>`},
  'global-ops':{tag:'Careers',parent:'Careers',title:'Global Opportunities',desc:'Build an international career with SAP Platform — offices in 25 countries and growing.',body:`<div class="detail-section"><div class="stats-row"><div class="stat-box"><h3>25</h3><p>Offices</p></div><div class="stat-box"><h3>180+</h3><p>Countries Served</p></div><div class="stat-box"><h3>40+</h3><p>Nationalities</p></div><div class="stat-box"><h3>Global</h3><p>Mobility Program</p></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-globe2"></i></div><h5>International Transfers</h5><p>Structured program allowing employees to relocate to any of our 25 global offices.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-airplane-fill"></i></div><h5>Global Projects</h5><p>Work on international client projects building global SAP expertise and networks.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>Cross-Cultural Teams</h5><p>Collaborate with colleagues and clients from diverse cultures in a truly global environment.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-building-fill"></i></div><h5>25 Offices Worldwide</h5><p>Offices across North America, Europe, Asia-Pacific, Middle East, and Latin America.</p></div></div></div>`},
  'employer-awards':{tag:'Careers',parent:'Careers',title:'Awards as Employer',desc:'Recognized globally as one of the best places to build a career in enterprise technology.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-trophy-fill"></i></div><h5>Best Employer 2024</h5><p>Recognized by Great Place to Work in 8 countries as a top employer for culture and growth.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-star-fill"></i></div><h5>Glassdoor Top Rated</h5><p>4.5/5 Glassdoor rating with 92% of employees saying they would recommend us.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-award-fill"></i></div><h5>Top SAP Employer</h5><p>Voted top SAP services employer by SAP community members for three consecutive years.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-people-fill"></i></div><h5>LinkedIn Top Company</h5><p>Featured in LinkedIn's Top Companies list for career growth opportunities in technology.</p></div></div></div>`},
};

/* ══════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════ */
function getPage(id){
  if(pages[id]) return pages[id];
  return {tag:'SAP Platform',parent:'SAP Platform',title:id.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),desc:'Detailed information and expert insights from the SAP Platform team.',body:`<div class="detail-section"><div class="detail-grid"><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-info-circle-fill"></i></div><h5>Expert Guidance</h5><p>Our SAP experts provide personalized guidance on this topic for your specific business needs.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-telephone-fill"></i></div><h5>Get in Touch</h5><p>Schedule a discovery call to learn how SAP Platform can help your organization.</p></div><div class="detail-card"><div class="detail-card-icon"><i class="bi bi-file-text-fill"></i></div><h5>Resources Available</h5><p>Access whitepapers, case studies, and solution briefs tailored to this area of focus.</p></div></div></div>`};
}

function showDetail(id){
  if(id==='open-positions'){ showCareers(); return; }
  const p=getPage(id);
  document.getElementById('detail-tag').textContent=p.tag;
  document.getElementById('detail-title').textContent=p.title;
  document.getElementById('detail-desc').textContent=p.desc;
  document.getElementById('detail-body-content').innerHTML=p.body;
  document.getElementById('detail-breadcrumb-parent').textContent=p.parent;
  const curr=document.getElementById('detail-breadcrumb-current-wrap');
  if(p.parent&&p.parent!==p.title){curr.style.display='inline-flex';document.getElementById('detail-breadcrumb-current').textContent=p.title;}
  else curr.style.display='none';
  showPage('detail');
}

function showCareers(){
  document.getElementById('detail-tag').textContent='Careers';
  document.getElementById('detail-title').textContent='Open Positions';
  document.getElementById('detail-desc').textContent='Join 5,000+ passionate SAP professionals. Search and apply for your next role.';
  document.getElementById('detail-breadcrumb-parent').textContent='Careers';
  document.getElementById('detail-breadcrumb-current-wrap').style.display='none';
  document.getElementById('detail-body-content').innerHTML=`
    <div style="padding:2rem 0">
      <div class="job-search-bar">
        <input type="text" id="jobSearch" placeholder="Search by title, skill, or keyword..." oninput="filterJobs()"/>
        <select id="jobDept" onchange="filterJobs()">
          <option value="">All Departments</option>
          <option>Enterprise Application</option><option>Digital Services</option>
          <option>HR Transformation</option><option>Data & Analytics</option>
          <option>Cloud Engineering</option><option>Technical Services</option>
          <option>Delivery</option><option>Business Development</option>
          <option>Graduate Program</option><option>Internship</option>
        </select>
        <select id="jobMode" onchange="filterJobs()">
          <option value="">All Work Modes</option>
          <option>Remote</option><option>Hybrid</option><option>Onsite</option>
        </select>
        <button onclick="filterJobs()"><i class="bi bi-search me-1"></i>Search</button>
      </div>
      <div id="jobsCount" class="jobs-count"></div>
      <div id="jobsList"></div>
    </div>`;
  showPage('detail');
  setTimeout(()=>renderJobs(JOBS),50);
}

function goHome(){ showPage('home'); }

function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ══════════════════════════════════════
   DOM READY
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{

  /* ── Scroll + back to top ── */
  const btt=document.getElementById('btt');
  window.addEventListener('scroll',()=>{
    if(btt) btt.classList.toggle('visible',window.scrollY>300);
    const nav=document.getElementById('mainNav');
    if(nav) nav.style.boxShadow=window.scrollY>10?'0 2px 20px rgba(0,0,0,0.1)':'0 1px 4px rgba(0,0,0,0.06)';
  });

  /* ── Desktop mega menu hover (with delay to bridge gap) ── */
  const navItems=document.querySelectorAll('#desktopNav .nav-item');
  let closeTimer=null;
  navItems.forEach(item=>{
    if(!item.querySelector('.mega-drop')) return;
    item.addEventListener('mouseenter',()=>{
      if(window.innerWidth<=991) return;
      clearTimeout(closeTimer);
      navItems.forEach(o=>o.classList.remove('mega-open'));
      item.classList.add('mega-open');
    });
    item.addEventListener('mouseleave',()=>{
      if(window.innerWidth<=991) return;
      closeTimer=setTimeout(()=>item.classList.remove('mega-open'),150);
    });
    const panel=item.querySelector('.mega-drop');
    if(panel){
      panel.addEventListener('mouseenter',()=>{ if(window.innerWidth<=991) return; clearTimeout(closeTimer); });
      panel.addEventListener('mouseleave',()=>{ if(window.innerWidth<=991) return; closeTimer=setTimeout(()=>item.classList.remove('mega-open'),150); });
    }
  });
  document.addEventListener('click',e=>{ if(!e.target.closest('#desktopNav .nav-item')) navItems.forEach(i=>i.classList.remove('mega-open')); });

  /* ── Mobile menu ── */
  const mBtn=document.getElementById('mobileToggle');
  const mMenu=document.getElementById('desktopNav');
  function closeMenu(){
    if(mMenu) mMenu.classList.remove('open');
    if(mBtn) mBtn.innerHTML='<i class="bi bi-list"></i>';
    navItems.forEach(i=>i.classList.remove('mega-open'));
  }
  if(mBtn&&mMenu){
    mBtn.addEventListener('click',e=>{
      e.stopPropagation();
      const isOpen=mMenu.classList.toggle('open');
      mBtn.innerHTML=isOpen?'<i class="bi bi-x-lg"></i>':'<i class="bi bi-list"></i>';
    });
  }
  navItems.forEach(item=>{
    const btn=item.querySelector('.nav-link-btn');
    const panel=item.querySelector('.mega-drop');
    if(!btn||!panel) return;
    btn.addEventListener('click',e=>{
      if(window.innerWidth>991) return;
      e.stopPropagation();
      const wasOpen=item.classList.contains('mega-open');
      navItems.forEach(i=>i.classList.remove('mega-open'));
      if(!wasOpen) item.classList.add('mega-open');
    });
  });
  document.querySelectorAll('#desktopNav .mega-link,#desktopNav .mega-card').forEach(l=>l.addEventListener('click',()=>closeMenu()));
  document.addEventListener('click',e=>{ if(mBtn&&mMenu&&!mBtn.contains(e.target)&&!mMenu.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){navItems.forEach(i=>i.classList.remove('mega-open'));closeMenu();} });
  window.addEventListener('resize',()=>{ if(window.innerWidth>991) closeMenu(); });

  /* ── Counter animation ── */
  let counted=false;
  const hs=document.querySelector('.hero-section');
  if(hs){
    new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!counted){
        counted=true;
        document.querySelectorAll('.num[data-count]').forEach(el=>{
          const t=+el.getAttribute('data-count'),s=t/(1600/16);let c=0;
          const ti=setInterval(()=>{c+=s;if(c>=t){el.textContent=t;clearInterval(ti);}else el.textContent=Math.floor(c);},16);
        });
      }
    },{threshold:0.3}).observe(hs);
  }

  /* ── Product tabs ── */
  document.querySelectorAll('.ptab-item').forEach(item=>{
    item.addEventListener('click',()=>{
      document.querySelectorAll('.ptab-item').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.ptab-content').forEach(c=>c.classList.remove('active'));
      item.classList.add('active');
      const el=document.getElementById('tab-'+item.dataset.tab);
      if(el) el.classList.add('active');
    });
  });

  /* ── Scroll reveal ── */
  const rev=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='translateY(0)';},i*55);rev.unobserve(e.target);}});
  },{threshold:0.07});
  document.querySelectorAll('.sol-card,.ind-card,.ins-card,.av-block,.about-stat,.detail-card,.stat-box').forEach(el=>{
    el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity 0.5s ease,transform 0.5s ease';rev.observe(el);
  });

  /* ── Hero stagger ── */
  ['.hero-title','.hero-desc','.hero-actions','.hero-stats'].forEach((sel,i)=>{
    const el=document.querySelector(sel);if(!el) return;
    el.style.opacity='0';el.style.transform='translateY(20px)';
    el.style.transition=`opacity 0.65s ease ${0.1+i*0.12}s,transform 0.65s ease ${0.1+i*0.12}s`;
    requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='translateY(0)';});
  });

  /* ── Contact form ── */
  const form=document.getElementById('contactForm'),success=document.getElementById('cSuccess');
  const subBtn=document.getElementById('submitBtn'),subTxt=document.getElementById('submitText'),subSpin=document.getElementById('submitSpin');
  function resetContactForm(){
    if(!form) return;
    form.reset();form.querySelectorAll('.c-input').forEach(i=>i.classList.remove('is-invalid'));
    form.classList.remove('d-none');if(success)success.classList.add('d-none');
    if(subTxt)subTxt.classList.remove('d-none');if(subSpin)subSpin.classList.add('d-none');if(subBtn)subBtn.disabled=false;
    const fp=document.getElementById('fPrivacy');if(fp)fp.style.outline='';
    const pe=document.getElementById('privacyErr');if(pe)pe.style.display='none';
  }
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();let ok=true;
      form.querySelectorAll('.c-input[required]').forEach(inp=>{
        const v=inp.value.trim();let valid=!!v;
        if(inp.type==='email') valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        if(inp.type==='tel')   valid=/^[\d\+\-\s]{7,15}$/.test(v);
        if(inp.tagName==='SELECT') valid=!!inp.value;
        if(!valid){inp.classList.add('is-invalid');ok=false;}else inp.classList.remove('is-invalid');
      });
      const pc=document.getElementById('fPrivacy'),pe=document.getElementById('privacyErr');
      if(pc&&!pc.checked){pc.style.outline='2px solid #f87171';if(pe){pe.textContent='You must agree to the Privacy Policy.';pe.style.display='block';}ok=false;}
      else if(pc){pc.style.outline='';if(pe)pe.style.display='none';}
      if(!ok) return;
      if(subTxt)subTxt.classList.add('d-none');if(subSpin)subSpin.classList.remove('d-none');if(subBtn)subBtn.disabled=true;
      setTimeout(()=>{form.classList.add('d-none');if(success)success.classList.remove('d-none');},1800);
    });
    form.querySelectorAll('.c-input').forEach(i=>{i.addEventListener('input',()=>i.classList.remove('is-invalid'));i.addEventListener('change',()=>i.classList.remove('is-invalid'));});
  }
  document.getElementById('resetFormBtn')?.addEventListener('click',resetContactForm);
  document.getElementById('contactModal')?.addEventListener('hidden.bs.modal',resetContactForm);

  /* ── Job application form ── */
  const applyForm=document.getElementById('applyForm');
  if(applyForm){
    applyForm.addEventListener('submit',e=>{
      e.preventDefault();let ok=true;
      const checks=[
        {id:'af-fname',v:v=>!!v},{id:'af-lname',v:v=>!!v},
        {id:'af-email',v:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},
        {id:'af-phone',v:v=>/^[\d\+\-\s]{7,}$/.test(v)},
        {id:'af-location',v:v=>!!v},{id:'af-exp',v:v=>!!v},
        {id:'af-cover',v:v=>v.trim().length>10},
        {id:'af-resume',v:()=>{const el=document.getElementById('af-resume');return el&&el.files&&el.files.length>0;}},
      ];
      checks.forEach(({id,v})=>{
        const el=document.getElementById(id),err=document.getElementById(id+'-err');
        const val=el?(el.tagName==='SELECT'?el.value:el.value.trim()):'';
        if(!v(val)){if(el)el.classList.add('invalid');if(err)err.classList.add('show');ok=false;}
        else{if(el)el.classList.remove('invalid');if(err)err.classList.remove('show');}
      });
      if(!ok) return;
      const btn=document.getElementById('af-submit'),txt=document.getElementById('af-txt'),spin=document.getElementById('af-spin');
      if(txt)txt.classList.add('d-none');if(spin)spin.classList.remove('d-none');if(btn)btn.disabled=true;
      setTimeout(()=>{applyForm.classList.add('d-none');document.getElementById('applySuccess').classList.remove('d-none');},1800);
    });
    applyForm.querySelectorAll('.jf-input').forEach(inp=>{
      inp.addEventListener('input',()=>{inp.classList.remove('invalid');const err=document.getElementById(inp.id+'-err');if(err)err.classList.remove('show');});
      inp.addEventListener('change',()=>{inp.classList.remove('invalid');const err=document.getElementById(inp.id+'-err');if(err)err.classList.remove('show');});
    });
  }
  document.getElementById('jobApplyModal')?.addEventListener('hidden.bs.modal',resetApplyForm);
});