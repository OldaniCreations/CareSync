// Feature flags for CareSync app
// Temporarily hardcoded for testing - set REACT_APP_FEATURE_TRUST_UI_V1=true in .env file
export const FEATURE_TRUST_UI_V1 = true; // process.env.REACT_APP_FEATURE_TRUST_UI_V1 === 'true';
export const FEATURE_SINGLE_PANE_V2 = true; // process.env.REACT_APP_FEATURE_SINGLE_PANE_V2 === 'true';



// Add other feature flags here as needed
export const FEATURES = {
  TRUST_UI_V1: FEATURE_TRUST_UI_V1,
  SINGLE_PANE_V2: FEATURE_SINGLE_PANE_V2,
} as const;
