// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Service = require("../models/service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
    });
    await user.save();

    res.status(201).json({ message: "Registration successful 🎉 Please login." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 👇 hasProfile check for providers
    let hasProfile = false;
    if (user.role === "provider") {
      const existingService = await Service.findOne({ provider: user._id });
      if (existingService) {
        hasProfile = true;
      }
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        hasProfile,   // 👈 frontend uses this
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user profile
router.get("/user/:id", protect, async (req, res) => {
  try {
    const userId = req.params.id;

    // First get the user
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is a provider, get their service profile
    if (user.role === "provider") {
      const service = await Service.findOne({ provider: userId });
      if (service) {
        // Combine user and service data
        const profile = {
          ...user.toObject(),
          service: service.title,
          subservices: service.subservices,
          description: service.description,
          price: service.price,
          images: service.images
        };
        return res.json(profile);
      }
    }

    // If no service profile or user is client, return user data
    res.json(user);
  } catch (err) {
    console.error("Get user profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update profile picture
router.post("/profile-image", protect, upload.single("profileImage"), async (req, res) => {
  try {
    console.log("Received profile image update request", { file: req.file, userId: req.user?.id });
    
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If there's an existing profile image, delete it
    if (user.profileImage) {
      try {
        const oldImagePath = path.join(__dirname, "..", "uploads", path.basename(user.profileImage));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (deleteErr) {
        console.error("Error deleting old image:", deleteErr);
        // Continue with the update even if delete fails
      }
    }

    // Update the user's profile image
    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ 
      message: "Profile image updated", 
      profileImage: user.profileImage,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    console.error("Update profile image error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user settings
router.get("/settings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      notifications: user.settings?.notifications || {
        email: true,
        push: true,
        booking: true,
        messages: true
      },
      privacy: user.settings?.privacy || {
        showEmail: false,
        showPhone: false,
        showLocation: true
      }
    });
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update user settings
router.put("/settings", protect, async (req, res) => {
  try {
    const { notifications, privacy } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.settings = {
      notifications,
      privacy
    };
    await user.save();

    res.json({ message: "Settings updated successfully", settings: user.settings });
  } catch (err) {
    console.error("Update settings error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Change password
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

