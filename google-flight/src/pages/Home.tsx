import SearchBar from '@/components/SearchBar';
import FlightResults from '@/components/FlightResults';
import styles from '@/styles/Home.module.css';
import HeroSection from '@/components/HeroSection';
import { Container } from '@mui/material';

function Home() {
    return (
        <main className={styles.appContainer}>
            <div className={styles.mainContent}>
                <HeroSection>
                    <SearchBar />
                </HeroSection>

                {/* Results section */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <FlightResults />
                </Container>
            </div>
        </main>
    );
}

export default Home;