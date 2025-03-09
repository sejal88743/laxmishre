// Utility to manage auto-incrementing numbers and validation

// Initial counters (in a real app, these would be fetched from a database)
let bimCounter = 3; // Starting after BIM003
let machineCounter = 3; // Starting after M003
let takaCounter = 0;

// Existing numbers for uniqueness validation
const existingNumbers = {
  bim: new Set(['BIM001', 'BIM002', 'BIM003']),
  machine: new Set(['M001', 'M002', 'M003']),
  taka: new Set()
};

// Generate the next available number
const generateNextNumber = (prefix, counter, padding = 3) => {
  return `${prefix}${String(counter + 1).padStart(padding, '0')}`;
};

// Validate if a number already exists
const isNumberUnique = (type, number) => {
  return !existingNumbers[type].has(number);
};

// Get next BIM number
export const getNextBimNumber = () => {
  bimCounter++;
  const newNumber = generateNextNumber('BIM', bimCounter);
  existingNumbers.bim.add(newNumber);
  return newNumber;
};

// Get next Machine number
export const getNextMachineNumber = () => {
  machineCounter++;
  const newNumber = generateNextNumber('M', machineCounter);
  existingNumbers.machine.add(newNumber);
  return newNumber;
};

// Get next Taka number
export const getNextTakaNumber = () => {
  takaCounter++;
  const newNumber = generateNextNumber('T', takaCounter);
  existingNumbers.taka.add(newNumber);
  return newNumber;
};

// Validate and register a custom number
export const validateAndRegisterNumber = (type, number) => {
  // Basic format validation
  const formatValidation = {
    bim: /^BIM\d{3}$/,
    machine: /^M\d{3}$/,
    taka: /^T\d{3}$/
  };

  // Check format
  if (!formatValidation[type].test(number)) {
    return {
      isValid: false,
      message: `Invalid ${type} number format. Expected format: ${type === 'bim' ? 'BIM001' : type === 'machine' ? 'M001' : 'T001'}`,
      mode: 'create'
    };
  }

  // Check if number exists
  if (existingNumbers[type].has(number)) {
    return {
      isValid: true,
      message: `${type.toUpperCase()} number already exists`,
      mode: 'edit'
    };
  }

  // Register new number
  existingNumbers[type].add(number);
  return {
    isValid: true,
    message: '',
    mode: 'create'
  };
};

// Reset a number (for testing or administrative purposes)
export const resetNumber = (type) => {
  switch (type.toLowerCase()) {
    case 'bim':
      bimCounter = 0;
      break;
    case 'machine':
      machineCounter = 0;
      break;
    case 'taka':
      takaCounter = 0;
      break;
    default:
      throw new Error('Invalid number type');
  }
};