import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const therapistSchema = new mongoose.Schema(
  {
    therapistId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    // address: {
    //   country: {
    //     type: String,
    //     required: true,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   district: {
    //     type: String,
    //   },
    // },

    address: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
    },

    licenseDocument: {
      type: String,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "",
    },
    cloudinaryId: {
      type: String,
    },

    cv: {
      type: String,
      default: "",
    },
    cvCloudinaryId: {
      type: String,
    },
    userType: {
      type: String,
      default: "therapist",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      // select: false,
    },
    otpExpires: {
      type: Date,
      // select: false,
    },
    active: {
      type: Boolean,
      default: true,
      // select: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

therapistSchema.pre("save", function (next) {
  if (!this.therapistId) {
    this.therapistId = generateTherapistId();
  }
  next();
});

function generateTherapistId() {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
}

// Methods to check password
therapistSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

therapistSchema.methods.createOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

const Therapist = mongoose.model("Therapist", therapistSchema);

export default Therapist;
