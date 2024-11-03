document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn');
    btn.classList.add('loading');
    
    setTimeout(() => {
        btn.classList.remove('loading');
    }, 2000);
});