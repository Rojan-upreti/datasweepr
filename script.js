// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and steps
document.querySelectorAll('.feature-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Modal functionality
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const closeBtns = document.querySelectorAll('.close');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const loginSubmitText = document.getElementById('loginSubmitText');
const loginSubmitLoading = document.getElementById('loginSubmitLoading');

// Step management
let currentStep = 1;
const totalSteps = 3;

// Open signup modal when clicking Get Started buttons or Sign Up nav button
document.querySelectorAll('.btn-primary, .nav-btn-signup').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Open login modal when clicking Login nav button
document.querySelectorAll('.nav-btn-login').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Switch between modals
document.getElementById('loginLink').addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

document.getElementById('signupLink').addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

// Close modal when clicking X
closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        signupModal.style.display = 'none';
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
        resetLoginForm();
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    }
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetLoginForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (signupModal.style.display === 'block') {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        }
        if (loginModal.style.display === 'block') {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetLoginForm();
        }
    }
});

// Step navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });

    // Update progress line
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.querySelector('.step-line-fill').style.width = progress + '%';

    // Show/hide form steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === currentStep) {
            step.classList.add('active');
        }
    });
}

// Form validation and submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Account created successfully! Welcome to DataSweepr. You will receive a confirmation email shortly.');
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
            
            // Reset button state
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }, 2000);
    }
});

// Login form handling
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateLoginForm()) {
        // Show loading state
        loginSubmitBtn.disabled = true;
        loginSubmitText.style.display = 'none';
        loginSubmitLoading.style.display = 'inline';
        
        // Simulate login (replace with actual API call)
        setTimeout(() => {
            alert('Login successful! Welcome back to DataSweepr.');
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetLoginForm();
            
            // Reset button state
            loginSubmitBtn.disabled = false;
            loginSubmitText.style.display = 'inline';
            loginSubmitLoading.style.display = 'none';
        }, 2000);
    }
});

// Password toggle functions
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleBtn = confirmPasswordInput.nextElementSibling;
    
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        confirmPasswordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function toggleLoginPassword() {
    const loginPasswordInput = document.getElementById('loginPassword');
    const toggleBtn = loginPasswordInput.nextElementSibling;
    
    if (loginPasswordInput.type === 'password') {
        loginPasswordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        loginPasswordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Step validation
function validateCurrentStep() {
    let isValid = true;
    
    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });

    if (currentStep === 1) {
        // Validate Step 1: Personal Information
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            showError('firstNameError', 'First name is required');
            isValid = false;
        } else if (firstName.length < 2) {
            showError('firstNameError', 'First name must be at least 2 characters');
            isValid = false;
        }

        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            showError('lastNameError', 'Last name is required');
            isValid = false;
        } else if (lastName.length < 2) {
            showError('lastNameError', 'Last name must be at least 2 characters');
            isValid = false;
        }

        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
    } else if (currentStep === 2) {
        // Validate Step 2: Contact Information
        const phone = document.getElementById('phone').value.trim();
        
        if (!phone) {
            showError('phoneError', 'Phone number is required');
            isValid = false;
        } else if (phone.length < 10) {
            showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }

        const country = document.getElementById('country').value;
        if (!country) {
            showError('countryError', 'Please select your country');
            isValid = false;
        }
    } else if (currentStep === 3) {
        // Validate Step 3: Security Setup
        const password = document.getElementById('password').value;
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters long');
            isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            showError('passwordError', 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
            isValid = false;
        }

        const confirmPassword = document.getElementById('confirmPassword').value;
        if (!confirmPassword) {
            showError('confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
    }

    return isValid;
}

// Complete form validation (for final submission)
function validateForm() {
    let isValid = true;
    
    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });

    // Validate First Name
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate Last Name
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    
    if (!phone) {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (phone.length < 10) {
        showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
        isValid = false;
    }

    // Validate Country
    const country = document.getElementById('country').value;
    if (!country) {
        showError('countryError', 'Please select your country');
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById('password').value;
    if (!password) {
        showError('passwordError', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters long');
        isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showError('passwordError', 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
    }

    // Validate Confirm Password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetForm() {
    signupForm.reset();
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    submitBtn.disabled = false;
    submitText.style.display = 'inline';
    submitLoading.style.display = 'none';
    
    // Reset step display
    currentStep = 1;
    updateStepDisplay();
}

function resetLoginForm() {
    loginForm.reset();
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    loginSubmitBtn.disabled = false;
    loginSubmitText.style.display = 'inline';
    loginSubmitLoading.style.display = 'none';
}

function validateLoginForm() {
    let isValid = true;
    
    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });

    // Validate Email
    const email = document.getElementById('loginEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById('loginPassword').value;
    if (!password) {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    }

    return isValid;
} 