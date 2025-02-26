export interface Reading {
  farmerId: string;
  attribute: string;
  value: unknown;
}

export interface Aggregate {
  min: number;
  max: number;
  sum: number;
  count: number;
}

export interface Farmer {
  // TODO: define the Farmer type
  [attribute: string]: unknown;
}

// This is a fake database which stores data in-memory while the process is running
// Feel free to change the data structure to anything else you would like
const database: Record<string, Farmer> = {};

/**
 * Store a reading in the database using the given key
 */
export const addReading = (reading: Reading): Farmer => {
  const { farmerId, attribute, value } = reading;

  if (!database[farmerId]) {
    database[farmerId] = {};
  }

  database[farmerId][attribute] = value;
  return database[farmerId];
};

/**
 * Retrieve a reading from the database using the given key
 */
export const getFarmersByCountry = (country: string): Farmer[] => {
  return Object.values(database).filter(
    (farmer) => farmer["Country"] === country
  );
};
