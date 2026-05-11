<template>
  <article class="documentation-page">
    <h2>Deployment Guide</h2>
    <p>
      This guide covers deploying CertBuddy to production environments using Docker and Docker Compose.
    </p>

    <h3>Prerequisites</h3>
    <ul>
      <li>Docker 20.10 or higher</li>
      <li>Docker Compose 1.29 or higher</li>
      <li>Git</li>
      <li>A domain name for HTTPS access</li>
      <li>PostgreSQL database (or use Compose service)</li>
    </ul>

    <h3>Quick Start with Docker Compose</h3>
    <p>
      The easiest way to deploy CertBuddy is using Docker Compose:
    </p>

    <h4>Step 1: Clone Repository</h4>
    <pre><code>git clone https://github.com/certbuddy/certbuddy.git
cd certbuddy</code></pre>

    <h4>Step 2: Configure Environment</h4>
    <pre><code>cp .env.sample .env
# Edit .env with your configuration
nano .env</code></pre>

    <h4>Step 3: Build Images</h4>
    <pre><code>docker-compose build</code></pre>

    <h4>Step 4: Start Services</h4>
    <pre><code># Development environment
docker-compose -f docker-compose.dev.yml up -d

# Production environment
docker-compose -f docker-compose.yml up -d</code></pre>

    <h4>Step 5: Verify Deployment</h4>
    <pre><code>curl http://localhost:3000/health
curl http://localhost:5173</code></pre>

    <h3>Docker Services</h3>
    <p>
      CertBuddy docker-compose includes the following services:
    </p>

    <h4>Frontend Service</h4>
    <ul>
      <li><strong>Image</strong>: Vite React application</li>
      <li><strong>Port</strong>: 5173 (development) / 80 (production)</li>
      <li><strong>Container</strong>: certbuddy-frontend</li>
    </ul>

    <h4>Backend Service</h4>
    <ul>
      <li><strong>Image</strong>: Python Flask API</li>
      <li><strong>Port</strong>: 3000 (internal) / 3001 (external)</li>
      <li><strong>Container</strong>: certbuddy-backend</li>
      <li><strong>Environment</strong>: Configured via .env</li>
    </ul>

    <h4>Directus Service</h4>
    <ul>
      <li><strong>Image</strong>: Directus CMS</li>
      <li><strong>Port</strong>: 8055</li>
      <li><strong>Container</strong>: certbuddy-directus</li>
      <li><strong>Database</strong>: PostgreSQL</li>
    </ul>

    <h4>PostgreSQL Database</h4>
    <ul>
      <li><strong>Image</strong>: postgres:15</li>
      <li><strong>Port</strong>: 5432 (internal only)</li>
      <li><strong>Container</strong>: certbuddy-postgres</li>
      <li><strong>Data**: Persisted via volume</strong></li>
    </ul>

    <h3>Production Configuration</h3>

    <h4>Environment Variables</h4>
    <pre><code># .env for production
DIRECTUS_URL=https://directus.example.com
ENGINE_MASTER_TOKEN=your-secure-random-token
ENGINE_API_PORT=3000
DEBUG=False
ENGINE_RENEWAL_CHECK_INTERVAL=24
ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS=24</code></pre>

    <h4>Reverse Proxy (Nginx)</h4>
    <pre><code>upstream certbuddy_frontend {
  server frontend:5173;
}

upstream certbuddy_api {
  server backend:3000;
}

server {
  listen 443 ssl http2;
  server_name certbuddy.example.com;

  ssl_certificate /etc/letsencrypt/live/certbuddy.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/certbuddy.example.com/privkey.pem;

  location / {
    proxy_pass http://certbuddy_frontend;
  }

  location /api {
    proxy_pass http://certbuddy_api;
    proxy_set_header Authorization $http_authorization;
  }

  location /apidocs {
    proxy_pass http://certbuddy_api/apidocs;
  }
}</code></pre>

    <h3>Database Backup</h3>

    <h4>PostgreSQL Backup</h4>
    <pre><code># Backup database
docker exec certbuddy-postgres pg_dump -U directus certbuddy > backup.sql

# Restore database
docker exec -i certbuddy-postgres psql -U directus certbuddy < backup.sql</code></pre>

    <h3>Scaling Considerations</h3>

    <h4>Multiple Instances</h4>
    <p>
      For high availability:
    </p>
    <pre><code># Use docker-compose with service replicas
version: '3.9'
services:
  backend:
    replicas: 3
    # ...
  frontend:
    replicas: 2
    # ...</code></pre>

    <h4>Load Balancing</h4>
    <ul>
      <li>Use Docker Swarm for orchestration</li>
      <li>Or migrate to Kubernetes (K8s)</li>
      <li>Use nginx or HAProxy for load balancing</li>
      <li>Ensure all instances share the same Directus instance</li>
    </ul>

    <h3>Monitoring and Logging</h3>

    <h4>View Logs</h4>
    <pre><code>docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f directus</code></pre>

    <h4>Health Checks</h4>
    <pre><code>curl http://localhost:3000/health
curl http://localhost:5173</code></pre>

    <h4>Metrics</h4>
    <p>
      Monitor container resources:
    </p>
    <pre><code>docker stats</code></pre>

    <h3>Maintenance</h3>

    <h4>Update CertBuddy</h4>
    <pre><code>git pull origin main
docker-compose build
docker-compose up -d</code></pre>

    <h4>Database Cleanup</h4>
    <pre><code>Enable ENGINE_AUTO_CLEANUP_ENABLED=True
# Automatically cleans up old certificates</code></pre>

    <h4>Certificate Renewal</h4>
    <p>
      CertBuddy automatically renews certificates scheduled tasks. No manual intervention needed.
    </p>

    <h3>Troubleshooting Deployment</h3>

    <h4>Services Won't Start</h4>
    <pre><code>1. Check Docker logs: docker-compose logs
2. Verify environment variables: cat .env
3. Check port availability: netstat -tuln
4. Ensure proper permissions on .env file</code></pre>

    <h4>API Connection Errors</h4>
    <pre><code>1. Verify backend container is running: docker-compose ps
2. Check network connectivity: docker network ls
3. Verify DIRECTUS_URL in .env
4. Test Directus connection: curl $DIRECTUS_URL/health</code></pre>

    <h4>Certificate Request Failures</h4>
    <pre><code>1. Check challenge method configuration
2. Verify CA credentials
3. Check DNS records for DNS-01
4. Review API logs for errors
5. Test certificate request manually</code></pre>

    <h3>Security Best Practices</h3>
    <ul>
      <li>Use HTTPS/SSL for all connections</li>
      <li>Externalize secrets to secrets manager</li>
      <li>Use strong, unique tokens</li>
      <li>Rotate tokens regularly</li>
      <li>Restrict database access</li>
      <li>Use firewall rules</li>
      <li>Monitor access logs</li>
      <li>Keep images updated</li>
      <li>Use VPN/bastion for management access</li>
    </ul>

    <h3>Advanced Deployment</h3>

    <h4>Kubernetes Deployment</h4>
    <p>
      For advanced users, CertBuddy can be deployed to Kubernetes using Helm charts or manual manifests.
      Requires additional setup and expertise.
    </p>

    <h4>Managed Services</h4>
    <ul>
      <li>Use AWS ECS for container orchestration</li>
      <li>Use RDS for managed PostgreSQL</li>
      <li>Use CloudFront for CDN</li>
      <li>Use Route53 for DNS</li>
    </ul>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.documentation-page {
  line-height: 1.6;
  color: #2d3748;
}

.documentation-page h2 {
  font-size: 1.875rem;
  margin: 0 0 1.5rem 0;
  color: #1a202c;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.documentation-page h3 {
  font-size: 1.3125rem;
  margin: 1.5rem 0 0.75rem 0;
  color: #2d3748;
}

.documentation-page h4 {
  font-size: 1.0625rem;
  margin: 1rem 0 0.5rem 0;
  color: #2d3748;
  font-weight: 600;
}

.documentation-page p {
  margin: 1rem 0;
}

.documentation-page ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.documentation-page li {
  margin: 0.5rem 0;
}

.documentation-page code {
  font-family: 'Courier New', monospace;
  background: #f7fafc;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: #c53030;
}

.documentation-page pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.documentation-page pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.documentation-page strong {
  color: #1a202c;
}
</style>
