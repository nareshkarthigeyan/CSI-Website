import { useState } from "react";
import "./Registration.css";
import useInView from "../hooks/useInView";
import AnimatedNumber from "../components/AnimatedNumber";

interface FormData {
  fullName: string;
  usn: string;
  department: string;
  semester: string;
  phoneNumber: string;
  selectedActivity: string;
  groupMembers: string;
}

interface FormErrors {
  fullName?: string;
  usn?: string;
  department?: string;
  semester?: string;
  phoneNumber?: string;
  selectedActivity?: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    usn: "",
    department: "",
    semester: "",
    phoneNumber: "",
    selectedActivity: "",
    groupMembers: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ["CSE", "ISE", "IOT", "AIML"];
  const semesters = ["1st Sem", "3rd Sem", "5th Sem", "7th Sem"];
  const activities = [
    { id: "pick-speak", name: "Pick & Speak", requiresTeam: false },
    { id: "ideathon", name: "Ideathon", requiresTeam: true },
    { id: "tech-quiz", name: "Technical Quiz", requiresTeam: false },
    { id: "poster", name: "Poster Presentation", requiresTeam: false },
    { id: "programming-contest", name: "Programming Contest", requiresTeam: false },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // USN validation
    if (!formData.usn.trim()) {
      newErrors.usn = "USN is required";
    } else if (!/^[A-Za-z0-9]{10,15}$/.test(formData.usn.trim())) {
      newErrors.usn = "USN must be 10-15 alphanumeric characters";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    // Semester validation
    if (!formData.semester) {
      newErrors.semester = "Please select a semester";
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    // Activity selection validation
    if (!formData.selectedActivity) {
      newErrors.selectedActivity = "Please select an activity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store registration data (in real app, this would be sent to backend)
      const registrationData = {
        ...formData,
        registrationId: `CSI${Date.now()}`,
        registrationDate: new Date().toISOString(),
      };

      console.log("Registration Data:", registrationData);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      usn: "",
      department: "",
      semester: "",
      phoneNumber: "",
      selectedActivity: "",
      groupMembers: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const selectedActivityInfo = activities.find(
    (activity) => activity.id === formData.selectedActivity
  );

  if (isSubmitted) {
    return (
      <div className="registration">
        <section className="success-section">
          <div className="container">
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h1>Registration Successful!</h1>
              <p>Thank you for registering for CSI Event 2025</p>
              <div className="registration-details">
                <h3>Registration Details:</h3>
                <p>
                  <strong>Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>USN:</strong> {formData.usn}
                </p>
                <p>
                  <strong>Department:</strong> {formData.department}
                </p>
                <p>
                  <strong>Selected Activity:</strong>{" "}
                  {
                    activities.find((a) => a.id === formData.selectedActivity)
                      ?.name
                  }
                </p>
                <p>
                  <strong>Registration ID:</strong> CSI{Date.now()}
                </p>
              </div>
              <div className="next-steps">
                <h3>What's Next?</h3>
                <ul>
                  <li>You will receive a confirmation email shortly</li>
                  <li>Check your email for event updates and guidelines</li>
                  <li>Join our WhatsApp group for real-time updates</li>
                  <li>Arrive 30 minutes before your event start time</li>
                </ul>
              </div>
              <button onClick={resetForm} className="register-another-btn">
                Register Another Participant
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="registration">
      {/* Hero Section */}
      <RegistrationHero />

      {/* Registration Form */}
      <section className="registration-form-section">
        <div className="container">
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "error" : ""}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              {/* USN */}
              <div className="form-group">
                <label htmlFor="usn">USN *</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  value={formData.usn}
                  onChange={handleInputChange}
                  className={errors.usn ? "error" : ""}
                  placeholder="Enter your USN"
                  style={{ textTransform: "uppercase" }}
                />
                {errors.usn && (
                  <span className="error-message">{errors.usn}</span>
                )}
              </div>

              {/* Department */}
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={errors.department ? "error" : ""}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="error-message">{errors.department}</span>
                )}
              </div>

              {/* Semester */}
              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className={errors.semester ? "error" : ""}
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
                {errors.semester && (
                  <span className="error-message">{errors.semester}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={errors.phoneNumber ? "error" : ""}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>
            </div>

            {/* Activity Selection */}
            <div className="form-group activity-selection">
              <label>Select Activity *</label>
              <div className="activities-grid">
                {activities.map((activity) => (
                  <label key={activity.id} className="activity-option">
                    <input
                      type="radio"
                      name="selectedActivity"
                      value={activity.id}
                      checked={formData.selectedActivity === activity.id}
                      onChange={handleInputChange}
                    />
                    <span className="activity-label">{activity.name}</span>
                    {activity.requiresTeam && (
                      <span className="team-required">(Team Event)</span>
                    )}
                  </label>
                ))}
              </div>
              {errors.selectedActivity && (
                <span className="error-message">{errors.selectedActivity}</span>
              )}
            </div>

            {/* Group Members */}
            {selectedActivityInfo?.requiresTeam && (
              <div className="form-group">
                <label htmlFor="groupMembers">Group Members Names</label>
                <textarea
                  id="groupMembers"
                  name="groupMembers"
                  value={formData.groupMembers}
                  onChange={handleInputChange}
                  placeholder="Enter names of your team members (separated by commas)"
                  rows={3}
                />
                <small className="form-help">
                  Required for team events. Enter each member's name separated
                  by commas.
                </small>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Now"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;

function RegistrationHero() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  const setRef: React.RefCallback<HTMLElement> = (el) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef}
      className={`registration-hero ${inView ? "reveal" : "hidden"}`}
    >
      <div className="container">
        <h1>Event Registration</h1>
        <p>Join CSI Event 2025 - Register now to secure your spot!</p>
        <div className="hero-mini-stats">
          <span className="stat">
            <strong>
              <AnimatedNumber value={120} />
            </strong>{" "}
            Registered
          </span>
          <span className="stat">
            <strong>
              <AnimatedNumber value={12} />
            </strong>{" "}
            Sponsors
          </span>
        </div>
      </div>
    </section>
  );
}
