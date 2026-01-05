function changeContent(option) {
    const consoleContent = document.getElementById('console-content');
    if (option === 'about') {
        consoleContent.innerHTML = `
            With over 8 years of experience as a senior engineer and principal consultant, I am a software development expert and innovator who creates exceptional quality software that pushes the limits of today's technology. I have a certification in C# and .NET, and I use my skills in talent management and consultation to lead and support teams, clients, and projects across various industries and domains.
            <br><br>
            I am passionate about software as a storytelling tool that reflects a strong, stable, and visionary organizational roadmap, where benefits are realized in the real world. As a team player, I thrive in an environment that values collaboration, knowledge sharing, and personal growth. At Journey2, I work alongside talented and driven professionals who share the same drive to innovate and make an impact.
        `;
    } else if (option === 'projects') {
        consoleContent.innerHTML = `
            <h3>Projects</h3>
            <ul>
                <li>Project 1: Innovative AI System</li>
                <li>Project 2: Scalable Web Application</li>
                <li>Project 3: Cloud-Based Solution</li>
            </ul>
        `;
    } else if (option === 'github') {
        consoleContent.innerHTML = `
            <h3>GitHub Repository Status</h3>
            <p>Loading...</p>
        `;
        fetchGitHubStatus();
    } else if (option === 'contact') {
        consoleContent.innerHTML = `
            <h3>Contact</h3>
            <p>Email: superhiggs@example.com</p>
            <p>Phone: +123 456 7890</p>
        `;
    }
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
        
        consoleContent.innerHTML = statusHTML;
    } catch (error) {
        consoleContent.innerHTML = `
            <h3>GitHub Repository Status</h3>
            <p style="color: red;">Error loading repository status: ${error.message}</p>
        `;
    }
}