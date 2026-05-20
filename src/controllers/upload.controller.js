const streamifier = require("streamifier");

const cloudinary = require(
  "../config/cloudinary"
);

const User = require(
  "../models/user.model"
);


// Upload Profile Picture
const uploadProfilePicture =
  async (req, res) => {

    try {

      // No file
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // Upload stream
      const streamUpload = () => {
        return new Promise((resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "finance-tracker",
              },

              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(stream);
        });
      };

      // Upload image
      const result = await streamUpload();

      // Update user
      const user =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            profilePicture:
              result.secure_url,
          },
          { new: true }
        ).select("-password");

      res.status(200).json({
        message:
          "Profile picture uploaded",
        imageUrl: result.secure_url,
        user,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  uploadProfilePicture,
};