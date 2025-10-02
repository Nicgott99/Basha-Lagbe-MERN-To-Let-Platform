import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import User from '../models/user.model.js';
import Property from '../models/property.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(errorHandler(403, 'Admin access required'));
  }
  next();
};

// Get admin dashboard stats
router.get('/stats', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProperties = await Property.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    // Recent users (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentUsers = await User.countDocuments({ 
      role: 'user',
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Recent properties (last 30 days)
    const recentProperties = await Property.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProperties,
        totalAdmins,
        recentUsers,
        recentProperties,
        activeUsers: totalUsers, // Simplified for now
        totalRevenue: 0, // Placeholder
        monthlyGrowth: {
          users: recentUsers,
          properties: recentProperties
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get('/users', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({ role: 'user' })
      .select('-password -passwordResetToken -passwordResetExpires')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ role: 'user' });

    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get all properties
router.get('/properties', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find()
      .populate('userRef', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProperties = await Property.countDocuments();

    res.status(200).json({
      success: true,
      properties,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProperties / limit),
        totalProperties,
        hasNext: page < Math.ceil(totalProperties / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update user status (activate/deactivate)
router.patch('/users/:id/status', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password -passwordResetToken -passwordResetExpires');

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    next(error);
  }
});

// Delete user
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Also delete user's properties
    await Property.deleteMany({ userRef: req.params.id });

    res.status(200).json({
      success: true,
      message: 'User and associated data deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;