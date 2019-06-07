# contact-form-7-cross-browser-date-validation
Contact Form 7 Cross Browser Date Validation For Wordpress

HTML5's native input type='date' isn't supported universally across all browsers.  WordPress's Contact Form 7 form bulider has not addressed this issue for a complete solution.

Here is a vanilla JS solution that leverages input type='text' instead but validates for RegEx date format 'xx/xx/xxxx'.

Additionally, this snippet will pass the input text value into a new Date object in js, validate as a date, and bind the values to hidden inputs that will be sent with the form submission.
