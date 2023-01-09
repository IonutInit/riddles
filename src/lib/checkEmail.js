export function checkEmail(email) { 
    if (email.length === 0) {
        return false
    }
    
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    const charactersBetween = email.substring(atIndex + 1, dotIndex);
    const lastCharacters = email.substring(dotIndex + 1)

    if (
        email.includes('@') && 
        email.includes('.') &&
        charactersBetween.length >=2 &&
        lastCharacters.length >= 2
        )
    {
        return true
    } else {
        return false
    }
}