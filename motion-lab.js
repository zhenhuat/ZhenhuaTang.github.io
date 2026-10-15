/* A procedural kinematic illustration; no learned model or measured results. */
(() => {
  const canvas = document.querySelector('#pose-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, yaw = -0.42, pitch = 0.12;
  let playing = false, speed = 1, phase = 0, visible = true, frame = 0, previous = 0;
  const edges = [[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[0,7],[7,8],[8,9],[9,10],[8,11],[11,12],[12,13],[8,14],[14,15],[15,16]];
  const left = new Set([4,5,6,11,12,13]);
  function joints(t) {
    const step = Math.sin(t), bounce = Math.cos(t * 2) * 0.025;
    return [[0,0.95+bounce,0],[-0.15,0.94+bounce,0],[-0.17,0.52,step*0.2],[-0.17,0.09,step*0.36],[0.15,0.94+bounce,0],[0.17,0.52,-step*0.2],[0.17,0.09,-step*0.36],[0,1.2+bounce,0],[0,1.48+bounce,0],[0,1.63+bounce,0],[0,1.82+bounce,0],[-0.28,1.47+bounce,0],[-0.4,1.18+bounce,-step*0.19],[-0.4,0.94+bounce,-step*0.3],[0.28,1.47+bounce,0],[0.4,1.18+bounce,step*0.19],[0.4,0.94+bounce,step*0.3]];
  }
  function project(v) {
    const x = v[0]*Math.cos(yaw)+v[2]*Math.sin(yaw);
    const z = -v[0]*Math.sin(yaw)+v[2]*Math.cos(yaw);
    const y = v[1]-0.95;
    const ry = y*Math.cos(pitch)-z*Math.sin(pitch);
    const rz = y*Math.sin(pitch)+z*Math.cos(pitch);
    const perspective = 3.7/(3.7+rz);
    const scale = Math.min(width*0.65,height*0.39);
    return [width/2+x*scale*perspective,height*0.5-ry*scale*perspective];
  }
  function line(a,b,color,lineWidth=1) { ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=lineWidth;ctx.stroke(); }
  function draw() {
    ctx.clearRect(0,0,width,height);
    for(let v=-2;v<=2;v+=0.25) {
      line(project([v,0, -2]),project([v,0,2]),'#25324a',0.6);
      line(project([-2,0,v]),project([2,0,v]),'#25324a',0.6);
    }
    const points = joints(phase).map(project);
    edges.forEach(([a,b]) => {
      const color = left.has(b) ? '#5f93ff' : b>=1 && b<=3 || b>=14 ? '#65d7c0' : '#c5d5f5';
      line(points[a],points[b],color,3);
    });
    points.forEach((v,i) => {
      ctx.beginPath();ctx.arc(...v,i===10?7:4.5,0,Math.PI*2);
      ctx.fillStyle=left.has(i)?'#7ba6ff':'#d1f5f1';ctx.fill();
      ctx.beginPath();ctx.arc(...v,i===10?10:7,0,Math.PI*2);ctx.strokeStyle='#76a6ff33';ctx.lineWidth=1;ctx.stroke();
    });
    const origin=project([0,0,0]);
    line(origin,project([0.4,0,0]),'#5f93ff',2); line(origin,project([0,0,0.4]),'#65d7c0',2);
  }
  function tick(now) {
    frame = 0;
    if (previous) phase += Math.min((now-previous)/1000,0.05)*speed*2.4;
    previous=now; draw();
    if (playing && visible && !document.hidden) frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); frame=0;previous=0;draw();
    if (playing && visible && !document.hidden) frame=requestAnimationFrame(tick);
  }
  function resize() {
    const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;
    const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw();
  }
  new ResizeObserver(resize).observe(canvas);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  document.addEventListener('visibilitychange',sync);
  let pointer=null;
  canvas.addEventListener('pointerdown',e=>{pointer=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
  canvas.addEventListener('pointermove',e=>{if(!pointer)return;yaw+=(e.clientX-pointer[0])*0.012;pitch=Math.max(-0.65,Math.min(0.65,pitch+(e.clientY-pointer[1])*0.007));pointer=[e.clientX,e.clientY];draw();});
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>canvas.addEventListener(event,()=>{pointer=null;canvas.classList.remove('dragging');}));
  const play=document.querySelector('#play-motion');
  play.addEventListener('click',()=>{playing=!playing;play.textContent=playing?'Pause motion':'Play motion';play.setAttribute('aria-pressed',String(playing));sync();});
  document.querySelector('#reset-view').addEventListener('click',()=>{yaw=-0.42;pitch=0.12;phase=0;draw();});
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{yaw={front:0,side:Math.PI/2,orbit:-0.6}[button.dataset.view];pitch=button.dataset.view==='orbit'?0.2:0;draw();}));
  document.querySelector('#motion-speed').addEventListener('input',e=>{speed=Number(e.target.value);document.querySelector('#speed-value').textContent=speed.toFixed(2).replace(/0$/,'')+'×';});
  // Start paused for all visitors; animation is always opt-in.
  reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches&&playing)play.click();});
  resize();
})();
