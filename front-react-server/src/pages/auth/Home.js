import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        backgroundImage: 'url(/path-to-your-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#0056b3',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        justifyContent: 'space-between',
        color: '#fff',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        height: '40px',
        marginRight: '10px',
    },
    headerText: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    buttonSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0056b3',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '5px',
        fontSize: '18px',
        border: 'none',
        cursor: 'pointer',
    },
    footer: {
        position: 'absolute',
        bottom: '20px',
        display: 'flex',
        gap: '10px',
    },
    footerButton: {
        backgroundColor: '#0056b3',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '5px',
        fontSize: '14px',
        border: 'none',
        cursor: 'pointer',
    },
};

function Home() {
    const navigate = useNavigate();

    const handleLMSClick = () => {
        navigate('/auth/login'); // Navigates to the Login page when clicked
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logo}>
                    <img src="/path-to-logo.png" alt="Logo" style={styles.logoImage} />
                    <span style={styles.headerText}>인천대학교</span>
                </div>
                <nav style={styles.navLinks}>
                    <a href="/guide" style={{ color: '#fff', textDecoration: 'none' }}>이용안내</a>
                    <a href="/incheon-campus" style={{ color: '#fff', textDecoration: 'none' }}>인천캠퍼스</a>
                </nav>
            </header>

            <div style={styles.buttonSection}>
                <button style={styles.button} onClick={handleLMSClick}>LMS 바로가기</button>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button style={styles.footerButton}>학습자 매뉴얼</button>
                    <button style={styles.footerButton}>교수자 매뉴얼</button>
                    <button style={styles.footerButton}>KNOWLEDGE BASE</button>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button style={styles.footerButton}>EverLec Download</button>
                    <button style={styles.footerButton}>Windows</button>
                    <button style={styles.footerButton}>Mac</button>
                </div>
            </div>
        </div>
    );
}

export default Home;