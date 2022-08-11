export const getConfig = () => {
    const token  = localStorage.getItem('auth_token')
    if (!token) throw new Error('auth_error')
    
    return {
        headers: {
            'Authorization' : token
        }
    }
}