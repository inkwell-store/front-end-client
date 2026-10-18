/**
 * Defines an object with a name and abbreviation for a US state.
 */
export interface stateData {
    abbreviation: string;
    name: string;
}

/**
 * An array of objects containing the abbreviation and state names from the US.
 */
export const stateMap: stateData[] = [

    { abbreviation: "AL", name: "ALABAMA" },
    { abbreviation: "AK", name: "ALASKA" },
    { abbreviation: "AZ", name: "ARIZONA" },
    { abbreviation: "AR", name: "ARKANSAS" },
    { abbreviation: "CA", name: "CALIFORNIA" },
    { abbreviation: "CO", name: "COLORADO" },
    { abbreviation: "CT", name: "CONNECTICUT" },
    { abbreviation: "DE", name: "DELAWARE" },
    { abbreviation: "FL", name: "FLORIDA" },
    { abbreviation: "GA", name: "GEORGIA" },
    { abbreviation: "HI", name: "HAWAII" },
    { abbreviation: "ID", name: "IDAHO" },
    { abbreviation: "IL", name: "ILLINOIS" },
    { abbreviation: "IN", name: "INDIANA" },
    { abbreviation: "IA", name: "IOWA" },
    { abbreviation: "KS", name: "KANSAS" },
    { abbreviation: "KY", name: "KENTUCKY" },
    { abbreviation: "LA", name: "LOUISIANA" },
    { abbreviation: "ME", name: "MAINE" },
    { abbreviation: "MD", name: "MARYLAND" },
    { abbreviation: "MA", name: "MASSACHUSETTS" },
    { abbreviation: "MI", name: "MICHIGAN" },
    { abbreviation: "MN", name: "MINNESOTA" },
    { abbreviation: "MS", name: "MISSISSIPPI" },
    { abbreviation: "MO", name: "MISSOURI" },
    { abbreviation: "MT", name: "MONTANA" },
    { abbreviation: "NE", name: "NEBRASKA" },
    { abbreviation: "NV", name: "NEVADA" },
    { abbreviation: "NH", name: "NEW HAMPSHIRE" },
    { abbreviation: "NJ", name: "NEW JERSEY" },
    { abbreviation: "NM", name: "NEW MEXICO" },
    { abbreviation: "NY", name: "NEW YORK" },
    { abbreviation: "NC", name: "NORTH CAROLINA" },
    { abbreviation: "ND", name: "NORTH DAKOTA" },
    { abbreviation: "OH", name: "OHIO" },
    { abbreviation: "OK", name: "OKLAHOMA" },
    { abbreviation: "OR", name: "OREGON" },
    { abbreviation: "PA", name: "PENNSYLVANIA" },
    { abbreviation: "RI", name: "RHODE ISLAND" },
    { abbreviation: "SC", name: "SOUTH CAROLINA" },
    { abbreviation: "SD", name: "SOUTH DAKOTA" },
    { abbreviation: "TN", name: "TENNESSEE" },
    { abbreviation: "TX", name: "TEXAS" },
    { abbreviation: "UT", name: "UTAH" },
    { abbreviation: "VT", name: "VERMONT" },
    { abbreviation: "VA", name: "VIRGINIA" },
    { abbreviation: "WA", name: "WASHINGTON" },
    { abbreviation: "WV", name: "WEST VIRGINIA" },
    { abbreviation: "WI", name: "WISCONSIN" },
    { abbreviation: "WY", name: "WYOMING" }

];

/**
 * Receives an abbreviation for a US state (in uppercase) and returns its name in uppercase.
 *
 * Returns undefined if a match was not found.
 */
export function getStateNameByAbbreviation(abbreviation: string): string | undefined {
    return stateMap.find(value => value.abbreviation === abbreviation)?.name;
}

/**
 * Receives the name for a US state (in uppercase) and returns its name in uppercase.
 *
 * Returns undefined if a match was not found.
 */
export function getStateAbbreviationByName(name: string): string | undefined {
    return stateMap.find(value => value.name === name)?.abbreviation;
}
