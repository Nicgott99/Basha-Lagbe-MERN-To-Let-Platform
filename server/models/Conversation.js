import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  // Participants
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['tenant', 'landlord', 'admin'], required: true },
    joinedAt: { type: Date, default: Date.now },
    lastReadAt: Date
  }],

  // Context
  context: {
    type: { type: String, enum: ['property-inquiry', 'application', 'support', 'general'] },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
    subject: String
  },

  // Messages
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
      text: String,
      attachments: [{
        type: { type: String, enum: ['image', 'document', 'video'] },
        url: String,
        name: String,
        size: Number
      }],
      metadata: {
        propertyDetails: mongoose.Schema.Types.Mixed,
        systemGenerated: { type: Boolean, default: false }
      }
    },
    timestamp: { type: Date, default: Date.now },
    readBy: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      readAt: { type: Date, default: Date.now }
    }],
    edited: {
      isEdited: { type: Boolean, default: false },
      editedAt: Date,
      originalContent: String
    }
  }],

  // Status
  status: {
    type: String,
    enum: ['active', 'archived', 'blocked'],
    default: 'active'
  },

  // Settings
  settings: {
    notifications: { type: Boolean, default: true },
    autoArchiveAfter: { type: Number, default: 30 } // days
  },

  // Metadata
  metadata: {
    lastActivity: Date,
    messageCount: { type: Number, default: 0 },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' }
  }
}, {
  timestamps: true
});

// Indexes
conversationSchema.index({ 'participants.user': 1 });
conversationSchema.index({ 'context.propertyId': 1 });
conversationSchema.index({ 'context.applicationId': 1 });
conversationSchema.index({ 'metadata.lastActivity': -1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
