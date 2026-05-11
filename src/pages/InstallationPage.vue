<template>
  <article class="documentation-page">
    <h2>Installation</h2>
    <p>
      Get started with CertBuddy by following these simple installation steps.
    </p>
    <h3>Basic Concepts</h3>
    <p>
      CertBuddy consists of three main components:
    </p>
    <ul>
      <li><strong>Backend:</strong> The core service that handles certificate management and API requests.</li>
      <li><strong>Data Backend:</strong> Responsible for storing certificate data and related information. In this case is Directus.</li>
      <li><strong>Frontend:</strong> The user interface for managing certificates and viewing status.</li>
    </ul>

    <h3>Basic Environment Variables</h3>
    <p>
      Before starting the services, make sure to set the following environment variables in a .env file or directly in your environment, 
      copy the .env.sample to .env and make the necessary changes.
    </p>
    

    <h3>Docker Installation</h3>
    <p>
      The fastest way to get CertBuddy up and running is by using Docker with the included docker-compose.yml file.
      This will set up both the backend, data backend and frontend services with a single command.
    </p>
    <h3>Prerequisites</h3>
    <ul>
      <li>Docker</li>
      <li>Docker Compose</li>
    </ul>
    <h3>Steps</h3>
    <pre><code>docker-compose up -d</code></pre>

    <h3>Importing the Directus Schema</h3>
    <p>
      After starting the services, you need to import the Directus schema to set up the necessary database structure.
      The schema file is avaliable in the project root as <code>./shared/Schema.yaml</code>.
    </p>
    <h4>Copy to Docker Container and Importing</h4>
    <pre>
    <code>
      docker compose cp ./shared/Schema.yaml data_backend:/Schema.yaml
      npx directus schema import --file /Schema.yaml
    </code>
    </pre>
    <h4>(Alternative) Restore the PostgreSQL Database Dump</h4>
    <p>
      Alternatively, you can restore the provided database dump which already contains the necessary schema and some sample data.
      The dump file is avaliable in the link below:
    </p>
    <pre>
    <code>
      docker compose cp Dump.sql db:/DatabaseDump.sql
      docker compose exec db psql -U postgres -d certbuddy -f /DatabaseDump.sql
    </code>
    </pre> 
    <p>
      PS: When restoring the database dump, you need to change the admin user password in the database or via CLI.
    </p>   
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

.documentation-page p {
  margin: 1rem 0;
}

.documentation-page ul,
.documentation-page ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.documentation-page li {
  margin: 0.5rem 0;
}

.documentation-page pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.documentation-page code {
  font-family: 'Courier New', monospace;
}

.documentation-page pre code {
  background: none;
  color: inherit;
  padding: 0;
}
</style>
