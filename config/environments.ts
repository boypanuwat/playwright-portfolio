export type EnvironmentName = "production";

type EnvironmentConfig = {
  name: EnvironmentName;
  baseURL: string;
};

const environments: Record<EnvironmentName, EnvironmentConfig> = {
  production: {
    name: "production",
    baseURL: "https://qa-automation-practice.netlify.app"
  }
};

export function getEnvironment(): EnvironmentConfig {
  const targetEnv = process.env.TARGET_ENV ?? "production";

  if (!isEnvironmentName(targetEnv)) {
    throw new Error(`Unsupported TARGET_ENV "${targetEnv}". Use: ${Object.keys(environments).join(", ")}`);
  }

  return environments[targetEnv];
}

function isEnvironmentName(value: string): value is EnvironmentName {
  return value in environments;
}
