const maskOnlyNumbers = (v: string): string => {
    // Remove non-numeric characters
    v = v.replace(/\D/g, "");
  
    // Enforce maximum character limit
    v = v.slice(0, 4); // Maximum length is 4 characters
  
    return v;
  };
  
  export default maskOnlyNumbers;