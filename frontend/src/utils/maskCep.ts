const maskCep = (v: string) => {
    // Remove non-numeric characters
    v = v.replace(/\D/g, "");
  
    // Enforce maximum character limit
    v = v.slice(0, 8); // Maximum length for CEP is typically 8 characters
  
    // Apply masking
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  
    return v;
  };
  
  export default maskCep;