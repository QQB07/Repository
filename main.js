// 背景图：0首页 1红楼 2三国 3水浒 4西游
const bgImgList = [
  "imgs/1.png",
  "imgs/2.png",
  "imgs/3.png",
  "imgs/4.png",
  "imgs/5.png"
];

// 动态创建背景层
const bgWrap = document.querySelector('.bg-wrap');
bgImgList.forEach((src) => {
  const div = document.createElement('div');
  div.style.backgroundImage = `url(${src})`;
  bgWrap.appendChild(div);
});
const bgItems = bgWrap.querySelectorAll('div');
let nowIndex = 0;

// 切换背景
function switchBg(idx) {
  if (idx === nowIndex) return;
  bgItems[nowIndex].classList.remove('active');
  bgItems[idx].classList.add('active');
  nowIndex = idx;
}

// ========== 监听首页 + 四个内容板块，控制背景轮换 ==========
const hero = document.getElementById('hero');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 划入对应区域才切换背景
    if(entry.isIntersecting){
      if(entry.target === hero) switchBg(0);
      if(entry.target === section1) switchBg(1);
      if(entry.target === section2) switchBg(2);
      if(entry.target === section3) switchBg(3);
      if(entry.target === section4) switchBg(4);
    }
  });
}, { threshold: 0.4 });

// 全部监听
observer.observe(hero);
observer.observe(section1);
observer.observe(section2);
observer.observe(section3);
observer.observe(section4);


// ========== 下面所有原有动画代码 完全原样保留 一点没改 ==========
anime({
  targets: '.hero-content',
  opacity: [0, 1],
  translateY: [40, 0],
  duration: 1200,
  easing: 'easeOutExpo'
});

anime({
  targets: '.hero-title',
  scale: [0.9, 1],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutExpo',
  delay: 300
});

const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSectionIn(entry.target.id);
    } else {
      resetAnimations(entry.target.id);
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

function animateSectionIn(sectionId) {
  const index = sectionId.replace('section', '');

  anime({
    targets: `#${sectionId}`,
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutQuart'
  });

  anime({
    targets: `#${sectionId} .book-card`,
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 1100,
    easing: 'easeOutQuart',
    delay: 150
  });

  anime({
    targets: `#img${index}`,
    translateX: [-30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuart',
    delay: 300
  });

  anime({
    targets: `#title${index}`,
    backgroundSize: ['0% 100%', '100% 100%'],
    duration: 1300,
    easing: 'easeInOutSine'
  });

  const desc1 = document.getElementById(`desc${index}`);
  const desc2 = document.getElementById(`desc${index}-2`);
  desc1.classList.add('animate__fadeInUp');
  desc2.classList.add('animate__fadeInUp');

  setTimeout(() => {
    document.getElementById(`title${index}`).classList.add('animate__pulse');
  }, 1600);
}

function resetAnimations(sectionId) {
  const index = sectionId.replace('section', '');
  const section = document.getElementById(sectionId);
  const card = section.querySelector('.book-card');
  const title = document.getElementById(`title${index}`);
  const desc1 = document.getElementById(`desc${index}`);
  const desc2 = document.getElementById(`desc${index}-2`);
  const img = document.getElementById(`img${index}`);

  section.style.opacity = '0';
  card.style.transform = 'translateY(60px)';
  card.style.opacity = '0';
  title.style.backgroundSize = '0 100%';

  img.style.transform = 'translateX(-30px)';
  img.style.opacity = '0';

  title.classList.remove('animate__pulse');
  desc1.classList.remove('animate__fadeInUp');
  desc2.classList.remove('animate__fadeInUp');
}