const DUMMY_DATA = {
    businesses: [
        "Retail Finance", "Housing Finance", "Motor Finance", 
        "Microfinance", "Corporate & SME", "Wealth", 
        "DSMG", "Cleantech", "Corporate Functions"
    ],
    milestones: [
        { id: 30, label: "30 Days", intent: "Settle in and understand Tata Capital culture." },
        { id: 60, label: "60 Days", intent: "Build working knowledge of processes and systems." },
        { id: 90, label: "90 Days", intent: "Become productive and apply knowledge independently." },
        { id: 180, label: "180 Days", intent: "Strengthen and specialise digital capability." },
        { id: 360, label: "360+ Days", intent: "Grow and lead through advanced certifications." }
    ],
    trainings: {
        "Retail Finance": [
            { id: 101, title: "Personal Loan Underwriting", milestone: 30, type: "New", category: "Product", duration: "4h", mode: "E-Learning", level: "Beginner", mandatory: true },
            { id: 102, title: "Customer KYC & AML", milestone: 30, type: "Both", category: "Compliance", duration: "2h", mode: "Virtual", level: "Beginner", mandatory: true },
            { id: 103, title: "CRM Mastery", milestone: 60, type: "New", category: "Systems", duration: "6h", mode: "Classroom", level: "Intermediate", mandatory: true },
            { id: 104, title: "Advanced Credit Risk", milestone: 180, type: "Existing", category: "Process", duration: "8h", mode: "Virtual", level: "Advanced", mandatory: false }
        ],
        "Housing Finance": [
            { id: 201, title: "Home Loan Products 101", milestone: 30, type: "New", category: "Product", duration: "3h", mode: "E-Learning", level: "Beginner", mandatory: true },
            { id: 202, title: "Property Valuation Basics", milestone: 60, type: "Both", category: "Process", duration: "5h", mode: "Classroom", level: "Intermediate", mandatory: true }
        ]
    },
    compliance: [
        { name: "TCOC", progress: 100, status: "Completed", due: "Done" },
        { name: "POSH", progress: 45, status: "In Progress", due: "15 Oct" },
        { name: "FPC", progress: 0, status: "Not Started", due: "20 Oct" },
        { name: "KYC/AML", progress: 100, status: "Completed", due: "Done" },
        { name: "TAAP", progress: 0, status: "Overdue", due: "01 Oct" }
    ],
    team: [
        { name: "Amit Kumar", progress: 85, status: "On Track", milestone: "90 Days" },
        { name: "Sneha Rao", progress: 40, status: "Behind", milestone: "60 Days" },
        { name: "John Doe", progress: 10, status: "At Risk", milestone: "30 Days" }
    ]
};