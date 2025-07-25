import SearchBar from '@/components/SearchBar';
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
                        padding: { xs: '0 12px', sm: '0 16px', lg: '0' },
                        margin: 0,
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '768px', lg: '1024px' },
                        mx: 'auto',
                        '@media (max-width: 768px)': {
                            marginTop: '3rem'
                        }
                    }}
                >
                    <ExploreDestinationsSection />
                </Container>
                <HelpSection />
                <PopularDestinations />
                <FAQ />
            </div>
        </main>
    );
}

export default Home;