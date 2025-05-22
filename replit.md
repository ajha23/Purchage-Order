# Purchase Order Management System

## Overview

This is a full-stack web application for managing purchase orders built with React, Express, and Drizzle ORM. The application follows a modern architectural pattern with client-side React components for the UI and a Node.js Express server for backend API operations. The system is designed to handle purchase order creation, tracking, and management with features for calculating totals, taxes, and other business logic related to procurement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-server architecture with clear separation between:

1. **Frontend**: React application with component-based architecture, managed with Vite
2. **Backend**: Express.js server providing RESTful API endpoints
3. **Database**: PostgreSQL database accessed via Drizzle ORM
4. **Shared Code**: Common types, schemas, and utilities shared between frontend and backend

The application uses a monorepo structure where frontend, backend, and shared code live in the same repository but in separate directories (`client/`, `server/`, and `shared/`).

### Development & Production Workflow

- **Development**: Uses Vite's dev server for hot module reloading and fast development experience
- **Production**: Builds the frontend with Vite and the backend with esbuild, then serves the static assets from the Express server

## Key Components

### Frontend

1. **UI Framework**: Uses a custom UI component library built on top of Radix UI primitives and styled with Tailwind CSS (shadcn/ui pattern)
2. **State Management**: Uses React's built-in state management with hooks and React Query for server state management
3. **Routing**: Uses Wouter for lightweight client-side routing
4. **Form Handling**: Uses React Hook Form with Zod for form validation

Main components:
- `PurchaseOrderForm`: Main form for creating and editing purchase orders
- `GeneralDetailsSection`: Form section for general purchase order information
- `ItemDetailsSection`: Form section for managing line items in a purchase order

### Backend

1. **Server**: Express.js server with JSON body parsing middleware
2. **API Routes**: RESTful API endpoints for purchase order operations
3. **Storage**: Currently uses an in-memory storage implementation, with structure ready for database integration
4. **Logging**: Custom logging for API requests and responses

### Data Layer

1. **ORM**: Drizzle ORM for database operations
2. **Schema**: Defined in `shared/schema.ts` with shared types for frontend and backend
3. **Validation**: Zod schemas for validating data

### Shared Types

The application defines several shared types:
- `PurchaseOrder`: Represents a complete purchase order
- `LineItem`: Represents an item within a purchase order
- `User`: User account information

## Data Flow

1. **Form Submission Flow**:
   - User fills out purchase order form in the frontend
   - Form data is validated with Zod
   - On submission, data is sent to the backend API
   - Backend validates, processes, and stores the data
   - Response is sent back to the frontend
   - UI is updated to reflect changes

2. **Authentication Flow**:
   - Application has user schema but authentication is not fully implemented
   - Structure exists for user creation and retrieval

## External Dependencies

### Frontend
- **UI Components**: Radix UI primitives (accordion, dialog, popover, etc.)
- **Styling**: Tailwind CSS with a custom design system
- **Form Management**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query (React Query)
- **Date Handling**: date-fns

### Backend
- **Server**: Express.js
- **Database**: Prepared for PostgreSQL with Drizzle ORM
- **Session Management**: Prepared for connect-pg-simple
- **Database Connectivity**: @neondatabase/serverless for serverless Postgres connection

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   - Frontend: Vite builds static assets
   - Backend: esbuild bundles the server code

2. **Runtime**:
   - Node.js serves the Express application
   - Static assets are served by Express

3. **Infrastructure**:
   - Configured for Replit deployment with modules for Node.js and PostgreSQL
   - Environment variables for database connection

4. **Database**:
   - Drizzle ORM is set up for PostgreSQL
   - Migration system via drizzle-kit

## Development Guidelines

1. **Adding Features**:
   - For new UI components, follow the existing pattern in `/client/src/components`
   - For new API endpoints, add them to `/server/routes.ts`
   - For database schema changes, modify `/shared/schema.ts` and run migrations

2. **State Management**:
   - Use React Query for server state
   - Use React's useState/useContext for UI state
   - Share types between frontend and backend

3. **Styling**:
   - Follow the existing Tailwind CSS patterns
   - Use the UI component library for consistent design