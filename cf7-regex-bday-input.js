(function() {
        
        // code expands upon Contact Form 7's native form validation.  
        // Adding date validation creates a more robust solution for WP forms.
         
        // declare all variables
        var formInputs = undefined;
        var bdayInputElem = undefined;
        var nameInputElem = undefined;
        var emailInputElem = undefined;
        var submitBtnElem = undefined;
        var formLoaderElem = undefined;
        var formElem = undefined;
        var responseBdayOutputNotValidElem = undefined;
        
        // RegEx validation to fit pattern xx/xx/xxxx
        var dateValidationRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        
        var nameInputElemValue = undefined;
        var emailInputElemValue = undefined;
        var bdayInputElemValue = undefined;
        var ageValidationMonthHiddenElem = undefined;
        var ageValidationYearHiddenElem = undefined;
        var ageValidationDayHiddenElem = undefined;
              

        function init() {
            // hidden inputs to store final values that will be bound based on text input
            ageValidationMonthHiddenElem = document.querySelectorAll('.wpcf7-hidden')[1];
            ageValidationYearHiddenElem = document.querySelectorAll('.wpcf7-hidden')[2];
            ageValidationDayHiddenElem = document.querySelectorAll('.wpcf7-hidden')[3];
            
            formElem = document.querySelector('.wpcf7-form');
            formInputs = document.querySelectorAll('.wpcf7-text');
            bdayInputElem = formInputs[2];
            emailInputElem = formInputs[1];
            nameInputElem = formInputs[0];                        
            submitBtnElem = document.querySelector('.wpcf7-submit');
            
            // setting text input placeholder to represent type='date'
            bdayInputElem.setAttribute('placeholder', 'mm/dd/yyyy');
            bootstrapEventListeners();
        }

        function bootstrapEventListeners() {
            // when user enters input, handle hidden date values
            bdayInputElem.addEventListener('input', function(e) {
                handleHiddenDateInputValues(e);
            });

            // when user submits btn, handle validation on text input 
            submitBtnElem.addEventListener('click', function(e) {
                handleSubmitClick(e);
            });
        }

        function handleSubmitClick(e) {
            // validating other inputs using trim to negate empty space
            nameInputElemValue = nameInputElem.value.trim();
            emailInputElemValue = emailInputElem.value.trim();
            bdayInputElemValue = bdayInputElem.value.trim();  

            // run check 1 to see if inputs exist, if any inputs are empty, and if the text input passes our RegEx test
            if ((nameInputElemValue !== '' && emailInputElemValue !== '') 
            && (bdayInputElemValue === '' || !dateValidationRegex.test(bdayInputElemValue) || !validateDate(bdayInputElemValue))) {
                console.log('value empty or regex failed');
                e.stopPropagation();
                e.preventDefault();
                validateDateInput();

            } else {
                renderValidationInfo();
            }
        }

        function validateDateInput() {
            // native Cf7 spinner element
            formLoaderElem = document.querySelector('.wpex-wpcf7-loader');
            if(!formLoaderElem) {
                return false;
            }
            resetValidationStyles();            
            formLoaderElem.style.display = 'none';    
            bdayInputElem.classList.toggle('wpcf7-not-valid');
            handleResponseBdayOutputNotValid();            
        } 

        function renderValidationInfo() {
            // if input failed validation check and response is being seen, do not show again
            if(responseBdayOutputNotValidElem) {
                responseBdayOutputNotValidElem.style.display = 'none'; 
            }

            if(formLoaderElem){
                if(nameInputElemValue === '' && emailInputElemValue === '' && bdayInputElemValue === ''){
                    return false;
                }                        
                formLoaderElem.removeAttribute('style');                        
            }
        }

        // validate input as legal JS Date object
        function validateDate(elemValue) {
            try {
                var date = new Date(elemValue);
                return true;
            } catch { 
                return false;
            }
        }

        function handleHiddenDateInputValues(e) {
            // when handler runs, if validation fails, do not bind to values of hidden inputs.
            bdayInputElemValue = bdayInputElem.value.trim();  
            if (bdayInputElemValue === '' || !dateValidationRegex.test(bdayInputElemValue) || !validateDate(bdayInputElemValue)) {
                ageValidationMonthHiddenElem.value = '';
                ageValidationYearHiddenElem.value = '';
                ageValidationDayHiddenElem.value = '';
                console.log('regix fails test');
                return false;

            }
            console.log('regix passes');
            var date = new Date(bdayInputElemValue);            
            var month = date.getUTCMonth(),
                year = date.getUTCFullYear(),
                day = date.getUTCDate();
            ageValidationMonthHiddenElem.value = (month + 1).toString();
            ageValidationYearHiddenElem.value = year.toString();
            ageValidationDayHiddenElem.value = day.toString();
        }

        function resetValidationStyles() {
            // reset validation responses after each attempt
            bdayInputElem.classList.remove('wpcf7-not-valid');
            formInputs[0].classList.remove('wpcf7-not-valid');
            formInputs[1].classList.remove('wpcf7-not-valid');
        }

        function handleResponseBdayOutputNotValid() {
            if(responseBdayOutputNotValidElem) {
                return false;
            }
            responseBdayOutputNotValidElem = document.createElement('div');
            responseBdayOutputNotValidElem.style.display = 'block';
            responseBdayOutputNotValidElem.classList.add('wpcf7-validation-errors', 'wpcf7-acceptance-missing');
            responseBdayOutputNotValidElem.innerHTML = 'You\'ve entered incorrect "Birth Date" formatting. Please use "mm/dd/yyyy" and try again.';
            formElem.appendChild(responseBdayOutputNotValidElem);
        }          

        init();
})();
