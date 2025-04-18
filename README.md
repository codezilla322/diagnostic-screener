# Diagnostic Screener API

This API processes clinical diagnostic screener responses, scores them based on symptom domains, and recommends appropriate clinical assessments based on threshold criteria.

## Running the Application Locally

#### Prerequisites

- Node.js (v16+)
- npm or yarn

#### Installation Steps

Clone the project

```bash
  git clone https://github.com/codezilla322/diagnostic-screener.git
```

Go to the project directory

```bash
  cd diagnostic-screener
  cd api
```

Install dependencies

```bash
  npm install
```

Build the application

```bash
  npm run build
```

Start the server

```bash
  npm start
```

The API will be available at

```bash
http://localhost:3000/api/v1/screener/process
```

## API Usage

Send a _POST_ request to `/api/screener/process` with the following structure:

```json
{
  "answers": [
    { "value": 1, "question_id": "question_a" },
    { "value": 0, "question_id": "question_b" },
    { "value": 2, "question_id": "question_c" },
    { "value": 3, "question_id": "question_d" },
    { "value": 1, "question_id": "question_e" },
    { "value": 0, "question_id": "question_f" },
    { "value": 1, "question_id": "question_g" },
    { "value": 0, "question_id": "question_h" }
  ]
}
```

The API will return a response with recommended assessments:

```json
{
  "results": ["ASRM", "PHQ-9"]
}
```

## Problem and Solution Description

### Problem

Clinicians need to efficiently administer standardized clinical assessments for mental health disorders. The current process requires manual review and assignment, which is time-consuming and may lack consistency.

### Solution

This API automates the process by:

- Accepting patient responses to a diagnostic screener
- Calculating domain scores based on question-domain mappings
- Applying predefined threshold criteria to determine which specific assessments should be administered
- Returning a list of recommended assessments

The solution aggregates scores by symptom domains (depression, anxiety, mania, substance use) and applies clinical rules to recommend appropriate assessments (PHQ-9, ASRM, ASSIST) when domain scores exceed defined thresholds.

## Technical Choices

### Architecture and Design Patterns

- **Repository Pattern**: Provides abstraction over data sources

  - Facilitates future expansion to different storage mechanisms
  - Makes testing easier with mock implementations

- **Strategy Pattern**: Used for scoring and assessment recommendation algorithms

  - Allows for different scoring methodologies to be implemented without modifying existing code
  - Enables future extension for more sophisticated assessment recommendation logic

- **Factory Pattern**: Creates appropriate repository instances based on configuration

  - Centralizes instantiation logic
  - Simplifies adding new storage types

- **Dependency Injection**: Components receive dependencies through constructors

  - Improves testability
  - Reduces coupling between components

- **Express.js and TypeScript**:

  - Type safety helps prevent runtime errors
  - Express provides a lightweight yet powerful API framework

### File Structure

The application follows a domain-driven design approach with clear separation of concerns:

- `controllers/`: Handle HTTP requests/responses
- `services/`: Implement business logic
- `repositories/`: Manage data access
- `strategies/`: Encapsulate algorithms for scoring and recommendations
- `middleware/`: Cross-cutting concerns like validation and error handling
- `types/`: TypeScript interfaces defining the domain model

## Production Deployment Plan

### Hosting Platform: AWS

#### Infrastructure as Code

- Use AWS CDK or Terraform to define infrastructure
- Multi-AZ deployment for high availability

#### High Availability and Performance

- Deploy behind AWS Application Load Balancer
- Auto-scaling group based on CPU/memory metrics
- Deploy in multiple Availability Zones
- Implement caching strategies for frequently accessed data
- Optimize database queries and add appropriate indexes
- Consider read replicas for database if read load is high

#### Security Measures

- Implement JWT or OAuth 2.0 for authentication
- API Gateway with request throttling to prevent DoS attacks
- WAF (Web Application Firewall) to protect against common exploits
- Encrypt data in transit (HTTPS) and at rest
- Network isolation with VPC, subnets, and security groups
- Implement least privilege IAM roles
- Regular security audits and penetration testing
- Sanitize and validate all inputs

#### Monitoring and Troubleshooting

- Structured logging with context information (request ID, user ID)
- Centralized log management with CloudWatch Logs
- Application performance monitoring with AWS X-Ray or similar tools
- Custom CloudWatch dashboards for key metrics
- Set up alerts for abnormal conditions
- Health check endpoints for monitoring service status
- Implement correlation IDs for request tracing through microservices

#### Database Strategy

- Use Amazon RDS for managed database service
- Implement database migration strategy
- Regular backups and point-in-time recovery
- Consider DynamoDB for high-scale scenarios

#### CI/CD Pipeline

- GitHub Actions or AWS CodePipeline for continuous integration
- Automated testing before deployment
- Blue/green deployment strategy for zero-downtime updates

## Trade-offs and Future Improvements

### Current Trade-offs

#### File-based Storage:

- Simple to implement but not appropriate for production
- Limited concurrent access capability
- No transaction support

#### Limited Validation:

- Basic validation exists but could be more robust
- No schema validation framework used

#### Error Handling:

- Generic error responses could be more specific
- Limited error categorization

#### No Authentication:

- The API currently has no authentication mechanism

### Future Improvements

Given more time, I would implement the following enhancements:

#### Database Integration:

- Add a proper database implementation (PostgreSQL or MongoDB)
- Implement database migrations

#### Enhanced Security:

- Add JWT authentication
- Role-based access control
- Input sanitization

#### Advanced Features:

- Patient history tracking
- Support for demographic-adjusted scoring
- Customizable assessment thresholds per clinician or institution
- Assessment result storage and trend analysis

#### Testing:

- Comprehensive unit testing suite
- Integration tests
- Performance benchmarking

#### Documentation:

- OpenAPI/Swagger documentation
- Automatic API documentation generation

#### Localization:

- Support for multiple languages in assessments
- Region-specific assessment variants
