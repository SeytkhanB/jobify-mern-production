
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name!'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['Interview', 'Declined', 'Pending'],
    default: 'Pending'
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
    default: 'Full-time'
  },
  jobLocation: {
    type: String,
    default: 'My city',
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
},
// "timestamps" <-- creates date of creating and updating
{timestamps: true}
)

export default mongoose.model('Job', JobSchema)