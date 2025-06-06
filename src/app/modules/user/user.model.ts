import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { Role } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: '{VALUE} is not a valid role',
      },
      default: 'employer',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// hash password before saving
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set password to empty string before sending response
userSchema.post('save', function (doc, next) {
  doc.password = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiedDoc = doc as any;
  modifiedDoc._doc = {
    _id: doc._id,
    email: doc.email,
  };
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
