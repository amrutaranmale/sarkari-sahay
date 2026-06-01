export const STATES = [
  { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal_pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal_pradesh', label: 'Himachal Pradesh' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil_nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west_bengal', label: 'West Bengal' },
];

export const INCOME_RANGES = [
  { value: 'below_1l', label: 'Below ₹1 lakh/year' },
  { value: '1l_2.5l', label: '₹1 – 2.5 lakh/year' },
  { value: '2.5l_5l', label: '₹2.5 – 5 lakh/year' },
  { value: '5l_10l', label: '₹5 – 10 lakh/year' },
  { value: 'above_10l', label: 'Above ₹10 lakh/year' },
];

export const CASTES = [
  { value: 'general', label: 'General' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' },
  { value: 'ews', label: 'EWS' },
];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'transgender', label: 'Transgender' },
];

export const OCCUPATIONS = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'salaried', label: 'Salaried' },
  { value: 'homemaker', label: 'Homemaker' },
];

export const CATEGORIES = {
  agriculture: { label: 'Agriculture', color: 'bg-green-100 text-green-800' },
  education: { label: 'Education', color: 'bg-blue-100 text-blue-800' },
  health: { label: 'Health', color: 'bg-red-100 text-red-800' },
  housing: { label: 'Housing', color: 'bg-amber-100 text-amber-800' },
  employment: { label: 'Employment', color: 'bg-purple-100 text-purple-800' },
  'social-welfare': { label: 'Social Welfare', color: 'bg-pink-100 text-pink-800' },
  disability: { label: 'Disability', color: 'bg-indigo-100 text-indigo-800' },
  'women-child': { label: 'Women & Child', color: 'bg-rose-100 text-rose-800' },
  'senior-citizen': { label: 'Senior Citizen', color: 'bg-orange-100 text-orange-800' },
  finance: { label: 'Finance', color: 'bg-teal-100 text-teal-800' },
};

export function formatState(value) {
  const state = STATES.find((s) => s.value === value);
  return state?.label || value?.replace(/_/g, ' ') || value;
}

export function formatCaste(value) {
  return CASTES.find((c) => c.value === value)?.label || value?.toUpperCase();
}

export function formatIncome(value) {
  return INCOME_RANGES.find((i) => i.value === value)?.label || value;
}

export function formatLevel(level) {
  return level === 'central' ? 'Central Govt' : 'State Govt';
}
