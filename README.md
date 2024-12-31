# Email Microservice

A TypeScript-based email microservice that provides a REST API for sending emails.

## Features

- Send emails using SMTP
- Input validation
- Error handling and logging
- Health check endpoint
- TypeScript support
- Environment variable configuration

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

Then edit `.env` with your SMTP credentials.

3. Build the project:

```bash
npm run build
```

4. Start the service:

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

### Send Welcome Email

POST /api/email/welcome

```json
{
  "to": "user@example.com",
  "name": "John Doe"
}
```

### Send Reset Password Email

POST /api/email/reset-password

```json
{
  "to": "user@example.com",
  "name": "John Doe",
  "otp": "123456"
}
```

### Health Check

GET /api/email/health

## Environment Variables

- PORT: Server port (default: 4000)
- EMAIL_PROVIDER: Email provider (default: namecheap)
- EMAIL_FROM: Email sender (default: noreply@email.com)
- SMTP_USER: SMTP username/email
- SMTP_PASS: SMTP password
- NODE_ENV: Environment (development/production)
