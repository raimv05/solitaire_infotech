import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Code2,
  Target,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Zap,
  Users,
  Award,
  RefreshCw,
  Bookmark,
  ChevronRight,
  Send,
  HelpCircle,
  Check,
  FileText,
  Printer,
  Home,
  Laptop,
} from 'lucide-react';
import './TestPage.css';
import {
  collegesList,
  streamsList,
  semestersList,
  technicalSpecializations,
  nonTechnicalSpecializations,
  technicalQuestions,
  nonTechnicalQuestions,
} from '../data/assessmentQuestions.js';

export default function TestPage({ onNavigate }) {
  // Step state: 1 = Track, 2 = Details, 2.5 = Review (showReviewConfirm), 3 = Test, 4 = Result
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('technical'); // 'technical' | 'non-technical'

  // Candidate Details Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    college: collegesList[0],
    customCollege: '',
    stream: streamsList[0],
    semester: semestersList[5], // 6th Sem default
    specialization: technicalSpecializations[0],
    isAccurate: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showReviewConfirm, setShowReviewConfirm] = useState(false);

  // Test Engine State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabSwitchWarning, setShowTabSwitchWarning] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Results State
  const [testResult, setTestResult] = useState(null);

  const activeQuestions = selectedTrack === 'technical' ? technicalQuestions : nonTechnicalQuestions;

  // Sync specialization options when track changes
  const handleTrackChange = (track) => {
    setSelectedTrack(track);
    setFormData((prev) => ({
      ...prev,
      specialization:
        track === 'technical' ? technicalSpecializations[0] : nonTechnicalSpecializations[0],
    }));
  };

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate Step 2 Form
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.college === 'Other College / University' && !formData.customCollege.trim()) {
      errors.customCollege = 'Please type your college name';
    }
    if (!formData.isAccurate) {
      errors.isAccurate = 'Please confirm that the information is accurate';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToReview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowReviewConfirm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartTest = () => {
    setShowReviewConfirm(false);
    setCurrentStep(3);
    setTimeRemaining(30 * 60);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Assessment Timer and Anti-Cheating Proctoring Listeners
  useEffect(() => {
    if (currentStep !== 3) return;

    // Countdown Timer
    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Tab Switch Detector (Anti-Cheat)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const nextCount = prev + 1;
          setShowTabSwitchWarning(true);
          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timerInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentStep]);

  // Format MM:SS for timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (questionId, optionIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  // Clear answer
  const handleClearAnswer = (questionId) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Toggle review bookmark
  const toggleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => {
      const copy = new Set(prev);
      if (copy.has(questionId)) {
        copy.delete(questionId);
      } else {
        copy.add(questionId);
      }
      return copy;
    });
  };

  // Calculate & Submit Assessment
  const handleSubmitAssessment = () => {
    setShowSubmitModal(false);

    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const totalQuestions = activeQuestions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const timeSpent = 30 * 60 - timeRemaining;
    const isShortlisted = percentage >= 60;

    setTestResult({
      score: correctCount,
      total: totalQuestions,
      percentage,
      timeSpent,
      isShortlisted,
      answeredCount: Object.keys(selectedAnswers).length,
      tabSwitchCount,
    });

    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="test-portal-wrapper">
      <div className="test-portal-container">
        {/* Top Hero Banner */}
        <div className="portal-hero">
          <div className="portal-badge-wrap">
            <GraduationCap size={16} />
            <span>Campus Drive Evaluation Portal</span>
          </div>
          <h1>Ready to prove your skills?</h1>
          <p>
            Complete your 30-minute assessment (30 questions) and get evaluated for exciting
            full-time and internship opportunities at Solitaire InfoTech.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <nav className="stepper-nav" aria-label="Assessment progress">
          <div
            className={`stepper-step ${currentStep === 1 ? 'active' : ''} ${
              currentStep > 1 ? 'completed' : ''
            }`}
          >
            <div className="stepper-circle">
              {currentStep > 1 ? <Check size={20} /> : '1'}
            </div>
            <span className="stepper-label">1. Track</span>
          </div>

          <div
            className={`stepper-line ${currentStep >= 2 ? 'filled' : ''}`}
            aria-hidden="true"
          />

          <div
            className={`stepper-step ${currentStep === 2 ? 'active' : ''} ${
              currentStep > 2 ? 'completed' : ''
            }`}
          >
            <div className="stepper-circle">
              {currentStep > 2 ? <Check size={20} /> : '2'}
            </div>
            <span className="stepper-label">2. Details</span>
          </div>

          <div
            className={`stepper-line ${currentStep >= 3 ? 'filled' : ''}`}
            aria-hidden="true"
          />

          <div
            className={`stepper-step ${currentStep === 3 ? 'active' : ''} ${
              currentStep > 3 ? 'completed' : ''
            }`}
          >
            <div className="stepper-circle">
              {currentStep > 3 ? <Check size={20} /> : '3'}
            </div>
            <span className="stepper-label">3. Test</span>
          </div>

          <div
            className={`stepper-line ${currentStep === 4 ? 'filled' : ''}`}
            aria-hidden="true"
          />

          <div className={`stepper-step ${currentStep === 4 ? 'active' : ''}`}>
            <div className="stepper-circle">
              <Award size={20} />
            </div>
            <span className="stepper-label">4. Result</span>
          </div>
        </nav>

        {/* =========================================================================
            STEP 1: Choose Your Assessment Track
            ========================================================================= */}
        {currentStep === 1 && (
          <div className="portal-card">
            <div className="step-card-header">
              <div className="step-title-wrap">
                <div className="step-icon-badge">
                  <Laptop size={24} />
                </div>
                <div>
                  <h2>Step 1: Choose Your Assessment Track</h2>
                  <p>Select the track that best matches your academic discipline and career goal</p>
                </div>
              </div>
            </div>

            <div className="tracks-grid">
              {/* Technical Track Card */}
              <div
                className={`track-card ${selectedTrack === 'technical' ? 'selected' : ''}`}
                onClick={() => handleTrackChange('technical')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleTrackChange('technical')}
              >
                <div className="track-card-top">
                  <span className="track-tag">CS / IT & TECH STREAMS</span>
                  <div className="track-check-indicator">
                    {selectedTrack === 'technical' ? <Check size={16} /> : <Circle size={16} />}
                  </div>
                </div>

                <div className="track-icon-title">
                  <div className="track-main-icon">
                    <Code2 size={24} />
                  </div>
                  <div className="track-title-block">
                    <h3>Technical Track</h3>
                    <span className="track-subtitle">MCQ + Live Machine Coding</span>
                  </div>
                </div>

                <p className="track-desc">
                  Evaluates programming knowledge, software stacks, algorithmic logic, and
                  practical code execution.
                </p>

                <ul className="track-features-list">
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Round 1: 30 Technical MCQs (30 mins)</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Round 2: Live Machine Coding Round</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>MERN, Python, AI/ML, Cybersecurity, Cloud, etc.</span>
                  </li>
                </ul>

                <div className="track-select-status">
                  {selectedTrack === 'technical' ? '● Selected Track' : '○ Click to Choose'}
                </div>
              </div>

              {/* Non-Technical Track Card */}
              <div
                className={`track-card ${selectedTrack === 'non-technical' ? 'selected' : ''}`}
                onClick={() => handleTrackChange('non-technical')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleTrackChange('non-technical')}
              >
                <div className="track-card-top">
                  <span className="track-tag">ALL STREAMS & NON-TECH</span>
                  <div className="track-check-indicator">
                    {selectedTrack === 'non-technical' ? <Check size={16} /> : <Circle size={16} />}
                  </div>
                </div>

                <div className="track-icon-title">
                  <div className="track-main-icon">
                    <Target size={24} />
                  </div>
                  <div className="track-title-block">
                    <h3>Non-Technical Track</h3>
                    <span className="track-subtitle">MCQ Assessment Only</span>
                  </div>
                </div>

                <p className="track-desc">
                  Evaluates quantitative reasoning, problem solving, professional communication, and
                  client scenarios.
                </p>

                <ul className="track-features-list">
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Round 1: 15 Aptitude & Reasoning MCQs</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Round 2: 15 Client Handling & Logic MCQs</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>No Machine Coding Round required</span>
                  </li>
                </ul>

                <div className="track-select-status">
                  {selectedTrack === 'non-technical' ? '● Selected Track' : '○ Click to Choose'}
                </div>
              </div>
            </div>

            <div className="portal-bottom-bar">
              <div className="active-track-info">
                <span>Active Track:</span>
                <span className="track-pill-active">
                  {selectedTrack === 'technical' ? '💻 Technical Track' : '🎯 Non-Technical Track'}
                </span>
                <span className="next-step-hint">Next: Enter Details</span>
              </div>

              <button
                type="button"
                className="btn-portal-primary"
                onClick={() => {
                  setCurrentStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Continue to Fill Details</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-bar">
              <div className="trust-badge-item">
                <ShieldCheck size={16} />
                <span>Secure Assessment</span>
              </div>
              <div className="trust-badge-item">
                <Zap size={16} />
                <span>Powered by Solitaire AI</span>
              </div>
              <div className="trust-badge-item">
                <Users size={16} />
                <span>Future Ready You</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: Candidate Details Form
            ========================================================================= */}
        {currentStep === 2 && !showReviewConfirm && (
          <div className="portal-card">
            <div className="step-card-header">
              <div className="step-title-wrap">
                <div className="step-icon-badge">
                  <FileText size={24} />
                </div>
                <div>
                  <h2>Your Details</h2>
                  <p>Step 2 of 4: Fill in your candidate information</p>
                </div>
              </div>

              <div className="track-change-tag">
                <span>
                  {selectedTrack === 'technical' ? '💻 Technical' : '🎯 Non-Technical'}
                </span>
                <button type="button" onClick={() => setCurrentStep(1)}>
                  Change
                </button>
              </div>
            </div>

            <form onSubmit={handleContinueToReview}>
              <div className="portal-form-grid">
                {/* Full Name */}
                <div className="portal-field-group full-span">
                  <label htmlFor="fullName" className="portal-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="portal-input"
                    placeholder="Enter your Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.fullName && (
                    <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="portal-field-group">
                  <label htmlFor="email" className="portal-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="portal-input"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && (
                    <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                      {formErrors.email}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="portal-field-group">
                  <label htmlFor="mobile" className="portal-label">
                    Mobile Number <span className="required-star">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    className="portal-input"
                    placeholder="Enter 10-digit Mobile No."
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.mobile && (
                    <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                      {formErrors.mobile}
                    </span>
                  )}
                </div>

                {/* College Select */}
                <div className="portal-field-group full-span">
                  <label htmlFor="college" className="portal-label">
                    Select Your College <span className="required-star">*</span>
                  </label>
                  <select
                    id="college"
                    name="college"
                    className="portal-select"
                    value={formData.college}
                    onChange={handleInputChange}
                  >
                    {collegesList.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom College Input if 'Other' */}
                {formData.college === 'Other College / University' && (
                  <div className="portal-field-group full-span">
                    <label htmlFor="customCollege" className="portal-label">
                      College Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="customCollege"
                      name="customCollege"
                      type="text"
                      className="portal-input"
                      placeholder="Type your College / Institute Name"
                      value={formData.customCollege}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.customCollege && (
                      <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                        {formErrors.customCollege}
                      </span>
                    )}
                  </div>
                )}

                {/* Stream / Degree */}
                <div className="portal-field-group">
                  <label htmlFor="stream" className="portal-label">
                    Stream / Degree <span className="required-star">*</span>
                  </label>
                  <select
                    id="stream"
                    name="stream"
                    className="portal-select"
                    value={formData.stream}
                    onChange={handleInputChange}
                  >
                    {streamsList.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div className="portal-field-group">
                  <label htmlFor="semester" className="portal-label">
                    Semester <span className="required-star">*</span>
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    className="portal-select"
                    value={formData.semester}
                    onChange={handleInputChange}
                  >
                    {semestersList.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Domain Specialization */}
                <div className="portal-field-group full-span">
                  <label htmlFor="specialization" className="portal-label">
                    Domain / Specialization <span className="required-star">*</span>
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    className="portal-select"
                    value={formData.specialization}
                    onChange={handleInputChange}
                  >
                    {(selectedTrack === 'technical'
                      ? technicalSpecializations
                      : nonTechnicalSpecializations
                    ).map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Accuracy Confirmation Checkbox */}
              <label className="portal-checkbox-label">
                <input
                  type="checkbox"
                  name="isAccurate"
                  className="portal-checkbox"
                  checked={formData.isAccurate}
                  onChange={handleInputChange}
                />
                <span>By continuing, you confirm that the information provided is accurate.</span>
              </label>
              {formErrors.isAccurate && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '16px' }}>
                  {formErrors.isAccurate}
                </div>
              )}

              <div className="portal-bottom-bar">
                <button
                  type="button"
                  className="btn-portal-secondary"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Track</span>
                </button>

                <button type="submit" className="btn-portal-primary">
                  <span>Continue to Assessment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 2.5: Review & Confirm Modal / Card View
            ========================================================================= */}
        {currentStep === 2 && showReviewConfirm && (
          <div className="portal-card">
            <div className="step-card-header">
              <div className="step-title-wrap">
                <div className="step-icon-badge" style={{ color: 'var(--cyan)' }}>
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2>Review & Confirm Your Details</h2>
                  <p>You have filled these details. Are these okay to proceed with the assessment?</p>
                </div>
              </div>
            </div>

            <div className="review-confirm-box">
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Selected Track</span>
                  <span className="review-value highlight-cyan">
                    {selectedTrack === 'technical'
                      ? '💻 TECHNICAL TRACK'
                      : '🎯 NON-TECHNICAL TRACK'}
                  </span>
                </div>

                <div className="review-item">
                  <span className="review-label">Candidate Name</span>
                  <span className="review-value">{formData.fullName}</span>
                </div>

                <div className="review-item">
                  <span className="review-label">Mobile Number</span>
                  <span className="review-value">{formData.mobile}</span>
                </div>

                <div className="review-item">
                  <span className="review-label">Email Address</span>
                  <span className="review-value">{formData.email}</span>
                </div>

                <div className="review-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="review-label">College / Institute</span>
                  <span className="review-value">
                    {formData.college === 'Other College / University'
                      ? formData.customCollege
                      : formData.college}
                  </span>
                </div>

                <div className="review-item">
                  <span className="review-label">Stream / Degree</span>
                  <span className="review-value">{formData.stream}</span>
                </div>

                <div className="review-item">
                  <span className="review-label">Semester</span>
                  <span className="review-value">{formData.semester}</span>
                </div>

                <div className="review-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="review-label">Domain Specialization</span>
                  <span className="review-value highlight-cyan">{formData.specialization}</span>
                </div>
              </div>

              {/* Amber Warning Banner */}
              <div className="review-warning-banner">
                <AlertTriangle size={24} />
                <div className="review-warning-text">
                  <h4>Once submitted, you cannot change this entry.</h4>
                  <p>
                    Please verify that all details above are correct. If you need to make changes,
                    click "Go Back & Correct". Once you start the test, your profile and track
                    selection will be permanently locked.
                  </p>
                </div>
              </div>

              {/* Info Chips */}
              <div className="review-meta-chips">
                <div className="meta-chip">
                  <Clock size={16} />
                  <span>30 Minutes (30 MCQs)</span>
                </div>
                <div className="meta-chip">
                  <AlertTriangle size={16} style={{ color: 'var(--amber)' }} />
                  <span>Proctored (Tab switches recorded)</span>
                </div>
              </div>
            </div>

            <div className="portal-bottom-bar">
              <button
                type="button"
                className="btn-portal-secondary"
                onClick={() => setShowReviewConfirm(false)}
              >
                <ArrowLeft size={16} />
                <span>Go Back & Correct</span>
              </button>

              <button
                type="button"
                className="btn-portal-primary"
                onClick={handleStartTest}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
                  boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
                }}
              >
                <span>Confirm & Proceed to Test</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: Live Assessment Interface (30-min Proctored Engine)
            ========================================================================= */}
        {currentStep === 3 && (
          <div className="portal-card">
            {/* Top Status & Timer Bar */}
            <div className="test-engine-header">
              <div className="test-candidate-brief">
                <div className="brief-avatar">
                  {formData.fullName.slice(0, 2).toUpperCase() || 'SI'}
                </div>
                <div className="brief-details">
                  <h3>{formData.fullName}</h3>
                  <p>
                    {selectedTrack === 'technical' ? '💻 Technical Track' : '🎯 Non-Technical Track'}{' '}
                    • {formData.specialization}
                  </p>
                </div>
              </div>

              <div
                className={`test-countdown-wrap ${
                  timeRemaining <= 300 ? 'warning-time' : ''
                }`}
              >
                <Clock size={20} />
                <span className="countdown-digits">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            {/* Assessment Layout */}
            <div className="test-layout-grid">
              {/* Question Area */}
              <div className="question-box">
                <div className="question-top-tag">
                  <span className="q-category">
                    {activeQuestions[currentQuestionIdx].category}
                  </span>
                  <span className="q-number-label">
                    Question {currentQuestionIdx + 1} of {activeQuestions.length}
                  </span>
                </div>

                <h3 className="question-text">
                  {activeQuestions[currentQuestionIdx].question}
                </h3>

                {activeQuestions[currentQuestionIdx].code && (
                  <pre className="code-snippet-box">
                    <code>{activeQuestions[currentQuestionIdx].code}</code>
                  </pre>
                )}

                {/* 4 Options */}
                <div className="options-list">
                  {activeQuestions[currentQuestionIdx].options.map((opt, optIdx) => {
                    const isSelected =
                      selectedAnswers[activeQuestions[currentQuestionIdx].id] === optIdx;
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`option-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() =>
                          handleSelectOption(activeQuestions[currentQuestionIdx].id, optIdx)
                        }
                      >
                        <div className="option-letter">{letters[optIdx]}</div>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="q-action-bar">
                  <div className="q-left-actions">
                    <button
                      type="button"
                      className="btn-portal-secondary"
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                    >
                      <ArrowLeft size={16} />
                      <span>Previous</span>
                    </button>

                    <button
                      type="button"
                      className="btn-portal-secondary"
                      onClick={() =>
                        toggleMarkForReview(activeQuestions[currentQuestionIdx].id)
                      }
                      style={{
                        borderColor: markedForReview.has(activeQuestions[currentQuestionIdx].id)
                          ? '#a855f7'
                          : undefined,
                        color: markedForReview.has(activeQuestions[currentQuestionIdx].id)
                          ? '#c084fc'
                          : undefined,
                      }}
                    >
                      <Bookmark size={16} />
                      <span>
                        {markedForReview.has(activeQuestions[currentQuestionIdx].id)
                          ? 'Marked'
                          : 'Review'}
                      </span>
                    </button>
                  </div>

                  <div className="q-right-actions">
                    <button
                      type="button"
                      className="btn-portal-secondary"
                      onClick={() =>
                        handleClearAnswer(activeQuestions[currentQuestionIdx].id)
                      }
                    >
                      <span>Clear</span>
                    </button>

                    {currentQuestionIdx < activeQuestions.length - 1 ? (
                      <button
                        type="button"
                        className="btn-portal-primary"
                        onClick={() =>
                          setCurrentQuestionIdx((p) =>
                            Math.min(activeQuestions.length - 1, p + 1)
                          )
                        }
                      >
                        <span>Save & Next</span>
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-submit-assessment"
                        onClick={() => setShowSubmitModal(true)}
                      >
                        <span>Submit Assessment</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Question Palette */}
              <div className="palette-card">
                <h4>Questions Overview</h4>

                <div className="palette-legend">
                  <div className="legend-item">
                    <div className="legend-dot dot-answered" />
                    <span>Answered ({Object.keys(selectedAnswers).length})</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot dot-review" />
                    <span>Review ({markedForReview.size})</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot dot-unvisited" />
                    <span>
                      Unvisited (
                      {activeQuestions.length - Object.keys(selectedAnswers).length}
                      )
                    </span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot dot-current" />
                    <span>Current</span>
                  </div>
                </div>

                <div className="palette-grid">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isReview = markedForReview.has(q.id);
                    const isCurrent = currentQuestionIdx === idx;

                    let btnClass = 'palette-btn';
                    if (isAnswered) btnClass += ' answered';
                    if (isReview) btnClass += ' review';
                    if (isCurrent) btnClass += ' current';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        className={btnClass}
                        onClick={() => setCurrentQuestionIdx(idx)}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="btn-submit-assessment"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit Test Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SUBMIT CONFIRMATION MODAL
            ========================================================================= */}
        {showSubmitModal && (
          <div className="portal-modal-overlay">
            <div className="portal-modal-box">
              <div className="modal-icon-wrap confirm">
                <Send size={32} />
              </div>
              <h3>Submit Assessment?</h3>
              <p>
                You have answered{' '}
                <strong>
                  {Object.keys(selectedAnswers).length} of {activeQuestions.length}
                </strong>{' '}
                questions.
                {activeQuestions.length - Object.keys(selectedAnswers).length > 0 && (
                  <span>
                    {' '}
                    You still have{' '}
                    {activeQuestions.length - Object.keys(selectedAnswers).length}{' '}
                    unanswered questions.
                  </span>
                )}
                <br />
                Are you ready to submit your test for evaluation?
              </p>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-portal-secondary"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Return to Test
                </button>
                <button
                  type="button"
                  className="btn-portal-primary"
                  onClick={handleSubmitAssessment}
                >
                  Yes, Submit Test
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ANTI-CHEAT TAB SWITCH WARNING MODAL
            ========================================================================= */}
        {showTabSwitchWarning && (
          <div className="portal-modal-overlay">
            <div className="portal-modal-box">
              <div className="modal-icon-wrap warning">
                <AlertTriangle size={32} />
              </div>
              <h3>Proctoring Alert: Tab Switch Detected!</h3>
              <p>
                You switched away from the assessment window ({tabSwitchCount} attempt
                {tabSwitchCount > 1 ? 's' : ''} recorded).
                <br />
                Our automated proctoring records all tab switches and window blur events.
                Repeated attempts may invalidate your campus drive evaluation.
              </p>

              <button
                type="button"
                className="btn-portal-primary"
                onClick={() => setShowTabSwitchWarning(false)}
              >
                I Understand & Continue Test
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: Result / Scorecard
            ========================================================================= */}
        {currentStep === 4 && testResult && (
          <div className="portal-card">
            <div className="result-celebration-card">
              <div className="result-trophy-badge">
                <Award size={40} />
              </div>
              <h2>Assessment Completed!</h2>
              <div className="candidate-welcome-result">
                Great effort, {formData.fullName}!
              </div>

              <div className="status-callout-pill">
                <CheckCircle2 size={20} />
                <span>
                  {testResult.isShortlisted
                    ? '🎉 Evaluation Recorded: Recommended for Round 2 (Machine Coding & Interview)'
                    : 'Evaluation Submitted Successfully'}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="scorecard-stats-grid">
                <div className="stat-metric-card accent-cyan">
                  <div className="stat-val">
                    {testResult.score}/{testResult.total}
                  </div>
                  <div className="stat-name">Score (MCQs)</div>
                </div>

                <div className="stat-metric-card accent-pink">
                  <div className="stat-val">{testResult.percentage}%</div>
                  <div className="stat-name">Percentage</div>
                </div>

                <div className="stat-metric-card accent-green">
                  <div className="stat-val">
                    {Math.round(
                      (testResult.score / Math.max(1, testResult.answeredCount)) * 100
                    )}
                    %
                  </div>
                  <div className="stat-name">Accuracy</div>
                </div>

                <div className="stat-metric-card">
                  <div className="stat-val">{formatTime(testResult.timeSpent)}</div>
                  <div className="stat-name">Time Taken</div>
                </div>
              </div>

              {/* Next Steps Information Panel */}
              <div className="next-steps-panel">
                <h3>
                  <GraduationCap size={20} />
                  <span>Next Steps & Campus Drive Protocol</span>
                </h3>
                <ol>
                  <li>
                    <strong>Submission Logged:</strong> Your test answers and proctoring log have
                    been securely recorded under candidate ID{' '}
                    <code style={{ color: 'var(--cyan)' }}>
                      SI-{Math.floor(100000 + Math.random() * 900000)}
                    </code>
                    .
                  </li>
                  <li>
                    <strong>Evaluation & Interview Slot:</strong> Our Talent Acquisition and
                    Technical Evaluation team will review your profile with{' '}
                    <strong>{formData.college}</strong>.
                  </li>
                  <li>
                    <strong>Direct Communication:</strong> You will receive an official email at{' '}
                    <strong>{formData.email}</strong> or a phone call on{' '}
                    <strong>{formData.mobile}</strong> within 24–48 hours regarding Round 2.
                  </li>
                </ol>
              </div>

              <div className="result-cta-row">
                <button
                  type="button"
                  className="btn-portal-secondary"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Print Scorecard</span>
                </button>

                <button
                  type="button"
                  className="btn-portal-primary"
                  onClick={() => onNavigate && onNavigate('#home')}
                >
                  <Home size={16} />
                  <span>Back to Solitaire Home</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
