export interface KpiDefinition {
  name: string;
  formula: string;
  /** When set, shown on KPI cards instead of a generic description. */
  description?: string;
  /** When set, overrides inferred unit (e.g. Count vs %). */
  unit?: string;
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
    description:
      "Submission pipeline KPIs: counts of submissions, quotes, and binds, plus quote, bind, and conversion rates.",
    kpis: [
      {
        name: "Submission Count",
        description: "Sales opportunities",
        unit: "Count",
        formula:
          'Count of distinct submissions sum(transaction_date_submitted_count). If [Date Type] = "Effective Date" then SUM([Effective Date Submitted Count]).',
      },
      {
        name: "Quote Count",
        description: "Quotes issued",
        unit: "Count",
        formula:
          'Count of distinct quote ID sum(transaction_date_quoted_count) transaction_date_quoted_count. If [Date Type] = "Effective Date" then sum([Effective Date Quoted Count]).',
      },
      {
        name: "Bind Count",
        description: "Quotes that a customer accepted",
        unit: "Count",
        formula:
          "Count of distinct quote ID with status in ('bound') sum(transaction_date_bound_count) transaction_date_bound_count. Else if [Date Type] = \"Effective Date\" then sum([Effective Date Bound Count]).",
      },
      {
        name: "Quote Rate",
        description: "Rate at which sales opportunities are reviewed and quoted by an UW",
        unit: "%",
        formula: "Quote count / submission count",
      },
      {
        name: "Bind Rate",
        description: "Rate at which quotes are accepted by customer",
        unit: "%",
        formula: "Bind count / quote count",
      },
      {
        name: "Conversion Rate",
        description: "Rate at which sales opportunities are won",
        unit: "%",
        formula: "Bind count / submission count",
      },
    ],
  },
];
