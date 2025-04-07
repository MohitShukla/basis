# Basis


# What is Basis?
A software developer can use basis as a starting point of building their web application. Basis provides several ready-to-use out of box software modules that are needed by most applications.  
- oAuth with Google

In near future, following software modules will be added to Basis.
- integration with AI (model: GPT-4o)
- logging
- security
- load balancing

Basis also defines and embed following best practices of software engineering into itself:
- coding best practices 
- documentaion


# Collaborative AI-Powered Knowledge Sharing Platform

Software platform that enables groups of users to create private knowledge bases powered by AI, where members can share content and get AI-assisted answers based on their group's collective knowledge.

## Non Functional Stories
- Can be deployed on cloud or on-prem

## System Stories
- Content posted by a group remains private to that group
- Content posted by a group gets added to the knoweldge base of that group
- Content is saved with userid & created_timestamp

## API Interfaces
- API to post content so that external systems system can post content
- Implement webhooks to call APIs of external systems

## User Stories

### Authentication & Groups

**Any User**
- Sign in using my Google/social account
- Create a new group so I can start collaborating with others. Creator of a group is the default owner of the group.

**Group Owner:**
- Invite other users to my group so we can share knowledge
- Assign group owenr permission to others uses in the group 


### Content Management
**Group Member:**  
- Post any text content
- Post files
- Ask questions
  - examples: 
    - "What was Harish doing today?"
    - "Show a summary of work done today"
    - "Who are on leave today?"
    - "Is Sam on leave today?" 

# Stories After MVP
- define structure of document collections (like mongo)
- maintain documents in collections

## For document collections
- define fields, data elements (name, description, labels, domains, etc), domains (data type, constraints)
- define collections in terms of data elements in these collections 


## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for ChatGPT API
- Google for OAuth
- MongoDB for database
- AWS for hosting infrastructure

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.


