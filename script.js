document.addEventListener('DOMContentLoaded', () => {
    const ratingComponents = document.querySelectorAll('.rating-component');

    // Add click event listener to each star
    ratingComponents.forEach(component => {
        const stars = component.querySelector('.stars');

        // Check if stars element is found before adding event listener
        if (stars) {
            stars.addEventListener('click', event => {
                const selectedStar = event.target;
                const starIndex = Array.from(stars.children).indexOf(selectedStar);

                // Toggle the selected class for clicked star and preceding stars
                for (let i = 0; i <= starIndex; i++) {
                    stars.children[i].classList.toggle('selected');
                }

                // Remove the selected class for proceeding stars
                for (let i = starIndex + 1; i < stars.children.length; i++) {
                    stars.children[i].classList.remove('selected');
                }

                // Update the total score
                updateTotalScore();
            });
        }
    });

    // Function to update the total score
    function updateTotalScore() {
        const totalElement = document.getElementById('totalScore');
        let totalRating = 0;
        let totalWeights = 0;

        ratingComponents.forEach(component => {
            const stars = component.querySelectorAll('.stars span');
            const rating = Array.from(stars).filter(star => star.classList.contains('selected')).length;

            // Get weight from data-weight attribute (default to 0 if not present)
            const weight = parseFloat(component.dataset.weight) || 0;

            // Add the weighted rating to the total
            totalRating += rating * weight;
            totalWeights = 1;
        });

        // Normalize the total to fit within the 10-star scale
        const normalizedTotal = (totalRating / totalWeights) * 10;

        // Update the total score display
        totalElement.textContent = normalizedTotal.toFixed(1);
    }

    // Check for errors
    const checkErrors = () => {
        const errorElements = document.querySelectorAll('.error');
        if (errorElements.length > 0) {
            console.error('Errors found:', errorElements);
        } else {
            console.log('No errors found.');
        }
    };

    // Run the error check after a short delay (adjust as needed)
    setTimeout(checkErrors, 500);
});
