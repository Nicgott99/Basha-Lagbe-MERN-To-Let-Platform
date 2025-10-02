import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  landlordEmail: {
    type: String,
    required: true
  },
  personalInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationalId: { type: String, required: true },
    occupation: { type: String, required: true },
    monthlyIncome: { type: Number, required: true },
    employer: { type: String, required: true }
  },
  rentalHistory: {
    currentAddress: { type: String, required: true },
    landlordName: String,
    landlordContact: String,
    monthlyRent: Number,
    reasonForMoving: { type: String, required: true }
  },
  references: [{
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    email: String
  }],
  preferences: {
    moveInDate: { type: Date, required: true },
    leaseDuration: { type: String, required: true },
    pets: { type: Boolean, default: false },
    petDetails: String,
    smoking: { type: Boolean, default: false },
    additionalOccupants: { type: Number, default: 0 },
    occupantDetails: String
  },
  documents: {
    idCard: String,
    incomeProof: String,
    bankStatement: String,
    employmentLetter: String
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  landlordNotes: String,
  reviewedAt: Date,
  reviewedBy: String
}, {
  timestamps: true
});

export default mongoose.model('Application', applicationSchema);
