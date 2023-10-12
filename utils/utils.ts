export const formatPhoneNumber = (phoneNumberString: string) => {
  // TODO: check how to set a format for international
  // number with country code
  /*var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    
    //return null;*/
  let phoneNumber = phoneNumberString.replace(/\D/g, '');
  if (phoneNumber.length > 10) {
    phoneNumber = phoneNumber.substring(0, 10);
  }
  const match = phoneNumber.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    phoneNumber = `${match[1] ? '(' + match[1] + ')' : match[1]}${
      match[2] ? ' ' : ''
    }${match[2]}${match[3] ? '-' : ''}${match[3]}`;
  }
  return phoneNumber;
};

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
