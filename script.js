document.addEventListener('DOMContentLoaded', () => {
    // Helper function to get elements
    const getEl = (id) => document.getElementById(id);

    // --- 1. Event Handling 🎈 ---
    const clickBtn = getEl('clickBtn');
    const clickResult = getEl('clickResult');
    clickBtn.addEventListener('click', () => {
        clickResult.textContent = 'Result: You have Clicked the button! ✅';

    });

    const hoverDiv = getEl('hoverDiv');
    const hoverResult = getEl('hoverResult');
    hoverDiv.addEventListener('mouseover', () => {
        hoverResult.textContent = 'Result: Mouse Over! ✅';
        hoverDiv.classList.add('hovered');
    });
    hoverDiv.addEventListener('mouseout', () => {
        hoverResult.textContent = 'Result: Mouse Out! ✅';
        hoverDiv.classList.remove('hovered');
    });

    const keyInput = getEl('keyInput');
    const keyResult = getEl('keyResult');
    keyInput.addEventListener('keyup', (event) => {
        keyResult.textContent = `Last key pressed: ${event.key} ✅ (Code: ${event.code})`;
    });

    

    // Bonus: Secret action for double-click or long press 🤫
    const secretActionBtn = getEl('secretActionBtn');
    const secretActionResult = getEl('secretActionResult');
    let pressTimer;
    let isLongPress = false;

    secretActionBtn.addEventListener('click', () => {
        if (!isLongPress) {
            secretActionResult.textContent = 'Secret Action: Single Click! 🤔';
        }
    });
    secretActionBtn.addEventListener('dblclick', () => {
        secretActionResult.textContent = 'Secret Action: Double Click! 🎉 You found it!';
        isLongPress = false; // Reset long press if dblclick occurs
        clearTimeout(pressTimer);
    });
    secretActionBtn.addEventListener('mousedown', () => {
        isLongPress = false; // Reset flag
        pressTimer = window.setTimeout(() => {
            secretActionResult.textContent = 'Secret Action: Long Press! 🎈 Super Secret!';
            isLongPress = true;
        }, 1000); // 1 second for long press
    });
    secretActionBtn.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    secretActionBtn.addEventListener('mouseleave', () => { // Also clear if mouse leaves button
        clearTimeout(pressTimer);
    });


    // --- 2. Interactive Elements 🎮 ---
    const changeBtn = getEl('changeBtn');
    changeBtn.addEventListener('click', () => {
        changeBtn.classList.toggle('toggled');
        if (changeBtn.classList.contains('toggled')) {
            changeBtn.textContent = "I'm Green Now!";
        } else {
            changeBtn.textContent = "I'm Blue!";
        }
    });

    // Image Gallery
    const galleryImage = getEl('galleryImage');
    const prevBtn = getEl('prevBtn');
    const nextBtn = getEl('nextBtn');
    const images = [
        'https://picsum.photos/id/10/300/200',
        'https://picsum.photos/id/20/300/200',
        'https://picsum.photos/id/30/300/200',
        'https://picsum.photos/id/40/300/200',
        'https://picsum.photos/id/50/300/200'
    ];
    let currentImageIndex = 0;

    function updateGalleryImage() {
        galleryImage.style.opacity = 0; // Start fade out
        setTimeout(() => {
            galleryImage.src = images[currentImageIndex];
            galleryImage.alt = `Gallery Image ${currentImageIndex + 1}`;
            galleryImage.style.opacity = 1; // Fade in
        }, 300); // Match CSS transition duration for smoother effect
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
   
    const animatedBox = getEl('animatedBox');
    animatedBox.addEventListener('click', () => {
        animatedBox.style.transform = 'scale(0.8) rotate(-15deg)';
        setTimeout(() => {
            animatedBox.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });


    // --- 3. Form Validation 📋 ---
    const myForm = getEl('myForm');
    const fullNameInput = getEl('fullName');
    const emailInput = getEl('email');
    const passwordInput = getEl('password');
    const confirmPasswordInput = getEl('confirmPassword');
    const formStatus = getEl('formStatus');

    // Helper to show/hide error messages
    function showError(inputElement, messageElementId, message) {
        const errorElement = getEl(messageElementId);
        errorElement.textContent = message;
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
    }

    function clearError(inputElement, messageElementId) {
        const errorElement = getEl(messageElementId);
        errorElement.textContent = '';
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    }
    
    function validateField(inputElement, errorId, validationFn, errorMessage) {
        if (!validationFn(inputElement.value.trim())) {
            showError(inputElement, errorId, errorMessage);
            return false;
        }
        clearError(inputElement, errorId);
        return true;
    }

    // Validation functions
    const validateRequired = (value) => value !== '';
    const validateEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePasswordRules = (password) => {
        // Min 8 chars, 1 uppercase, 1 number
        const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passRegex.test(password);
    };

    // Real-time validation
    fullNameInput.addEventListener('input', () => validateField(fullNameInput, 'fullNameError', validateRequired, 'Full name is required.'));
    emailInput.addEventListener('input', () => validateField(emailInput, 'emailError', validateEmailFormat, 'Invalid email format.'));
    passwordInput.addEventListener('input', () => validateField(passwordInput, 'passwordError', validatePasswordRules, 'Password needs min 8 chars, 1 uppercase, 1 number.'));
    
    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match.');
            return false;
        }
        clearError(confirmPasswordInput, 'confirmPasswordError');
        return true;
    });


    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission
        formStatus.textContent = '';
        formStatus.className = '';

        let isFormValid = true;

        if (!validateField(fullNameInput, 'fullNameError', validateRequired, 'Full name is required.')) isFormValid = false;
        if (!validateField(emailInput, 'emailError', validateEmailFormat, 'Invalid email format.')) isFormValid = false;
        if (!validateField(passwordInput, 'passwordError', validatePasswordRules, 'Password needs min 8 chars, 1 uppercase, 1 number.')) isFormValid = false;
        
        // Confirm password validation on submit
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match.');
            isFormValid = false;
        } else if (confirmPasswordInput.value === '' && passwordInput.value !== '') {
            // If password is set, confirm password must not be empty
            showError(confirmPasswordInput, 'confirmPasswordError', 'Please confirm your password.');
            isFormValid = false;
        } else if (confirmPasswordInput.value !== '' || passwordInput.value === '') {
             // if confirm password has text (and matches or password is empty), it's okay
             if(confirmPasswordInput.value === passwordInput.value) {
                 clearError(confirmPasswordInput, 'confirmPasswordError');
             }
        }


        if (isFormValid) {
            formStatus.textContent = 'Form Submitted Successfully! 🎉';
            formStatus.classList.add('success');
            // Here you would typically send data to a server
            // myForm.reset(); // Optionally reset the form
            // Clear valid classes after successful submission for a fresh start
            [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => input.classList.remove('valid'));

        } else {
            formStatus.textContent = 'Please correct the errors above. 📋';
            formStatus.classList.add('error');
        }
    });
});
