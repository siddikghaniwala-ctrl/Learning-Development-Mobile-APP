document.addEventListener('DOMContentLoaded', () => {
    const state = {
        business: 'Retail Finance',
        role: 'Employee',
        type: 'New Employee',
        days: 45,
        activeTab: 'about',
        activeMilestone: 30
    };

    // Selectors
    const mainContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const businessFilter = document.getElementById('businessFilter');
    const roleFilter = document.getElementById('roleFilter');
    const typeFilter = document.getElementById('typeFilter');
    const daysInput = document.getElementById('daysJoined');

    // Event Listeners for Filters
    [businessFilter, roleFilter, typeFilter, daysInput].forEach(el => {
        el.addEventListener('change', (e) => {
            state[e.target.id.replace('Filter', '')] = e.target.value;
            if (e.target.id === 'roleFilter') toggleManagerTab();
            renderActiveTab();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            state.activeTab = link.dataset.tab;
            renderActiveTab();
        });
    });

    function toggleManagerTab() {
        const managerBtn = document.querySelector('.manager-only');
        managerBtn.style.display = state.role === 'Manager' ? 'block' : 'none';
    }

    function renderActiveTab() {
        mainContent.innerHTML = '<div class="skeleton-card"></div>';
        
        setTimeout(() => {
            switch(state.activeTab) {
                case 'about': renderAbout(); break;
                case 'basket': renderBasket(); break;
                case 'compliance': renderCompliance(); break;
                case 'dashboard': renderDashboard(); break;
                case 'manager': renderManager(); break;
                case 'sherpa': renderSherpa(); break;
                case 'trainings': renderTrainings(); break;
                case 'engagement': renderEngagement(); break;
                default: renderAbout();
            }
        }, 300);
    }

    function renderAbout() {
        mainContent.innerHTML = `
            <div class="hero-banner">
                <h1>Welcome to Tata Capital L&D</h1>
                <p>Empowering your growth in the lending ecosystem.</p>
            </div>
            <div class="card">
                <h3>Vision & Values</h3>
                <p>To be the most admired financial services company. Trusted, Transparent, Transformative.</p>
            </div>
            <div class="card">
                <h3>Animated Metrics</h3>
                <div style="display:flex; justify-content:space-around; text-align:center;">
                    <div><h2 class="text-blue">3M+</h2><small>Customers</small></div>
                    <div><h2 class="text-blue">150+</h2><small>Branches</small></div>
                    <div><h2 class="text-blue">15k+</h2><small>Employees</small></div>
                </div>
            </div>
        `;
    }

    function renderBasket() {
        const currentMilestoneId = DUMMY_DATA.milestones.find(m => state.days <= m.id)?.id || 360;
        
        let roadmapHtml = `<div class="roadmap-container">`;
        DUMMY_DATA.milestones.forEach(m => {
            const isActive = m.id === state.activeMilestone;
            const isYouAreHere = m.id === currentMilestoneId;
            roadmapHtml += `
                <div class="milestone ${isActive ? 'active' : ''}" onclick="window.selectMilestone(${m.id})">
                    ${isYouAreHere ? '<span class="here-marker">You are here</span>' : ''}
                    <div class="milestone-icon"><i class="fas fa-flag"></i></div>
                    <div style="font-size:0.7rem">${m.label}</div>
                </div>`;
        });
        roadmapHtml += `</div>`;

        const selectedMilestone = DUMMY_DATA.milestones.find(m => m.id === state.activeMilestone);

        mainContent.innerHTML = `
            <h3>My Learning Journey</h3>
            ${roadmapHtml}
            <div class="card">
                <h4 class="text-blue">Why This Stage Matters</h4>
                <p>${selectedMilestone.intent}</p>
            </div>
            <div class="training-grid">
                ${getFilteredTrainings().map(t => `
                    <div class="training-card card">
                        <span class="badge ${t.mandatory ? 'badge-mandatory' : 'badge-recommended'}">${t.mandatory ? 'Mandatory' : 'Recommended'}</span>
                        <h5>${t.title}</h5>
                        <p><small>${t.category} \vert{}${t.duration}</small></p>
                        <button class="nav-link" style="border:1px solid var(--secondary); margin-top:10px; width:100%">View Details</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.selectMilestone = (id) => {
        state.activeMilestone = id;
        renderBasket();
    };

    function getFilteredTrainings() {
        const bizData = DUMMY_DATA.trainings[state.business] || DUMMY_DATA.trainings["Retail Finance"];
        return bizData.filter(t => t.milestone === state.activeMilestone);
    }

    function renderCompliance() {
        mainContent.innerHTML = `
            <h3>Mandatory Compliance</h3>
            ${DUMMY_DATA.compliance.map(c => `
                <div class="card">
                    <div style="display:flex; justify-content:space-between">
                        <strong>${c.name}</strong>
                        <span class="${c.status === 'Overdue' ? 'text-red' : 'text-green'}">${c.status}</span>
                    </div>
                    <div style="background:#eee; height:8px; border-radius:4px; margin:10px 0">
                        <div style="width:${c.progress}%; background:var(--secondary); height:100%; border-radius:4px"></div>
                    </div>
                    <small>Due Date: ${c.due}</small>
                </div>
            `).join('')}
        `;
    }

    function renderDashboard() {
        mainContent.innerHTML = `
            <div class="card">
                <h3>Your Progress</h3>
                <canvas id="myChart" width="400" height="300"></canvas>
            </div>
            <div class="card">
                <h4>Activity Log</h4>
                <p><small>30 Sep: Completed POSH Training</small></p>
                <p><small>25 Sep: Enrolled in Credit Risk 101</small></p>
            </div>
            <button onclick="window.print()" class="card" style="width:100%; cursor:pointer; background:var(--primary); color:white;">Download Summary PDF</button>
        `;
        
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending', 'Overdue'],
                datasets: [{ data: [12, 4, 2], backgroundColor: ['#28A745', '#FFC107', '#DC3545'] }]
            }
        });
    }

    function renderManager() {
        mainContent.innerHTML = `
            <h3>Team Overview</h3>
            <div class="card">
                <h4>Compliance Tracking</h4>
                <canvas id="teamChart" width="400" height="200"></canvas>
            </div>
            <div class="card">
                <h4>Team List</h4>
                ${DUMMY_DATA.team.map(t => `
                    <div style="padding:10px 0; border-bottom:1px solid #eee; display:flex; justify-content:space-between">
                        <div>
                            <strong>${t.name}</strong><br>
                            <small>${t.milestone}</small>
                        </div>
                        <div class="text-right">
                            <span class="badge ${t.status === 'Behind' ? 'badge-mandatory' : 'badge-recommended'}">${t.status}</span><br>
                            <button onclick="alert('Reminder Sent to ' + '${t.name}')" style="font-size:0.6rem; margin-top:5px">Remind</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        const ctx = document.getElementById('teamChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['30D', '60D', '90D', '180D', '360D'],
                datasets: [{ label: 'Team Completion', data: [80, 45, 60, 20, 10], backgroundColor: '#00AEEF' }]\n            }\n        });\n    }\n\n    function renderSherpa() {\n        mainContent.innerHTML = `\n            <div class=\"hero-banner\" style=\"background: var(--accent)\">\n                <h3>Nominate Yourself as a Sherpa</h3>\n                <p>Share your expertise and guide others.</p>\n            </div>\n            <form class=\"card\" onsubmit=\"event.preventDefault(); alert('Nomination Submitted Successfully!'); renderAbout();\">\n                <div class=\"control-group\"><label>Expertise Area</label><input type=\"text\" placeholder=\"e.g. Underwriting\" required></div><br>\n                <div class=\"control-group\"><label>Why do you want to be a Sherpa?</label><textarea style=\"width:100%\" rows=\"3\"></textarea></div><br>\n                <label><input type=\"checkbox\" required> Manager has approved this nomination</label><br><br>\n                <button type=\"submit\" style=\"background:var(--primary); color:white; padding:10px; border:none; border-radius:5px; width:100%\">Submit Nomination</button>\n            </form>\n        `;\n    }\n\n    function renderTrainings() {\n        mainContent.innerHTML = `<div class=\"card\"><h3>Assigned Trainings</h3><p>Select a month to see your schedule.</p><select style=\"width:100%; padding:10px\"><option>October 2023</option><option>November 2023</option></select><div style=\"margin-top:20px\">No classroom trainings scheduled for this period. Check E-Learning in the Basket.</div></div>`;\n    }\n\n    function renderEngagement() {\n        mainContent.innerHTML = `<div class=\"card\"><h3>L&D Engagement</h3><div style=\"display:grid; grid-template-columns:1fr 1fr; gap:10px\"><div style=\"background:#ddd; height:80px; border-radius:8px\"></div><div style=\"background:#ddd; height:80px; border-radius:8px\"></div></div><p style=\"margin-top:10px\">Newsletter: October Edition is Out!</p><button class=\"nav-link\" style=\"color:var(--secondary)\">Read Now</button></div>`;\n    }\n\n    // Initial Render\n    renderAbout();\n});\n```\n\nWould you like help setting this up as a live link via GitHub Pages, or would you like to add more customized data to `data.js` first?