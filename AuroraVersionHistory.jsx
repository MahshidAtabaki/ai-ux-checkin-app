import React, { useState } from 'react';

// AuroraVersionHistory - Single File React Demo
// NOTE: This single file covers all main UI structure, mock data, and core style/features described in specs.

const INTER_FONT = `'Inter', sans-serif`;
// Placeholder avatar and thumbnail URLs (or use https://via.placeholder.com/)
const AVATAR = 'https://i.pravatar.cc/32';
const THUMB = 'https://via.placeholder.com/120x120.png?text=UI+Snapshot';

const contributors = [
  { name: "Sarah Kim", commits: 48, avatar: AVATAR + '?u=sarah' },
  { name: "Mike Lee", commits: 36, avatar: AVATAR + '?u=mike' },
  { name: "You", commits: 71, avatar: AVATAR + '?u=you' },
  { name: "Akira M.", commits: 23, avatar: AVATAR + '?u=akira' },
];
const branches = [
  { name: "Main", color: '#0f0', versions: 127 },
  { name: "feature/new-nav", color: '#3af', versions: 23 },
  { name: "experiment/dark-mode", color: '#1fcdbb', versions: 8 },
];
const tags = ['v1.0', 'v1.2', 'beta-release'];

// Sample version node structure
function makeMockVersions() {
  // Arranged with organic slight offsets for illustration
  const baseX = 200; const baseY = 140;
  return Array.from({ length: 18 }, (_, i) => ({
    id: `${i+101}`,
    version: `v1.${i}`,
    branch: branches[(i < 13) ? 0 : (i < 16) ? 1 : 2],
    top: baseY + Math.sin(i/3)*45 + (i%2)*20,
    left: baseX + i*115 + Math.cos(i/4)*20,
    thumbnail: THUMB,
    timestamp: `2025-10-2${i%10} ${String(10+i%10).padStart(2,"0")}:12`,
    commit: { message: `Mock commit message for v${i}`, files: 5+i, author: contributors[i%4].name },
  }));
}
const nodes = makeMockVersions();

function AuroraVersionHistory() {
  const [projectName, setProjectName] = useState('Dashboard Redesign');
  const [editingProject, setEditingProject] = useState(false);
  const [selectedNode, setSelectedNode] = useState(nodes[1].id);
  const [search, setSearch] = useState('');
  // Simulate collaborative cursors
  const collabCursors = [
    { label: 'Sarah', color: '#30f08c', x: 970, y: 280 },
    { label: 'Mike', color: '#3696f7', x: 1140, y: 205 }
  ];

  // --- Render helpers below ---
  // Header
  function renderHeader() {
    return (
      <header style={styles.header}>
        {/* Left: Logo + Project Name */}
        <div style={styles.headerLeft}>
          <span style={styles.logoWordmark}>Aurora</span>
          {editingProject ? (
            <input style={styles.projectInput} value={projectName} onChange={e=>setProjectName(e.target.value)} onBlur={()=>setEditingProject(false)} autoFocus />
          ) : (
            <span style={styles.projectName} onClick={()=>setEditingProject(true)}>{projectName} <span style={styles.editIcon}>✏️</span></span>
          )}
        </div>
        {/* Center: Search bar */}
        <div style={styles.headerCenter}>
          <input style={styles.searchBar} placeholder="Search versions, commits, or dates..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        {/* Right: Avatars, Share, Settings */}
        <div style={styles.headerRight}>
          <div style={styles.headerAvatars}>{contributors.slice(0,3).map((c,i) => (
            <img key={i} src={c.avatar} alt={c.name} style={{...styles.avatar, left: i*20}} />
          ))}</div>
          <button style={styles.shareButton}>Share</button>
          <span style={styles.settingsIcon}>⚙️</span>
        </div>
      </header>
    );
  }

  // Left Sidebar
  function renderSidebar() {
    return (
      <aside style={styles.sidebar}>
        <div style={styles.sectionHeader}><span>Branches</span><span style={styles.arrow}>▾</span></div>
        <ul style={{marginBottom:24}}>{branches.map((b,i)=>(
          <li key={b.name} style={styles.branchRow}>
            <span style={{...styles.branchDot, background:b.color}} />
            <span style={{fontWeight: b.name==='Main'?700:400, color:b.name==='Main'?'#31f08c':'#68e6d8'}}>{b.name}</span>
            <span style={styles.branchVersionCount}>{b.versions} versions</span>
            {b.name==='Main' && <span style={styles.activeBranchGlow}/>} 
          </li>
        ))}</ul>
        <div style={styles.sectionHeader}>Contributors</div>
        <ul style={styles.contribList}>{contributors.map(c=>(
          <li key={c.name} style={styles.contribRow}><img src={c.avatar} alt={c.name} style={styles.contribAvatar} /> <span>{c.name}</span> <span style={styles.contribCommits}>{c.commits} commits</span></li>
        ))}</ul>
        <div style={styles.sectionHeader}>Tags</div>
        <div style={styles.tagsRow}>{tags.map(tag => (
          <span key={tag} style={styles.tagChip}>{tag}</span>
        ))}</div>
        <div style={styles.sectionHeader}><span>Date Range</span> <span style={styles.calendarIcon}>📅</span></div>
        <input type="date" style={styles.dateInput}/>
      </aside>
    );
  }

  // Right Sidebar (minimap)
  function renderRightbar() {
    return (
      <aside style={styles.rightbar}>
        <div style={styles.minimapBox}>
          {/* Minimap: Just a visualization, not truly interactive in this mock */}
          <div style={styles.minimapCanvas}>
            {/* Simulated nodes and branches in minimap */}
            {nodes.slice(0,18).map((n,i)=>(
              <div key={i} style={{
                ...styles.minimapNode,
                background: n.id===selectedNode?'#0fffcb':'#31f08c66',
                left: n.left/8, top: n.top/8
              }} />
            ))}
            {/* Current viewport rectangle */}
            <div style={styles.minimapViewRect}></div>
          </div>
          <div style={styles.minimapLegend}>Minimap</div>
          <div style={styles.zoomControls}>
            <button style={styles.zoomBtn}>-</button>
            <span style={styles.zoomText}>100%</span>
            <button style={styles.zoomBtn}>+</button>
            <button style={styles.fitAllBtn}>Fit All</button>
          </div>
        </div>
      </aside>
    );
  }

  // Main Timeline Canvas
  function renderTimelineCanvas() {
    return (
      <main style={styles.canvas}>
        {/* Grid dot pattern background */}
        <div style={styles.dotGrid}></div>
        {/* Animated connection lines (abstracted as SVG for demo) */}
        <svg width="1500" height="780" style={styles.connectionSVG}>
          {/* Main branch connections */}
          {nodes.slice(0,12).map((n,i) => i>0 && (
            <AnimatedConnection key={i}
              x1={nodes[i-1].left+60} y1={nodes[i-1].top+60}
              x2={n.left+60} y2={n.top+60}
              color={'url(#auroraG)'}
              width={2}
              glow
            />
          ))}
          {/* Y branch to feature/nav at node 12 */}
          <AnimatedConnection x1={nodes[11].left+60} y1={nodes[11].top+60} x2={nodes[13].left+60} y2={nodes[13].top+60} color={'url(#auroraB)'} width={2} glow dashed/>
          <defs>
            {/* Aurora Green-Blue Gradient */}
            <linearGradient id="auroraG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0fffcb"/>
              <stop offset="100%" stopColor="#25a5ff"/>
            </linearGradient>
            {/* Aurora Blue Gradient */}
            <linearGradient id="auroraB" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#31f08c"/>
              <stop offset="100%" stopColor="#4396fb"/>
            </linearGradient>
          </defs>
        </svg>
        {/* Version Nodes - circular cards */}
        {nodes.map((n,i) => (
          <div
            key={n.id}
            style={{
              ...styles.node,
              top: n.top, left: n.left,
              border: n.id===selectedNode ? '3px solid #0fffcb' : i>=nodes.length-3 ? '2px solid #43ff9a' : '1px solid #43ffb4',
              boxShadow: n.id===selectedNode? '0 0 0 4px #19fbb460, 0 4px 32px #19fbb423' : i>=nodes.length-3?'0 0 10px 2px #43ff9a60, 0 4px 36px #3afeef26':'0 0 6px #0fffcb28',
              animation: i>=nodes.length-3? 'glowpulse 1s infinite alternate' : undefined,
            }}
            onMouseEnter={()=>setSelectedNode(n.id)}
            onMouseLeave={()=>setSelectedNode(nodes[1].id)}
            onClick={()=>setSelectedNode(n.id)}
          >
            <img src={n.thumbnail} alt={n.version} style={styles.nodeThumb} />
            <div style={styles.nodeLabel}>{n.version}</div>
            <div style={styles.nodeMeta}>{n.timestamp}</div>
            {i===13 ? <span style={styles.branchTag}>feature/nav</span> : i===16 ? <span style={styles.branchTag}>experiment/dark-mode</span> : null}
            {/* Hover Tooltip */}
            {selectedNode===n.id && (
              <div style={styles.nodeTooltip}>
                <div style={{fontWeight:600,marginBottom:2}}>{n.commit.message}</div>
                <div>by <b>{n.commit.author}</b></div>
                <div>{n.commit.files} files changed</div>
              </div>
            )}
          </div>
        ))}
        {/* Collaborative cursors */}
        {collabCursors.map((cur,i) => (
          <div key={cur.label} style={{...styles.collabCursor, left:cur.x, top:cur.y, borderColor:cur.color}}>
            <span style={{...styles.collabCursorDot, background:cur.color}}></span>
            <span style={{...styles.collabCursorLabel, color:cur.color}}>{cur.label}</span>
          </div>
        ))}
        {/* If no history/empty: display empty state (just demo logic) */}
        {/* <div style={styles.emptyState}>No version history yet. Start coding to capture your first UI snapshot.<br /><span style={styles.emptyAurora} /></div> */}
      </main>
    );
  }

  // SVG animated connection line (abstracted for demo)
  function AnimatedConnection({x1,y1,x2,y2,color,width,glow,dashed}) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={width} style={{
        filter: glow?'drop-shadow(0 0 6px #0fffcb90)':'',
        strokeDasharray: dashed?'8,6':''
      }} />
  }
  
  // --- Final assembled render ---
  return (
    <div style={styles.root}>
      {/* Aurora Main Timeline UI */}
      {renderHeader()}
      <div style={styles.mainRow}>
        {renderSidebar()}
        <div style={styles.centerArea}>{renderTimelineCanvas()}</div>
        {renderRightbar()}
      </div>
      <footer style={styles.statusBar}>
        <span style={styles.statusLeft}>Last updated 2 minutes ago</span>
        <span style={styles.statusRight}>x: 4200, y: 164  |  87%</span>
      </footer>
      {/* Main style + keyframes */}
      <style>{globalCSS}</style>
    </div>
  );
}

// --- Styles ---
const styles = {
  root: { fontFamily: INTER_FONT, background: '#091014', color:'#d2fff1', minHeight:'100vh', display:'flex', flexDirection:'column', overflow:'hidden'},
  mainRow: { display:'flex', flex:'1 1 auto', minHeight:0, minWidth:0 },
  centerArea: { flex:'1 1 auto', minWidth:0, position:'relative' },

  // Header Styles
  header: { height:60, background:'#0a0e17', borderBottom:'1px solid rgba(0,255,136,0.1)', padding:'0 28px', display:'flex', alignItems:'center', position:'relative', zIndex:5 },
  headerLeft: { display:'flex', alignItems:'center', gap:10 },
  logoWordmark: { fontWeight:900, fontSize:28, letterSpacing:-2, background:'linear-gradient(90deg,#3affe3 20%,#31aaff 80%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginRight:18 },
  projectName: { fontSize:20, fontWeight:600, display:'inline-flex', alignItems:'center', cursor:'pointer', padding:'1px 6px', borderRadius:4, transition:'background .17s', background:'#0721153a' },
  projectInput: { fontSize:20, fontWeight:600, border:'1px solid #1db98e', borderRadius:4, background:'#10241b', color:'#25fcb4', padding:'1px 8px', width:260 },
  editIcon: { fontSize:14, opacity:0.6, marginLeft:6 },
  headerCenter: { flex:1, display:'flex', justifyContent:'center'},
  searchBar: { width:400, maxWidth:'100%', borderRadius:10, border:'none', outline:'none', padding:'8px 18px', background:'#11232c', color:'#43ffef', fontWeight:500, fontSize:15, boxShadow:'0 0 0 2px transparent', transition:'box-shadow .14s', },
  headerRight: { display:'flex', alignItems:'center', gap:12 },
  headerAvatars: { position:'relative', width:52, height:32 },
  avatar: { position:'absolute', width:32, height:32, border:'2.5px solid #3affa5', borderRadius:'50%', background:'#1e2d24', boxShadow:'0 1px 7px #00ffbb27' },
  shareButton: { marginLeft:14, padding:'7px 16px', border:'none', borderRadius:8, background:'linear-gradient(90deg,#1fffa7 10%,#189aff 90%)', color:'#10201d', fontWeight:700, fontSize:16, cursor:'pointer', boxShadow:'0 2px 18px 0 #33ffb855', transition:'opacity .2s' },
  settingsIcon: { fontSize:29, color:'#73ffd3', cursor:'pointer', marginLeft:10 },

  // Sidebar
  sidebar: { width:280, background:'#111827', padding:'26px 24px 0', borderRight:'1px solid #162329', display:'flex', flexDirection:'column', minWidth:0, minHeight:0 },
  sectionHeader: { fontWeight:700, fontSize:17, marginBottom:9, marginTop:20, display:'flex', alignItems:'center', gap:10 },
  arrow: { fontSize:14, marginLeft:'auto', color:'#24fbb6', float:'right' },
  branchRow: { display:'flex', alignItems:'center', gap:12, padding:'4px 0', fontSize:15, position:'relative', marginBottom:4 },
  branchDot: { width:13, height:13, borderRadius:'50%', boxShadow:'0 0 0 2px #14211d', marginRight:4 },
  branchVersionCount: { marginLeft:'auto', fontSize:12, color:'#8ee8c1', fontWeight:500 },
  activeBranchGlow: { position:'absolute', left:3, top:2, width:15, height:15, borderRadius:'50%', boxShadow:'0 0 8px 2px #20f8d7' },
  contribList: { display:'flex', flexDirection:'column', gap:4, paddingLeft:0 },
  contribRow: { display:'flex', alignItems:'center', gap:10, fontSize:14, padding:'2px 0' },
  contribAvatar: { width:23, height:23, borderRadius:'50%', marginRight:3, border:'2px solid #02cea6', boxShadow:'0 0 8px #1fffd74a' },
  contribCommits: { color:'#26ffb1', fontWeight:600, marginLeft:'auto', fontSize:12 },
  tagsRow: { display:'flex', flexWrap:'wrap', gap:9, margin:'8px 0 14px 0'},
  tagChip: { background:'#1a2a27', color:'#33ffc5', border:'1px solid #22fcb4', borderRadius:7, fontSize:13, padding:'2px 13px', marginRight:6 },
  calendarIcon: { fontSize:19, opacity:0.9, marginLeft:8 },
  dateInput: { width:146, border:'1px solid #1aebc1', borderRadius:6, background:'#111d13', color:'#24ffc9', fontWeight:500, fontSize:14, padding:'4px 9px', marginTop:5 },

  // Rightbar (Minimap)
  rightbar: { width:320, background:'#17222e88', borderLeft:'1px solid #102b19', padding:'22px 18px 0', display:'flex', flexDirection:'column', minWidth:0, minHeight:0 },
  minimapBox: { width:210, margin:'0 auto', marginBottom:32 },
  minimapCanvas: { width:200, height:150, background:'#101e17', borderRadius:17, position:'relative', boxShadow:'0 4px 24px 2px #26ffd219,0 1px 0 #33ffa540', marginBottom:12 },
  minimapNode: { position:'absolute', width:11, height:11, borderRadius:'50%', boxShadow:'0 0 8px #34ffd722', border:'2.5px solid #28cab0'},
  minimapViewRect: { position:'absolute', left:80, top:30, width:54, height:38, border:'2px solid #ff3d4d', borderRadius:7, boxShadow:'0 0 0 2px #ff3d4d22', zIndex:5 },
  minimapLegend: { textAlign:'center', color:'#19ffba', fontSize:13, marginBottom:7 },
  zoomControls: { display:'flex', alignItems:'center', gap:13, justifyContent:'center' },
  zoomBtn: { width:24, height:24, border:'none', borderRadius:7, background:'#06231f', color:'#15ffb6', fontWeight:900, fontSize:19, cursor:'pointer'},
  fitAllBtn: { marginLeft:15, padding:'4px 12px', background:'#112c2a', color:'#12eab9', border:'none', fontWeight:600, borderRadius:7, fontSize:14, cursor:'pointer' },
  zoomText: { color:'#15fad0', fontWeight:700 },

  // Canvas
  canvas: { position:'relative', height:780, width:'100%', minWidth:1040, minHeight:580, background:'#0d1117', overflow:'hidden', boxShadow:'0 0 0 2px #39fbb350 inset'},
  dotGrid: { pointerEvents:'none', position:'absolute', left:0, top:0, right:0, bottom:0, zIndex:0,
    background:'radial-gradient(circle, rgba(255,255,255,0.035) 1.6px, transparent 2px)', backgroundSize:'24px 24px', width:'100%', height:'100%' },
  connectionSVG: { position:'absolute', left:0, top:0, pointerEvents:'none', zIndex:1 },
  node: { position: 'absolute', borderRadius:'50%', background:'rgba(30,45,49, 0.82)', boxShadow:'0 9px 34px 0 #13ffa915', width:120, height:120, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)', zIndex:3, cursor:'pointer', transition:'transform .16s', userSelect:'none', },
  nodeThumb: { width:66, height:66, objectFit:'cover', borderRadius:'50%', marginBottom:6, boxShadow:'0 1px 0 #0fffcb' },
  nodeLabel: { fontWeight:700, color:'#43fafb', fontSize:16, lineHeight:'17px', marginBottom:2 },
  nodeMeta: { fontSize:12, color:'#a8ffe8', marginBottom:0 },
  branchTag: { fontSize:11, background:'#143327', color:'#20fab0', padding:'2px 8px', borderRadius:6, position:'absolute', top:80, right:-2 },
  nodeTooltip: { position:'absolute', left:125, top:35, padding:'12px 17px', background:'#163a3eeb', borderRadius:14, color:'#fff', boxShadow:'0 4px 32px #13ffa914', zIndex:10, fontSize:14, fontWeight:400, pointerEvents:'none', textAlign:'left', lineHeight:1.37, border:'1.5px solid #39ffd447', animation:'fadein .19s' },
  collabCursor: { position:'absolute', width:26, height:26, borderRadius:'50%', border:'3px solid', background:'#173c38', boxShadow:'0 0 0 4px #0fffcb33', display:'flex', alignItems:'center', justifyContent:'center', zIndex:12 },
  collabCursorDot: { width:14, height:14, borderRadius:'50%', display:'inline-block', marginRight:3 },
  collabCursorLabel: { bottom:-13, left:20, position:'absolute', background:'#151f22', borderRadius:5, fontSize:13, fontWeight:600, padding:'0 8px', boxShadow:'0 1px 7px #27fed122' },

  // Status Bar
  statusBar: { height: 40, background:'#141d1c', borderTop:'1px solid #133', color:'#11fad2', fontSize:14, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 19px', letterSpacing:'0.04em' },
  statusLeft: { fontWeight:500 },
  statusRight: { fontWeight:700 },
};
// CSS keyframes and a few global overrides (animations, pulse, etc)
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');
@keyframes glowpulse { 0% { box-shadow: 0 0 0 2.5px #1fffc7, 0 4px 24px #17ffc226; border-color: #39fbb7; } 100% { box-shadow: 0 0 15px 8px #33ffc94a, 0 4px 40px #22ffd16c; border-color: #23ebe4;} }
@keyframes fadein { from{ opacity:0;} to{ opacity:1;} }
::-webkit-scrollbar { width:10px; background:#162122; }
::-webkit-scrollbar-thumb { background:#12352a; border-radius:8px; }
input:focus { outline: 3px solid #17ffbc41!important; box-shadow: 0 0 0 3px #0fffbb2f; }
input[type=date]::-webkit-calendar-picker-indicator { filter: invert(80%) sepia(93%) hue-rotate(95deg); }
`;

export default AuroraVersionHistory;






