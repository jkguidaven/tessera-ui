// Hand-written stories for ts-timeline

export default {
  title: 'Components/Timeline',
  tags: ['autodocs'],
};

export const Default = (): string => `
  <ts-timeline>
    <ts-timeline-item timestamp="March 25, 2026 at 10:32 AM">
      <strong>Deployment completed</strong><br/>
      Production deployment v2.4.1 finished successfully.
    </ts-timeline-item>
    <ts-timeline-item timestamp="March 25, 2026 at 10:28 AM">
      <strong>Build passed</strong><br/>
      All 847 tests passed in 3m 12s.
    </ts-timeline-item>
    <ts-timeline-item timestamp="March 25, 2026 at 10:15 AM">
      <strong>Pull request merged</strong><br/>
      PR #142 "Add timeline component" was merged into main.
    </ts-timeline-item>
    <ts-timeline-item timestamp="March 24, 2026 at 4:45 PM">
      <strong>Code review approved</strong><br/>
      2 approvals received from team members.
    </ts-timeline-item>
  </ts-timeline>
`;

export const WithIcons = (): string => `
  <ts-timeline>
    <ts-timeline-item icon="check" variant="success" timestamp="March 25, 2026">
      <strong>Order delivered</strong><br/>
      Package was delivered to the front door.
    </ts-timeline-item>
    <ts-timeline-item icon="truck" variant="primary" timestamp="March 24, 2026">
      <strong>Out for delivery</strong><br/>
      Package is on its way to the destination.
    </ts-timeline-item>
    <ts-timeline-item icon="package" variant="primary" timestamp="March 22, 2026">
      <strong>Shipped</strong><br/>
      Package left the warehouse in San Francisco, CA.
    </ts-timeline-item>
    <ts-timeline-item icon="credit-card" variant="neutral" timestamp="March 20, 2026">
      <strong>Payment confirmed</strong><br/>
      Payment of $129.99 was processed successfully.
    </ts-timeline-item>
  </ts-timeline>
`;

export const VariantColors = (): string => `
  <ts-timeline>
    <ts-timeline-item variant="success" timestamp="Resolved">
      <strong>Issue fixed</strong><br/>
      The bug has been patched and deployed.
    </ts-timeline-item>
    <ts-timeline-item variant="warning" timestamp="In Progress">
      <strong>Investigating</strong><br/>
      Team is looking into the root cause.
    </ts-timeline-item>
    <ts-timeline-item variant="danger" timestamp="Critical">
      <strong>Incident reported</strong><br/>
      Users experiencing login failures in EU region.
    </ts-timeline-item>
    <ts-timeline-item variant="primary" timestamp="Monitoring">
      <strong>Alert triggered</strong><br/>
      Error rate exceeded 5% threshold.
    </ts-timeline-item>
    <ts-timeline-item variant="neutral" timestamp="Scheduled">
      <strong>Maintenance window</strong><br/>
      Planned downtime for database migration.
    </ts-timeline-item>
  </ts-timeline>
`;
