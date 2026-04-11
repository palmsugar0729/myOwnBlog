// 页面加载函数 说白了手动写一个vue.router
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById('app').innerHTML = data;

      // 页面初始化钩子
      initPage(page);
    });
}

// 页面初始化（以后扩展用）
function initPage(page) {
  if (page === 'blog') initBlog();
  if (page === 'cssExercise') initCSS();
  if (page === 'recipe') initRecipe();
}

// Blog 初始化
function initBlog() {
  fetch('data/posts.json')
    .then(res => res.json())
    .then(data => {
      renderBlogList(data);
    });
}

// 渲染列表
function renderBlogList(posts) {
  const container = document.getElementById('blog-list');

  container.innerHTML = posts.map(post => `
    <div class="blog-card"
      onclick="openPost('${post.file}', '${post.title}', '${post.date}')">
      <div class="blog-title">${post.title}</div>
      <div class="blog-desc">${post.desc}</div>
      <div class="blog-meta">${post.date} · ${post.tag}</div>
    </div>
  `).join('');
}

// 点击文章
function openPost(file, title, date) {
  // 修改 URL（无刷新）
  history.pushState({ type: 'post', file, title, date }, '', '#post');

  renderPost(file, title, date);
}
// 详情页渲染
function renderPost(file, title, date) {
  fetch(file)
    .then(res => res.text())
    .then(md => {
      document.getElementById('app').innerHTML = `
        <div class="post-page">

          <button class="back-btn" onclick="loadPage('blog')">← 返回</button>

          <h1 class="post-title">${title}</h1>
          <div class="post-date">${date}</div>

          <div class="markdown">
            ${marked.parse(md)}
          </div>

        </div>
      `;
    });
}

// 初始化 先占位
function initCSS() {
  console.log('CSS页面加载');
}

function initRecipe() {
  console.log('食谱页面加载');
}


// 暗色模式
function toggleDark() {
  document.body.classList.toggle('dark');
}


// 默认加载首页
loadPage('homePage');


// 时钟组件
function startClock() {
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    const el = document.getElementById('clock');
    if (el) {
      el.innerText = `${h}:${m}:${s}`;
    }
  }

  update();
  setInterval(update, 1000);
}

startClock();


