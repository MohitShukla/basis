Documentation is closely tied up with the code. Code has a certain logical component structure reflected in the directory structute. So the documents related to a component, should be inside the directory of that component. 


docs/
├── README.md                 # Main documentation entry point
├── getting-started/
│   ├── installation.md      # Installation instructions
│   ├── configuration.md     # Configuration guide
│   └── development.md       # Development setup guide
├── architecture/
│   ├── overview.md         # System architecture overview
│   ├── frontend.md         # Frontend architecture
│   ├── backend.md          # Backend architecture
│   └── database.md         # Database design
├── deployment/
│   ├── aws-setup.md        # AWS infrastructure setup
│   ├── ci-cd.md            # CI/CD pipeline documentation
│   └── monitoring.md       # Monitoring and logging
├── api/
│   ├── endpoints.md        # API endpoints documentation
│   └── authentication.md   # Authentication flow
└── contributing/
    ├── guidelines.md       # Contribution guidelines
    └── code-style.md       # Coding standards