import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  upazila: {
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  propertyCount: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true 
});

// Seed data for popular areas in Bangladesh
const popularAreas = [
  // Dhaka Division
  { division: 'Dhaka', district: 'Dhaka', area: 'Azimpur', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Dhanmondi', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Gulshan', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Banani', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Uttara', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Mirpur', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Mohammadpur', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Wari', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Old Dhaka', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Bashundhara', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Badda', isPopular: true },
  { division: 'Dhaka', district: 'Dhaka', area: 'Rampura', isPopular: true },
  
  // Chittagong Division
  { division: 'Chittagong', district: 'Chittagong', area: 'Agrabad', isPopular: true },
  { division: 'Chittagong', district: 'Chittagong', area: 'Khulshi', isPopular: true },
  { division: 'Chittagong', district: 'Chittagong', area: 'Panchlaish', isPopular: true },
  
  // Sylhet Division
  { division: 'Sylhet', district: 'Sylhet', area: 'Zindabazar', isPopular: true },
  { division: 'Sylhet', district: 'Sylhet', area: 'Amberkhana', isPopular: true },
];

const Location = mongoose.model('Location', locationSchema);

export default Location;
export { popularAreas };
