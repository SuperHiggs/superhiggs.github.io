// Handle keyboard navigation for menu items
function handleMenuKeyDown(event, option) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        changeContent(option);
    }
}

// Smooth content transition with fade effect
// Note: All content is hardcoded and trusted, so innerHTML usage is safe here
function changeContent(option) {
    const mainContent = document.getElementById('main-content');
    
    // Fade out
    mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        let content = '';
        
        if (option === 'about') {
            content = `
                <h3>About Me</h3>
                <p>With over 8 years of experience as a senior engineer and principal consultant, I am a software development expert and innovator who creates exceptional quality software that pushes the limits of today's technology. I have a certification in C# and .NET, and I use my skills in talent management and consultation to lead and support teams, clients, and projects across various industries and domains.</p>
                <br>
                <p>I am passionate about software as a storytelling tool that reflects a strong, stable, and visionary organizational roadmap, where benefits are realized in the real world. As a team player, I thrive in an environment that values collaboration, knowledge sharing, and personal growth. At Journey2, I work alongside talented and driven professionals who share the same drive to innovate and make an impact.</p>
            `;
        } else if (option === 'projects') {
            content = `
                <h3>Projects</h3>
                <ul>
                    <li>Project 1: Innovative AI System</li>
                    <li>Project 2: Scalable Web Application</li>
                    <li>Project 3: Cloud-Based Solution</li>
                </ul>
            `;
        } else if (option === 'github') {
            content = `
                <h3>GitHub Repository Status</h3>
                <p class="loading">Loading repository information...</p>
            `;
        } else if (option === 'blog') {
            content = `
                <h3>Blog</h3>
                <p class="loading">Loading blog posts...</p>
            `;
        } else if (option === 'contact') {
            content = `
                <h3>Contact</h3>
                <p>📧 Email: superhiggs@example.com</p>
                <p>📱 Phone: +123 456 7890</p>
            `;
        }
        
        mainContent.innerHTML = content;
        
        // Fade in
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            
            // Fetch GitHub status if needed
            if (option === 'github') {
                fetchGitHubStatus();
            }
            
            // Load blog list if needed
            if (option === 'blog') {
                loadBlogList();
            }
        }, 50);
    }, 300);
}

async function fetchGitHubStatus() {
    const mainContent = document.getElementById('main-content');
    const repos = ['superhiggs.github.io']; // Add more repos as needed
    
    try {
        let statusHTML = '<h3>GitHub Repository Status</h3>';
        
        for (const repo of repos) {
            const response = await fetch(`https://api.github.com/repos/SuperHiggs/${repo}`);
            
            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            statusHTML += `
                <div class="repo-status">
                    <h4>📦 ${data.name}</h4>
                    <p>⭐ Stars: ${data.stargazers_count}</p>
                    <p>🔀 Forks: ${data.forks_count}</p>
                    <p>🐛 Open Issues: ${data.open_issues_count}</p>
                    <p>📅 Last Updated: ${new Date(data.updated_at).toLocaleDateString()}</p>
                    <p>📝 ${data.description || 'No description'}</p>
                    <p>🔗 <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
                    <hr>
                </div>
            `;
        }
        
        // Smooth transition for GitHub data
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.innerHTML = statusHTML;
            mainContent.style.opacity = '1';
        }, 200);
        
    } catch (error) {
        mainContent.innerHTML = `
            <h3>GitHub Repository Status</h3>
            <p style="color: var(--primary-color);">Unable to load repository status. Please try again later.</p>
        `;
    }
}

// Smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    
    // Add smooth scroll behavior
    mainContent.style.scrollBehavior = 'smooth';
});

// HTML escape function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load blog list
async function loadBlogList() {
    const mainContent = document.getElementById('main-content');
    
    try {
        const response = await fetch('blog/posts.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load blog posts: ${response.status}`);
        }
        
        const posts = await response.json();
        
        let blogHTML = '<h3>Blog</h3><div class="blog-posts">';
        
        for (const post of posts) {
            const escapedFile = escapeHtml(post.file);
            const escapedTitle = escapeHtml(post.title);
            const escapedExcerpt = escapeHtml(post.excerpt);
            
            blogHTML += `
                <article class="blog-post">
                    <h4>${escapedTitle}</h4>
                    <p class="blog-meta">📅 ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>${escapedExcerpt}</p>
                    <a href="#" class="read-more" onclick="event.preventDefault(); loadBlogPost('${escapedFile}', '${escapedTitle}');">Read more →</a>
                </article>
            `;
        }
        
        blogHTML += '</div>';
        
        // Smooth transition
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.innerHTML = blogHTML;
            mainContent.style.opacity = '1';
            mainContent.scrollTop = 0;
        }, 200);
        
    } catch (error) {
        mainContent.innerHTML = `
            <h3>Blog</h3>
            <p style="color: var(--primary-color);">Unable to load blog posts. Please try again later.</p>
        `;
    }
}

// Load individual blog post
async function loadBlogPost(filename, title) {
    const mainContent = document.getElementById('main-content');
    
    // Show loading state
    mainContent.style.opacity = '0';
    
    setTimeout(async () => {
        try {
            const response = await fetch(`blog/${filename}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load blog post: ${response.status}`);
            }
            
            const markdown = await response.text();
            const html = marked.parse(markdown);
            
            mainContent.innerHTML = `
                <div class="blog-post-full">
                    <a href="#" class="back-link" onclick="event.preventDefault(); changeContent('blog');">← Back to Blog</a>
                    ${html}
                </div>
            `;
            
            mainContent.style.opacity = '1';
            mainContent.scrollTop = 0;
            
        } catch (error) {
            mainContent.innerHTML = `
                <h3>Blog Post</h3>
                <p style="color: var(--primary-color);">Unable to load blog post. Please try again later.</p>
                <a href="#" class="back-link" onclick="event.preventDefault(); changeContent('blog');">← Back to Blog</a>
            `;
            mainContent.style.opacity = '1';
        }
    }, 300);
}