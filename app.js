// Interactive Logic for NVIDIA Location Selector Clone

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('countrySearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const regionBlocks = document.querySelectorAll('.region-block');
    const countryCards = document.querySelectorAll('.country-card');
    const noResults = document.getElementById('noResults');

    let currentRegion = 'all';

    // Filter Logic
    function filterLocations() {
        const query = searchInput.value.toLowerCase().trim();
        let totalVisible = 0;

        // Toggle clear search button visibility
        if (query.length > 0) {
            clearSearchBtn.classList.add('visible');
        } else {
            clearSearchBtn.classList.remove('visible');
        }

        regionBlocks.forEach(block => {
            const blockRegion = block.getAttribute('data-region');
            const cardsInBlock = block.querySelectorAll('.country-card');
            let visibleInBlock = 0;

            // Region filter match
            const matchesRegion = (currentRegion === 'all' || blockRegion === currentRegion);

            cardsInBlock.forEach(card => {
                const countryData = (card.getAttribute('data-country') || '').toLowerCase();
                const langData = (card.getAttribute('data-lang') || '').toLowerCase();
                const textContent = card.textContent.toLowerCase();

                const matchesSearch = query === '' || 
                    countryData.includes(query) || 
                    langData.includes(query) || 
                    textContent.includes(query);

                if (matchesRegion && matchesSearch) {
                    card.classList.remove('hidden');
                    visibleInBlock++;
                    totalVisible++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show or hide the whole region block based on visible cards inside it
            if (visibleInBlock > 0) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });

        // Toggle No Results display
        if (totalVisible === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Search Input Event Listener
    searchInput.addEventListener('input', filterLocations);

    // Clear Search Button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterLocations();
        searchInput.focus();
    });

    // Tab Filtering Event Listeners
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentRegion = btn.getAttribute('data-region');
            filterLocations();

            // Smooth scroll down slightly to locations if needed
            if (currentRegion !== 'all') {
                const targetBlock = document.getElementById(`region-${currentRegion}`);
                if (targetBlock) {
                    targetBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Mobile Hamburger Menu Toggle Placeholder
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('NVIDIA Mobile Menu Navigation triggered');
        });
    }
});
