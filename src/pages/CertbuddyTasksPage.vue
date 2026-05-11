<template>
    <article class="documentation-page">
        <h2>Task Scheduler</h2>
        <p>
            CertBuddy includes a sophisticated task scheduling system for automated certificate
            management and maintenance operations.
        </p>

        <h3>Overview</h3>
        <p>
            The task scheduler manages all recurring operations in CertBuddy. It runs on a configurable
            schedule and performs critical operations like certificate renewal and cleanup automatically.
        </p>

        <h3>Renewal Task</h3>
        <p>
            The renewal task is the most important scheduled operation. It automatically renews
            certificates before they expire, ensuring zero downtime.
        </p>

        <h4>How It Works</h4>
        <ol>
            <li>Task runs on configured schedule (default: every 24 hours)</li>
            <li>Queries all active certificates nearing expiration</li>
            <li>Checks if certificate expires within 24 hours (configurable)</li>
            <li>Retrieves original request configuration</li>
            <li>Initiates renewal through the same CA and challenge method</li>
            <li>Updates certificate records in Directus</li>
            <li>Logs all operations for audit trail</li>
            <li>Notifies system of renewal events</li>
        </ol>

        <h4>Configuration</h4>
        <p>
            Control renewal behavior with environment variables:
        </p>
        <ul>
            <li><strong>ENGINE_RENEWAL_CHECK_INTERVAL</strong>: How often to check (hours)</li>
            <li><strong>ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS</strong>: Renew how long before expiration</li>
        </ul>

        <h4>Example Configuration</h4>
        <pre><code># Check for renewals every 12 hours
ENGINE_RENEWAL_CHECK_INTERVAL=12

# Renew certificates 72 hours before expiration
ENGINE_RENEWAL_BEFORE_EXPIRE_HOURS=72</code></pre>

        <h4>Renewal Process</h4>
        <pre><code>Certificate Expiration Date
         |
         | 72 hours before (with above config)
         v
    Renewal Task Triggers
         |
         +-- Retrieve certificate details
         +-- Get original configuration
         +-- Request new certificate from CA
         +-- Validate domain ownership (challenge)
         +-- Receive new certificate
         +-- Update Directus records
         +-- Emit 'cert.renewed' event
         |
         v
    New Certificate Active</code></pre>

        <h3>Auto Cleanup Task</h3>
        <p>
            Optional task for cleaning up old, expired certificate requests to maintain database health.
        </p>

        <h4>Features</h4>
        <ul>
            <li>Automatic deletion of old requests</li>
            <li>Only removes expired certificates</li>
            <li>Configurable age threshold</li>
            <li>Optional and disabled by default</li>
            <li>Prevents database bloat</li>
        </ul>

        <h4>Configuration</h4>
        <pre><code># Enable auto cleanup
ENGINE_AUTO_CLEANUP_ENABLED=True

# Run cleanup every 4 hours
ENGINE_AUTO_CLEANUP_INTERVAL=4

# Delete requests older than 120 days after expiration
ENGINE_AUTO_CLEANUP_BEFORE_EXPIRE_DAYS=120</code></pre>

        <h4>Cleanup Logic</h4>
        <ol>
            <li>Task runs on configured interval</li>
            <li>Finds all inactive certificates</li>
            <li>Checks if expired more than N days ago</li>
            <li>Deletes certificate records</li>
            <li>Logs deletion for audit trail</li>
        </ol>

        <h3>Task Lifecycle</h3>

        <h4>Initialization</h4>
        <p>
            When CertBuddy starts:
        </p>
        <pre><code># backend/startup.py
Scheduler.initialize()
  ├── Load configuration
  ├── Initialize renewal task
  ├── Initialize cleanup task (if enabled)
  └── Start scheduler</code></pre>

        <h4>Execution</h4>
        <p>
            Tasks execute periodically:
        </p>
        <pre><code>Scheduler runs tasks on schedule
  ├── Check if task interval has passed
  ├── Execute task function
  ├── Handle any errors
  ├── Log execution result
  └── Wait for next interval</code></pre>

        <h4>Shutdown</h4>
        <p>
            When CertBuddy stops:
        </p>
        <pre><code>Scheduler.stop()
  ├── Stop accepting new tasks
  ├── Wait for current tasks to complete
  ├── Clean up resources
  └── Save scheduler state</code></pre>

        <h3>Monitoring Tasks</h3>

        <h4>Check Logs</h4>
        <p>
            Monitor task execution in logs:
        </p>
        <pre><code>grep "task" backend.log
grep "renewal" backend.log
grep "error" backend.log</code></pre>

        <h3>Task Events</h3>
        <p>
            Tasks emit events that can be used for notifications and integrations:
        </p>
        <ul>
            <li><strong>cert.renewed</strong>: Certificate successfully renewed</li>
            <li><strong>cert.issued</strong>: New certificate issued</li>
            <li><strong>cert.failed</strong>: Certificate request failed</li>
            <li><strong>cert.expired</strong>: Certificate marked as expired</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
            <li><strong>Renewal Timing</strong>: Set renewal window to 24-72 hours before expiration</li>
            <li><strong>Check Interval</strong>: Run renewal check at least once per day</li>
            <li><strong>Redundancy</strong>: Deploy multiple instances for high availability</li>
            <li><strong>Monitoring</strong>: Check logs regularly for failures</li>
            <li><strong>Testing</strong>: Test renewal before production deployment</li>
            <li><strong>Cleanup</strong>: Enable cleanup only after confirming renewal works</li>
            <li><strong>Storage</strong>: Monitor database size, cleanup old records</li>
        </ul>

        <h3>Troubleshooting</h3>

        <h4>Renewal Not Running</h4>
        <pre><code>1. Verify ENGINE_RENEWAL_CHECK_INTERVAL is set
2. Check DEBUG logs for scheduler initialization
3. Ensure backend process is running
4. Check database connection to Directus
5. Review API errors in logs</code></pre>

        <h4>Renewal Failures</h4>
        <pre><code>1. Check certificate configuration in Directus
2. Verify CA credentials are still valid
3. Check challenge method configuration
4. Review domain validation logs
5. Check DNS records for DNS-01 method</code></pre>

        <h4>Database Growing Too Large</h4>
        <pre><code>1. Enable ENGINE_AUTO_CLEANUP_ENABLED=True
2. Set appropriate ENGINE_AUTO_CLEANUP_BEFORE_EXPIRE_DAYS
3. Monitor database size
4. Check cleanup logs for errors</code></pre>

        <h3>Scale Considerations</h3>
        <p>
            For large deployments:
        </p>
        <ul>
            <li>Use single scheduler instance with load balancer</li>
            <li>Or use external task queue (Celery, RabbitMQ)</li>
            <li>Monitor task execution times</li>
            <li>Adjust intervals based on certificate volume</li>
            <li>Use database connection pooling</li>
            <li>Monitor system resources during task execution</li>
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

.documentation-page ul,
.documentation-page ol {
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
