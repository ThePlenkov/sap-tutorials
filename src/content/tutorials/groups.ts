// Define group order
export const tutorialGroupOrder = [
  'sap-cap',
  'cloud-dev',
  'abap'
];

// Define groups with their properties
export const tutorialGroups = {
  'sap-cap': {
    title: 'SAP Cloud Application Programming Model',
    description: 'Learn how to build enterprise-grade applications with SAP CAP',
    tutorials: ['sap-cap-basics', 'sap-cap-k8s', 'cap-xsa']
  },
  'abap': {
    title: 'ABAP Development',
    description: 'Master ABAP programming and best practices',
    tutorials: ['abap-security']
  },
  'cloud-dev': {
    title: 'Cloud Development',
    description: 'Learn cloud-native development practices and containerization',
    tutorials: ['docker-basics', 'devcontainers']
  }
};