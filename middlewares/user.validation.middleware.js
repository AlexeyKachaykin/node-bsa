import { USER } from "../models/user.js";
import { userService } from "../services/userService.js"

const createUserValid = (req, res, next) => {
  const reEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const rephoneNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
  const rePassword = /.{3,}/;

  const userValid = req.body


  if (
    (userValid &&
      userValid.firstName && typeof userValid.firstName === typeof USER.firstName &&
      userValid.lastName && typeof userValid.lastName === typeof USER.lastName &&
      userValid.email && reEmail.test(userValid.email) && typeof userValid.email === typeof USER.email &&
      userValid.phoneNumber && rephoneNumber.test(userValid.phoneNumber) && typeof userValid.phoneNumber === typeof USER.phoneNumber &&
      userValid.password && rePassword.test(userValid.password) && typeof userValid.password === typeof USER.password)
    && !userService.search({ phoneNumber: userValid.phoneNumber })
    && !userService.search({ email: userValid.email })
  ) {
    next()
  }
  else {
    return res.jsonError('Validation create user error');
  }


};

const updateUserValid = (req, res, next) => {
  const reEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const rephoneNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
  const rePassword = /.{3,}/;
  const updateValid = req.body
  function validateUpdateValid(updateValid) {
    for (let prop in updateValid) {
      if (updateValid.hasOwnProperty(prop)) {
        switch (prop) {
          case 'firstName':
            if (typeof updateValid.firstName !== typeof USER.firstName) {
              return false; 
            }
            break;
          case 'lastName':
            if (typeof updateValid.lastName !== typeof USER.lastName) {
              return false;  
            }
            break;
          case 'email':
            if (!reEmail.test(updateValid.email) || typeof updateValid.email !== typeof USER.email || userService.search({ email: updateValid.email })) {
              return false; 
            }
            break;
          case 'phoneNumber':
            if (!rephoneNumber.test(updateValid.phoneNumber) || typeof updateValid.phoneNumber !== typeof USER.phoneNumber || userService.search({ phoneNumber: updateValid.phoneNumber })) {
              return false;
            }
            break;
          case 'password':
            if (!rePassword.test(updateValid.password) || typeof updateValid.password !== typeof USER.password) {
              return false; 
            }
            break;
         
        }
      }
    }

    return true; 
  }
function checkProperties(obj1, obj2) {
    for (var prop in obj1) {
      if (prop in obj2) {
        return true; 
      }
    }
    return false; 
  }
  
  console.log(updateValid)
  
  if (updateValid && (checkProperties(updateValid, USER))&& (validateUpdateValid(updateValid))) {
    next()
  }
  else {
    return res.jsonError('Validation update user error');
  }

};

export { createUserValid, updateUserValid };
