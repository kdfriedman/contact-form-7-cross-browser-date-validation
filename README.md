# contact-form-7-cross-browser-date-validation
Contact Form 7 Cross Browser Date Validation For Wordpress
Used in conjunction with Chimpmail extension by Renzo Johnson which is a plugin for passing form data directy to Mailchimp from CF7. 

HTML5's native input type='date' isn't supported universally across all browsers.  WordPress's Contact Form 7 plugin has not addressed this issue for a complete solution.

Here is a vanilla ES5 JS solution that leverages input type='text' instead but validates for a RegEx date format: 

```Javascript 
const regexForDateInput = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
//example date input
const dateInput = '01/01/1999'

console.log(regexForDateInput.test(dateInput));
// expected output: true
```
Additionally, this snippet will pass the input text value into a new Date object in js, validate as a date, and bind the values to hidden inputs for further customization if need be.

