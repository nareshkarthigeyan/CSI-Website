import React, { useState, useEffect } from "react";
import eventRules from "../lib/eventRules";
import "./Registration.css";
import useInView from "../hooks/useInView";
import AnimatedNumber from "../components/AnimatedNumber";
import axios from "axios";

interface FormData {
  fullName: string;
  usn: string;
  department: string;
  semester: string;
  phoneNumber: string;
  selectedActivity: string;
  groupMembers: string;
  teamName?: string;
  leaderName?: string;
  leaderPhone?: string;
  leaderEmail?: string;
  leaderUsn?: string;
  leaderDepartment?: string;
  leaderSemester?: string;
  members?: {
    name: string;
    phone?: string;
    email?: string;
    usn?: string;
    department?: string;
    semester?: string;
  }[];
}

interface FormErrors {
  fullName?: string;
  usn?: string;
  department?: string;
  semester?: string;
  phoneNumber?: string;
  selectedActivity?: string;
  teamName?: string;
  leaderName?: string;
  leaderPhone?: string;
  leaderEmail?: string;
  // dynamic member errors will be stored using keys like member_0, member_0_phone, etc.
  [key: string]: string | undefined;
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
    teamName: "",
    leaderName: "",
    leaderPhone: "",
    leaderEmail: "",
    leaderUsn: "",
    leaderDepartment: "",
    leaderSemester: "",
    members: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState<any | null>(null);

  const departments = ["CSE", "ISE", "IOT", "AIML"];
  const semesters = ["1st Sem", "3rd Sem", "5th Sem", "7th Sem"];
  const activities = React.useMemo(
    () => [
      { id: "pick-speak", name: "Pick & Speak", requiresTeam: false },
      { id: "ideathon", name: "Ideathon", requiresTeam: true },
      { id: "tech-quiz", name: "Technical Quiz", requiresTeam: true },
      { id: "poster", name: "Poster Presentation", requiresTeam: true },
      {
        id: "programming-contest",
        name: "Programming Contest",
        requiresTeam: true,
      },
    ],
    []
  );

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

  // Team handlers
  const handleTeamField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const members = prev.members ? [...prev.members] : [];
      members[index] = { ...(members[index] || {}), [field]: value };
      return { ...prev, members };
    });
  };

  const addMember = () => {
    setFormData((prev) => {
      const members = prev.members ? [...prev.members] : [];
      // members array represents additional members besides the leader.
      // Total team size = leader + members. Enforce max total 4 => members max 3
      if (members.length >= 3) return prev;
      members.push({
        name: "",
        phone: "",
        email: "",
        usn: "",
        department: "",
        semester: "",
      });
      return { ...prev, members };
    });
  };

  const removeMember = (index: number) => {
    setFormData((prev) => {
      const members = prev.members ? [...prev.members] : [];
      members.splice(index, 1);
      return { ...prev, members };
    });
  };

  // Ensure at least one additional member exists when a team event is selected
  useEffect(() => {
    const activity = activities.find((a) => a.id === formData.selectedActivity);
    if (activity?.requiresTeam) {
      setFormData((prev) => {
        const members = prev.members ? [...prev.members] : [];
        if (members.length === 0) {
          members.push({
            name: "",
            phone: "",
            email: "",
            usn: "",
            department: "",
            semester: "",
          });
          return { ...prev, members };
        }
        return prev;
      });
    }
  }, [formData.selectedActivity, activities]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

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

    // Team-specific validations
    const activity = activities.find((a) => a.id === formData.selectedActivity);
    if (activity?.requiresTeam) {
      if (!formData.teamName || !formData.teamName.trim()) {
        newErrors.teamName = "Team name is required for team events";
      }
      if (!formData.leaderName || !formData.leaderName.trim()) {
        newErrors.leaderName = "Team leader name is required";
      }
      if (
        !formData.leaderPhone ||
        !/^[6-9]\d{9}$/.test(formData.leaderPhone || "")
      ) {
        newErrors.leaderPhone = "Valid leader phone is required";
      }
      if (
        !formData.leaderEmail ||
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.leaderEmail || "")
      ) {
        newErrors.leaderEmail = "Valid leader email is required";
      }
      // Leader USN/Department/Semester validations
      if (!formData.leaderUsn || !formData.leaderUsn.trim()) {
        newErrors.leaderUsn = "Leader USN is required";
      } else if (!/^[A-Za-z0-9]{10,15}$/.test(formData.leaderUsn.trim())) {
        newErrors.leaderUsn =
          "Leader USN must be 10-15 alphanumeric characters";
      }

      if (!formData.leaderDepartment) {
        newErrors.leaderDepartment = "Please select leader's department";
      }

      if (!formData.leaderSemester) {
        newErrors.leaderSemester = "Please select leader's semester";
      }
      if (formData.members && formData.members.length > 0) {
        formData.members.forEach((m, idx) => {
          if (!m.name || !m.name.trim()) {
            newErrors[`member_${idx}`] = `Member ${idx + 1} name is required`;
          }
          if (!m.usn || !m.usn.trim()) {
            newErrors[`member_${idx}_usn`] = `Member ${
              idx + 1
            } USN is required`;
          } else if (!/^[A-Za-z0-9]{10,15}$/.test(m.usn.trim())) {
            newErrors[`member_${idx}_usn`] = `Member ${
              idx + 1
            } USN must be 10-15 alphanumeric characters`;
          }
          if (!m.department) {
            newErrors[`member_${idx}_department`] = `Member ${
              idx + 1
            } department is required`;
          }
          if (!m.semester) {
            newErrors[`member_${idx}_semester`] = `Member ${
              idx + 1
            } semester is required`;
          }
          if (m.phone && !/^[6-9]\d{9}$/.test(m.phone)) {
            newErrors[`member_${idx}_phone`] = `Member ${
              idx + 1
            } phone is invalid`;
          }
          if (m.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.email)) {
            newErrors[`member_${idx}_email`] = `Member ${
              idx + 1
            } email is invalid`;
          }
        });
      }

      // enforce minimum team size (leader + at least 1 member)
      const memberCount = formData.members ? formData.members.length : 0;
      if (memberCount < 1) {
        newErrors.teamSize =
          "Team events require at least 2 people (leader + 1 member)";
      }
    }

    setErrors(newErrors as FormErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // POST to server API
      const payload = { ...formData, submittedAt: new Date().toISOString() };
  // POST to relative path so when deployed on Vercel the /api/register serverless function is used
  const res = await axios.post('/api/register', payload, { headers: { 'Content-Type': 'application/json' } });
      if (res.data && res.data.success) {
        setServerResponse(res.data);
        setIsSubmitted(true);
      } else {
        console.error("Server rejected registration", res.data);
        setErrors({ form: "Registration failed on server" });
      }
    } catch (err) {
      type AxiosErr = { message?: string; response?: { data?: { error?: string } } };
      const error = err as AxiosErr;
      console.error("Registration failed:", (error && error.message) || err);
      setErrors((prev) => ({ ...prev, form: (error?.response?.data?.error) || (error?.message) || 'Registration failed: server error' }));
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
      teamName: "",
      leaderName: "",
      leaderPhone: "",
      leaderEmail: "",
      leaderUsn: "",
      leaderDepartment: "",
      leaderSemester: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const selectedActivityInfo = activities.find(
    (activity) => activity.id === formData.selectedActivity
  );

  // import shared rules map
  // (added at top via patch)

  if (isSubmitted) {
    return (
      <div className="registration">
        <section className="success-section">
          <div className="container">
            <div className="success-card" id="registration-ticket">
              <div className="success-icon">🎉</div>
              <h1>Registration Confirmed</h1>
              <p className="muted">
                Your registration has been stored. Please download your ticket
                below — it will NOT be sent by email.
              </p>

              <div className="registration-details">
                <h3>Registration Summary</h3>
                <p>
                  <strong>Registration No:</strong>{" "}
                  {serverResponse?.registrationNumber || "—"}
                </p>
                <p>
                  <strong>Submitted At:</strong>{" "}
                  {serverResponse?.saved?.createdAt
                    ? new Date(serverResponse.saved.createdAt).toLocaleString()
                    : new Date().toLocaleString()}
                </p>
                <p>
                  <strong>Event:</strong>{" "}
                  {
                    activities.find((a) => a.id === formData.selectedActivity)
                      ?.name
                  }
                </p>
                <p>
                  <strong>Team Name:</strong> {formData.teamName || "-"}
                </p>

                <h4>Leader</h4>
                <p>
                  {formData.leaderName} • {formData.leaderUsn}
                </p>
                <p>
                  {formData.leaderPhone} • {formData.leaderEmail}
                </p>
                <p>
                  {formData.leaderDepartment} • {formData.leaderSemester}
                </p>

                {formData.members && formData.members.length > 0 && (
                  <>
                    <h4>Members</h4>
                    {formData.members.map((m, i) => (
                      <div key={i} className="member-summary">
                        <p>
                          <strong>{m.name}</strong> — {m.usn} • {m.department} •{" "}
                          {m.semester}
                        </p>
                        <p>
                          {m.phone} • {m.email}
                        </p>
                      </div>
                    ))}
                  </>
                )}

                <div className="ticket-actions">
                  <button
                    className="download-ticket"
                    onClick={async () => {
                      // dynamic import to keep bundle small
                      const { default: html2canvas } = await import(
                        "html2canvas"
                      );
                      const jsPDF = (await import("jspdf")).default;
                      const el = document.getElementById("registration-ticket");
                      if (!el) return;
                      const canvas = await html2canvas(el, { scale: 2 });
                      const imgData = canvas.toDataURL("image/png");
                      const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "pt",
                        format: "a4",
                      });
                      const pageWidth = pdf.internal.pageSize.getWidth();
                      // scale image to fit width
                      const imgProps = pdf.getImageProperties(imgData);
                      const imgWidth = pageWidth - 80;
                      const imgHeight =
                        (imgProps.height * imgWidth) / imgProps.width;
                      pdf.addImage(imgData, "PNG", 40, 40, imgWidth, imgHeight);
                      pdf.save(
                        `${
                          serverResponse?.registrationNumber || "CSI-TICKET"
                        }.pdf`
                      );
                    }}
                  >
                    Download CSI Registration Ticket (PDF)
                  </button>

                  <button onClick={resetForm} className="register-another-btn">
                    Register Another
                  </button>
                </div>
              </div>
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
            {/* Activity Selection (pick first) */}
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

            {/* Show personal/team fields only after activity picked */}
            {formData.selectedActivity && (
              <>
                {selectedActivityInfo?.requiresTeam ? (
                  /* team-section (already implemented above) */
                  <>
                    {/* Team form is rendered below via existing team-section markup */}
                  </>
                ) : (
                  /* Non-team: show single-person fields */
                  <div className="form-grid">
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
                        <span className="error-message">
                          {errors.department}
                        </span>
                      )}
                    </div>

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
                        <span className="error-message">
                          {errors.phoneNumber}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Event Rules Display */}
            {formData.selectedActivity && (
              <div className="form-group event-rules">
                <h3>Event Rules</h3>
                <div className="rules-content">
                  {selectedActivityInfo?.id === "pick-speak" && (
                    <ul>
                      <li>Individual presentations only — 5 to 7 minutes.</li>
                      <li>
                        Topics: emerging technologies, innovations, or research.
                      </li>
                      <li>Judged on clarity, relevance and delivery.</li>
                    </ul>
                  )}
                  {selectedActivityInfo && (
                    <ul>
                      {(eventRules[selectedActivityInfo.id]?.rules || []).map(
                        (r, i) => (
                          <li key={i}>{r}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Team form for team events */}
            {selectedActivityInfo?.requiresTeam && (
              <div className="team-section">
                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    name="teamName"
                    value={formData.teamName || ""}
                    onChange={handleTeamField}
                  />
                </div>

                <div className="leader-block">
                  <h4>Team Leader</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Leader Name *</label>
                      <input
                        name="leaderName"
                        value={formData.leaderName || ""}
                        onChange={handleTeamField}
                      />
                    </div>
                    <div className="form-group">
                      <label>Leader Phone *</label>
                      <input
                        name="leaderPhone"
                        value={formData.leaderPhone || ""}
                        onChange={handleTeamField}
                      />
                    </div>
                    <div className="form-group">
                      <label>Leader Email *</label>
                      <input
                        name="leaderEmail"
                        value={formData.leaderEmail || ""}
                        onChange={handleTeamField}
                      />
                    </div>
                    <div className="form-group">
                      <label>Leader USN *</label>
                      <input
                        name="leaderUsn"
                        value={formData.leaderUsn || ""}
                        onChange={handleTeamField}
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Leader Department *</label>
                      <select
                        name="leaderDepartment"
                        value={formData.leaderDepartment || ""}
                        onChange={handleTeamField}
                      >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Leader Semester *</label>
                      <select
                        name="leaderSemester"
                        value={formData.leaderSemester || ""}
                        onChange={handleTeamField}
                      >
                        <option value="">Select Semester</option>
                        {semesters.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="members-block">
                  <h4>Members</h4>
                  {(formData.members || []).map((m, idx) => (
                    <div key={idx} className="member-row">
                      <input
                        placeholder="Name"
                        value={m.name}
                        onChange={(e) =>
                          handleMemberChange(idx, "name", e.target.value)
                        }
                      />
                      <input
                        placeholder="USN"
                        value={m.usn}
                        onChange={(e) =>
                          handleMemberChange(idx, "usn", e.target.value)
                        }
                        style={{ textTransform: "uppercase" }}
                      />
                      <select
                        value={m.department || ""}
                        onChange={(e) =>
                          handleMemberChange(idx, "department", e.target.value)
                        }
                      >
                        <option value="">Dept</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <select
                        value={m.semester || ""}
                        onChange={(e) =>
                          handleMemberChange(idx, "semester", e.target.value)
                        }
                      >
                        <option value="">Sem</option>
                        {semesters.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="Phone"
                        value={m.phone}
                        onChange={(e) =>
                          handleMemberChange(idx, "phone", e.target.value)
                        }
                      />
                      <input
                        placeholder="Email"
                        value={m.email}
                        onChange={(e) =>
                          handleMemberChange(idx, "email", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="remove-member"
                        disabled={
                          activities.find(
                            (a) => a.id === formData.selectedActivity
                          )?.requiresTeam &&
                          (formData.members || []).length <= 1
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="member-actions">
                    <button
                      type="button"
                      onClick={addMember}
                      disabled={(formData.members || []).length >= 4}
                    >
                      + Add Member
                    </button>
                    <small>Up to 4 members allowed</small>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {errors.form && <div className="form-error-banner">{errors.form}</div>}
            <div className="form-submit">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Now"}
              </button>
            </div>
            <div className="disclaimer">
              <strong>Disclaimer:</strong> If you register for more than one
              event, please note that the organizers are not responsible for
              schedule conflicts, overlapping timings, or missed rounds.
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
