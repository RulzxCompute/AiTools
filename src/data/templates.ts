import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'readme-template',
    name: 'README Template',
    description: 'Comprehensive README template for open source projects',
    category: 'markdown',
    tags: ['readme', 'documentation', 'open-source'],
    content: `# Project Name

> One-line description of your project

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/username/repo/ci.yml)](https://github.com/username/repo/actions)
[![Version](https://img.shields.io/github/v/release/username/repo)](https://github.com/username/repo/releases)

## Features

- **Feature 1**: Description of feature
- **Feature 2**: Description of feature
- **Feature 3**: Description of feature

## Installation

\`\`\`bash
# Using npm
npm install project-name

# Using yarn
yarn add project-name

# Using pnpm
pnpm add project-name
\`\`\`

## Quick Start

\`\`\`typescript
import { Project } from 'project-name';

const project = new Project();
await project.initialize();
\`\`\`

## Configuration

Create a \`config.json\` file:

\`\`\`json
{
  "option1": "value1",
  "option2": "value2"
}
\`\`\`

## Usage

### Basic Usage

\`\`\`typescript
// Example code here
\`\`\`

### Advanced Usage

\`\`\`typescript
// Advanced example
\`\`\`

## API Reference

### \`ClassName\`

#### \`methodName(param: Type): ReturnType\`

Description of method.

**Parameters:**
- \`param\` (Type): Description

**Returns:** Description of return value

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

Distributed under the MIT License. See \`LICENSE\` for more information.

## Contact

Author: [Your Name](https://github.com/username)
Project Link: [https://github.com/username/repo](https://github.com/username/repo)

## Acknowledgments

- [Dependency 1](https://github.com/dep1)
- [Dependency 2](https://github.com/dep2)
- Inspiration from [Project](https://github.com/inspiration)`,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-01',
    enabled: true,
  },
  {
    id: 'project-planning-template',
    name: 'Project Planning Template',
    description: 'Structured project planning document with milestones and tasks',
    category: 'markdown',
    tags: ['planning', 'project-management', 'specification'],
    content: `# Project Plan: [Project Name]

## Overview

**Project Name:** [Name]
**Start Date:** [Date]
**Target End Date:** [Date]
**Status:** [Planning / In Progress / Review / Complete]
**Owner:** [Name]
**Stakeholders:** [Names]

## Problem Statement

Describe the problem this project solves.

## Goals

- [ ] Goal 1: Specific, measurable outcome
- [ ] Goal 2: Specific, measurable outcome
- [ ] Goal 3: Specific, measurable outcome

## Non-Goals

- Non-goal 1: Explicitly out of scope
- Non-goal 2: Explicitly out of scope

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-001 | Description | High | Planned |
| FR-002 | Description | Medium | Planned |

### Non-Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| NFR-001 | Performance: < 200ms response | High | Planned |
| NFR-002 | Availability: 99.9% uptime | High | Planned |

## Architecture

### System Context

\`\`\`mermaid
graph TD
    A[User] --> B[Frontend]
    B --> C[API Gateway]
    C --> D[Service 1]
    C --> E[Service 2]
\`\`\`

### Data Model

\`\`\`mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
\`\`\`

## Milestones

| Milestone | Target Date | Deliverables | Status |
|-----------|-------------|--------------|--------|
| M1: Foundation | [Date] | Core infrastructure | Planned |
| M2: Core Features | [Date] | Main functionality | Planned |
| M3: Polish & Launch | [Date] | Tests, docs, deploy | Planned |

## Tasks

### Milestone 1: Foundation

- [ ] Task 1.1: Set up repository and CI/CD
- [ ] Task 1.2: Configure development environment
- [ ] Task 1.3: Design database schema

### Milestone 2: Core Features

- [ ] Task 2.1: Implement authentication
- [ ] Task 2.2: Build core API endpoints
- [ ] Task 2.3: Create frontend components

## Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Risk 1 | Medium | High | Mitigation strategy |
| Risk 2 | Low | Medium | Mitigation strategy |

## Dependencies

- Internal: Team/service dependencies
- External: Third-party services, APIs

## Success Metrics

- Metric 1: Target value
- Metric 2: Target value
- Metric 3: Target value

## Notes

Additional context, decisions, or references.`,
    createdAt: '2024-02-01',
    updatedAt: '2024-10-15',
    enabled: true,
  },
  {
    id: 'prompt-template',
    name: 'Prompt Template',
    description: 'Structured prompt template for consistent AI interactions',
    category: 'prompts',
    tags: ['prompt-engineering', 'ai', 'template'],
    content: `# Prompt Template: [Task Name]

## Role

You are a [role/expertise] with [years] years of experience in [domain].

## Context

- **Project**: [Project name/description]
- **Target Audience**: [Who will use the output]
- **Constraints**: [Technical, time, or other constraints]
- **Background**: [Relevant background information]

## Task

[Clear, specific description of what you need the AI to do]

## Input

\`\`\`
[Provide input data, code, text, or context here]
\`\`\`

## Output Format

### Required Structure

\`\`\`[format: json/yaml/markdown/code/plaintext]
[Specify exact output format with example structure]
\`\`\`

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| field1 | string | Yes | Description |
| field2 | number | No | Description |

## Guidelines

- Guideline 1: Specific instruction
- Guideline 2: Specific instruction
- Guideline 3: Specific instruction

## Examples

### Example 1: [Scenario]

**Input:**
\`\`\`
[Example input]
\`\`\`

**Output:**
\`\`\`
[Example output]
\`\`\`

### Example 2: [Scenario]

**Input:**
\`\`\`
[Example input]
\`\`\`

**Output:**
\`\`\`
[Example output]
\`\`\`

## Validation

- [ ] Output matches required format
- [ ] All required fields present
- [ ] Content follows guidelines
- [ ] No hallucinated information

## Edge Cases

- Edge case 1: How to handle
- Edge case 2: How to handle

## Notes

Additional context or instructions.`,
    createdAt: '2024-03-01',
    updatedAt: '2024-11-20',
    enabled: true,
  },
  {
    id: 'system-prompt-template',
    name: 'System Prompt Template',
    description: 'Template for creating effective system prompts for AI agents',
    category: 'prompts',
    tags: ['system-prompt', 'ai-agent', 'prompt-engineering'],
    content: `# System Prompt: [Agent Name]

## Identity

You are [Agent Name], a [role/description] designed to [primary purpose].

## Core Principles

1. **Principle 1**: [Description]
2. **Principle 2**: [Description]
3. **Principle 3**: [Description]

## Capabilities

- Capability 1: [Description]
- Capability 2: [Description]
- Capability 3: [Description]

## Limitations

- Limitation 1: [What you cannot/should not do]
- Limitation 2: [What you cannot/should not do]

## Behavior Guidelines

### Communication Style

- **Tone**: [Professional/Friendly/Concise/Technical]
- **Verbosity**: [Brief/Detailed/Adaptive]
- **Format**: [Markdown/Plain text/JSON/Code blocks]

### Decision Making

- [How to approach decisions]
- [When to ask for clarification]
- [How to handle ambiguity]

### Error Handling

- [How to handle errors]
- [When to retry vs escalate]
- [How to communicate failures]

## Workflows

### Workflow 1: [Name]

1. Step 1
2. Step 2
3. Step 3

### Workflow 2: [Name]

1. Step 1
2. Step 2
3. Step 3

## Tools & Resources

- Tool 1: [Description and when to use]
- Tool 2: [Description and when to use]
- Resource 1: [Description]

## Output Standards

- Standard 1: [Format/quality requirement]
- Standard 2: [Format/quality requirement]

## Examples

### Example Interaction 1

**User**: [User input]
**Assistant**: [Expected response]

### Example Interaction 2

**User**: [User input]
**Assistant**: [Expected response]

## Guardrails

- [ ] Never [prohibited action]
- [ ] Always [required action]
- [ ] Verify [validation requirement]

## Version

**Version**: 1.0.0
**Last Updated**: [Date]
**Author**: [Name]`,
    createdAt: '2024-04-01',
    updatedAt: '2024-11-10',
    enabled: true,
  },
  {
    id: 'changelog-template',
    name: 'Changelog Template',
    description: 'Keep a CHANGELOG following Keep a Changelog format',
    category: 'markdown',
    tags: ['changelog', 'release', 'documentation'],
    content: `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature descriptions

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release
- Core functionality

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.9.0] - YYYY-MM-DD

### Added
- Beta features

### Changed
- Breaking changes from alpha

### Fixed
- Known issues from alpha

---

### Legend

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes`,
    createdAt: '2024-05-01',
    updatedAt: '2024-10-01',
    enabled: true,
  },
  {
    id: 'issue-template',
    name: 'Issue Template',
    description: 'GitHub issue templates for bugs and feature requests',
    category: 'markdown',
    tags: ['github', 'issues', 'bug-report', 'feature-request'],
    content: `# Bug Report Template

---

name: Bug Report
about: Create a report to help us improve
title: '[Bug]: '
labels: bug
assignees: ''

---

## Description

A clear and concise description of what the bug is.

## Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior

A clear and concise description of what you expected to happen.

## Actual Behavior

What actually happened.

## Screenshots

If applicable, add screenshots to help explain your problem.

## Environment

- **OS**: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]
- **Browser**: [e.g., Chrome 120, Firefox 121, Safari 17]
- **Version**: [e.g., 1.0.0]
- **Node/Python/Go Version**: [if applicable]

## Additional Context

Add any other context about the problem here.

## Possible Solution

If you have suggestions on how to fix the bug, describe them here.

---

# Feature Request Template

---

name: Feature Request
about: Suggest an idea for this project
title: '[Feature]: '
labels: enhancement
assignees: ''

---

## Problem Statement

A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

## Proposed Solution

A clear and concise description of what you want to happen.

## Alternatives Considered

A clear and concise description of any alternative solutions or features you've considered.

## Additional Context

Add any other context or screenshots about the feature request here.

## Implementation Ideas

If you have technical ideas for implementation, share them here.`,
    createdAt: '2024-06-01',
    updatedAt: '2024-11-01',
    enabled: true,
  },
  {
    id: 'tech-spec-template',
    name: 'Technical Specification Template',
    description: 'Comprehensive technical specification document',
    category: 'markdown',
    tags: ['technical-spec', 'architecture', 'design-doc'],
    content: `# Technical Specification: [Project/Feature Name]

## Metadata

- **Author**: [Name]
- **Reviewers**: [Names]
- **Status**: [Draft / Under Review / Approved / Implemented]
- **Created**: [Date]
- **Last Updated**: [Date]
- **Ticket/Issue**: [Link to tracking issue]

## Summary

Brief 2-3 sentence summary of the technical approach.

## Motivation

Why are we doing this? What problem does it solve?

## Design

### Architecture Overview

\`\`\`mermaid
graph TD
    A[Component A] --> B[Component B]
    B --> C[Component C]
\`\`\`

### Components

#### Component A

**Responsibility**: [What it does]

**Interfaces**:
- Input: [Description]
- Output: [Description]

**Dependencies**: [List]

**Data Model**:
\`\`\`typescript
interface ComponentAData {
  field1: string;
  field2: number;
}
\`\`\`

### API Design

#### Endpoint: \`POST /api/v1/resource\`

**Request**:
\`\`\`json
{
  "field1": "value",
  "field2": 123
}
\`\`\`

**Response (201)**:
\`\`\`json
{
  "id": "uuid",
  "field1": "value",
  "field2": 123,
  "createdAt": "ISO8601"
}
\`\`\`

**Error Responses**:
- 400: Validation error
- 401: Unauthorized
- 409: Conflict

### Database Schema

\`\`\`sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field1 VARCHAR(255) NOT NULL,
  field2 INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_resources_field1 ON resources(field1);
\`\`\`

## Implementation Plan

### Phase 1: Foundation
- [ ] Task 1
- [ ] Task 2

### Phase 2: Core Logic
- [ ] Task 3
- [ ] Task 4

### Phase 3: Integration
- [ ] Task 5
- [ ] Task 6

## Testing Strategy

### Unit Tests
- Test cases for each component

### Integration Tests
- API endpoint tests
- Database integration tests

### E2E Tests
- Critical user flows

## Security Considerations

- [ ] Authentication/Authorization
- [ ] Input validation
- [ ] Rate limiting
- [ ] Data encryption
- [ ] Audit logging

## Performance Considerations

- Expected load: [RPS]
- Latency targets: [p50, p95, p99]
- Caching strategy
- Database query optimization

## Monitoring & Observability

- Metrics to collect
- Alerts to configure
- Logging requirements
- Distributed tracing

## Rollout Plan

1. Feature flag: \`feature-new-thing\`
2. Canary deployment: 5% traffic
3. Gradual rollout: 25% → 50% → 100%
4. Rollback criteria: [error rate > X%]

## Alternatives Considered

| Alternative | Pros | Cons | Decision |
|-------------|------|------|----------|
| Alt 1 | Pro 1 | Con 1 | Rejected |
| Alt 2 | Pro 2 | Con 2 | Rejected |

## Open Questions

- [ ] Question 1
- [ ] Question 2

## References

- [Link 1](url)
- [Link 2](url)`,
    createdAt: '2024-07-01',
    updatedAt: '2024-11-15',
    enabled: true,
  },
];

export function getAllTemplates(): Template[] {
  return templates.filter(t => t.enabled);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.enabled && t.category === category);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}
