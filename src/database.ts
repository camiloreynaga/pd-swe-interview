interface Reading {
  farmerId: string;
  attribute: string;
  value: unknown;
}

interface Aggregate {
  min: number;
  max: number;
  sum: number;
  count: number;
}

interface Farmer {
  // TODO: define the Farmer type
}

// This is a fake database which stores data in-memory while the process is running
// Feel free to change the data structure to anything else you would like
const database: Record<string, Farmer> = {};

/**
 * Store a reading in the database using the given key
 */
export const addReading = (reading: Reading): Farmer => {
  // TODO: implement this function
  throw new Error("Not implemented");
};

/**
 * Retrieve a reading from the database using the given key
 */
export const getFarmersByCountry = (country: string): Farmer[] => {
  // TODO: implement this function
  throw new Error("Not implemented");
};
