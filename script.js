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
    const consoleContent = document.getElementById('console-content');
    
    // Fade out
    consoleContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    consoleContent.style.opacity = '0';
    consoleContent.style.transform = 'translateY(-10px)';
    
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
        } else if (option === 'contact') {
            content = `
                <h3>Contact</h3>
                <p>📧 Email: superhiggs@example.com</p>
                <p>📱 Phone: +123 456 7890</p>
            `;
        }
        
        consoleContent.innerHTML = content;
        
        // Fade in
        setTimeout(() => {
            consoleContent.style.opacity = '1';
            consoleContent.style.transform = 'translateY(0)';
            
            // Fetch GitHub status if needed
            if (option === 'github') {
                fetchGitHubStatus();
            }
        }, 50);
    }, 300);
}

async function fetchGitHubStatus() {
    const consoleContent = document.getElementById('console-content');
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
        consoleContent.style.opacity = '0';
        setTimeout(() => {
            consoleContent.innerHTML = statusHTML;
            consoleContent.style.opacity = '1';
        }, 200);
        
    } catch (error) {
        consoleContent.innerHTML = `
            <h3>GitHub Repository Status</h3>
            <p style="color: var(--primary-color);">Error loading repository status: ${error.message}</p>
        `;
    }
}

// Smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const consoleContent = document.getElementById('console-content');
    
    // Add smooth scroll behavior
    consoleContent.style.scrollBehavior = 'smooth';
});