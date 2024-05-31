
# Dynamic Forms Library.

## Installation & Setup.

1. Navigate to the angular workspace.

2. use the following commands to install the packages 
<code>npm install json-form-html</code> or <code>npm install json-form-mat</code> 

3. In your <code>app.module.ts</code> file, 
use <code> import { JsonFormHtmlModule } from  'json-form-html';</code>  or 
<code> import { JsonFormMatModule } from  'json-form-mat';</code> and 
add it to imports as well.





## Using the library.

You can now use the library to generate forms from an input JSON file located anywhere. To create a form, navigate to the component which needs the form and continue with the following steps.

In the component.ts file,

<code>import { HttpClient } from  '@angular/common/http'; <br>
import { JsonFormData } from  "json-form-html"; </code>
or
<code>import { JsonFormData } from  "json-form-mat";</code>

Add http: HttpClient into the constructor.

<code>constructor(private http: HttpClient) {}</code>

Create a variable called <code>Validators : any = {} ;</code> . This is to hold your custom validators for the various form fields. Refer to the section on Validators for more.

Create a variable called inputJSON of type any which is going to hold our raw JSON input. You can populate the JSON directly or get it from a file using http request or follow any method.

NOTE - If we wish to use the http get method, following steps should be followed.

Within our <code>ngOnInit()</code> function, paste the following snippet. Make sure to change relativePathToJSONFile to a valid path. E.g., <code>‘/assets/jsonfilename.json’</code>

<code>
 this.http.get('relativePathToJSONFile’)<br>.subscribe((inputJSON: any) => {<br>this.inputJSON = inputJSON;<br>});</code><br><br>
In your component.html file, simply call the DynamicForms component as below with the appropriate attributes.


```<json-form-html  (allEvents)="eventDetector($event)"  [customValidators]="Validators"  [jsonFormData]="formData"></lib-json-form-html>```

or

```<json-form-mat  (allEvents)="eventDetector($event)"  [customValidators]="Validators"  [jsonFormData]="formData"></lib-json-form-mat>```

NOTE –The appropriate functions which have been called within the “” should be defined in your component.ts file. Please refer to the section on DV Specific Solutions for DV migration.

Once you have your JSON structure and Validators in place, your form should be appropriately rendered with the angular material components.

Let’s have a look at how to write the JSON input.

Input JSON.

The structure of the JSON is the core of the dynamic forms library.

This is how the JSON file should look.
```
{

controls : \[

{ formElement/SubGroup/ExpansionBox/button},

{ formElement/SubGroup/ExpansionBox/button},

{ formElement/SubGroup/ExpansionBox/button},

…

\]

}
```

For a full input/output demonstration, see here.

Each object inside controls can be a form element, a button, a subgroup, or elements inside an expansion box(which are subgrouped as well). This is determined by “formName” key which is present in each object.

A form element is one of the following HTML5 form input types – 'text', 'password', 'email', 'number',  'search', 'tel', 'url', 'time', ‘date’ , ‘checkbox’, ‘radio’ , ‘dropdown’ (select/multiselect), ‘file’ and ‘textarea’.

A subgroup can contain a collection of form elements but not another subgroup or expansion box. An expansion box is a way of wrapping subgroups with the mat-expansion-box element.

Buttons and their bindings are discussed here.

## Form Element Guide

Form Elements *'text', 'password', 'email', 'number',  'search', 'tel', 'url' and 'time'* can be specified as per the below format.

#### 'text', 'password', 'email', 'number',  'search', 'tel', 'url' and 'time'
```
{

      "formName": "formElement",

      "ctrl_name": "text", //creates a form control of the given name

      "label": "text test", // sets the label of the element

      "value": "texttest", // sets the value of the element

      "type": "text", //Creates a field of given type.

      "class": "text", //sets the overall css class of the div outside element

      "options": {

        "required": true, //whether the form field is required or not

        "placeholder": "text", //sets the place holder property of the element

        "id": "text", //sets the id of the element

        "name": "text", //sets the name property of the element

        "class": "text", //css class of the element.

        "appearance": "outline", //sets the material appearance. Can be outline // or fill

        "maxlength": "12", //sets maxlength property of the element.

        "minlength": "12", //sets minlength property of the element.

        "style": ""

      },

      "validators": {

        "custom": "permIDValidator"

      } //covered in the section on validators.

    }
```
Any option can be omitted but it must be passed as an empty object if all options are omitted. Same applies to validators.

NOTE - The type “file” is also supported. The parent component has to handle file logic as only a path to the file will be specified.





#### ‘checkbox’
```
{

      "formName": "formElement",

      "ctrl_name": "checkbox",

      "label": "checkbox test",

      "type": "checkbox",

      "value": "abc",

      "options": {

        "checked":true,

        "title": "checkbox test",

        "id": "checkbox",

        "style": "",

        "class": "checkbox"

      },

      "validators": {}

},
```




#### ‘radio’
```
{

      "formName": "formElement",

      "ctrl_name": "radio",

      "type": "radio",

      "label": "radio test",

      "values": \["a", "b"\],

      "options": {

        "id": "radio",

        "class": "radio"

      },

      "validators": {}

    },
```




#### ‘datepicker’
```
{

      "formName": "formElement",

      "ctrl_name": "datepicker",

      "type": "date",

      "validators": {},

      "options": {

        "id": "date",

        "max": "2034-08-23",

        "min": "today"

      }

    },
```





#### ‘select’/’multiselect’/’dropdown’
```
{

      "formName": "formElement",

      "ctrl_name": "dropdown",

      "type": "dropdown",

      "values": \[{ "key": "a" }, { "key": "b" }\],

      "validators": {},

      "options": {

        "style": "",

        "id": "dropdown",

        "multiple": false

      }

    },
```





#### ‘textarea’
```
{

      "formName": "formElement",

      "ctrl_name": "textarea",

      "type": "textarea",

      "value": "value",

      "validators": {},

      "options": {

        "id": "textarea",

        "title": "texttitle",

        "placeholder": "placeholder",

        "maxlength": "32",

        "minlength": "22",

        "style": "outline",

        "class": "textarea"

      }

    }
```




### Fields
| Field Name | Description | Supported By |
|----------|----------|----------|
| checked    | Checkbox is initially true if marked.   | Checkbox   |
| id   | ID property of the html element if given inside options, else id property of the div wrapping the element.   | All   |
| class | Specifies one or more class names for an element. Refers to the elements class if given inside options, else refers to the div wrapping the element. | All |
| style | Specifies an inline style for an element. | All |
| title | A tooltip text for the element. | All |
| max | Specify a maximum value. In case of a date, specify as ‘YYYY-MM-DD’. Use the value ‘today’ to set the current date as maximum. | Date, Numerical |
| min | Specify a minimum value. In case of a date, specify as ‘YYYY-MM-DD’. Use the value ‘today’ to set the current date as minimum. | Date, Numerical |
| multiple | Allows a dropdown/select menu to be a multi-select. | Dropdown |
| placeholder | Specifies a short hint that describes the expected value of the input field. | All input fields |
| value | Default value to be sent to the server on submitting the form. | All |
| values | Defines the list of options that should be part of a radio-group or a multi-select. | Radio/Select/Multi-select |
| appearance | Defines the appearance of the angular material element. Can be outline/fill. | Refer to Angular Material documentation. |
| label | Label given to the form field. | All |
| autocomplete | Autocomplete allows the browser to predict the value. When a user starts to type in a field, the browser should display options to fill in the field, based on earlier typed values. Can be “on” or “off”. | text, search, url, tel, email, password and date |
| autofocus | Determines whether the element should be focused on page load.| All |
| accept | Specifies a filter for what file types the user can pick from the file input dialog box. | Files. |




### Expansion Box

Angular material-expansion-box.

Specified by setting the *“formName”* attribute to *“expansionPanel”* and the *“type”* attribute to *"expansion”*.

Sample Code.

By default, all the elements within an expansion box are taken to be a subgroup. Let’s take an example of an expansion box that corresponds to “Address”. The Address element is composed of “Door Number”, “Street”, “City”, “Pin code”, “State” and “Country”. If specified with an expansion box, it will appear as follows in the submitted form.
```
Address : {

Door Number: “”,

Street : “”,

City : “”,

Pin Code : “ “,

State : “”,

Country : “”

}
```
**Collapsed -**

**Expanded –**

A screenshot of a computer

Description automatically generated





### Subgroups

No specific layout. Like expansion box but without the material-expansion-box wrapper. Group any set of form controls together. Let’s take the example of a “Name” subgroup.

“Name” should contain “First Name” and “Last Name”.
```
Name : {

First Name: “”,

Last Name: “”

}
```




### Buttons

Specified by giving the “formName” as “button”, different types of buttons and links are supported. Note that this is only supported in the **material component**.
```
buttonStroked

buttonFlat

buttonSimple

buttonRaised

link

linkRaised

linkStroked

linkFlat
```
**Sample JSON:** 
```
{

      "formName": "button",

      "buttonName": "buttonRaised",

      "buttonType": "button",

      "label": "Test",

      "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4 new",

      "options": {

        "color": "primary",

        "link": "<https://www.google.com/search?q=call+event+emiter+on+button+click+with+the+event+data&oq=call+event+emiter+on+button+click+with+the+event+data&aqs=edge..69i57j0i546i649j0i546.10444j0j1&sourceid=chrome&ie=UTF-8>",

        "operation": "test()",

        "class": "btn btn-primary new",

        "disableRipple" : true,

        "disabled" : false

      }

    },
```

For links, you can specify the link. For buttons, specifying link will have no effect.





### Event Handling

All the below events are emitted to the user’s component. The user gets an event object and can write their own function to execute when the event occurs. This works because in our component’s html, while calling the dynamic form component, we have an attribute called “onEvent” which is mapped to a function called eventDetector in our component’s typescript file. You can define the function with any name but don’t forget to update that name while calling the form.
```
(click),

(dblclick),

(blur)

(focus)

(scroll)

(cut)

(copy) (paste)

(keyup)

(keypress)

(keydown)

(mouseup),

(mousedown),

(mouseenter),

(drag),

(drop),

(dragover)

(submit)
```
In the component.ts file, you can handle the event as follows.
```
 eventDetector(event:any){

    //do something

  }
```
To receive the events of a specific form element, add the attribute “operation” with any value to the “options” attribute of the element.

To monitor form changes, please use the “changes” attribute under “options” as specified here. (Add working form changes example code snippet).

### Interaction of form fields

We can show or hide a form field based on the value of another formfield.

Let’s call the form field that we want to hide as child and the formfield based on whose value we want to hide as parent. Now, we need to add an attribute called “master” with the value of the parent controls control name in order to hide or show the child.
```
{

          "formName": "formElement",

          "ctrl_name": "testTime",

          "label": "Audit Information Time",

          "value": "",

          "type": "time",

          "master": "auditInfo", //auditInfo is the parent of testTime

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "options": {

            "placeholder": "Audit Information Time",

            "id": "auditInfoTime",

            "name": "auditInfoTime",

            "class": "",

            "disabled": true,

            "appearance": "outline"

          },

          "validators": {}

        }
```
To enable or disable form fields, we need to use the dynamic attribute. Enter the list of controls that you’d like to disable within an attribute called “dynamic”.
```
{

  "formName": "formElement",

  "ctrl_name": "auditInfo",

  "label": "Include Audit Information",

  "value": false,

  "type": "checkbox",

  "class": "col-xs-10 fix-height col-sm-10 col-md-10 col-lg-10 audInfo next",

  "options": {

      "placeholder": "Audit Information",

      "id": "auditInfo",

      "name": "auditInfo",

      "dynamic": \[

          {"ctrl":"auditInfoDate"}

          {"ctrl":"auditInfoTime"}

      \],

      "changes": true,

  },

  "validators": \[\]

}
```
The *formfields* with control name *auditInfoDate* and *auditInfoTime* are controlled by *auditInfo*’s value. Make sure to give the attribute changes as specified above.




### Validators

You can choose to write your own validator functions, or you can use some of Angular's built-in validators. All angular built-in validators are supported except for compose and composeAsync. To implement these validators, you can choose to use custom validators. For a more detailed overview please visit the official angular documentation.

**Form.json**
```
"validators": {

          "custom": "permIDValidator",

          "max" : "100",

          "min" : "10",

          "minLength" : "1",

          "maxLength" : "3",

          "required": true,

          "email" : "email",

          "pattern" : "regex",

          "nullValidator" : "nullValidator"

}
```
NOTE – Add custom validators with the key *“custom”:”customValidatorName”*. Some validators like *“max”* and *“min”* are only applicable for numerical fields. Please use as appropriate. *“required”* adds the validator *“requiredTrue”* to the form element. Some validators don’t need a value and therefore, in the value string, you can pass a dummy string. Also note that in case we are defining custom validators for functionality that is already fulfilled by an in-built validator, we should use only one of them.





### Custom Validators

Write your custom validators according to the specifications in the angular documentation. Import the validators you are using inside your component. In the JSON file, use the key *“custom”* to denote that you are using a custom validator.
```
import { customValidator1, customValidator2, customValidator3 } from './shared/validators/validator';
```
Inside your component.ts file, add a dictionary called Validators like so.
```
public Validators = {

    'customValidator1' : customValidator1,

    'customValidator2' : customValidator2,

    'customValidator3' : customValidator3

  }
```
**Sample Custom Validator for validating zipCode**
```
export const zipCodeValidator = (control: AbstractControl): {

    \[key: string\]: any

} => {

    const minLength = 5;

    const maxLength = 5;

    if (control.value !== undefined) {

        const val: any = control.value;

        if (val === undefined || StringFieldValidator.isEmpty(val)) {

            return { errMsg: 'Zip Code is required' };

        }

        if (!StringFieldValidator.validateLengthRange(val, minLength, maxLength)) {

            return { errMsg: 'Zip Code must be ' + maxLength + ' character(s) in length' };

        }

        if (!StringFieldValidator.isNumeric(val)) {

            return { errMsg: 'Zip Code must be a valid decimal digit character string' };

        }

    }

    return null;

};
```
While calling the dynamic form component,

**component.html**
```
\[customValidators\]="Validators"
```
should be passed. If no custom validators are used, the Validators dictionary should still be passed even if it is empty.





### CSS Styling/Material Theming

Add the appropriate CSS class to the “class” attribute of the required element. You can then define the class style in your *styles.scss or .component.scss* file. This should ensure that the correct style is applied. Specifying a class inside the “options” section will allow you to alter the style of the element whereas specifying the class outside the “options” section will allow you to apply a style class to the div which is wrapping the material element.

You can also modify the *“appearance”* attribute of the angular material library wherever applicable. This is primarily set to two values. Either *“outline”* or *“fill”*. For more information, refer to the Angular Material documentation. To set the height of the form form-field, adjust the font-size.

Add the necessary imports for the Material components which are being used in the form to App.module.ts without fail.
```
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatButtonModule } from '@angular/material/button';
`````
…

Material theme can be handled by the parent. This can be set from custom theme and should be done according to Angular material documentation.

<https://material.angular.io/guide/theming>

Add your styles.scss file to the angular.json file.
```
styles : \[

styles.scss

\]
````




 ### Bootstrap

After installing bootstrap, simply add the appropriate classes to the “class” attribute in the JSON file for each element.

Follow this guide to add bootstrap to your project.

<https://www.freecodecamp.org/news/how-to-add-bootstrap-css-framework-to-an-angular-application/>

If a bootstrap class has to be overridden, the user implemented style should contain the !important annotation.

**Sample bootstrap** –
```
"class": "col-xs-9 col-sm-5 col-md-4 col-lg-4",

Versioning & Dependencies

Angular ^14.2.0

Angular Material ^14.2.0
```




## Demo Form

### JSON File HTML
```
{

    "controls": \[

      {

        "formName": "formElement",

        "ctrl_name": "htmlpermID",

        "label": "Perm ID",

        "value": "",

        "type": "text",

        "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

        "options": {

          "required": true,

          "placeholder": "Perm ID",

          "id": "permID",

          "name": "permID",

          "class": "",

          "appearance": "outline",

          "maxlength": "12",

          "minlength": "12",

          "style": "",

          "changes":true

        },

        "validators": {

            "custom": "permIDValidator"

          }

      },

      {

        "formName": "subForm",

        "ctrl_name": "name",

        "label": "Name",

        "subForm": \[

          {

            "formName": "formElement",

            "ctrl_name": "htmltest",

            "label": "First Name",

            "value": "",

            "master": "auditInfo",

            "type": "text",

            "options": {

              "placeholder": "Test",

              "appearance": "outline"

            },

            "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

            "validators": {"required":"required"}

          },

          {

            "formName": "formElement",

            "ctrl_name": "htmltestTime",

            "label": "Time",

            "value": "",

            "type": "time",

            "master": "auditInfo",

            "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

            "options": {

              "placeholder": "Audit Information Time",

              "id": "auditInfoTime",

              "name": "auditInfoTime",

              "class": "",

              "disabled": true,

              "appearance": "outline"

            },

            "validators": {}

          }

        \]

      },

      {

        "formName": "button",

        "buttonName": "button",

        "buttonType": "button",

        "label": "Submit",

        "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4 new",

        "options": {

          "color": "primary",

          "onClick": "test()",

          "link": "<https://www.google.com/search?q=call+event+emiter+on+button+click+with+the+event+data&oq=call+event+emiter+on+button+click+with+the+event+data&aqs=edge..69i57j0i546i649j0i546.10444j0j1&sourceid=chrome&ie=UTF-8>",

          "operation": "test()",

          "class": "btn btn-primary new"

        }

      },

      {

        "formName": "button",

        "buttonName": "button",

        "buttonType": "submit",

        "label": "Print",

        "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4",

        "options": {

          "color": "primary",

          "onClick": "test()",

          "operation": "onPrint()",

          "class": "btn btn-primary",

          "disabled": true

        }

      }

    \]

  }
```
**Output**

###  JSON file Angular Material.
```
{

  "controls": \[

    {

      "formName": "formElement",

      "ctrl_name": "permID",

      "label": "Perm ID",

      "value": "",

      "type": "text",

      "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

      "options": {

        "required": true,

        "placeholder": "Perm ID",

        "id": "permID",

        "name": "permID",

        "class": "",

        "appearance": "outline",

        "maxlength": "12",

        "minlength": "12",

        "style": "",

        "changes":true

      },

      "validators": {

          "custom": "permIDValidator"

        }

    },

    {

      "formName": "expansionPanel",

      "ctrl_name": "exp",

      "type": "expansion",

      "value": "Expansion Box",

      "label": "Expansion Box",

      "subForm": \[

        {

          "formName": "formElement",

          "ctrl_name": "exptest",

          "label": "Field 1",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Test",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "Field 2",

          "label": "Date",

          "value": "",

          "type": "date",

          "options": {

            "placeholder": "Test",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        }

      \]

    },

    {

      "formName": "subForm",

      "ctrl_name": "name",

      "label": "Name",

      "subForm": \[

        {

          "formName": "formElement",

          "ctrl_name": "test",

          "label": "Test",

          "value": "",

          "master": "auditInfo",

          "type": "text",

          "options": {

            "placeholder": "Test",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {"required":"required"}

        },

        {

          "formName": "formElement",

          "ctrl_name": "testTime",

          "label": "Time",

          "value": "",

          "type": "time",

          "master": "auditInfo",

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "options": {

            "placeholder": "Audit Information Time",

            "id": "auditInfoTime",

            "name": "auditInfoTime",

            "class": "",

            "disabled": true,

            "appearance": "outline"

          },

          "validators": {}

        }

      \]

    },

    {

      "formName": "button",

      "buttonName": "buttonRaised",

      "buttonType": "button",

      "label": "Submit",

      "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4 new",

      "options": {

        "color": "primary",

        "onClick": "test()",

        "link": "<https://www.google.com/search?q=call+event+emiter+on+button+click+with+the+event+data&oq=call+event+emiter+on+button+click+with+the+event+data&aqs=edge..69i57j0i546i649j0i546.10444j0j1&sourceid=chrome&ie=UTF-8>",

        "operation": "test()",

        "class": "btn btn-primary new"

      }

    },

    {

      "formName": "button",

      "buttonName": "buttonRaised",

      "buttonType": "submit",

      "label": "Print",

      "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4",

      "options": {

        "color": "primary",

        "onClick": "test()",

        "operation": "onPrint()",

        "class": "btn btn-primary",

        "disabled": true

      }

    }

  \]

}
```
**Output**

A white background with black text

Description automatically generated





### Address Expansion Box
```
{

      "formName": "expansionPanel",

      "ctrl_name": "Address",

      "type": "expansion",

      "value": "",

      "label": "Address",

      "subForm": \[

        {

          "formName": "formElement",

          "ctrl_name": "Door Number",

          "label": "Door Number",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. 42",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "Street",

          "label": "Street",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. Parth Avenue",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "City",

          "label": "City",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. Ranchi",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "Pin Code",

          "label": "Pin Code",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. 600 200",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "State",

          "label": "State",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. Jharkhand",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "Country",

          "label": "Country",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. India",

            "appearance": "outline"

          },

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        }

      \]

    }

//Name Subgroup

    {

      "formName": "subForm",

      "ctrl_name": "name",

      "label": "Name",

      "subForm": \[

        {

          "formName": "formElement",

          "ctrl_name": "First Name",

          "label": "First Name",

          "value": "",

          "type": "text",

          "options": {

            "placeholder": "Ex. John",

            "appearance": "outline"

          },

          "class": "form-group col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "validators": {}

        },

        {

          "formName": "formElement",

          "ctrl_name": "Last Name",

          "label": "Last Name",

          "value": "",

          "type": "text",

          "class": "form-group fix-height col-xs-9 col-sm-5 col-md-4 col-lg-4",

          "options": {

            "placeholder": "Ex. Doe",

            "appearance": "outline"

          },

          "validators": {"required" : "required"}

        }

      \]

    }
```
