export const rawApiResponse = [
  { name: "darkMode", enabled: true, variant: "v1" },
  { name: "hamada", enabled: false, variant: true },
  { name: "ali", enabled: false },
  { name: "analytics", enabled: "true" }, // Invalid: enabled should be boolean
  { name: "", enabled: false }, // Invalid: empty name
  { name: "notifications", isActive: true }, // Deprecated field
  null, // Invalid: null entry
];

interface RawResponseType {
  name: string;
  enabled: boolean;
  variant?: string;
}

export const fetchFeatureToggle = (rawApiResponse: any) => {
  if (!Array.isArray(rawApiResponse)) {
    throw new Error("Response Must be an Array");
  }

  // first solution O(n^2)
  const getToggles = () => {
    const response: RawResponseType[] = [];

    rawApiResponse.forEach((element: any) => {
      if (
        // we could create a utility function to validate inputs
        element &&
        "name" in element &&
        element.name &&
        typeof element.name === "string" &&
        "enabled" in element &&
        typeof element.enabled === "boolean" &&
        (typeof element.variant === "undefined" ||
          typeof element.variant === "string")
      ) {
        response.push(element);
      }
    });

    return response;
  };

  //optimized solution O(n)
  const togglesMap = new Map<string, RawResponseType>();
  const getOptimizedToggles = () => {
    rawApiResponse.forEach((element: any) => {
      if (
        // we could create a utility function to validate inputs
        element &&
        "name" in element &&
        element.name &&
        typeof element.name === "string" &&
        "enabled" in element &&
        typeof element.enabled === "boolean" &&
        (typeof element.variant === "undefined" ||
          typeof element.variant === "string")
      ) {
        togglesMap.set(element.name.toLowerCase(), element);
      }
    });

    return Array.from(togglesMap.values());
  };

  // first solution O(n^2)
  const isFeatureEnabled = (feature: string) => {
    const toggles = getToggles();

    return (
      toggles.find(
        element => element.name.toLowerCase() === feature.toLowerCase(),
      )?.enabled || false
    );
  };

  // optimized solution O(1)
  const isOptimizedFeatureEnabled = (feature: string) => {
    return togglesMap.get(feature.toLowerCase())?.enabled || false;
  };

  return {
    getToggles,
    isFeatureEnabled,
    getOptimizedToggles,
    isOptimizedFeatureEnabled,
  };
};
