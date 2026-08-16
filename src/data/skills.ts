import { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Automated code review skill that analyzes PRs for bugs, security issues, and best practices',
    skillMdContent: `# Code Reviewer Skill

## Description
This skill provides automated code review capabilities for pull requests. It analyzes code changes for potential bugs, security vulnerabilities, performance issues, and adherence to best practices.

## Capabilities
- Static analysis of code changes
- Security vulnerability detection
- Performance bottleneck identification
- Code style and best practices enforcement
- Automated suggestions for improvements

## Usage
Invoke this skill when reviewing pull requests or when you want to analyze code changes before merging.

## Configuration
\`\`\`yaml
review_depth: comprehensive
check_security: true
check_performance: true
check_style: true
custom_rules: []
\`\`\`

## Examples
### Example 1: Basic Code Review
\`\`\`bash
# Review a PR
skill code-reviewer --pr 123
\`\`\`

### Example 2: Custom Rules
\`\`\`bash
# Review with custom rules
skill code-reviewer --pr 123 --rules ./custom-rules.yaml
\`\`\`

## Output Format
The skill returns a structured review report with:
- Summary of findings
- Severity levels (critical, high, medium, low)
- File-specific comments
- Suggested fixes
- Overall approval recommendation`,
    sourceRepo: 'https://github.com/example/code-reviewer-skill',
    docsUrl: 'https://docs.example.com/code-reviewer',
    tags: ['code-review', 'security', 'quality', 'automation'],
    createdAt: '2024-01-15',
    updatedAt: '2024-11-01',
    enabled: true,
  },
  {
    id: 'test-generator',
    name: 'Test Generator',
    description: 'Generates comprehensive unit and integration tests for your codebase',
    skillMdContent: `# Test Generator Skill

## Description
Automatically generates unit tests, integration tests, and edge case tests for your code. Supports multiple testing frameworks and languages.

## Capabilities
- Unit test generation
- Integration test scaffolding
- Edge case detection
- Mock generation
- Coverage analysis

## Supported Frameworks
- Jest / Vitest (JavaScript/TypeScript)
- Pytest (Python)
- Go test (Go)
- JUnit (Java)
- RSpec (Ruby)

## Usage
\`\`\`bash
# Generate tests for a file
skill test-generator --file src/utils.ts

# Generate tests for a directory
skill test-generator --dir src/components

# Generate with specific framework
skill test-generator --file src/utils.ts --framework vitest
\`\`\`

## Configuration
\`\`\`yaml
framework: auto
coverage_target: 80
include_edge_cases: true
mock_external_deps: true
test_naming: descriptive
\`\`\``,
    sourceRepo: 'https://github.com/example/test-generator-skill',
    docsUrl: 'https://docs.example.com/test-generator',
    tags: ['testing', 'unit-tests', 'automation', 'quality'],
    createdAt: '2024-02-01',
    updatedAt: '2024-10-15',
    enabled: true,
  },
  {
    id: 'doc-generator',
    name: 'Documentation Generator',
    description: 'Automatically generates documentation from code comments and structure',
    skillMdContent: `# Documentation Generator Skill

## Description
Creates comprehensive documentation from your codebase including API docs, README files, and architecture diagrams.

## Capabilities
- API documentation generation
- README creation
- Architecture diagram generation
- Changelog generation
- TypeDoc / JSDoc / Sphinx integration

## Supported Formats
- Markdown
- HTML
- OpenAPI/Swagger
- Mermaid diagrams

## Usage
\`\`\`bash
# Generate API docs
skill doc-generator --source src/api --output docs/api

# Generate README
skill doc-generator --readme --output README.md

# Generate architecture diagram
skill doc-generator --architecture --output docs/architecture.mmd
\`\`\`

## Configuration
\`\`\`yaml
formats:
  - markdown
  - html
include_private: false
generate_diagrams: true
template: default
\`\`\``,
    sourceRepo: 'https://github.com/example/doc-generator-skill',
    docsUrl: 'https://docs.example.com/doc-generator',
    tags: ['documentation', 'api-docs', 'readme', 'automation'],
    createdAt: '2024-03-01',
    updatedAt: '2024-11-20',
    enabled: true,
  },
  {
    id: 'refactor-assistant',
    name: 'Refactor Assistant',
    description: 'Helps refactor code with automated suggestions and safe transformations',
    skillMdContent: `# Refactor Assistant Skill

## Description
Provides intelligent refactoring suggestions and automated code transformations with safety guarantees.

## Capabilities
- Extract method/function
- Rename symbols safely
- Extract interface/type
- Convert patterns (callbacks to promises, etc.)
- Dead code elimination
- Duplicate code detection

## Safety Features
- Runs tests before and after refactoring
- Provides diff preview
- Rollback capability
- Type checking validation

## Usage
\`\`\`bash
# Extract method
skill refactor --extract-method --file src/utils.ts --lines 10-25

# Rename symbol
skill refactor --rename --from oldName --to newName

# Convert callbacks to async/await
skill refactor --convert-async --file src/api.ts
\`\`\`

## Configuration
\`\`\`yaml
run_tests: true
type_check: true
preview_only: false
backup: true
\`\`\``,
    sourceRepo: 'https://github.com/example/refactor-assistant-skill',
    docsUrl: 'https://docs.example.com/refactor-assistant',
    tags: ['refactoring', 'code-quality', 'automation', 'safety'],
    createdAt: '2024-04-01',
    updatedAt: '2024-10-01',
    enabled: true,
  },
  {
    id: 'dependency-auditor',
    name: 'Dependency Auditor',
    description: 'Audits project dependencies for vulnerabilities, license issues, and updates',
    skillMdContent: `# Dependency Auditor Skill

## Description
Comprehensive dependency analysis for security vulnerabilities, license compliance, and update recommendations.

## Capabilities
- Vulnerability scanning (CVE database)
- License compliance checking
- Update recommendations
- Dependency tree analysis
- Unused dependency detection
- Supply chain security

## Supported Package Managers
- npm / yarn / pnpm
- pip / poetry
- cargo
- go modules
- maven / gradle

## Usage
\`\`\`bash
# Full audit
skill dependency-auditor --path .

# Check vulnerabilities only
skill dependency-auditor --vulnerabilities --path .

# Check licenses
skill dependency-auditor --licenses --path .

# Generate report
skill dependency-auditor --report --output audit-report.json
\`\`\`

## Configuration
\`\`\`yaml
check_vulnerabilities: true
check_licenses: true
check_updates: true
fail_on_critical: true
allowed_licenses:
  - MIT
  - Apache-2.0
  - BSD-3-Clause
\`\`\``,
    sourceRepo: 'https://github.com/example/dependency-auditor-skill',
    docsUrl: 'https://docs.example.com/dependency-auditor',
    tags: ['security', 'dependencies', 'audit', 'compliance'],
    createdAt: '2024-05-01',
    updatedAt: '2024-11-10',
    enabled: true,
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    description: 'Design and document REST/GraphQL APIs with best practices',
    skillMdContent: `# API Designer Skill

## Description
Helps design, document, and validate APIs following REST and GraphQL best practices.

## Capabilities
- OpenAPI/Swagger generation
- GraphQL schema design
- API versioning strategy
- Request/response validation
- Mock server generation
- Client SDK generation

## Usage
\`\`\`bash
# Design REST API
skill api-designer --rest --spec openapi.yaml

# Design GraphQL API
skill api-designer --graphql --schema schema.graphql

# Generate mock server
skill api-designer --mock --spec openapi.yaml --port 3001

# Generate client SDK
skill api-designer --client --spec openapi.yaml --language typescript
\`\`\`

## Best Practices Enforced
- Consistent naming conventions
- Proper HTTP status codes
- Rate limiting headers
- Pagination standards
- Error response format
- Security headers

## Configuration
\`\`\`yaml
style: rest
versioning: url
pagination: cursor
error_format: rfc7807
auth: bearer
\`\`\``,
    sourceRepo: 'https://github.com/example/api-designer-skill',
    docsUrl: 'https://docs.example.com/api-designer',
    tags: ['api', 'rest', 'graphql', 'design', 'openapi'],
    createdAt: '2024-06-01',
    updatedAt: '2024-11-01',
    enabled: true,
  },
];

export function getAllSkills(): Skill[] {
  return skills.filter(s => s.enabled);
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find(s => s.id === id);
}

export function getSkillsByTag(tag: string): Skill[] {
  return skills.filter(s => s.enabled && s.tags?.includes(tag));
}
