export interface KpiDefinition {
  name: string;
  formula: string;
}

export interface KpiDomain {
  id: string;
  label: string;
  description: string;
  kpis: KpiDefinition[];
}

const NOT_YET_DEFINED = "Formula not yet documented in KPI Library.";

export const kpiDomains: KpiDomain[] = [
  {
    id: "claims",
    label: "Claims",
    description:
      "Claims KPIs used for period-over-period and development trend tracking across New, Reopen, Pending, Closed, CWOIP, and CWP metrics.",
    kpis: [
      { name: "New Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "New Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "New Claim Count - Development", formula: NOT_YET_DEFINED },
      { name: "Reopen Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "Reopen Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "Reopen Claim Count - Development", formula: NOT_YET_DEFINED },
      { name: "Pending Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "Pending Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "Pending Claim Count - Development", formula: NOT_YET_DEFINED },
      { name: "Closed Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "Closed Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "Closed Claim Count - Development", formula: NOT_YET_DEFINED },
      { name: "CWOIP Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "CWOIP Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "CWOIP Claim Count - Development", formula: NOT_YET_DEFINED },
      { name: "CWP Claim Count - Current", formula: NOT_YET_DEFINED },
      { name: "CWP Claim Count - Prior", formula: NOT_YET_DEFINED },
      { name: "CWP Claim Count - Development", formula: NOT_YET_DEFINED },
      {
        name: "Closing Ratio - Current (Claim)",
        formula: "[(New + Reopened) / Closed] in the selected period.",
      },
      {
        name: "Closing Ratio - Prior (Claim)",
        formula: "[(New + Reopened) / Closed] in the same period in prior year.",
      },
      { name: "Closing Ratio - Development (Claim)", formula: NOT_YET_DEFINED },
      {
        name: "Reopen Rate - Current (Claim)",
        formula: "[Reopened / (Open + Reopened)] in the selected period.",
      },
      {
        name: "Reopen Rate - Prior (Claim)",
        formula: "[Reopened / (Open + Reopened)] in the same period in prior year.",
      },
      { name: "Reopen Rate - Development (Claim)", formula: NOT_YET_DEFINED },
      {
        name: "CWOIP Claim Rate - Current",
        formula: "[CWOIP / (CWOIP + CWP)] in the selected period.",
      },
      {
        name: "CWOIP Claim Rate - Prior",
        formula: "[CWOIP / (CWOIP + CWP)] in the same period in prior year.",
      },
      { name: "CWOIP Claim Rate - Development", formula: NOT_YET_DEFINED },
      { name: "New Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "Reopen Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "Pending Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "Closed Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "Closing Ratio Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "CWOIP Prior Percentage - Development", formula: NOT_YET_DEFINED },
      { name: "CWP Prior Percentage - Development", formula: NOT_YET_DEFINED },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    description: "Financial and profitability KPIs used for performance and portfolio tracking.",
    kpis: [
      {
        name: "Loss Ratio",
        formula: "(Incurred Losses + Loss Adjustment Expenses) / Earned Premiums x 100",
      },
      {
        name: "Expense Ratio",
        formula: "Underwriting Expenses / Net Premiums Written x 100",
      },
      {
        name: "Combined Ratio",
        formula: "Loss Ratio + Expense Ratio",
      },
    ],
  },
  {
    id: "governance",
    label: "Governance",
    description: "Governance and certification KPIs from the enterprise dashboard.",
    kpis: [
      { name: "Total Elements", formula: "Total Elements = Main Elements + Net New Elements" },
      {
        name: "Certification Rate",
        formula: "(Certified Elements / Elements Requiring Certification) x 100",
      },
      {
        name: "Pending Rate",
        formula: "(Pending Elements / Elements Requiring Certification) x 100",
      },
      { name: "Missing Lineage Rate", formula: "(Missing Lineage Elements / Total Elements) x 100" },
      { name: "Lineage Coverage", formula: "(Elements with Lineage / Total Elements) x 100" },
      { name: "Quality Issues Rate", formula: "(Quality Issues / Total Elements) x 100" },
      {
        name: "Quality Score",
        formula: "(Certified Elements / Elements Requiring Certification) x 100",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    description: "Operational service and cycle-time KPIs.",
    kpis: [
      {
        name: "Claims Settlement Time",
        formula: "Sum(Settlement Date - FNOL Date) / Total Settled Claims",
      },
      {
        name: "Closed Claim Count - Current",
        formula: NOT_YET_DEFINED,
      },
      {
        name: "Pending Claim Count - Current",
        formula: NOT_YET_DEFINED,
      },
    ],
  },
  {
    id: "policy",
    label: "Policy",
    description: "Policy lifecycle and retention-oriented KPIs.",
    kpis: [
      {
        name: "Policy Retention Rate",
        formula: "(Renewed Policies / Expiring Policies) x 100",
      },
      {
        name: "New Prior Percentage - Development",
        formula: NOT_YET_DEFINED,
      },
      {
        name: "Closed Prior Percentage - Development",
        formula: NOT_YET_DEFINED,
      },
    ],
  },
  {
    id: "underwriting",
    label: "Underwriting",
    description: "Underwriting mix, pricing, and claim behavior indicators.",
    kpis: [
      {
        name: "CWOIP Claim Rate - Current",
        formula: "[CWOIP / (CWOIP + CWP)] in the selected period.",
      },
      {
        name: "CWOIP Claim Rate - Prior",
        formula: "[CWOIP / (CWOIP + CWP)] in the same period in prior year.",
      },
      {
        name: "CWP Claim Count - Current",
        formula: NOT_YET_DEFINED,
      },
    ],
  },
  {
    id: "data-quality",
    label: "Data Quality",
    description: "Data quality and metadata completeness KPIs.",
    kpis: [
      {
        name: "Missing Lineage Rate",
        formula: "(Missing Lineage Elements / Total Elements) x 100",
      },
      {
        name: "Lineage Coverage",
        formula: "(Elements with Lineage / Total Elements) x 100",
      },
      {
        name: "Quality Issues Rate",
        formula: "(Quality Issues / Total Elements) x 100",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Top-line analytic KPIs used in reporting and dashboards.",
    kpis: [
      {
        name: "Certification Rate",
        formula: "(Certified Elements / Elements Requiring Certification) x 100",
      },
      {
        name: "Pending Rate",
        formula: "(Pending Elements / Elements Requiring Certification) x 100",
      },
      {
        name: "Closing Ratio - Current (Claim)",
        formula: "[(New + Reopened) / Closed] in the selected period.",
      },
    ],
  },
];
