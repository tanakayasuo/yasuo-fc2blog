document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = document.querySelectorAll('.blog-post');
    const dateArchiveList = document.getElementById('date-archive-list');
    const keywordArchiveList = document.getElementById('keyword-archive-list');
    const siteTitle = document.getElementById('site-title');

    // 全ての記事を表示する関数（タイトルと本文を両方表示）
    function showAllPosts() {
        blogPosts.forEach(post => {
            post.classList.remove('hidden'); // 記事全体を表示
            // 本文も表示状態にする
            const content = post.querySelector('.post-content');
            if (content) {
                content.style.display = 'block';
            }
        });
    }

    // 特定の記事のみ表示し、本文も表示する関数
    function showOnlyPost(targetPost) {
        blogPosts.forEach(post => {
            if (post === targetPost) {
                post.classList.remove('hidden'); // その記事全体は表示
                // 本文を表示
                const content = post.querySelector('.post-content');
                if (content) {
                    content.style.display = 'block';
                }
            } else {
                post.classList.add('hidden'); // 他の記事は非表示
            }
        });
    }
    
    // 【追加】記事タイトルにイベントリスナーを設定する関数
    function setupPostTitleClick() {
        document.querySelectorAll('.post-title-clickable').forEach(title => {
            title.addEventListener('click', (e) => {
                e.preventDefault();
                // クリックされたタイトルの親要素（article.blog-post）を取得
                const currentPost = title.closest('.blog-post');
                showOnlyPost(currentPost);
            });
        });
    }

    // 日付で記事をフィルタリングする関数 (アーカイブクリック時)
    function filterPostsByDate(selectedDate) {
        blogPosts.forEach(post => {
            const postDate = post.getAttribute('data-date').substring(0, 7);
            if (postDate === selectedDate) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
            // アーカイブでフィルタリングした際は本文は表示しない（タイトルのみ表示状態を維持）
            post.querySelector('.post-content').style.display = 'none';
        });
    }

    // キーワードで記事をフィルタリングする関数 (アーカイブクリック時)
    function filterPostsByKeyword(selectedKeyword) {
        blogPosts.forEach(post => {
            const postKeywords = post.getAttribute('data-keywords').split(', ');
            if (postKeywords.includes(selectedKeyword)) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
            // アーカイブでフィルタリングした際は本文は表示しない（タイトルのみ表示状態を維持）
            post.querySelector('.post-content').style.display = 'none';
        });
    }
    
    // generateArchives関数 (省略、前回と同じ内容)
    function generateArchives() {
        const dates = new Set();
        const keywords = new Set();
        blogPosts.forEach(post => {
            dates.add(post.getAttribute('data-date').substring(0, 7));
            post.getAttribute('data-keywords').split(', ').forEach(keyword => keywords.add(keyword));
        });
        dates.forEach(date => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = date;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                filterPostsByDate(date);
            });
            li.appendChild(a);
            dateArchiveList.appendChild(li);
        });
        keywords.forEach(keyword => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = keyword;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                filterPostsByKeyword(keyword);
            });
            li.appendChild(a);
            keywordArchiveList.appendChild(li);
        });
    }


    // サイトタイトルクリックで全表示
    siteTitle.addEventListener('click', (e) => {
        e.preventDefault();
        showAllPosts();
    });

    // 初期化処理
    generateArchives();
    setupPostTitleClick(); // 記事タイトルのイベントリスナーを設定
});
