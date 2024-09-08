export const isMobile = () => {
    const userAgent = navigator.userAgent
    const isMobileUserAgent = /android|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768

    return isMobileUserAgent || isSmallScreen
}
