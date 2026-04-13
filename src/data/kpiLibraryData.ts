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
    id: "submission",
    label: "Submission",
    description: "Submission domain KPIs will be added once the list is provided.",
    kpis: [],
  },
];
