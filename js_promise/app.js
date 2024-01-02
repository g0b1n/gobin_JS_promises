
// let fourPokemonRace = []

// for (let i = 1; i < 5; i++) {
//     fourPokemonRace.push(
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
//     );
// }

// Promise.race(fourPokemonRace)
//     .then(res => {
//         console.log(`${res.data.name} won the race!`)
//     })
//     .catch(err => console.log(err))



///// NUMBERS API /////

// number_url = 'http://numbersapi.com/'


// let myNumber = []

// for (let i = 1; i < 5; i++) {
//     myNumber.push(
//         axios.get(`http://numbersapi.com/${i}/`)
//     );
// }

// Promise.race(myNumber)
//     .then(res => {
//         console.log(res.data)
//     })
//     .catch(err => console.log(err))


const numberForm = document.getElementById('numberForm');
const numberInput = document.getElementById('numberInput');
const factDisplay = document.getElementById('factDisplay');

numberForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents default behavior

    const enterNumber = numberInput.value;

    // Check if the input is a valid number
    if (!isNaN(enterNumber) && enterNumber !== '') {
        const fetchFact = (number) => {
            return new Promise((resolve, reject) => {
                axios.get(`http://numbersapi.com/${number}/`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
            });
        }
        fetchFact(enterNumber)
        .then((fact) => {
            factDisplay.textContent = `${fact}`
        })
        .catch((err) => {
            console.log('Error fetching facts', err)
            factDisplay.textContent = 'An error occurred while fetching the number fact';
        });
    } else {
        factDisplay.textContent = 'Please enter a valid number'
    }
});


///// DECK OF CARDS /////

// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

// Get 1 card


const getCardButton = document.getElementById('getCardButton');
const displayCard = document.getElementById('displayCard');

function drawSingleCard() {
    return new Promise((resolve, reject) => {
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(response => response.json())
            .then(data => {
                if (data.success === true && data.cards.length > 0) {
                    const card = data.cards[0];
                    resolve(`${card.value} of ${card.suit}`);
                } else {
                    reject('No cards available or an error occurred');
                }
            })
            .catch(error => reject(error));
    });
}

// drawSingleCard()
//     .then(card => console.log(card))
//     .catch(err => console.log(err));
getCardButton.addEventListener('click', () => {
    drawSingleCard()
        .then(card => {
            displayCard.textContent = `Your Card is ${card}`;
        })
        .catch(err => {
            displayCard.textContent = `Error: ${err}`
        });
});