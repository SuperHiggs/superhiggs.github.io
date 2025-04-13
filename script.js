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
    } else if (option === 'contact') {
        consoleContent.innerHTML = `
            <h3>Contact</h3>
            <p>Email: superhiggs@example.com</p>
            <p>Phone: +123 456 7890</p>
        `;
    }
}