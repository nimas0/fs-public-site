// Only works on U.S. phone numbers, and even still it's pretty rough.

"use strict";

export default function(phoneNumber) {
  let numDigits;
  if (phoneNumber.match(/\d/g)) {
    numDigits = phoneNumber.match(/\d/g).length;
  } else {
    return false;
  }

  if (numDigits === 10) {
    return !!(
      phoneNumber.match(/^\(\d{3}\) {0,1}\d{3}-\d{4}$/) ||
      phoneNumber.match(/^\d{3}([ \-]{0,1})\d{3}\1\d{4}$/)
    );
  } else if (numDigits === 11) {
    return !!(
      phoneNumber.match(/^1 {0,1}\(\d{3}\) {0,1}\d{3}-\d{4}$/) ||
      phoneNumber.match(/^1 \d{3}([ \-]{0,1})\d{3}\1\d{4}$/)
    );
  } else {
    return false;
  }
}
