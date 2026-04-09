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




// 初始化 先占位
function initBlog() {
  console.log('博客页面加载');
}

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