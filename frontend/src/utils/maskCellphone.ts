const maskCellphone = (v: string) => {
    // Remove non-numeric characters
    v = v.replace(/\D/g, "");
  
    // Enforce maximum character limit
    v = v.slice(0, 11); // Maximum length for cellphone is typically 11 characters
  
    // Apply masking
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  
    return v;
  };
  
  export default maskCellphone;