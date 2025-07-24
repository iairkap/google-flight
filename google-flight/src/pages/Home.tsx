import SearchBar from '@/components/SearchBar';
import FlightResults from '@/components/FlightResults';
import styles from '@/styles/Home.module.css';
import HeroSection from '@/components/HeroSection';
import { Container } from '@mui/material';
import ExploreDestinationsSection from '@/components/ExploreDestinationsSection';
import HelpSection from '@/components/HelpSection';
import PopularDestinations from '@/components/PopularDestinations';
import FAQ from '@/components/FAQ';

function Home() {
    return (
        <main className={styles.appContainer}>
            <div className={styles.mainContent}>
                <HeroSection backgroundImageUrl='https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg'>
                    <SearchBar />
                </HeroSection>
                <Container
                    maxWidth={false}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        alignItems: 'center',
                        padding: '0 !important',
                        margin: 0,
                        width: '100%'
                    }}
                >
                    <ExploreDestinationsSection />
                    <FlightResults />
                </Container>
                <HelpSection />
                <PopularDestinations />
                <FAQ />
            </div>
        </main>
    );
}

export default Home;